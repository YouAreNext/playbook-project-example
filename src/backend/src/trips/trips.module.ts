import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripPlanDayEntity } from './entities/trip-plan-day.entity';
import { TripPlanLocationEntity } from './entities/trip-plan-location.entity';
import { TripEntity } from './entities/trip.entity';
import { TripsController } from './controllers/trips/trips.controller';
import { TripsService } from './services/trips/trips.service';
import { TripsSeedService } from './services/trips/trips.seed.service';

/**
 * TripsModule bundles the trip domain controllers and services.
 */
@Module({
  imports: [TypeOrmModule.forFeature([TripEntity, TripPlanDayEntity, TripPlanLocationEntity])],
  controllers: [TripsController],
  providers: [TripsService, TripsSeedService],
})
export class TripsModule {}
