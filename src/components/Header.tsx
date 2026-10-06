"use client";

import {useEffect, useState} from "react";
import {useLanguage} from "@/context/LanguageContext";
import {useTheme} from "@/context/ThemeContext";
import styles from "./Header.module.css";

const links = [
  {href: "/#about", key: "navAbout" as const},
  {href: "/#skills", key: "navSkills" as const},
  {href: "/#experience", key: "navExperience" as const},
  {href: "/#projects", key: "navProjects" as const},
  {href: "/#contact", key: "navContact" as const},
];

export default function Header() {
  const {locale, setLocale, t} = useLanguage();
  const {theme, toggleTheme} = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // The scrolled state uses backdrop-filter, which would trap the fixed
  // mobile menu inside the header, so it is dropped while the menu is open.
  const headerClass = [
    styles.header,
    menuOpen ? styles.menuOpen : scrolled ? styles.scrolled : "",
  ].join(" ");

  return (
    <header className={headerClass}>
      <div className={`container ${styles.inner}`}>
        <a href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          RB<span>.</span>
        </a>
        <nav
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}
          aria-label="Main"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
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
          <button
            type="button"
            className={styles.theme}
            aria-label={theme === "dark" ? t.themeToLight : t.themeToDark}
            title={theme === "dark" ? t.themeToLight : t.themeToDark}
            onClick={toggleTheme}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {theme === "dark" ? (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </>
              ) : (
                <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
              )}
            </svg>
          </button>
          <button
            type="button"
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
