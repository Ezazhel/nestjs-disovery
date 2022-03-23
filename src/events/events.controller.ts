import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    if (
      createEventDto.consents.some(
        (consent) =>
          consent.id != 'sms_notifications' &&
          consent.id != 'email_notifications',
      )
    )
      throw new HttpException(
        "One of your consent isn't in the list",
        HttpStatus.BAD_REQUEST,
      );

    return this.eventsService.create(createEventDto);
  }
}
