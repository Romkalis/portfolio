"use client";

import {contacts, resumeDownloads} from "@/data/resume";
import {useLanguage} from "@/context/LanguageContext";
import About from "./sections/About";
import CtaBand from "./sections/CtaBand";
import Education from "./sections/Education";
import Experience from "./sections/Experience";
import Features from "./sections/Features";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import SkillsTerminal from "./sections/SkillsTerminal";
import styles from "./PortfolioPage.module.css";

export default function PortfolioPage() {
  const {t, locale} = useLanguage();
  const year = new Date().getFullYear();
  const resume = resumeDownloads[locale];

  return (
    <main>
      <Hero />
      <Features />

      <About />

      <SkillsTerminal />

      <Experience />

      <Education />

      <Projects />

      <CtaBand />

      <section id="contact" className="section">
        <div className="container">
          <h2 className="sectionTitle">{t.contactTitle}</h2>
          <div className={`card ${styles.contactCard}`}>
            <a href={contacts.telegram} target="_blank" rel="noreferrer">
              <span>{t.telegram}</span>
              <strong>{contacts.telegramHandle}</strong>
            </a>
            <a href={contacts.email}>
              <span>{t.email}</span>
              <strong>{contacts.emailAddress}</strong>
            </a>
            <a
              href={resume.href}
              download={resume.fileName}
              className={`btn btnPrimary ${styles.resumeDownload}`}
            >
              {t.downloadResume}
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <p>{t.footer.replace("{year}", String(year))}</p>
        </div>
      </footer>
    </main>
  );
}
