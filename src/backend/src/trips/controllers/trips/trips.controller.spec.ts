import { Test, TestingModule } from '@nestjs/testing';
import { TripCreationView } from '../../models/view/trip-creation.view';
import { TripDetailView } from '../../models/view/trip-detail.view';
import { TripListView } from '../../models/view/trip-list.view';
import { TripStatus } from '../../models/trip-status.enum';
import { TripsService } from '../../services/trips/trips.service';
import { CreateTripDto } from '../../models/dto/create-trip.dto';
import { ListTripsQueryDto } from '../../models/dto/list-trips-query.dto';
import { TripsController } from './trips.controller';

describe('TripsController', () => {
  let controller: TripsController;
  let service: jest.Mocked<TripsService>;

  beforeEach(async () => {
    service = {
      createTrip: jest.fn(),
      listTrips: jest.fn(),
      getAdminSmokeTest: jest.fn(),
      findTrip: jest.fn(),
    } as unknown as jest.Mocked<TripsService>;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [{ provide: TripsService, useValue: service }],
    }).compile();
    controller = module.get<TripsController>(TripsController);
  });

  it('creates a trip and returns accepted response', async () => {
    const dto = new CreateTripDto();
    dto.prompt = 'Family trip to Barcelona for five days.';
    const view = new TripCreationView({ tripId: 'trip-1', status: TripStatus.Processing, message: 'Your trip generation has been queued.' });
    service.createTrip.mockResolvedValue(view);
    const response = await controller.createTrip(dto);
    expect(response.status).toBe(TripStatus.Processing);
  });

  it('lists trips using provided query', async () => {
    const list = new TripListView({ page: 1, limit: 10, total: 0, items: [] });
    service.listTrips.mockResolvedValue(list);
    const result = await controller.getTrips(new ListTripsQueryDto());
    expect(result.total).toBe(0);
  });

  it('returns detailed trip view', async () => {
    const detail = new TripDetailView({ tripId: 'trip-1', status: TripStatus.Completed, originalPrompt: 'Prompt', createdAt: new Date().toISOString(), plan: [] });
    service.findTrip.mockResolvedValue(detail);
    const result = await controller.getTrip('trip-1');
    expect(result.tripId).toBe('trip-1');
  });

  it('returns smoke test value', () => {
    service.getAdminSmokeTest.mockReturnValue('Trips service ready');
    expect(controller.getAdminSmokeTest()).toBe('Trips service ready');
  });
});
