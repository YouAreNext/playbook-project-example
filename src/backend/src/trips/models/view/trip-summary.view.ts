import { ApiProperty } from '@nestjs/swagger';
import { TripStatus } from '../trip-status.enum.js';

/**
 * TripSummaryView describes a compact trip representation for listings.
 */
export class TripSummaryView {
  @ApiProperty({ description: 'Unique trip identifier.', format: 'uuid', example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef' })
  readonly tripId: string;

  @ApiProperty({ description: 'Human readable trip title.', example: 'Lisbon escape for four days' })
  readonly title: string;

  @ApiProperty({ enum: TripStatus, description: 'Lifecycle status of the trip.' })
  readonly status: TripStatus;

  @ApiProperty({ description: 'ISO timestamp of when the trip was created.', example: '2025-09-10T12:00:00Z' })
  readonly createdAt: string;

  constructor(params: { tripId: string; title: string; status: TripStatus; createdAt: string }) {
    this.tripId = params.tripId;
    this.title = params.title;
    this.status = params.status;
    this.createdAt = params.createdAt;
  }
}
