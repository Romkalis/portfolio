import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { SearchConfigModule } from './config/search-config.module';
import { SearchModule } from './presentation/search/search.module';
import { HealthModule } from './presentation/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({ timeout: 10_000 }),
    SearchConfigModule,
    SearchModule,
    HealthModule,
  ],
})
export class AppModule {}
