import { Global, Module } from '@nestjs/common';
import { SearchConfigService } from './search-config.service';

@Global()
@Module({ providers: [SearchConfigService], exports: [SearchConfigService] })
export class SearchConfigModule {}
