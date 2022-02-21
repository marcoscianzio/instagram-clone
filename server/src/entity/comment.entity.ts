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
  TreeParent,
  UpdateDateColumn,
} from "typeorm";
import { Like } from "./like.entity";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column()
  postId: string;

  @Field(() => String)
  @Column()
  userId: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  repliedUserId: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  parentCommentId: string;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (category) => category.parentComment)
  childrenComment: Comment[];

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.replies)
  repliedUser: User;

  @Field(() => Int)
  childrenCount: number;

  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.childrenComment)
  parentComment: Comment;

  @Field(() => String)
  @Column()
  content: string;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @Field(() => Int)
  @RelationCount((comment: Comment) => comment.likes)
  likeCount: number;

  @Field(() => Boolean)
  liked: boolean;

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.comment, { nullable: true })
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
