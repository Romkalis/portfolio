import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

const WEBHOOK_SECRET_HEADER = 'x-webhook-secret';

@Injectable()
export class WebhookSecretGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const expected =
      process.env.PAYMENT_WEBHOOK_SECRET ?? process.env.STRIPE_WEBHOOK_SECRET;
    if (!expected) {
      if (process.env.NODE_ENV === 'production') {
        throw new ForbiddenException('PAYMENT_WEBHOOK_SECRET is required in production');
      }
      return true;
    }

    const request = context.switchToHttp().getRequest<{ headers: Record<string, string> }>();
    const provided = request.headers[WEBHOOK_SECRET_HEADER];
    if (!provided || provided !== expected) {
      throw new UnauthorizedException('Invalid webhook secret');
    }
    return true;
  }
}
