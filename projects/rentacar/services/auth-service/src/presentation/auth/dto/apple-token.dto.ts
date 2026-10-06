import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class AppleTokenDto {
  @ApiProperty({ description: 'Identity token from Sign in with Apple (iOS / web)' })
  @IsString()
  @MinLength(10)
  idToken!: string;

  @ApiPropertyOptional({ description: 'Only provided on first Apple authorization' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastName?: string;
}
