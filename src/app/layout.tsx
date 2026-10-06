import type {Metadata} from "next";
import {JetBrains_Mono, Montserrat, Playfair_Display} from "next/font/google";
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

const jetbrains = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-jetbrains",
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
      className={`${playfair.variable} ${montserrat.variable} ${jetbrains.variable}`}
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
