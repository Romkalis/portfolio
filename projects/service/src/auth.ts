import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/shared/lib/validators";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      login: string;
      role: "ADMIN";
    };
  }
  interface User {
    role: "ADMIN";
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        login: { label: "Логин", type: "text" },
        password: { label: "Пароль", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { assertProductionSecrets, safeStringEqual } = await import(
          "@/shared/lib/security"
        );
        if (process.env.NODE_ENV === "production") assertProductionSecrets();

        const adminLogin = process.env.ADMIN_LOGIN ?? "admin";
        const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

        const loginOk = safeStringEqual(parsed.data.login, adminLogin);
        const passwordOk = safeStringEqual(parsed.data.password, adminPassword);

        if (loginOk && passwordOk) {
          return {
            id: "admin",
            name: "Администратор",
            email: adminLogin,
            role: "ADMIN" as const,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.login = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = "ADMIN";
        session.user.login = (token.login as string) ?? "admin";
      }
      return session;
    },
  },
});
