import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'users/entities/user.entity';

export type EventID = 'email_notifications' | 'sms_notifications';
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  rowId: number;

  @Column()
  id: string;

  @ManyToOne((type) => User, (user) => user.consents)
  user: User;

  @Column()
  enabled: boolean;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
