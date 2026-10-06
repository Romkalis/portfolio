import { Injectable } from '@nestjs/common';
import { OAuthProvider, Prisma } from '@prisma/client';
import { notDeleted } from '@rentacar/prisma';
import {
  CreateUserInput,
  IUserRepository,
  UserWithPermissions,
} from '../../domain/repositories/user.repository.interface';
import { PrismaService } from '../prisma/prisma.service';

const userInclude = {
  permissions: true,
} satisfies Prisma.UserInclude;

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserWithPermissions | null> {
    return this.prisma.user.findFirst({
      where: { email: email.toLowerCase(), ...notDeleted() },
      include: userInclude,
    });
  }

  async findById(id: string): Promise<UserWithPermissions | null> {
    return this.prisma.user.findFirst({
      where: { id, ...notDeleted() },
      include: userInclude,
    });
  }

  async findByOAuth(
    provider: OAuthProvider,
    providerUserId: string,
  ): Promise<UserWithPermissions | null> {
    const account = await this.prisma.oAuthAccount.findUnique({
      where: {
        provider_providerUserId: { provider, providerUserId },
      },
      include: { user: { include: userInclude } },
    });

    const user = account?.user;
    if (!user || user.deletedAt) return null;
    return user;
  }

  async create(data: CreateUserInput): Promise<UserWithPermissions> {
    return this.prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        passwordHash: data.passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        permissions: data.permissions?.length
          ? { create: data.permissions.map((permission) => ({ permission })) }
          : undefined,
      },
      include: userInclude,
    });
  }

  async linkOAuthAccount(
    userId: string,
    provider: OAuthProvider,
    providerUserId: string,
    email?: string,
  ) {
    await this.prisma.oAuthAccount.upsert({
      where: {
        provider_providerUserId: { provider, providerUserId },
      },
      create: { userId, provider, providerUserId, email },
      update: { userId, email },
    });
  }

  async softDelete(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date(), isArchived: true, isActive: false },
    });
  }
}
