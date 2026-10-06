import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createHash, randomBytes } from 'crypto';

@Injectable()
export class SessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(input: {
    userId: string;
    userAgent?: string;
    ipAddress?: string;
    refreshExpiresAt: Date;
  }) {
    const session = await this.prisma.session.create({
      data: {
        userId: input.userId,
        userAgent: input.userAgent,
        ipAddress: input.ipAddress,
        expiresAt: input.refreshExpiresAt,
      },
    });

    const rawRefresh = randomBytes(48).toString('hex');
    const tokenHash = this.hashToken(rawRefresh);

    await this.prisma.refreshToken.create({
      data: {
        userId: input.userId,
        sessionId: session.id,
        tokenHash,
        expiresAt: input.refreshExpiresAt,
      },
    });

    return { session, rawRefresh };
  }

  async findValidRefreshToken(rawToken: string) {
    const tokenHash = this.hashToken(rawToken);
    return this.prisma.refreshToken.findFirst({
      where: {
        tokenHash,
        revokedAt: null,
        expiresAt: { gt: new Date() },
        session: { revokedAt: null },
      },
      include: { session: true, user: { include: { permissions: true } } },
    });
  }

  async revokeSession(sessionId: string) {
    const now = new Date();
    await this.prisma.session.update({
      where: { id: sessionId },
      data: { revokedAt: now },
    });
    await this.prisma.refreshToken.updateMany({
      where: { sessionId },
      data: { revokedAt: now },
    });
  }

  hashToken(raw: string) {
    return createHash('sha256').update(raw).digest('hex');
  }
}
