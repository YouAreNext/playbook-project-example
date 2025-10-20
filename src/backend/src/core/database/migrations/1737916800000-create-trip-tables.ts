import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

/**
 * CreateTripTables1737916800000 creates persistence tables for trips and related entities.
 */
export class CreateTripTables1737916800000 implements MigrationInterface {
  name = 'CreateTripTables1737916800000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: 'trips',
        columns: [
          {
            name: 'trip_id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '160',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'original_prompt',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'trip_days',
        columns: [
          {
            name: 'day_id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'day',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '160',
            isNullable: false,
          },
          {
            name: 'trip_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'trip_days',
      new TableIndex({ name: 'IDX_trip_days_trip_id', columnNames: ['trip_id'] }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'trip_locations',
        columns: [
          {
            name: 'location_id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '160',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: false,
          },
          {
            name: 'time_slot',
            type: 'varchar',
            length: '32',
            isNullable: false,
          },
          {
            name: 'latitude',
            type: 'double precision',
            isNullable: false,
          },
          {
            name: 'longitude',
            type: 'double precision',
            isNullable: false,
          },
          {
            name: 'day_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'trip_locations',
      new TableIndex({ name: 'IDX_trip_locations_day_id', columnNames: ['day_id'] }),
    );

    await queryRunner.createForeignKey(
      'trip_days',
      new TableForeignKey({
        name: 'FK_trip_days_trip_id',
        columnNames: ['trip_id'],
        referencedTableName: 'trips',
        referencedColumnNames: ['trip_id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'trip_locations',
      new TableForeignKey({
        name: 'FK_trip_locations_day_id',
        columnNames: ['day_id'],
        referencedTableName: 'trip_days',
        referencedColumnNames: ['day_id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('trip_locations', 'FK_trip_locations_day_id');
    await queryRunner.dropForeignKey('trip_days', 'FK_trip_days_trip_id');
    await queryRunner.dropIndex('trip_locations', 'IDX_trip_locations_day_id');
    await queryRunner.dropIndex('trip_days', 'IDX_trip_days_trip_id');
    await queryRunner.dropTable('trip_locations');
    await queryRunner.dropTable('trip_days');
    await queryRunner.dropTable('trips');
  }
}
