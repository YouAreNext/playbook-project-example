import { ApiProperty } from '@nestjs/swagger';
import { TripStatus } from '../trip-status.enum.js';

/**
 * TripLocationView represents a location inside a trip itinerary.
 */
export class TripLocationView {
  @ApiProperty({ description: 'Location name.', example: 'Castelo de S. Jorge' })
  readonly name: string;

  @ApiProperty({ description: 'Short description of the location.', example: 'Enjoy panoramic views over Lisbon to start the journey.' })
  readonly description: string;

  @ApiProperty({ description: 'Allocated time slot.', example: '10:00 - 12:00' })
  readonly time: string;

  @ApiProperty({ description: 'Geographical coordinates.', example: { lat: 38.7139, lng: -9.1335 } })
  readonly coordinates: { lat: number; lng: number };

  constructor(params: { name: string; description: string; time: string; coordinates: { lat: number; lng: number } }) {
    this.name = params.name;
    this.description = params.description;
    this.time = params.time;
    this.coordinates = params.coordinates;
  }
}

/**
 * TripDayView represents a single day of an itinerary.
 */
export class TripDayView {
  @ApiProperty({ description: 'Day number in the itinerary.', example: 1 })
  readonly day: number;

  @ApiProperty({ description: 'Headline describing the day.', example: 'Exploring Alfama' })
  readonly title: string;

  @ApiProperty({ description: 'List of scheduled locations.', type: [TripLocationView] })
  readonly locations: TripLocationView[];

  constructor(params: { day: number; title: string; locations: TripLocationView[] }) {
    this.day = params.day;
    this.title = params.title;
    this.locations = params.locations;
  }
}

/**
 * TripDetailView describes the detailed state of a trip.
 */
export class TripDetailView {
  @ApiProperty({ description: 'Unique trip identifier.', format: 'uuid' })
  readonly tripId: string;

  @ApiProperty({ enum: TripStatus, description: 'Lifecycle status of the trip.' })
  readonly status: TripStatus;

  @ApiProperty({ description: 'Original user prompt submitted for this trip.' })
  readonly originalPrompt: string;

  @ApiProperty({ description: 'Creation timestamp in ISO format.', example: '2025-09-10T12:00:00Z' })
  readonly createdAt: string;

  @ApiProperty({ description: 'Detailed itinerary when available.', type: [TripDayView], required: false })
  readonly plan?: TripDayView[];

  constructor(params: { tripId: string; status: TripStatus; originalPrompt: string; createdAt: string; plan?: TripDayView[] }) {
    this.tripId = params.tripId;
    this.status = params.status;
    this.originalPrompt = params.originalPrompt;
    this.createdAt = params.createdAt;
    this.plan = params.plan;
  }
}
