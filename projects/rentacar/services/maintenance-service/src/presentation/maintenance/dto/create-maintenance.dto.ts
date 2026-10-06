import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateMaintenanceDto {
  @ApiProperty()
  @IsString()
  carId!: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  mileage!: number;

  @ApiProperty()
  @IsDateString()
  performedAt!: string;

  @ApiProperty()
  @IsString()
  works!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  recommendations?: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  cost!: number;
}
