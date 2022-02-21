import bcrypt from "bcrypt";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../entity/user.entity";
import { LoginInput, UserInput } from "../../input/user.input";
import { UserResponse } from "../../responses/user.response";
import { Context } from "../../types";

@Resolver()
class UserMutation {
  @Mutation(() => Boolean)
  async follow(
    @Arg("userId") userId: string,
    @Ctx() { req }: Context
  ): Promise<Boolean> {
    const me = await User.findOne({ id: req.session.userId });
    const userToFollow = await User.findOne({ id: userId });

    if (!userToFollow || userToFollow === me) {
      return false;
    }

    try {
      await getConnection()
        .createQueryBuilder()
        .relation(User, "following")
        .of(me)
        .add(userToFollow);
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        await getConnection()
          .createQueryBuilder()
          .relation(User, "following")
          .of(me)
          .remove(userToFollow);
      }
    }

    return true;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("values") { email, password, displayName }: UserInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const emailAlreadyExist = await User.findOne({ email });

    if (emailAlreadyExist) {
      return {
        errors: [
          {
            message: "email already exists",
            field: "email",
          },
        ],
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      displayName,
      email,
      password: hashedPassword,
    }).save();

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("values") { email, password }: LoginInput,
    @Ctx() { req }: Context
  ): Promise<UserResponse> {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        errors: [
          {
            message: "user doesn't exist",
            field: "email",
          },
        ],
      };
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return {
        errors: [
          {
            message: "Invalid password",
            field: "password",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return { user };
  }
}
