import { EventID } from 'events/entities/event.entity';

export class CreateEventDto {
  id: EventID;
  enabled: boolean;
}
