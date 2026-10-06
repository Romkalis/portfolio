export interface TimeRange {
  startAt: Date;
  endAt: Date;
}

export interface OverlapConflict {
  type: 'booking' | 'block';
  id: string;
  startAt: Date;
  endAt: Date;
  reason?: string;
}

export interface OverlapCheckResult {
  isAvailable: boolean;
  conflicts: OverlapConflict[];
}
