import { EventID } from 'events/entities/event.entity';

export class CreateEventDto {
  user: { id: string };
  consents: { id: EventID; enabled: boolean }[];
}
