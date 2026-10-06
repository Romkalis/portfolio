import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { OAuthProvider, UserRole, Permission } from '@prisma/client';
import { OAuthProfileInput } from '../../domain/repositories/user.repository.interface';
import { JwtPayload, ROLE_PERMISSIONS, UserRole as SharedRole } from '@rentacar/shared-types';
import { AuthConfigService } from '../../config/auth-config.service';
import { USER_REPOSITORY, IUserRepository } from '../../domain/repositories/user.repository.interface';
import { SessionRepository } from '../../infrastructure/repositories/session.repository';
import { AuditService } from '../../infrastructure/audit/audit.service';
import { RegisterDto } from '../../presentation/auth/dto/register.dto';
import { LoginDto } from '../../presentation/auth/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: IUserRepository,
    private readonly sessions: SessionRepository,
    private readonly jwt: JwtService,
    private readonly config: AuthConfigService,
    private readonly audit: AuditService,
  ) {}

  async register(dto: RegisterDto, meta?: { userAgent?: string; ip?: string }) {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.users.create({
      email: dto.email,
      passwordHash,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: UserRole.CLIENT,
    });

    await this.audit.log({
      entity: 'User',
      entityId: user.id,
      action: 'REGISTER',
      newValue: { email: user.email, role: user.role },
      changedBy: user.id,
    });

    return this.issueTokens(user, meta);
  }

  async login(dto: LoginDto, meta?: { userAgent?: string; ip?: string }) {
    const user = await this.users.findByEmail(dto.email);
    if (!user?.passwordHash || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokens(user, meta);
  }

  async loginWithOAuth(
    profile: OAuthProfileInput,
    auditPrefix: 'GOOGLE' | 'APPLE',
    meta?: { userAgent?: string; ip?: string },
  ) {
    let user = await this.users.findByOAuth(profile.provider, profile.providerUserId);
    let isNew = false;

    if (!user && profile.email) {
      user = await this.users.findByEmail(profile.email);
    }

    if (!user) {
      const email = profile.email ?? this.buildOAuthPlaceholderEmail(profile);
      user = await this.users.create({
        email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        role: UserRole.CLIENT,
      });
      isNew = true;
    }

    await this.users.linkOAuthAccount(
      user.id,
      profile.provider,
      profile.providerUserId,
      profile.email,
    );

    await this.audit.log({
      entity: 'User',
      entityId: user.id,
      action: isNew ? `${auditPrefix}_REGISTER` : `${auditPrefix}_LOGIN`,
      newValue: {
        email: user.email,
        role: user.role,
        provider: profile.provider,
      },
      changedBy: user.id,
    });

    return this.issueTokens(user, meta);
  }

  private buildOAuthPlaceholderEmail(profile: OAuthProfileInput) {
    const prefix = profile.provider === OAuthProvider.APPLE ? 'apple' : 'oauth';
    return `${prefix}+${profile.providerUserId}@oauth.rentacar.local`;
  }

  async refresh(rawRefreshToken: string, meta?: { userAgent?: string; ip?: string }) {
    const record = await this.sessions.findValidRefreshToken(rawRefreshToken);
    if (!record) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.sessions.revokeSession(record.sessionId);
    return this.issueTokens(record.user, meta);
  }

  async logout(sessionId: string) {
    await this.sessions.revokeSession(sessionId);
    return { success: true };
  }

  private async issueTokens(
    user: {
      id: string;
      email: string;
      role: UserRole;
      permissions: { permission: Permission }[];
    },
    meta?: { userAgent?: string; ip?: string },
  ) {
    const refreshExpiresAt = this.parseExpiry(this.config.jwtRefreshExpiresIn);
    const { session, rawRefresh } = await this.sessions.createSession({
      userId: user.id,
      userAgent: meta?.userAgent,
      ipAddress: meta?.ip,
      refreshExpiresAt,
    });

    const permissions = this.resolvePermissions(user.role, user.permissions);
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role as unknown as SharedRole,
      permissions: permissions as JwtPayload['permissions'],
      sessionId: session.id,
    };

    const accessToken = await this.jwt.signAsync(
      { ...payload },
      {
        secret: this.config.jwtAccessSecret,
        expiresIn: this.config.jwtAccessExpiresIn as `${number}${'s' | 'm' | 'h' | 'd'}`,
      },
    );

    return {
      accessToken,
      refreshToken: rawRefresh,
      expiresIn: this.parseExpiryMs(this.config.jwtAccessExpiresIn),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        permissions,
      },
    };
  }

  private resolvePermissions(
    role: UserRole,
    explicit: { permission: Permission }[],
  ): string[] {
    const fromDb = explicit.map((p) => p.permission);
    if (fromDb.length > 0) return fromDb;
    return ROLE_PERMISSIONS[role as unknown as SharedRole] ?? [];
  }

  private parseExpiry(exp: string): Date {
    const ms = this.parseExpiryMs(exp);
    return new Date(Date.now() + ms);
  }

  private parseExpiryMs(exp: string): number {
    const match = /^(\d+)([smhd])$/.exec(exp);
    if (!match) return 15 * 60 * 1000;
    const value = Number(match[1]);
    const unit = match[2] as 's' | 'm' | 'h' | 'd';
    const multipliers: Record<'s' | 'm' | 'h' | 'd', number> = {
      s: 1000,
      m: 60_000,
      h: 3_600_000,
      d: 86_400_000,
    };
    return value * multipliers[unit];
  }
}
