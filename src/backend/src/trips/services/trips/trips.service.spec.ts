import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TripPlanDayEntity } from '../../entities/trip-plan-day.entity';
import { TripPlanLocationEntity } from '../../entities/trip-plan-location.entity';
import { TripEntity } from '../../entities/trip.entity';
import { CreateTripDto } from '../../models/dto/create-trip.dto';
import { ListTripsQueryDto } from '../../models/dto/list-trips-query.dto';
import { TripStatus } from '../../models/trip-status.enum';
import { TripsService } from './trips.service';

type TripRepository = Pick<Repository<TripEntity>, 'findAndCount' | 'findOne' | 'create' | 'save'>;

describe('TripsService', () => {
  let service: TripsService;
  let repository: jest.Mocked<TripRepository>;

  beforeEach(() => {
    repository = {
      findAndCount: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    service = new TripsService(repository as unknown as Repository<TripEntity>);
  });

  it('returns paginated trips with metadata', async () => {
    const trip = buildTripEntity();
    repository.findAndCount.mockResolvedValue([[trip], 1]);
    const query = new ListTripsQueryDto();
    const result = await service.listTrips(query);
    expect(result.items.length).toBe(1);
    expect(result.total).toBe(1);
    expect(result.items[0].tripId).toBe(trip.tripId);
  });

  it('returns a trip by identifier', async () => {
    const trip = buildTripEntity();
    repository.findOne.mockResolvedValue(trip);
    const tripDetail = await service.findTrip(trip.tripId);
    expect(tripDetail.tripId).toBe(trip.tripId);
    expect(tripDetail.plan?.[0].locations[0].coordinates.lat).toBe(38.7139);
  });

  it('throws when trip does not exist', async () => {
    repository.findOne.mockResolvedValue(null);
    await expect(service.findTrip('missing-trip')).rejects.toThrow(NotFoundException);
  });

  it('enqueues a new trip', async () => {
    const dto = new CreateTripDto();
    dto.prompt = 'Weekend in Prague focused on architecture.';
    const createdTrip = buildTripEntity();
    repository.create.mockReturnValue(createdTrip);
    repository.save.mockResolvedValue(createdTrip);
    const created = await service.createTrip(dto);
    expect(created.status).toBe(TripStatus.Processing);
    expect(repository.save).toHaveBeenCalledTimes(1);
  });

  it('provides smoke test string', () => {
    expect(service.getAdminSmokeTest()).toBe('Trips service ready');
  });
});

function buildTripEntity(): TripEntity {
  const location = new TripPlanLocationEntity();
  location.locationId = 'loc-1';
  location.name = 'Castelo de S. Jorge';
  location.description = 'Enjoy panoramic views over Lisbon to start the journey.';
  location.time = '10:00 - 12:00';
  location.latitude = 38.7139;
  location.longitude = -9.1335;
  const day = new TripPlanDayEntity();
  day.dayId = 'day-1';
  day.day = 1;
  day.title = 'Exploring Alfama';
  day.locations = [location];
  const trip = new TripEntity();
  trip.tripId = 'trip-1';
  trip.title = 'Lisbon escape for four days';
  trip.status = TripStatus.Completed;
  trip.originalPrompt = 'Поездка в Лиссабон на 4 дня';
  trip.createdAt = new Date('2025-09-10T12:00:00Z');
  trip.days = [day];
  return trip;
}
