import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '@rentacar/shared-types';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload =>
    ctx.switchToHttp().getRequest<{ user: JwtPayload }>().user,
);
