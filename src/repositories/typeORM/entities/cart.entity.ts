import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { ICartItem } from '../../../interfaces/cart.interface.ts';
import { User } from './user.entity.ts';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid

  @Column()
  isDeleted: boolean;

  @Column({ type: 'json', array: false, default: () => "'[]'" })
  items: ICartItem[];

  @OneToOne(() => User, (user) => user.activeCart)
  user: User;
}
