import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Event } from '../events/entities/event.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.email = createUserDto.email;

    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email'],
      where: {
        id: id,
      },
    });
    const events = await this.getUserEvents(id, {
      id: true,
      enabled: true,
      created: true,
    });

    user.consents = this.getDistinctLastUpdatedEventsWithoutCreated(events);
    return user;
  }

  async remove(id: string) {
    const event = await this.getUserEvents(id, { rowId: true });
    if (event.length > 0)
      await this.eventRepository.delete(event.map((e) => e.rowId));

    await this.userRepository.delete(id);
  }

  async getUserEvents(
    id: string,
    select: FindOptionsSelect<Event>,
  ): Promise<Event[]> {
    return await this.eventRepository.find({
      select,
      where: {
        user: {
          id: id,
        },
      },
    });
  }

  getDistinctLastUpdatedEventsWithoutCreated(events: Event[]) {
    const eventsFiltered: { [id: string]: Event } = {
      [events[0].id]: events[0],
    };

    events.forEach((event) => {
      if (!eventsFiltered[event.id]) eventsFiltered[event.id] = event;

      if (eventsFiltered[event.id].created < event.created)
        eventsFiltered[event.id] = event;
    });

    return Object.values(eventsFiltered).map((event) => {
      delete event.created;
      return event;
    });
  }
}
