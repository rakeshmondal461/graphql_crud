import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class createCustomerInput {
  @Field()
  email: string;

  @Field()
  mobileNumber: string;
}
