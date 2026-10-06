"use client";

import {useEffect, useState} from "react";
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
        <a href="#" className={styles.logo} onClick={() => setMenuOpen(false)}>
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
