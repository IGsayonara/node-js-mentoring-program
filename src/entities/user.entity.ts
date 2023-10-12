import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Cart } from './cart.entity.ts';
import { Order } from './order.entity.ts';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid

  @OneToOne((type) => Cart, (cart) => cart.user)
  @JoinColumn()
  activeCart: Cart;

  @OneToMany((type) => Order, (order) => order.user)
  orders: Order[];
}
