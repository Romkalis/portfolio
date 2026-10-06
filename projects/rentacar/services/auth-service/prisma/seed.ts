import { PrismaClient, UserRole, Permission } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('admin', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.admin' },
    update: {},
    create: {
      email: 'admin@admin.admin',
      passwordHash,
      firstName: 'System',
      lastName: 'Admin',
      role: UserRole.SUPER_ADMIN,
      permissions: {
        create: Object.values(Permission).map((permission) => ({ permission })),
      },
    },
  });

  console.log('Seeded admin user:', admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
