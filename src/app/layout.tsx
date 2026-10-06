import type {Metadata} from "next";
import {JetBrains_Mono, Manrope, Montserrat} from "next/font/google";
import {LanguageProvider} from "@/context/LanguageContext";
import Header from "@/components/Header";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "500", "700", "800"],
  variable: "--font-manrope",
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
  title: "Roman Bondarchuk — Front-end Developer",
  description:
    "Portfolio of a frontend developer: React, Next.js, TypeScript, and live project demos.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${montserrat.variable} ${jetbrains.variable}`}
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
