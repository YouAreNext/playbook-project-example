import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TripPlanDayEntity } from './trip-plan-day.entity';

/**
 * TripPlanLocationEntity captures an individual itinerary location.
 */
@Entity({ name: 'trip_locations' })
export class TripPlanLocationEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'location_id' })
  declare locationId: string;

  @Column({ type: 'varchar', length: 160 })
  declare name: string;

  @Column({ type: 'text' })
  declare description: string;

  @Column({ type: 'varchar', length: 32, name: 'time_slot' })
  declare time: string;

  @Column({ type: 'double precision', name: 'latitude' })
  declare latitude: number;

  @Column({ type: 'double precision', name: 'longitude' })
  declare longitude: number;

  @ManyToOne(() => TripPlanDayEntity, (day) => day.locations, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'day_id', referencedColumnName: 'dayId' })
  declare day: TripPlanDayEntity;
}
