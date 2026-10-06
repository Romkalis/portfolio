import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '../../application/auth/auth.service';
import { OAuthService } from '../../application/auth/oauth.service';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository.interface';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { SessionRepository } from '../../infrastructure/repositories/session.repository';
import { AuditService } from '../../infrastructure/audit/audit.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { AppleStrategy } from './strategies/apple.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    OAuthService,
    SessionRepository,
    AuditService,
    JwtStrategy,
    GoogleStrategy,
    AppleStrategy,
    { provide: USER_REPOSITORY, useClass: UserRepository },
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
