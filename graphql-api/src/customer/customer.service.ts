import { Injectable } from '@nestjs/common';
import { createCustomerInput } from './dto/create-customer.input';
import { UpdateCustomerInput } from './dto/update-customer.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(Customer) private repo: Repository<Customer>) {}

  async create(createCustomerInput: createCustomerInput) {
    const { email, name, mobileNumber } = createCustomerInput;
    const customer = this.repo.create({ email, name, mobileNumber });
    await this.repo.save(customer);
    return customer;
  }

  async findAll() {
    let customers = await this.repo.find();
    return customers;
  }

  findOne(id: number) {
    let customer = this.repo.findOne({ where: { id: id } });
    return customer;
  }

  async update(id: number, updateCustomerInput: UpdateCustomerInput) {
    const customerToUpdate = await this.repo.findOneBy({
      id: id,
    });
    customerToUpdate.email = updateCustomerInput.email;
    customerToUpdate.mobileNumber = updateCustomerInput.mobileNumber;
    customerToUpdate.name = updateCustomerInput.name;

    await this.repo.save(customerToUpdate);
    return customerToUpdate;
  }

  async remove(id: number) {
    // Find the user by id
    const userToDelete = await this.repo.findOne({ where: { id: id } });

    if (!userToDelete) {
      throw new Error(`User with id ${id} not found.`);
    }

    // Delete the user
    await this.repo.delete(id);
    return { ...userToDelete };
  }

  async searchCustomers(name: string): Promise<Customer[]> {
    const query = this.repo
      .createQueryBuilder('customer')
      .where('LOWER(customer.name) LIKE LOWER(:name)', {
        name: `%${name.toLowerCase()}%`,
      });

    const customers = await query.getMany();
    return customers;
  }
}
