import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Cart } from './cart.entity.ts';
import { Order } from './order.entity.ts';
import { UserRole } from './userRole.entity.ts';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  name: string;

  @OneToOne(() => Cart, (cart) => cart.user)
  @JoinColumn()
  activeCart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @ManyToMany(() => UserRole)
  @JoinTable()
  roles: UserRole[];
}
