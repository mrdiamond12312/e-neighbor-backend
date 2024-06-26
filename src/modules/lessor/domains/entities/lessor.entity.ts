import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { AbstractEntity } from '@/common/abstract.entity';
import { COMMON_LOCATION, CommonLocationType } from '@/constants';
import { ProductEntity } from '@/modules/product/domains/entities/product.entity';
import { UserEntity } from '@/modules/user/domains/entities/user.entity';

@Entity('lessors')
export class LessorEntity extends AbstractEntity {
  @Column({ nullable: true })
  description: string;

  @Column()
  wareHouseAddress: string;

  @Column({ nullable: true })
  responseRate: number;

  @Column({ nullable: true })
  responseTime: number;

  @Column({ nullable: true })
  agreementRate: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => ProductEntity, (product) => product.lessor)
  products: ProductEntity[];

  @Column({ nullable: true, default: '' })
  shopName: string;

  @Column({
    type: 'enum',
    enum: COMMON_LOCATION,
    default: COMMON_LOCATION.HCM,
  })
  location: CommonLocationType;
}
