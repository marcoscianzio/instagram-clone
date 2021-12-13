import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

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

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column({ nullable: true })
  description: string;

  @Field(() => String)
  @Column()
  sex: Sex;

  @Field(() => String)
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
  posts: number;

  @Field(() => Date)
  @Column({ type: "date" })
  birthday: Date;

  @Field(() => Date)
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
