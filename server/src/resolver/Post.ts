import { Post } from "../entity/Post";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { MyContext } from "../types";
import { User } from "../entity/user";

@Resolver(Post)
export class PostResolver {
  @Query(() => [Post])
  async userPosts(
    @Arg("authorId") authorId: number
  ): Promise<Post[] | undefined> {
    const posts = await getConnection()
      .createQueryBuilder()
      .select("post")
      .from(Post, "post")
      .innerJoinAndSelect("post.author", "user")
      .where("post.authorId = :authorId", { authorId })
      .getMany();

    if (!posts) {
      return undefined;
    }

    return posts;
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("content") content: string,
    @Arg("image") image: string,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    const post = Post.create({
      content,
      image,
      authorId: req.session.userId,
      author: req.session.user,
    }).save();

    await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        postCount: () => "postCount + 1",
      })
      .where("id = :id", { id: req.session.userId })
      .execute();

    return post;
  }
}
