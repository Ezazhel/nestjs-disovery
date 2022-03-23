import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

const consentSMS = {
  id: 'sms_notifications',
  enabled: true,
  user: {
    id: 'test',
    email: 'test@mail.com',
  },
};

const user = {
  id: 'test',
  email: 'test@mail.com',
};

describe('EventsService', () => {
  let service: EventsService;
  let eventRepository: Repository<Event>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useValue: {
            save: jest.fn().mockResolvedValue(consentSMS),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);

    eventRepository = module.get(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should insert an event', () => {
      const consent: CreateEventDto = {
        user: {
          id: 'test',
        },
        consents: [
          {
            id: 'sms_notifications',
            enabled: true,
          },
        ],
      };
      expect(service.create(consent)).resolves.toEqual(consentSMS);
    });
  });
  describe('create fail()', () => {
    it('shouldnt insert an event', () => {
      const consent: CreateEventDto = {
        user: {
          id: 'fail',
        },
        consents: [
          {
            id: 'sms_notifications',
            enabled: true,
          },
        ],
      };
      expect(service.create(consent)).resolves.toThrowError();
    });
  });
});
