import { ApiProperty } from '@nestjs/swagger';
import { TripSummaryView } from './trip-summary.view.js';

/**
 * TripListView contains paginated trips metadata.
 */
export class TripListView {
  @ApiProperty({ description: 'Requested page number.', example: 1 })
  readonly page: number;

  @ApiProperty({ description: 'Items per page.', example: 10 })
  readonly limit: number;

  @ApiProperty({ description: 'Total number of trips available.', example: 2 })
  readonly total: number;

  @ApiProperty({ description: 'Trips on the current page.', type: [TripSummaryView] })
  readonly items: TripSummaryView[];

  constructor(params: { page: number; limit: number; total: number; items: TripSummaryView[] }) {
    this.page = params.page;
    this.limit = params.limit;
    this.total = params.total;
    this.items = params.items;
  }
}
