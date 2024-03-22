// read from .env file
import * as dotenv from 'dotenv';
import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import type { SeederOptions } from 'typeorm-extension';
import { runSeeders } from 'typeorm-extension';

import { AdminEntity } from '@/modules/admin/domains/entities/admin.entity';
import { UserEntity } from '@/modules/user/domains/entities/user.entity';

import { SnakeNamingStrategy } from '@/snake-naming.strategy';
import AdminSeeder from './admin.seeder';
import CategorySeeder from './category.seeder';
import { CategoryEntity } from '@/modules/category/domains/entities/category.entity';
import { ProductEntity } from '@/modules/product/domains/entities/product.entity';
import { ProductSurChargeEntity } from '@/modules/product/domains/entities/product-surcharge.entity';
import { LessorEntity } from '@/modules/lessor/domains/entities/lessor.entity';
import SurchargeSeeder from './surcharge.seeder';
import { SurchargeEntity } from '@/modules/surcharge/domains/entities/surcharge.entity';
import { InboxEntity } from '@/modules/inbox/domains/entities/inbox.entity';
import { FeedbackEntity } from '@/modules/feedback/domains/entities/feedback.entity';
import { OrderEntity } from '@/modules/order/domains/entities/order.entity';
import { RentalFeeEntity } from '@/modules/order/domains/entities/rental-fee.entity';
import { PaymentMethodEntity } from '@/modules/payment/domains/entities/payment-method.entity';
import { PaymentEntity } from '@/modules/payment/domains/entities/payment.entity';
import { InsuranceEntity } from '@/modules/product/domains/entities/insurance.entity';

dotenv.config();

async function executeSeeding() {
  const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [
      AdminEntity,
      UserEntity,
      CategoryEntity,
      InboxEntity,
      FeedbackEntity,
      LessorEntity,
      OrderEntity,
      RentalFeeEntity,
      PaymentMethodEntity,
      PaymentEntity,
      InsuranceEntity,
      ProductSurChargeEntity,
      ProductEntity,
      SurchargeEntity,
    ],
    seeds: [AdminSeeder, CategorySeeder, SurchargeSeeder],
  };

  const dataSource = new DataSource(options);
  await dataSource.initialize();

  await runSeeders(dataSource);
}

executeSeeding().catch(console.error);
