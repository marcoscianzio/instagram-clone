import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationCount,
  UpdateDateColumn,
} from "typeorm";
import { Comment } from "./comment.entity";
import { Image } from "./image.entity";
import { Like } from "./like.entity";
import { User } from "./user.entity";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column()
  userId: string;

  @Field(() => String)
  @Column({ type: "text" })
  description: string;

  @Field(() => Int)
  @RelationCount((post: Post) => post.comments)
  commentCount: number;

  @Field(() => [Image], { nullable: true })
  @OneToMany(() => Image, (image) => image.post, {
    nullable: true,
  })
  images: Image[];

  @Field(() => Boolean)
  isArrayOfImages: boolean;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.post, { nullable: true })
  comments: Comment[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Field(() => Int)
  @RelationCount((comment: Comment) => comment.likes)
  likeCount: number;

  @Field(() => Boolean)
  liked: boolean;

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.post, { nullable: true })
  likes: Like[];

  @Field(() => Date)
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
