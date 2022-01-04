import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class NewStudent {
    @Field(() => String)
  name: string;

  @Field(() => String)
  gender: string;

  @Field(() => String)
  address: string;

  @Field(() => Int)
  mobileNo: number;

  @Field(() => Date)
  DOB: Date;
}