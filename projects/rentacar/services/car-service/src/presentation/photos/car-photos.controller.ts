import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permission } from '@rentacar/shared-types';
import { memoryStorage } from 'multer';
import { CarPhotosService } from '../../application/photos/car-photos.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { RequirePermissions } from '../auth/decorators/permissions.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';

@ApiTags('car-photos')
@Controller({ path: 'cars/:carId/photos', version: '1' })
export class CarPhotosController {
  constructor(private readonly photos: CarPhotosService) {}

  @Get()
  @ApiOperation({ summary: 'List car photos' })
  list(@Param('carId') carId: string) {
    return this.photos.list(carId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_CARS)
  @ApiBearerAuth()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiOperation({ summary: 'Upload car photo to MinIO' })
  upload(
    @Param('carId') carId: string,
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: { sub: string },
  ) {
    return this.photos.upload(carId, file, user.sub);
  }

  @Patch(':photoId/primary')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_CARS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Set primary photo' })
  setPrimary(
    @Param('carId') carId: string,
    @Param('photoId') photoId: string,
    @CurrentUser() user: { sub: string },
  ) {
    return this.photos.setPrimary(carId, photoId, user.sub);
  }

  @Delete(':photoId')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions(Permission.CAN_MANAGE_CARS)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete car photo' })
  remove(
    @Param('carId') carId: string,
    @Param('photoId') photoId: string,
    @CurrentUser() user: { sub: string },
  ) {
    return this.photos.remove(carId, photoId, user.sub);
  }
}
