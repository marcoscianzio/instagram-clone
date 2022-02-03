import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./user";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  postId: number;

  @Field(() => Int)
  @Column()
  authorId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comment)
  post: Post;

  @Field(() => String)
  @Column({ type: "text" })
  content: string;

  @Field(() => Date)
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
