import { Test, TestingModule } from '@nestjs/testing';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

const createEventDto: CreateEventDto = {
  consents: [{ enabled: true, id: 'email_notifications' }],
  user: {
    id: 'test',
  },
};
describe('EventsController', () => {
  let eventsController: EventsController;
  let eventService: EventsService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        EventsService,
        {
          provide: EventsService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation((event: CreateEventDto) =>
                Promise.resolve({ rowId: 1, ...event }),
              ),
          },
        },
      ],
    }).compile();

    eventsController = module.get<EventsController>(EventsController);
    eventService = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(eventsController).toBeDefined();
  });

  describe('create()', () => {
    it('should create an event', () => {
      expect(eventsController.create(createEventDto)).resolves.toEqual({
        rowId: 1,
        ...createEventDto,
      });
      expect(eventService.create).toHaveBeenCalledWith(createEventDto);
    });
  });
});
