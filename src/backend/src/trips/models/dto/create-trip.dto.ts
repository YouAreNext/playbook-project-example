import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

/**
 * CreateTripDto defines payload requirements for trip generation requests.
 */
export class CreateTripDto {
  @ApiProperty({ description: 'Text prompt describing desired trip.', maxLength: 1000, example: 'Family trip to Barcelona for five days.' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  prompt: string;
}
