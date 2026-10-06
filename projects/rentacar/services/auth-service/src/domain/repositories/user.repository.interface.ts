import { OAuthProvider, Permission, User, UserRole } from '@prisma/client';

export interface CreateUserInput {
  email: string;
  passwordHash?: string;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  permissions?: Permission[];
}

export interface UserWithPermissions extends User {
  permissions: { permission: Permission }[];
}

export interface OAuthProfileInput {
  provider: OAuthProvider;
  providerUserId: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<UserWithPermissions | null>;
  findById(id: string): Promise<UserWithPermissions | null>;
  findByOAuth(
    provider: OAuthProvider,
    providerUserId: string,
  ): Promise<UserWithPermissions | null>;
  create(data: CreateUserInput): Promise<UserWithPermissions>;
  linkOAuthAccount(
    userId: string,
    provider: OAuthProvider,
    providerUserId: string,
    email?: string,
  ): Promise<void>;
  softDelete(id: string): Promise<User>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
