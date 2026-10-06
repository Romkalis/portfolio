import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CalculatePriceDto {
  @ApiProperty()
  @IsString()
  carId!: string;

  @ApiProperty()
  @IsDateString()
  startAt!: string;

  @ApiProperty()
  @IsDateString()
  endAt!: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  basePricePerDay!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  optionsTotal?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  customerBookingCount?: number;
}
