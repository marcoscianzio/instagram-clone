import { Context } from "../../types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Like } from "../../entity/like.entity";
import { getConnection } from "typeorm";
import { Post } from "../../entity/post.entity";
import { Comment } from "../../entity/comment.entity";

@Resolver()
class LikeMutation {
  @Mutation(() => Like, { nullable: true })
  async like(
    @Arg("targetId") targetId: string,
    @Arg("type") type: string,
    @Ctx() { req }: Context
  ): Promise<Like | undefined | boolean> {
    const like = new Like();
    like.userId = req.session.userId!;

    if (type === "post") {
      const post = await Post.findOne(targetId);
      if (!post) {
        return undefined;
      }

      const alreadyExist = await Like.findOne({
        postId: post.id,
        userId: req.session.userId!,
      });

      if (alreadyExist) {
        await Like.delete(alreadyExist);

        return undefined;
      } else {
        like.postId = post.id;
      }
    } else if (type == "comment") {
      const comment = await Comment.findOne(targetId);

      if (!comment) {
        return undefined;
      }

      const alreadyExist = await Like.findOne({
        commentId: comment.id,
        userId: req.session.userId!,
      });

      if (alreadyExist) {
        await Like.delete(alreadyExist);

        return undefined;
      } else {
        like.commentId = comment.id;
      }
    } else {
      return undefined;
    }

    return getConnection().manager.save(like);
  }
}
