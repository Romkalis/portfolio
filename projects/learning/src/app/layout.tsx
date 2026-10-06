import type { Metadata } from "next";
import { SiteHeader } from "@/components/Layout/SiteHeader";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "RKLiss Learning — учебник fullstack с нуля",
  description:
    "Курс на русском: JavaScript, TypeScript, React, Next.js, Prisma, Docker, Zod — до уровня CRM-проекта",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
