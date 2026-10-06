import { ApiProperty } from '@nestjs/swagger';
import {
  CarClass,
  CarStatus,
  FuelType,
  Transmission,
} from '@prisma/car-client';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateCarDto {
  @ApiProperty()
  @IsString()
  locationId!: string;

  @ApiProperty()
  @IsString()
  brand!: string;

  @ApiProperty()
  @IsString()
  model!: string;

  @ApiProperty({ enum: CarClass })
  @IsEnum(CarClass)
  class!: CarClass;

  @ApiProperty()
  @IsInt()
  @Min(1990)
  year!: number;

  @ApiProperty({ enum: Transmission })
  @IsEnum(Transmission)
  transmission!: Transmission;

  @ApiProperty()
  @IsInt()
  @Min(1)
  seats!: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  horsepower?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  engineVolume?: number;

  @ApiProperty({ enum: FuelType })
  @IsEnum(FuelType)
  fuelType!: FuelType;

  @ApiProperty()
  @IsString()
  color!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  trunkVolume?: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  pricePerDay!: number;

  @ApiProperty({ enum: CarStatus, required: false })
  @IsOptional()
  @IsEnum(CarStatus)
  status?: CarStatus;

  @ApiProperty()
  @IsString()
  vin!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  mileage?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  purchasePrice?: number;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photoUrls?: string[];
}
