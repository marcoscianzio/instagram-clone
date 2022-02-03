import { Post } from "../entity/Post";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async getUserPosts(
    @Arg("authorId") authorId: number
  ): Promise<Post[] | undefined> {
    const posts = await getConnection()
      .createQueryBuilder(Post)
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
    @Arg("image") image: string
  ) {

    

  }
}
