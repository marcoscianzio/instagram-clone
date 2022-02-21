import { Post } from "../../entity/post.entity";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
} from "type-graphql";
import { PostInput } from "../../input/post.input";
import { Image } from "../../entity/image.entity";
import { getConnection } from "typeorm";
import { Context } from "../../types";

@Resolver(Post)
class PostMutation {
  @Mutation(() => Post)
  async createPost(
    @Arg("values") { images, description }: PostInput,
    @Ctx() { req }: Context
  ): Promise<Post> {
    const imageArray = [] as any[];

    if (images) {
      for await (const element of images) {
        const image = new Image();
        image.url = element.url;

        imageArray.push(image);
        await getConnection().manager.save(image);
      }
    }

    return await Post.create({
      description,
      images: imageArray,
      userId: req.session.userId!,
    }).save({});
  }
}
