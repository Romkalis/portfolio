import { Injectable } from '@nestjs/common';

@Injectable()
export class OverlapService {
  hasOverlap(
    aStart: Date,
    aEnd: Date,
    bStart: Date,
    bEnd: Date,
    bufferHours = 0,
  ): boolean {
    const bufferMs = bufferHours * 60 * 60 * 1000;
    const start = new Date(aStart.getTime() - bufferMs);
    const end = new Date(aEnd.getTime() + bufferMs);
    return start < bEnd && end > bStart;
  }
}
