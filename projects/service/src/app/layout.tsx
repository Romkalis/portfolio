import type { Metadata } from "next";
import { Toaster } from "sonner";
import { SessionProvider } from "@/shared/providers/SessionProvider";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Автосервис CRM",
  description: "CRM система для автосервиса",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <SessionProvider>
          {children}
          <Toaster theme="dark" position="top-right" richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
