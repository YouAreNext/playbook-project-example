import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { TripPlanDayEntity } from '../../entities/trip-plan-day.entity.js';
import { TripPlanLocationEntity } from '../../entities/trip-plan-location.entity.js';
import { TripEntity } from '../../entities/trip.entity.js';
import { TripStatus } from '../../models/trip-status.enum.js';

const LISBON_PROMPT = 'Поездка в Лиссабон на 4 дня для двоих. Любим керамику, морепродукты и нетуристические смотровые площадки. Бюджет 500 евро.';
const ROME_PROMPT = 'Хочу в Рим на 7 дней, интересует история и нетуристические рестораны.';

/**
 * TripsSeedService populates initial trip data when empty.
 */
@Injectable()
export class TripsSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(TripsSeedService.name);

  constructor(
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    const hasLisbonTrip = await this.tripRepository.exist({ where: { originalPrompt: LISBON_PROMPT } });
    if (hasLisbonTrip) {
      return;
    }
    const seeds = this.tripRepository.create(this.buildTripsSeed());
    await this.tripRepository.save(seeds);
    this.logger.log('Seeded default trips data.');
  }

  private buildTripsSeed(): DeepPartial<TripEntity>[] {
    const lisbonTrip: DeepPartial<TripEntity> = {
      title: 'Lisbon escape for four days',
      status: TripStatus.Completed,
      originalPrompt: LISBON_PROMPT,
      createdAt: new Date('2025-09-10T12:00:00Z'),
      days: [
        this.buildDay(1, 'Exploring Alfama', [
          this.buildLocation('Castelo de S. Jorge', 'Enjoy panoramic views over Lisbon to start the journey.', '10:00 - 12:00', 38.7139, -9.1335),
          this.buildLocation("Restaurante 'Pateo 13'", 'Taste authentic seafood recommended by locals.', '13:00 - 14:30', 38.7115, -9.1301),
        ]),
      ],
    };

    const romeTrip: DeepPartial<TripEntity> = {
      title: 'Roman holiday week overview',
      status: TripStatus.Processing,
      originalPrompt: ROME_PROMPT,
      createdAt: new Date('2025-09-11T15:30:00Z'),
      days: [],
    };

    return [lisbonTrip, romeTrip];
  }

  private buildDay(day: number, title: string, locations: DeepPartial<TripPlanLocationEntity>[]): DeepPartial<TripPlanDayEntity> {
    return {
      day,
      title,
      locations,
    };
  }

  private buildLocation(name: string, description: string, time: string, latitude: number, longitude: number): DeepPartial<TripPlanLocationEntity> {
    return {
      name,
      description,
      time,
      latitude,
      longitude,
    };
  }
}
