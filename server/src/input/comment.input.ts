import { Field, InputType } from "type-graphql";

@InputType()
export class CommentInput {
  @Field(() => String)
  postId: string;

  @Field(() => String, { nullable: true })
  parentCommentId?: string;

  @Field(() => String, { nullable: true })
  repliedUserId?: string;

  @Field(() => String)
  content: string;
}
