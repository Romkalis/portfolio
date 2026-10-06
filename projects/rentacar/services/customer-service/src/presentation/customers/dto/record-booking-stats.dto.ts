import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

export class RecordBookingStatsDto {
  @ApiProperty({ enum: ['completed', 'cancelled'] })
  @IsEnum(['completed', 'cancelled'] as const)
  outcome!: 'completed' | 'cancelled';

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0)
  amount?: number;
}
