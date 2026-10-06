import { Injectable, Logger, OnModuleInit, ServiceUnavailableException } from '@nestjs/common';
import * as Minio from 'minio';
import { CarConfigService } from '../../config/car-config.service';

@Injectable()
export class MinioStorageService implements OnModuleInit {
  private readonly logger = new Logger(MinioStorageService.name);
  private client: Minio.Client | null = null;

  constructor(private readonly config: CarConfigService) {}

  get enabled() {
    return this.config.env.STORAGE_ENABLED;
  }

  async onModuleInit() {
    if (!this.enabled) {
      this.logger.warn('Object storage disabled (STORAGE_ENABLED=false)');
      return;
    }

    this.client = new Minio.Client({
      endPoint: this.config.env.MINIO_ENDPOINT,
      port: this.config.env.MINIO_PORT,
      useSSL: this.config.env.MINIO_USE_SSL,
      accessKey: this.config.env.MINIO_ACCESS_KEY,
      secretKey: this.config.env.MINIO_SECRET_KEY,
    });

    try {
      const exists = await this.client.bucketExists(this.config.env.MINIO_BUCKET);
      if (!exists) {
        await this.client.makeBucket(this.config.env.MINIO_BUCKET, 'us-east-1');
        this.logger.log(`Created bucket ${this.config.env.MINIO_BUCKET}`);
      }
    } catch (error) {
      this.logger.warn(`MinIO init failed: ${String(error)}`);
      this.client = null;
    }
  }

  async uploadCarPhoto(
    carId: string,
    file: { buffer: Buffer; mimetype: string; originalname: string },
  ) {
    this.assertReady();

    const ext = file.originalname.split('.').pop()?.toLowerCase() ?? 'jpg';
    const storageKey = `cars/${carId}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

    await this.client!.putObject(
      this.config.env.MINIO_BUCKET,
      storageKey,
      file.buffer,
      file.buffer.length,
      { 'Content-Type': file.mimetype },
    );

    return {
      storageKey,
      url: this.getPublicUrl(storageKey),
    };
  }

  async deleteObject(storageKey: string) {
    if (!this.client || !storageKey) return;
    await this.client.removeObject(this.config.env.MINIO_BUCKET, storageKey).catch(() => undefined);
  }

  getPublicUrl(storageKey: string) {
    const base = this.config.env.MINIO_PUBLIC_URL.replace(/\/$/, '');
    return `${base}/${storageKey}`;
  }

  private assertReady() {
    if (!this.enabled || !this.client) {
      throw new ServiceUnavailableException(
        'Object storage is not available. Start MinIO or set STORAGE_ENABLED=false only for read-only mode.',
      );
    }
  }
}
