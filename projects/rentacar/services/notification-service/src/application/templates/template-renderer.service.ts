import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplateRendererService {
  render(template: string, context: Record<string, unknown>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
      const value = context[key];
      return value === undefined || value === null ? '' : String(value);
    });
  }

  buildContext(event: {
    id: string;
    type: string;
    aggregateId: string;
    aggregateType: string;
    payload: Record<string, unknown>;
    occurredAt: string;
  }) {
    return {
      eventId: event.id,
      eventType: event.type,
      aggregateId: event.aggregateId,
      aggregateType: event.aggregateType,
      occurredAt: event.occurredAt,
      ...event.payload,
    };
  }
}
