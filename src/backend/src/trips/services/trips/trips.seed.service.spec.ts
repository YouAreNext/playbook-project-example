import { Repository } from 'typeorm';
import { TripEntity } from '../../entities/trip.entity';
import { TripStatus } from '../../models/trip-status.enum';
import { TripsSeedService } from './trips.seed.service';

type TripSeederRepository = Pick<Repository<TripEntity>, 'exist' | 'create' | 'save'>;

describe('TripsSeedService', () => {
  let repository: jest.Mocked<TripSeederRepository>;
  let service: TripsSeedService;

  beforeEach(() => {
    repository = {
      exist: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    service = new TripsSeedService(repository as unknown as Repository<TripEntity>);
  });

  it('skips seeding when trip already exists', async () => {
    repository.exist.mockResolvedValue(true);
    await service.onApplicationBootstrap();
    expect(repository.create).not.toHaveBeenCalled();
    expect(repository.save).not.toHaveBeenCalled();
  });

  it('seeds trips when missing', async () => {
    repository.exist.mockResolvedValue(false);
    repository.create.mockImplementation((input) => input as unknown as TripEntity[]);
    repository.save.mockResolvedValue([] as unknown as TripEntity[]);
    await service.onApplicationBootstrap();
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledTimes(1);
    const [[payload]] = repository.create.mock.calls;
    expect(Array.isArray(payload)).toBe(true);
    expect(payload[0].status).toBe(TripStatus.Completed);
  });
});
