import { User } from "../entity/user.entity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
class FieldError {
  @Field(() => String)
  message: string;

  @Field(() => String)
  field: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
