import { Comment } from "../../entity/comment.entity";
import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { IsNull } from "typeorm";
import { Context } from "../../types";

@Resolver(Comment)
class CommentQuery {
  @FieldResolver()
  liked(@Root() comment: Comment, @Ctx() { req }: Context) {
    return comment.likes.some((e) => e.userId === req.session.userId!)
      ? true
      : false;
  }

  @FieldResolver()
  async childrenCount(@Root() comment: Comment) {
    return await Comment.count({
      where: {
        parentCommentId: comment.id,
      },
    });
  }

  @Query(() => [Comment])
  async postComments(@Arg("postId") postId: string): Promise<Comment[]> {
    const comments = await Comment.find({
      where: {
        postId,
        parentCommentId: IsNull(),
      },
      order: {
        createdAt: "ASC",
      },
      relations: [
        "user",
        "likes",
        "likes.user",
        "likes.user.followers",
        "repliedUser",
      ],
    });

    return comments;
  }

  @Query(() => [Comment], { nullable: true })
  async commentReplies(
    @Arg("postId") postId: string,
    @Arg("parentCommentId") parentCommentId: string
  ): Promise<Comment[] | undefined> {
    return await Comment.find({
      where: {
        postId,
        parentCommentId,
      },
      order: {
        createdAt: "ASC",
      },
      relations: [
        "user",
        "likes",
        "likes.user",
        "repliedUser",
        "likes.user.followers",
      ],
    });
  }
}
