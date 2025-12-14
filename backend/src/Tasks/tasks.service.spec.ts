import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { FirebaseService } from 'src/Firebase/firebase.service';

describe('TasksService', () => {
  let service: TasksService;

  const mockFirebaseService = {
    getFirestore: jest.fn().mockReturnValue({
      collection: jest.fn().mockReturnValue({
        doc: jest.fn().mockReturnValue({
          id: 'mock-task-id',
          set: jest.fn(),
          update: jest.fn(),
          get: jest.fn().mockResolvedValue({
            data: () => ({
              id: 'mock-task-id',
              title: 'Test Task',
              description: 'Test description',
              done: false,
              createdAt: '2024-01-01',
            }),
          }),
        }),
        get: jest.fn().mockResolvedValue({
          docs: [],
        }),
      }),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: FirebaseService,
          useValue: mockFirebaseService,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task successfully', async () => {
    const task = await service.createTask({
      title: 'Test Task',
      description: 'Test description',
    });

    expect(task).toBeDefined();
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('Test description');
    expect(task.done).toBe(false);
    expect(task.id).toBeDefined();
  });
});
