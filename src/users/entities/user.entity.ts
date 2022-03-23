import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from 'events/entities/event.entity';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    example: '00000000-0000-0000-0000-000000000000',
    description: 'Id of the user',
  })
  id: string;

  @ApiProperty({
    example: 'test@email.com',
    description: 'The mail of an user',
  })
  @Column({
    unique: true,
  })
  email: string;

  @OneToMany(() => Event, (event) => event.user, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({
    example: [
      { id: 'email_notifications', enabled: true },
      { id: 'sms_notifications', enabled: false },
    ],
    description: 'The current consents of an user',
  })
  @JoinColumn()
  consents: Event[];

  @CreateDateColumn({ type: 'datetime' })
  created: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated: Date;
}
