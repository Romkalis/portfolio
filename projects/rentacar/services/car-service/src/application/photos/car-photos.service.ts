import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { notDeleted } from '@rentacar/prisma';
import { AuditService } from '../../infrastructure/audit/audit.service';
import { MinioStorageService } from '../../infrastructure/storage/minio-storage.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp']);

@Injectable()
export class CarPhotosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: MinioStorageService,
    private readonly audit: AuditService,
  ) {}

  async list(carId: string) {
    await this.assertCarExists(carId);
    return this.prisma.carPhoto.findMany({
      where: { carId },
      orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
    });
  }

  async upload(
    carId: string,
    file: Express.Multer.File | undefined,
    changedBy?: string,
  ) {
    if (!file?.buffer?.length) {
      throw new BadRequestException('File is required');
    }
    if (!ALLOWED_MIME.has(file.mimetype)) {
      throw new BadRequestException('Only JPEG, PNG, and WebP images are allowed');
    }

    await this.assertCarExists(carId);

    const { storageKey, url } = await this.storage.uploadCarPhoto(carId, {
      buffer: file.buffer,
      mimetype: file.mimetype,
      originalname: file.originalname,
    });

    const count = await this.prisma.carPhoto.count({ where: { carId } });

    const photo = await this.prisma.carPhoto.create({
      data: {
        carId,
        url,
        storageKey,
        mimeType: file.mimetype,
        fileName: file.originalname,
        sortOrder: count,
        isPrimary: count === 0,
      },
    });

    await this.audit.log({
      entity: 'CarPhoto',
      entityId: photo.id,
      action: 'CREATE',
      newValue: { carId, url },
      changedBy,
    });

    return photo;
  }

  async remove(carId: string, photoId: string, changedBy?: string) {
    const photo = await this.findPhoto(carId, photoId);

    await this.storage.deleteObject(photo.storageKey ?? '');
    await this.prisma.carPhoto.delete({ where: { id: photoId } });

    if (photo.isPrimary) {
      const next = await this.prisma.carPhoto.findFirst({
        where: { carId },
        orderBy: { sortOrder: 'asc' },
      });
      if (next) {
        await this.prisma.carPhoto.update({
          where: { id: next.id },
          data: { isPrimary: true },
        });
      }
    }

    await this.audit.log({
      entity: 'CarPhoto',
      entityId: photoId,
      action: 'DELETE',
      oldValue: { carId, url: photo.url },
      changedBy,
    });

    return { deleted: true };
  }

  async setPrimary(carId: string, photoId: string, changedBy?: string) {
    await this.findPhoto(carId, photoId);

    await this.prisma.$transaction([
      this.prisma.carPhoto.updateMany({
        where: { carId },
        data: { isPrimary: false },
      }),
      this.prisma.carPhoto.update({
        where: { id: photoId },
        data: { isPrimary: true },
      }),
    ]);

    await this.audit.log({
      entity: 'CarPhoto',
      entityId: photoId,
      action: 'SET_PRIMARY',
      newValue: { carId },
      changedBy,
    });

    return this.list(carId);
  }

  private async findPhoto(carId: string, photoId: string) {
    const photo = await this.prisma.carPhoto.findFirst({
      where: { id: photoId, carId },
    });
    if (!photo) throw new NotFoundException('Photo not found');
    return photo;
  }

  private async assertCarExists(carId: string) {
    const car = await this.prisma.car.findFirst({
      where: { id: carId, ...notDeleted() },
    });
    if (!car) throw new NotFoundException('Car not found');
  }
}
