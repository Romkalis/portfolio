import type {Metadata} from "next";
import {LanguageProvider} from "@/context/LanguageContext";
import Header from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Роман Бондарчук — Front-end Developer",
  description:
    "Портфолио frontend-разработчика: React, Next.js, TypeScript и примеры проектов.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
