import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../events/entities/event.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const oneUser = {
  email: 'test@email.com',
  id: 'UUID',
};

const users = [
  {
    email: 'test@email.com',
    id: 'UUID',
  },
  {
    email: 'test@mail.com',
    id: 'UUID-TEST',
  },
];

const userEvents = [
  {
    id: 'sms_notification',
    enabled: true,
  },
  {
    id: 'email_notification',
    enabled: false,
  },
];

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let eventRepository: Repository<Event>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn().mockResolvedValue(oneUser),
            findOne: jest.fn().mockResolvedValue(oneUser),
            find: jest.fn().mockResolvedValue(users),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Event),
          useValue: {
            find: jest.fn().mockResolvedValue(userEvents),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    eventRepository = module.get<Repository<Event>>(getRepositoryToken(Event));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new user', () => {
      const user: CreateUserDto = {
        email: 'test@email.com',
      };

      expect(service.create(user)).resolves.toEqual(oneUser);
    });
  });

  describe('find()', () => {
    it('should find 2 users', () => {
      expect(service.findAll()).resolves.toHaveLength(2);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const repoSpyUser = jest.spyOn(userRepository, 'findOne');
      expect(service.findOne('UUID')).resolves.toEqual(oneUser);
      expect(repoSpyUser).toBeCalledWith({
        select: ['id', 'email'],
        where: {
          id: 'UUID',
        },
      });
    });
  });

  describe('remove()', () => {
    it('should remove a single user', async () => {
      const removeSpy = jest.spyOn(userRepository, 'delete');
      const retVal = await service.remove('UUID');
      expect(removeSpy).toBeCalledWith('UUID');
      expect(retVal).toBeUndefined();
    });
  });
});
