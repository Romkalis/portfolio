"use client";

import {contacts, resumeDownloads} from "@/data/resume";
import {useLanguage} from "@/context/LanguageContext";
import styles from "./CtaBand.module.css";

export default function CtaBand() {
  const {t, locale} = useLanguage();
  const resume = resumeDownloads[locale];

  const panels = [
    {
      key: "explore",
      className: styles.explore,
      title: t.ctaExplore.title,
      text: t.ctaExplore.text,
      action: t.downloadResume,
      linkProps: {href: resume.href, download: resume.fileName},
    },
    {
      key: "interested",
      className: styles.interested,
      title: t.ctaInterested.title,
      text: t.ctaInterested.text,
      action: t.ctaInterested.action,
      linkProps: {href: contacts.telegram, target: "_blank", rel: "noreferrer"},
    },
  ];

  return (
    <section className={styles.band}>
      {panels.map((panel) => (
        <a key={panel.key} className={`${styles.panel} ${panel.className}`} {...panel.linkProps}>
          <h2>
            {panel.title[0]}
            <em>{panel.title[1]}</em>
          </h2>
          <p>{panel.text}</p>
          <span className={styles.action}>
            {panel.action}
            <span aria-hidden="true">→</span>
          </span>
        </a>
      ))}
    </section>
  );
}
