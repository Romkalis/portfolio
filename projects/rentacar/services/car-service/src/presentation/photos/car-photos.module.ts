import { Module } from '@nestjs/common';
import { CarPhotosService } from '../../application/photos/car-photos.service';
import { CarPhotosController } from './car-photos.controller';

@Module({
  controllers: [CarPhotosController],
  providers: [CarPhotosService],
})
export class CarPhotosModule {}
