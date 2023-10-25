import { ICartItem } from '../../../interfaces/cart.interface.ts';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity.ts';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid

  @Column()
  cartId: string;

  @Column({ array: true, type: 'json' })
  items: ICartItem[]; // products from CartEntity

  @Column({ type: 'json' })
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };

  @Column({ type: 'json' })
  delivery: {
    type: string;
    address: any;
  };

  @Column()
  comments: string;

  @Column()
  status: ORDER_STATUS;

  @Column()
  total: number;

  @ManyToOne((type) => User, (user) => user.orders)
  user: User;
}

type ORDER_STATUS = 'created' | 'completed';

export interface OrderEntity {
  id: string; // uuid
  userId: string;
  cartId: string;
  items: ICartItem[]; // products from CartEntity
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}
