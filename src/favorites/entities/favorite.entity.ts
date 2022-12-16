import { Product } from 'src/product/entities/product.entity';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favorite' })
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  state: boolean;

  @ManyToOne(() => Product, (product) => product.favorite, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @ManyToOne(() => UserDetail, (userDetail) => userDetail.favorite, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'id_userDetail' })
  userDetail: UserDetail;
}
