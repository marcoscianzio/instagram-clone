import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./comment.entity";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@ObjectType()
@Entity()
export class Like extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  postId: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  commentId: string;

  @Field(() => String)
  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.likes, {
    nullable: true,
  })
  comment: Comment;

  @Field(() => Post, { nullable: true })
  @ManyToOne(() => Post, (post) => post.likes, {
    nullable: true,
  })
  post: Post;
}
