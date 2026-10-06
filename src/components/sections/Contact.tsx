"use client";

import {contacts, resumeDownloads} from "@/data/resume";
import {useLanguage} from "@/context/LanguageContext";
import styles from "./Contact.module.css";

export default function Contact() {
  const {t, locale} = useLanguage();
  const resume = resumeDownloads[locale];
  const year = new Date().getFullYear();
  const [lead, accent, tail] = t.contactHeading;

  return (
    <section id="contact" className={styles.contact}>
      <div className={`container ${styles.inner}`}>
        <span className="eyebrow">{t.contactTitle}</span>
        <h2 className={styles.title}>
          {lead}
          <em>{accent}</em>
          {tail}
        </h2>
        <p className={styles.lead}>{t.contactLead}</p>

        <a href={contacts.email} className={styles.email}>
          {contacts.emailAddress}
        </a>

        <div className={styles.links}>
          <a href={contacts.telegram} target="_blank" rel="noreferrer">
            <span>{t.telegram}</span>
            <strong>{contacts.telegramHandle}</strong>
          </a>
          <a href={resume.href} download={resume.fileName}>
            <span>CV</span>
            <strong>{t.downloadResume}</strong>
          </a>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <p>{t.footer.replace("{year}", String(year))}</p>
          <a href="#" className={styles.top}>
            {t.backToTop} <span aria-hidden="true">↑</span>
          </a>
        </div>
      </footer>
    </section>
  );
}
