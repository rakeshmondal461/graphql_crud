import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'customer' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  name: string;
  @Column()
  mobileNumber: string;
}
