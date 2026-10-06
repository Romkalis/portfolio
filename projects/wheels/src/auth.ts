import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/shared/lib/prisma";
import { loginSchema } from "@/shared/lib/validators";
import { safePasswordCompare } from "@/shared/lib/security";
import { rateLimitAction } from "@/shared/lib/auth-server";
import type { Role } from "@prisma/client";

const SESSION_MAX_AGE = 8 * 60 * 60; // 8 часов
const BCRYPT_ROUNDS = 12;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: Role;
      employeeProfileId?: string;
    };
  }
  interface User {
    role: Role;
    employeeProfileId?: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: SESSION_MAX_AGE },
  cookies: {
    sessionToken: {
      options: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      },
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const limited = await rateLimitAction("login", 15);
        if (limited.error) return null;

        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email.toLowerCase() },
          include: { profile: true },
        });

        const valid = await safePasswordCompare(
          parsed.data.password,
          user?.passwordHash,
          bcrypt.compare,
        );
        if (!user || !valid) return null;
        if (user.profile && !user.profile.isActive) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          employeeProfileId: user.profile?.id,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
        token.employeeProfileId = user.employeeProfileId;
        token.email = user.email ?? undefined;
        token.name = user.name ?? undefined;
      }
      return token;
    },
    // Без Prisma: middleware/auth() выполняются в Edge, Prisma там недоступен.
    async session({ session, token }) {
      if (!session.user || !token.sub) return session;

      session.user.id = token.sub;
      session.user.email = (token.email as string) ?? session.user.email ?? "";
      session.user.name = (token.name as string) ?? session.user.name ?? "";
      session.user.role = (token.role as Role) ?? "EMPLOYEE";
      session.user.employeeProfileId = token.employeeProfileId as string | undefined;

      return session;
    },
  },
});

export { BCRYPT_ROUNDS };
