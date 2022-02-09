import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  RelationCount,
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

  @Field(() => String, { nullable: true })
  @Column({ enum: Sex, type: "enum", nullable: true })
  sex: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, type: "text" })
  profile_pic: string;

  @Field(() => Boolean, { nullable: true })
  followed: boolean;

  @Field(() => Boolean, { nullable: true })
  follower: boolean;

  @Field(() => [User], { nullable: true })
  @JoinTable()
  @ManyToMany((type) => User, (user) => user.following)
  followers: User[];

  @Field(() => Int)
  @RelationCount((user: User) => user.followers)
  followersCount: number;

  @Field(() => [User], { nullable: true })
  @ManyToMany((type) => User, (user) => user.followers)
  following: User[];

  @Field(() => Int)
  @RelationCount((user: User) => user.following)
  followingCount: number;

  @Field(() => Int)
  @RelationCount((user: User) => user.posts)
  postCount: number;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @Field(() => String, { nullable: true })
  @Column({ type: "date", nullable: true })
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
