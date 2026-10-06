'use client'
import {withBase} from "@/utils/withBase";
// import localFont from "next/font/local";
import {Nunito} from 'next/font/google';
// import {usePathname} from "next/navigation";

import "./globals.css";
import "../css/colors.css";
import "../css/base.css";
import "../css/buttons.css";
import "../css/text.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
// import {generateHreflangTags} from "@/utils/hreflang";
import Schema from "@/components/Schema/Schema";
import AgePopup from '@/components/agePopup/AgePopup';


// Локальные шрифты ClashDisplay
const title = Nunito({
  variable: "--font-title",
  display: 'swap',
  weight: ['400', '600', '700', '800'],
  subsets: ['latin']
});

const main = Nunito({
  variable: "--font-main",
  display: 'swap',
  weight: ['400', '600', '700', '800'],
  subsets: ['latin']
});

// const subtitle = localFont({
//   src: '../../public/fonts/ClashDisplay-Regular.woff2',
//   variable: "--font-sub",
//   weight: '400',
//   display: 'swap',
// });

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {

  // const pathname = usePathname()
  // const lang = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/it') ? 'it' : 'de';
  // const hreflangTags = generateHreflangTags(pathname);

  const lang = 'en'
  return (
    <html lang={lang}>
    <head>
      {/*{hreflangTags.map((tag) => (*/}
      {/*  <link key={tag.hrefLang} rel="alternate" hrefLang={tag.hrefLang} href={tag.href}/>*/}
      {/*))}*/}
      <meta name="language" content={lang}/>
      <link rel={'icon'} href={withBase(`/asset-files/akjsd5/logotypes-icons/favicon.svg`)}/>
      <Schema/>
    </head>

    <body className={`${title.variable} ${main.variable}`}>

    <Header/>
    {children}
    <Footer/>
    <AgePopup />

    </body>
    </html>
  );
}
