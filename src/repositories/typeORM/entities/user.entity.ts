import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Cart } from './cart.entity.ts';
import { Order } from './order.entity.ts';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid

  @Column()
  name: string;

  @OneToOne(() => Cart, (cart) => cart.user)
  @JoinColumn()
  activeCart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
