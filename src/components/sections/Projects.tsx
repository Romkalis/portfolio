"use client";

import {useState} from "react";
import {demos} from "@/data/resume";
import {useLanguage} from "@/context/LanguageContext";
import styles from "./Projects.module.css";

const tags = Array.from(new Set(demos.map((demo) => demo.tag)));

export default function Projects() {
  const {t} = useLanguage();
  const [filter, setFilter] = useState<string | null>(null);
  const [lead, accent] = t.projectsHeading;

  const visible = filter ? demos.filter((demo) => demo.tag === filter) : demos;

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="sectionHead" data-reveal>
          <span className="eyebrow">{t.projectsTitle}</span>
          <h2 className="sectionTitle">
            {lead}
            <em>{accent}</em>
          </h2>
          <p className="sectionLead">{t.projectsHint}</p>
        </div>

        <div className={styles.filters} role="group" aria-label={t.projectsTitle}>
          {[null, ...tags].map((tag) => (
            <button
              key={tag ?? "all"}
              type="button"
              className={filter === tag ? styles.filterActive : undefined}
              onClick={() => setFilter(tag)}
            >
              {tag ?? t.projectsFilterAll}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {visible.map((demo) => {
            const description =
              t.demoDescriptions[demo.slug as keyof typeof t.demoDescriptions];
            return (
              <article key={demo.slug} className={styles.card}>
                <a
                  href={`/demos/${demo.slug}/`}
                  className={styles.preview}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${t.openDemo}: ${demo.siteName}`}
                >
                  <span className={styles.chrome} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <img
                    src={`/projects/${demo.slug}.webp`}
                    alt=""
                    loading="lazy"
                    width={960}
                    height={600}
                  />
                  <span className={styles.overlay}>
                    <span>{t.openDemo} →</span>
                  </span>
                </a>
                <div className={styles.body}>
                  <div className={styles.top}>
                    <h3>{demo.siteName}</h3>
                    <span className="tag">{demo.tag}</span>
                  </div>
                  <p>{description}</p>
                  <div className={styles.stack}>
                    {demo.stack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
