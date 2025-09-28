import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TripEntity } from './trip.entity';
import { TripPlanLocationEntity } from './trip-plan-location.entity';

/**
 * TripPlanDayEntity represents the plan for a single trip day.
 */
@Entity({ name: 'trip_days' })
export class TripPlanDayEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'day_id' })
  declare dayId: string;

  @Column({ type: 'int' })
  declare day: number;

  @Column({ type: 'varchar', length: 160 })
  declare title: string;

  @ManyToOne(() => TripEntity, (trip) => trip.days, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trip_id', referencedColumnName: 'tripId' })
  declare trip: TripEntity;

  @OneToMany(() => TripPlanLocationEntity, (location) => location.day, { cascade: true })
  declare locations: TripPlanLocationEntity[];
}
