import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Comment } from "./Comment";
import { Post } from "./Post";

enum Sex {
  Male,
  Female,
  Other,
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ unique: true, nullable: true })
  email: string;

  @Field(() => String)
  @Column({ unique: true, nullable: true })
  number: string;

  @Field(() => String)
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => String)
  @Column({ enum: Sex, type: "enum" })
  sex: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "text" })
  profile_pic: string;

  @Field(() => Int)
  @Column({ default: 0 })
  followers: number;

  @Field(() => Int)
  @Column({ default: 0 })
  following: number;

  @Field(() => Int)
  @Column({ default: 0 })
  postCount: number;

  @Field(() => Post, { nullable: true })
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @Field(() => Comment, { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Post[];

  @Field(() => String)
  @Column({ type: "date" })
  birthday: string;

  @Field(() => Boolean)
  @Column({ default: false })
  confirmed: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  verified: boolean;

  @Field(() => Date)
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
