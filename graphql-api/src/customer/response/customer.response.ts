import { ObjectType, Field, Int } from '@nestjs/graphql';
@ObjectType()
export class Customer {
  @Field()
  id: number;
  @Field()
  email: string;
  @Field()
  mobileNumber: string;
}
