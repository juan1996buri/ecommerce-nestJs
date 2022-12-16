import { Role } from 'src/roles/entities/role.entity';
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

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'bool', default: true })
  state: boolean;

  @CreateDateColumn({ type: 'timestamp', name: 'create_at' })
  createAt: Date;

  @ManyToOne(() => Role, (role) => role.user, { eager: true, nullable: false })
  @JoinColumn({ name: 'id_role' })
  role: Role;

  @OneToMany(() => User, (user) => user.userDetail)
  userDetail: UserDetail[];
}
