import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class Image extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  postId: number;

  @Field(() => String)
  @Column({ type: "text" })
  link: string;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.image)
  post: Post;
}
