import { Category } from 'src/category/entities/category.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { View } from 'src/views/entities/view.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column()
  image: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.product, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'id_category' })
  category: Category;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetail: OrderDetail[];

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  favorite: Favorite[];

  @OneToMany(() => View, (view) => view.product)
  view: View;
}
