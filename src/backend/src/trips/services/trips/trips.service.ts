import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TripPlanDayEntity } from '../../entities/trip-plan-day.entity.js';
import { TripPlanLocationEntity } from '../../entities/trip-plan-location.entity.js';
import { TripEntity } from '../../entities/trip.entity.js';
import { CreateTripDto } from '../../models/dto/create-trip.dto.js';
import { ListTripsQueryDto } from '../../models/dto/list-trips-query.dto.js';
import { TripStatus } from '../../models/trip-status.enum.js';
import { TripCreationView } from '../../models/view/trip-creation.view.js';
import { TripDetailView, TripDayView, TripLocationView } from '../../models/view/trip-detail.view.js';
import { TripListView } from '../../models/view/trip-list.view.js';
import { TripSummaryView } from '../../models/view/trip-summary.view.js';

/**
 * TripsService orchestrates access to trip data.
 */
@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(TripEntity)
    private readonly tripRepository: Repository<TripEntity>,
  ) {}

  async listTrips(query: ListTripsQueryDto): Promise<TripListView> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;
    const [trips, total] = await this.tripRepository.findAndCount({ order: { createdAt: 'DESC' }, skip, take: limit });
    return new TripListView({
      page,
      limit,
      total,
      items: trips.map((trip) => this.mapTripToSummary(trip)),
    });
  }

  async findTrip(tripId: string): Promise<TripDetailView> {
    const trip = await this.tripRepository.findOne({ where: { tripId }, relations: { days: { locations: true } } });
    if (!trip) {
      throw new NotFoundException('Trip not found.');
    }
    return this.mapTripToDetail(trip);
  }

  async createTrip(dto: CreateTripDto): Promise<TripCreationView> {
    const trip = this.tripRepository.create({ title: this.buildProcessingTitle(dto.prompt), status: TripStatus.Processing, originalPrompt: dto.prompt });
    const savedTrip = await this.tripRepository.save(trip);
    return new TripCreationView({
      tripId: savedTrip.tripId,
      status: TripStatus.Processing,
      message: 'Your trip generation has been queued.',
    });
  }

  getAdminSmokeTest(): string {
    return 'Trips service ready';
  }

  private buildProcessingTitle(prompt: string): string {
    const normalizedPrompt = prompt.trim();
    if (normalizedPrompt.length <= 45) {
      return normalizedPrompt;
    }
    return normalizedPrompt.slice(0, 42).concat('...');
  }

  private mapTripToSummary(trip: TripEntity): TripSummaryView {
    return new TripSummaryView({
      tripId: trip.tripId,
      title: trip.title,
      status: trip.status,
      createdAt: trip.createdAt.toISOString(),
    });
  }

  private mapTripToDetail(trip: TripEntity): TripDetailView {
    const sortedDays = [...(trip.days ?? [])].sort((a, b) => a.day - b.day);
    return new TripDetailView({
      tripId: trip.tripId,
      status: trip.status,
      originalPrompt: trip.originalPrompt,
      createdAt: trip.createdAt.toISOString(),
      plan: sortedDays.length > 0 ? sortedDays.map((day) => this.mapDayToView(day)) : undefined,
    });
  }

  private mapDayToView(day: TripPlanDayEntity): TripDayView {
    const sortedLocations = [...(day.locations ?? [])].sort((a, b) => a.time.localeCompare(b.time));
    return new TripDayView({
      day: day.day,
      title: day.title,
      locations: sortedLocations.map((location) => this.mapLocationToView(location)),
    });
  }

  private mapLocationToView(location: TripPlanLocationEntity): TripLocationView {
    return new TripLocationView({
      name: location.name,
      description: location.description,
      time: location.time,
      coordinates: {
        lat: location.latitude,
        lng: location.longitude,
      },
    });
  }
}
