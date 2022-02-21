import { CommentInput } from "../../input/comment.input";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Comment } from "../../entity/comment.entity";
import { Context } from "../../types";
import { getConnection } from "typeorm";
import { Post } from "../../entity/post.entity";
import { User } from "../../entity/user.entity";

@Resolver()
class CommentMutation {
  @Mutation(() => Comment)
  async createComment(
    @Arg("values")
    { postId, content, repliedUserId, parentCommentId }: CommentInput,
    @Ctx() { req }: Context
  ): Promise<Comment> {
    const post = await Post.findOne(postId);

    if (!post) {
      throw new Error("post doesn't exist");
    }

    const comment = new Comment();
    comment.postId = post.id;
    comment.userId = req.session.userId!;
    comment.content = content;

    if (repliedUserId) {
      const userReplied = await User.findOne({ id: repliedUserId });

      if (!userReplied) {
        throw new Error("parent comment doesn't exist");
      }

      comment.repliedUserId = repliedUserId;
    }

    if (parentCommentId) {
      const parentComment = await Comment.findOne({ id: parentCommentId });

      if (!parentComment) {
        throw new Error("parent comment doesn't exist");
      }

      comment.parentCommentId = parentCommentId;
      comment.parentComment = parentComment;
    }

    return getConnection().manager.save(comment);
  }
}
