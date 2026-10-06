"use client";

// import { usePathname } from "next/navigation";

import {
  // useEffect, useState,
  ReactNode, JSX
} from "react";
import {sitePreferences} from "@/data/preferences";
import Schema from "@/components/Schema/Schema";


interface LanguageWrapperProps {
  children: ReactNode;
}

export default function LanguageWrapper({children}: LanguageWrapperProps): JSX.Element {
  // const pathname: string = usePathname();
  // const [lang, setLang] = useState<"sl" | "en">("sl");

  // useEffect(() => {
  //   const currentLang: "sl" | "en" = pathname.startsWith("/en") ? "en" : "sl";
  //   setLang(currentLang);
  // }, [pathname]);

  const lang = 'en'

  return (
    <html lang={lang}>
    {/*eslint-disable-next-line @next/next/no-head-element*/}
    <head>
      <meta name="DC.title" content={sitePreferences.organization.name}/>
      <meta name="copyright" content={sitePreferences.organization.name}/>
      <Schema/>
    </head>
    {children}
    </html>);
}
