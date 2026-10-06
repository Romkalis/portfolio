import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

/** Generic webhook body — real Stripe/PayPal parsers come later. */
export class ProviderWebhookDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  externalId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  paymentId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: 'completed' | 'failed';

  @ApiPropertyOptional()
  @IsOptional()
  @IsObject()
  raw?: Record<string, unknown>;
}
