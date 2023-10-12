import {Entity, Column, PrimaryGeneratedColumn, OneToOne, BeforeUpdate} from 'typeorm';
import {CartItemEntity} from "../interfaces/cart.entity.ts";
import {User} from "./user.entity.ts";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn("uuid")
    id: string; // uuid

    @Column()
    isDeleted: boolean;

    @Column({type: 'json', array: false, default: () => "'[]'"})
    items: CartItemEntity[];

    @OneToOne(type => User, user => user.activeCart)
    user: User;
}