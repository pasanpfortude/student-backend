import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdatedStudent {

    @Field()
    id: number;

    @Field()
  name: string;

  @Field()
  gender: string;

  @Field()
  address: string;

  @Field()
  age: number;

  @Field()
  mobileNo: number;

  @Field()
  DOB: Date;
}