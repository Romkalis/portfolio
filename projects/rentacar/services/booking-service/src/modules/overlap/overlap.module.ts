import { Global, Module } from '@nestjs/common';
import { OverlapService } from './overlap.service';

@Global()
@Module({
  providers: [OverlapService],
  exports: [OverlapService],
})
export class OverlapModule {}
