import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { v4 } from "uuid";
import { FORGET_PASSWORD_PREFIX } from "../constants";
import { User } from "../entity/user";
import { RegisterInput } from "../inputs/User";
import { MyContext } from "../types";
import { sendEmail } from "../utils/sendEmail";
import { changePasswordSchema } from "../validators/changePassword";
import { format } from "../validators/formatter";
import { userSchema } from "../validators/user";

@ObjectType()
class PathError {
  @Field()
  path: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [PathError], { nullable: true })
  errors?: PathError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.userId === user.id) {
      return user.email;
    }

    return "";
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    try {
      await changePasswordSchema.validate(
        { newPassword },
        { abortEarly: false }
      );
    } catch (error) {
      return format(error);
    }

    const key = FORGET_PASSWORD_PREFIX + token;

    const userId = await redis.get(key);

    if (!userId) {
      return {
        errors: [
          {
            path: "token",
            message: "Token invalid or expired",
          },
        ],
      };
    }

    const user = await User.findOne({ id: parseInt(userId) });

    if (!user) {
      return {
        errors: [
          {
            path: "token",
            message: "User no longer exists",
          },
        ],
      };
    }

    await User.update(
      { id: parseInt(userId) },
      { password: await argon2.hash(newPassword) }
    );

    redis.del(key);

    req.session.userId = user.id;
    req.session.user = user;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ email });

    if (!user) {
      return false;
    }

    const token = v4();

    redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "ex",
      1000 * 60 * 60 * 24 * 3
    );

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">reset password</a>`,
      "Change password"
    );

    return true;
  }

  @Query(() => User, { nullable: true })
  async Me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    if (!req.session.userId) {
      return undefined;
    } else {
      const user = await User.findOne(req.session.userId);

      return user;
    }
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    try {
      await userSchema.validate(options, { abortEarly: false });
    } catch (error) {
      return format(error);
    }

    const usernameAlreadyExist = await User.findOne({
      username: options.username,
    });

    if (usernameAlreadyExist) {
      return {
        errors: [
          {
            path: "username",
            message: "Username already exists",
          },
        ],
      };
    }

    const emailAlreadyExist = await User.findOne({
      email: options.email,
    });

    if (emailAlreadyExist) {
      return {
        errors: [
          {
            path: "email",
            message: "email already exists",
          },
        ],
      };
    }

    const numberAlreadyExist = await User.findOne({
      number: options.number,
    });

    if (numberAlreadyExist) {
      return {
        errors: [
          {
            path: "number",
            message: "number already exists",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);

    const user = await User.create({
      email: options.email,
      username: options.username,
      number: options.number,
      name: options.name,
      description: options.description,
      sex: options.sex,
      birthday: options.birthday,
      password: hashedPassword,
    }).save();

    req.session.userId = user.id;
    req.session.user = user;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrNumberOrEmail") usernameOrNumberOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const isUsernameOrNumberOrEmail = () => {
      if (usernameOrNumberOrEmail.includes("@")) {
        return "email";
      } else if (/^-?[\d.]+(?:e-?\d+)?$/.test(usernameOrNumberOrEmail)) {
        return "number";
      } else {
        return "username";
      }
    };

    const key = isUsernameOrNumberOrEmail();

    const user = await User.findOne({ [key]: usernameOrNumberOrEmail });

    if (!user) {
      return {
        errors: [
          {
            path: "usernameOrNumberOrEmail",
            message: `${key} isn't registered`,
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password as string, password);

    if (!valid) {
      return {
        errors: [
          {
            path: "password",
            message: "Password incorrect",
          },
        ],
      };
    }

    req.session.userId = user.id;
    req.session.user = user;

    return { user };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie("qid");
        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
