import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Inject } from '@nestjs/common';
import { JwtPayload } from '@rentacar/shared-types';
import { IUserRepository, USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(@Inject(USER_REPOSITORY) private readonly users: IUserRepository) {}

  @Get('me')
  @ApiOperation({ summary: 'Current user profile' })
  async me(@CurrentUser() jwt: JwtPayload) {
    const user = await this.users.findById(jwt.sub);
    if (!user) return null;
    const { passwordHash: _, ...safe } = user;
    return safe;
  }
}
