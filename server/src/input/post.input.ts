import { Field, InputType } from "type-graphql";

@InputType()
class ImageInput {
  @Field(() => String)
  url: string;
}

@InputType()
export class PostInput {
  @Field(() => String)
  description: string;

  @Field(() => [ImageInput], { nullable: true })
  images?: ImageInput[];
}
