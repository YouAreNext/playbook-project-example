import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TripStatus } from '../models/trip-status.enum';
import { TripPlanDayEntity } from './trip-plan-day.entity';

/**
 * TripEntity models the persisted state of a trip.
 */
@Entity({ name: 'trips' })
export class TripEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'trip_id' })
  declare tripId: string;

  @Column({ type: 'varchar', length: 160 })
  declare title: string;

  @Column({ type: 'varchar', length: 20 })
  declare status: TripStatus;

  @Column({ type: 'text', name: 'original_prompt' })
  declare originalPrompt: string;

  @CreateDateColumn({ name: 'created_at' })
  declare createdAt: Date;

  @OneToMany(() => TripPlanDayEntity, (day) => day.trip, { cascade: true })
  declare days: TripPlanDayEntity[];
}
