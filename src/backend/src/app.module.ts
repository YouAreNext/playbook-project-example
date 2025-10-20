import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { TripsModule } from './trips/trips.module';

/**
 * AppModule wires the application modules together.
 */
@Module({
  imports: [CoreModule, TripsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
