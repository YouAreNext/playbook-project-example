import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { buildDatabaseConfig } from './database.config';

/**
 * DatabaseModule wires Postgres access through TypeORM.
 */
@Module({
  imports: [TypeOrmModule.forRootAsync({ useFactory: () => buildDatabaseConfig() })],
})
export class DatabaseModule {}
