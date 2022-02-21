import { Post } from "../../entity/post.entity";
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Context } from "../../types";

@Resolver(Post)
class PostQuery {
  @FieldResolver()
  liked(@Root() post: Post, @Ctx() { req }: Context) {
    return post.likes.some((e) => e.userId === req.session.userId!)
      ? true
      : false;
  }

  @FieldResolver()
  isArrayOfImages(@Root() post: Post) {
    return post.images.length > 1 ? true : false;
  }

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return await Post.find({
      relations: [
        "images",
        "user",
        "likes",
        "likes.user",
        "likes.user.followers",
        "user.followers",
        "user.following",
      ],
      order: {
        createdAt: "DESC",
      },
    });
  }

  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: string): Promise<Post | undefined> {
    const post = await Post.findOne(id, {
      relations: [
        "images",
        "user",
        "likes",
        "likes.user",
        "likes.user.followers",
        "user.followers",
        "user.following",
      ],
    });

    if (!post) {
      return undefined;
    }

    return post;
  }
}
