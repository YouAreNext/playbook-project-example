import { DataSource } from 'typeorm';
import { buildDatabaseConfig } from './database.config';

/**
 * PostgresDataSource exposes the TypeORM data source for CLI operations.
 */
export const PostgresDataSource = new DataSource(buildDatabaseConfig());
