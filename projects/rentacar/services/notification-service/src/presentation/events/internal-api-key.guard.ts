import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { INTERNAL_API_KEY_HEADER } from '@rentacar/shared-utils';

@Injectable()
export class InternalApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const expected = process.env.INTERNAL_API_KEY;
    if (!expected) {
      if (process.env.NODE_ENV === 'production') {
        throw new ForbiddenException('INTERNAL_API_KEY is required in production');
      }
      return true;
    }

    const request = context.switchToHttp().getRequest<{ headers: Record<string, string> }>();
    const provided = request.headers[INTERNAL_API_KEY_HEADER];
    if (!provided || provided !== expected) {
      throw new UnauthorizedException('Invalid internal API key');
    }
    return true;
  }
}
