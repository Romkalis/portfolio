import { Global, Module } from '@nestjs/common';
import { BookingConfigService } from './booking-config.service';

@Global()
@Module({
  providers: [BookingConfigService],
  exports: [BookingConfigService],
})
export class BookingConfigModule {}
