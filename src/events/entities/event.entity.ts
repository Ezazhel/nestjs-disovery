import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'users/entities/user.entity';

export type EventID = 'email_notifications' | 'sms_notifications';
@ApiTags('Events')
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  rowId: number;

  @ApiProperty({
    example: 'sms_notifications | email_notifications',
    description: 'The type of consent',
  })
  @Column()
  id: string;

  @ApiProperty({
    example: { id: '', email: 'user@email.com' },
    description: 'The user associated to this consent',
  })
  @ManyToOne(() => User, (user) => user.consents)
  user: User;

  @ApiProperty({ example: true, description: 'The state of this consent' })
  @Column()
  enabled: boolean;

  @CreateDateColumn()
  created: Date;
}
