import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class createCustomerInput {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  mobileNumber: string;
}
