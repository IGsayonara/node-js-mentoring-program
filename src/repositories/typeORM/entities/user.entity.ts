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

  @ManyToMany(() => UserRole)
  @JoinTable()
  roles: UserRole[];
}
