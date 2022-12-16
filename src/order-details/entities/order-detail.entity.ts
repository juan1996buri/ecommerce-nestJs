import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order_detail' })
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  units: number;

  @ManyToOne(() => Product, (product) => product.orderDetail, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderDetail)
  @JoinColumn({ name: 'id_order' })
  order: Order;
}
