import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { View } from 'src/views/entities/view.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user_detail' })
export class UserDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lasName: string;

  @ManyToOne(() => User, (user) => user.userDetail)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => Order, (order) => order.userDetail)
  order: Order[];

  @OneToMany(() => Favorite, (favorite) => favorite.userDetail)
  favorite: Favorite[];

  @OneToMany(() => View, (view) => view.userDetail)
  view: View;
}
