import { ApiProperty } from '@nestjs/swagger';
import { TripStatus } from '../trip-status.enum.js';

/**
 * TripCreationView describes the response after initiating a trip generation.
 */
export class TripCreationView {
  @ApiProperty({ description: 'Identifier of the queued trip.', format: 'uuid' })
  readonly tripId: string;

  @ApiProperty({ enum: TripStatus, description: 'Current status of the trip generation task.' })
  readonly status: TripStatus;

  @ApiProperty({ description: 'Human readable confirmation message.' })
  readonly message: string;

  constructor(params: { tripId: string; status: TripStatus; message: string }) {
    this.tripId = params.tripId;
    this.status = params.status;
    this.message = params.message;
  }
}
