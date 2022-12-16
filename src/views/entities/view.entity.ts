import { Product } from 'src/product/entities/product.entity';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'view' })
export class View {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  dataRegiste: Date;

  @ManyToOne(() => UserDetail, (userDetail) => userDetail.view, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'id_userDetail' })
  userDetail: UserDetail;

  @ManyToOne(() => Product, (product) => product.view, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'id_product' })
  product: Product;
}
