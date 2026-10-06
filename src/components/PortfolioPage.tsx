"use client";

import {contacts, demos, resumeDownloads} from "@/data/resume";
import {useLanguage} from "@/context/LanguageContext";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Features from "./sections/Features";
import Hero from "./sections/Hero";
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

      <section className="section">
        <div className="container">
          <h2 className="sectionTitle">{t.educationTitle}</h2>
          <ul className={styles.simpleList}>
            {t.education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className={styles.subTitle}>{t.achievementTitle}</h3>
          <p className={styles.achievement}>{t.achievement}</p>
          <h3 className={styles.subTitle}>{t.languagesTitle}</h3>
          <ul className={styles.simpleList}>
            {t.languages.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <h2 className="sectionTitle">{t.projectsTitle}</h2>
          <p className="sectionLead">{t.projectsHint}</p>
          <div className={styles.projectsGrid}>
            {demos.map((demo) => {
              const description =
                t.demoDescriptions[demo.slug as keyof typeof t.demoDescriptions];
              return (
                <article key={demo.slug} className={`card ${styles.projectCard}`}>
                  <div className={styles.projectTop}>
                    <h3>{demo.siteName}</h3>
                    <span className="tag">{demo.tag}</span>
                  </div>
                  <p>{description}</p>
                  <div className={styles.stackRow}>
                    {demo.stack.map((tech) => (
                      <span key={tech} className={styles.tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={`/demos/${demo.slug}/`}
                    className={`btn btnPrimary ${styles.demoLink}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.openDemo} →
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

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
