import { createCustomerInput } from './create-customer.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCustomerInput extends PartialType(createCustomerInput) {
  @Field(() => Int)
  id: number;
}
