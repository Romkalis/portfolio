import { Global, Module } from '@nestjs/common';
import { CarConfigService } from './car-config.service';

@Global()
@Module({
  providers: [CarConfigService],
  exports: [CarConfigService],
})
export class CarConfigModule {}
