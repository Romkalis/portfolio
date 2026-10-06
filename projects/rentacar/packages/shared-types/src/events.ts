export enum DomainEventType {
  BOOKING_CREATED = 'BOOKING_CREATED',
  BOOKING_CANCELLED = 'BOOKING_CANCELLED',
  BOOKING_COMPLETED = 'BOOKING_COMPLETED',
  PAYMENT_COMPLETED = 'PAYMENT_COMPLETED',
  MAINTENANCE_CREATED = 'MAINTENANCE_CREATED',
  CAR_STATUS_CHANGED = 'CAR_STATUS_CHANGED',
}

export interface DomainEvent<TPayload = Record<string, unknown>> {
  id: string;
  type: DomainEventType;
  aggregateId: string;
  aggregateType: string;
  payload: TPayload;
  occurredAt: string;
  version: number;
  correlationId?: string;
}
