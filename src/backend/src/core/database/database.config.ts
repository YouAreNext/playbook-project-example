import { DataSourceOptions } from 'typeorm';
import { TripPlanDayEntity } from '../../trips/entities/trip-plan-day.entity';
import { TripPlanLocationEntity } from '../../trips/entities/trip-plan-location.entity';
import { TripEntity } from '../../trips/entities/trip.entity';
import { CreateTripTables1737916800000 } from './migrations/1737916800000-create-trip-tables';

/**
 * buildDatabaseConfig assembles TypeORM configuration based on environment variables.
 */
export function buildDatabaseConfig(): DataSourceOptions {
  const host = process.env.DB_HOST ?? 'localhost';
  const port = Number(process.env.DB_PORT ?? 5438);
  const username = process.env.DB_USERNAME ?? 'localize';
  const password = process.env.DB_PASSWORD ?? 'localize';
  const database = process.env.DB_NAME ?? 'localize';
  return {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,
    synchronize: false,
    migrationsRun: false,
    entities: [TripEntity, TripPlanDayEntity, TripPlanLocationEntity],
    migrations: [CreateTripTables1737916800000],
  };
}
