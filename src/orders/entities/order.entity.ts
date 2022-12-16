import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nOrder: number;

  @Column()
  state: string;

  @Column()
  direction: string;

  @ManyToOne(() => UserDetail, (userDetail) => userDetail.user, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'id_userDetail' })
  userDetail: UserDetail;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetail[];
}
