import type {Metadata} from "next";
import {Montserrat, Playfair_Display} from "next/font/google";
import {LanguageProvider} from "@/context/LanguageContext";
import Header from "@/components/Header";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Роман Бондарчук — Front-end Developer",
  description:
    "Портфолио frontend-разработчика: React, Next.js, TypeScript и примеры проектов.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body>
        <LanguageProvider>
          <Header />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
