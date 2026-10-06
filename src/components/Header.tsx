"use client";

import {useLanguage} from "@/context/LanguageContext";
import styles from "./Header.module.css";

const links = [
  {href: "#about", key: "navAbout" as const},
  {href: "#skills", key: "navSkills" as const},
  {href: "#experience", key: "navExperience" as const},
  {href: "#projects", key: "navProjects" as const},
  {href: "#contact", key: "navContact" as const},
];

export default function Header() {
  const {locale, setLocale, t} = useLanguage();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo}>
          RB<span>.</span>
        </a>
        <nav className={styles.nav} aria-label="Main">
          {links.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {t[link.key]}
            </a>
          ))}
        </nav>
        <div className={styles.actions}>
          <div className={styles.lang} role="group" aria-label="Language">
            <button
              type="button"
              className={locale === "ru" ? styles.langActive : undefined}
              onClick={() => setLocale("ru")}
            >
              RU
            </button>
            <button
              type="button"
              className={locale === "en" ? styles.langActive : undefined}
              onClick={() => setLocale("en")}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
