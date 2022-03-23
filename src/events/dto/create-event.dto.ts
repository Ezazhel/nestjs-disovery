import { ApiProperty } from '@nestjs/swagger';
import { EventID } from 'events/entities/event.entity';

export class CreateEventDto {
  @ApiProperty({
    example: { id: 'string' },
    description: 'an user with only his id',
  })
  user: { id: string };
  @ApiProperty({
    example: [
      {
        id: 'email_notifications',
        enabled: false,
      },
      {
        id: 'sms_notifications',
        enabled: true,
      },
    ],
    description: 'A list of consent',
    isArray: true,
  })
  consents: { id: EventID; enabled: boolean }[];
}
