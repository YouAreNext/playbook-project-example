import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

/**
 * CoreModule aggregates foundational providers such as database connectivity.
 */
@Module({
  imports: [DatabaseModule],
})
export class CoreModule {}
