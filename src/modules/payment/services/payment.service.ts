import { PaymentMethodEntity } from './../domains/entities/payment.entity';
import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './../repositories/payment.repository';
import {
  AddPaymentMethodDto,
  UpdatePaymentMethodDto,
} from '../domains/dtos/payment-method.dto';
import { UserEntity } from '../../user/domains/entities/user.entity';
@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async findByUserId(id: number): Promise<PaymentMethodEntity[]> {
    const paymentMethods = await this.paymentRepository.findByUserId(id);
    return paymentMethods;
  }

  async addUserPaymentMethod(
    paymentMethod: AddPaymentMethodDto,
    user: UserEntity,
  ): Promise<AddPaymentMethodDto> {
    const paymentMethodtoAdd = {
      name: paymentMethod.name,
      type: paymentMethod.type,
      accountNumber: paymentMethod.accountNumber,
      user: user,
    };
    this.paymentRepository.insert(paymentMethodtoAdd);
    return paymentMethod;
  }

  async updateUserPaymentMethod(
    user: UserEntity,
    paymentMethods: UpdatePaymentMethodDto[],
  ) {
    //Remove user exist payment method
    await this.paymentRepository.deleteByUserId(user.id);
    //Insert the replacement payment methods
    const paymentMethodsToSave = paymentMethods.map((paymentMethod) => ({
      name: paymentMethod.name,
      type: paymentMethod.type,
      accountNumber: paymentMethod.accountNumber,
      user: user,
    }));
    this.paymentRepository.insert(paymentMethodsToSave);
  }
}