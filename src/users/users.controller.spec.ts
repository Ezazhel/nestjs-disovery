import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const createUserDto: CreateUserDto = {
  email: 'test@mail.com',
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: UsersService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((user: CreateUserDto) =>
                Promise.resolve({ id: 'UUID', ...user }),
              ),
            findAll: jest.fn().mockResolvedValue([
              {
                email: 'test1@mail.com',
              },
              {
                email: 'test2@mail.com',
              },
            ]),
            findOne: jest.fn().mockResolvedValue((id: string) =>
              Promise.resolve({
                mail: 'test1@mail.com',
                id,
              }),
            ),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('create()', () => {
    it('should create a user', () => {
      expect(usersController.create(createUserDto)).resolves.toEqual({
        id: 'UUID',
        ...createUserDto,
      });
      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll()', () => {
    it('should find all users ', () => {
      usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should find a user', () => {
      expect(usersController.findOne('UUID')).resolves.toEqual({
        mail: 'test1@mail.com',
        id: 'UUID',
      });
      expect(usersService.findOne).toHaveBeenCalled();
    });
  });

  describe('remove()', () => {
    it('should remove the user', () => {
      usersController.remove('UUID2');
      expect(usersService.remove).toHaveBeenCalled();
    });
  });
});
