import { Injectable, Logger } from '@nestjs/common';

type PlatformSettingsResponse = {
  cleaningBufferHours: number;
};

@Injectable()
export class PlatformSettingsClient {
  private readonly logger = new Logger(PlatformSettingsClient.name);
  private cache: { hours: number; expiresAt: number } | null = null;

  private get settingsUrl() {
    return process.env.SETTINGS_SERVICE_URL ?? 'http://localhost:3011';
  }

  async getCleaningBufferHours(): Promise<number | null> {
    if (this.cache && Date.now() < this.cache.expiresAt) {
      return this.cache.hours;
    }

    try {
      const response = await fetch(`${this.settingsUrl}/api/v1/settings/platform`);
      if (!response.ok) return null;

      const data = (await response.json()) as PlatformSettingsResponse;
      if (typeof data.cleaningBufferHours !== 'number') return null;

      this.cache = { hours: data.cleaningBufferHours, expiresAt: Date.now() + 60_000 };
      return data.cleaningBufferHours;
    } catch (error) {
      this.logger.debug(`Settings service unavailable: ${String(error)}`);
      return null;
    }
  }
}
