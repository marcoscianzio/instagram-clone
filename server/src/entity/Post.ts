import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Comment } from "./Comment";
// import { Image } from "./Image";
import { User } from "./user";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  authorId: number;

  @Field(() => String)
  @Column({ type: "text" })
  content: string;

  @Field(() => Int)
  @Column({ default: 0 })
  voteCount: number;

  @Field(() => Int)
  @Column({ default: 0 })
  commentCount: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @Field(() => String)
  @Column({ type: "text" })
  image: String;

  // @Field(() => Image, { nullable: true })
  // @OneToMany(() => Image, (image) => image.post)
  // image: Image[];

  @Field(() => Comment, { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.post)
  comment: Comment[];

  @Field(() => Date)
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
