import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
