import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  number: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String)
  sex: string;

  @Field(() => String, { nullable: true })
  profile_pic: string;

  @Field(() => String)
  birthday: string;
}
