export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  MECHANIC = 'MECHANIC',
  CLIENT = 'CLIENT',
}

export enum Permission {
  CAN_MANAGE_BOOKINGS = 'can_manage_bookings',
  CAN_MANAGE_FINANCE = 'can_manage_finance',
  CAN_MANAGE_CARS = 'can_manage_cars',
  CAN_MANAGE_USERS = 'can_manage_users',
  CAN_MANAGE_MAINTENANCE = 'can_manage_maintenance',
  CAN_MANAGE_PRICING = 'can_manage_pricing',
}

/** Default permissions per role (auth-service may override in DB) */
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: Object.values(Permission),
  [UserRole.ADMIN]: [
    Permission.CAN_MANAGE_BOOKINGS,
    Permission.CAN_MANAGE_FINANCE,
    Permission.CAN_MANAGE_CARS,
    Permission.CAN_MANAGE_USERS,
    Permission.CAN_MANAGE_MAINTENANCE,
    Permission.CAN_MANAGE_PRICING,
  ],
  [UserRole.MANAGER]: [
    Permission.CAN_MANAGE_BOOKINGS,
    Permission.CAN_MANAGE_CARS,
    Permission.CAN_MANAGE_PRICING,
  ],
  [UserRole.MECHANIC]: [Permission.CAN_MANAGE_MAINTENANCE, Permission.CAN_MANAGE_CARS],
  [UserRole.CLIENT]: [],
};

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
  sessionId: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
