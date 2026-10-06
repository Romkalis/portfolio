'use client'
import {withBase} from "@/utils/withBase";
// import localFont from "next/font/local";
import {Bebas_Neue} from 'next/font/google';
// import {usePathname} from "next/navigation";

import "./globals.css";
import "../css/colors.css";
import "../css/base.css";
import "../css/buttons.css";
import "../css/text.css";
import Footer from "@/components/footer/Footer";
// import {generateHreflangTags} from "@/utils/hreflang";
import Schema from "@/components/Schema/Schema";
import MainGrid from "@/components/MainGrid/MainGrid";


// Локальные шрифты ClashDisplay
const title = Bebas_Neue({
  variable: "--font-title",
  display: 'swap',
  weight: ['400'],
  subsets: ['latin']
});

const main = Bebas_Neue({
  variable: "--font-main",
  display: 'swap',
  weight: ['400'],
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

  const lang = 'fr'
  return (
    <html lang={lang}>
    <head>
      {/*{hreflangTags.map((tag) => (*/}
      {/*  <link key={tag.hrefLang} rel="alternate" hrefLang={tag.hrefLang} href={tag.href}/>*/}
      {/*))}*/}
      <meta name="language" content={lang}/>
      <link rel={'icon'} href={withBase(`/assets-pictures/lGty67q/logotypes-icons/favicon.svg`)}/>
      {/*<meta http-equiv="Content-Security-Policy"*/}
      {/*      content="default-src 'self' https:; font-src 'self' https: data:;"/>*/}
      <Schema/>
    </head>

    <body className={`${title.variable} ${main.variable}`}>

    <MainGrid>
      {children}
    </MainGrid>
    <Footer/>
    {/*<AgePopup />*/}
    {/*<CookiePopup />*/}

    </body>
    </html>
  );
}
