import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<void> {
    const user = await this.userRepository.findOneBy({
      id: createEventDto.user.id,
    });

    if (user == null) {
      throw new BadRequestException();
    }
    createEventDto.consents.forEach((_consent) => {
      const consent = new Event();
      consent.id = _consent.id;
      consent.enabled = _consent.enabled;
      consent.user = user;
      this.eventRepository.save(consent);
    });
  }
}
