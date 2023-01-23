import { Product } from 'src/product/entities/product.entity';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favorite' })
@Index(['product', 'user'], { unique: true })
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.favorite, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @ManyToOne(() => User, (user) => user.favorite, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'id_user' })
  user: User;
}
