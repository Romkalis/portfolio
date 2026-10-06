import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IncomeSource } from '@prisma/finance-client';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateIncomeDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  carId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  bookingId?: string;

  @ApiProperty({ enum: IncomeSource })
  @IsEnum(IncomeSource)
  source!: IncomeSource;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  amount!: number;

  @ApiProperty()
  @IsDateString()
  occurredAt!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
}
