import { User } from "../../entity/user.entity";
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Context } from "../../types";

@Resolver(User)
class UserQuery {
  @FieldResolver()
  isMe(@Root() user: User, @Ctx() { req }: Context) {
    return user.id === req.session.userId ? true : false;
  }

  @FieldResolver()
  follower(@Root() user: User, @Ctx() { req }: Context) {
    return user.following.some((e) => e.id === req.session.userId!)
      ? true
      : false;
  }

  @FieldResolver()
  followed(@Root() user: User, @Ctx() { req }: Context) {
    return user.followers.some((e) => e.id === req.session.userId!)
      ? true
      : false;
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find({
      relations: ["posts", "posts.images"],
    });
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id") id: string): Promise<User | undefined> {
    const user = await User.findOne(id, {
      relations: [
        "posts",
        "posts.images",
        "followers",
        "following",
        "followers.followers",
        "following.followers",
      ],
    });

    if (!user) {
      return undefined;
    }

    return user;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: Context): Promise<User | undefined> {
    if (!req.session.userId) {
      return undefined;
    } else {
      return await User.findOne(req.session.userId, {
        relations: ["posts", "posts.images", "followers", "following"],
      });
    }
  }
}
