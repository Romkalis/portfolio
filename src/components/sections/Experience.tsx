"use client";

import {useLanguage} from "@/context/LanguageContext";
import styles from "./Experience.module.css";

export default function Experience() {
  const {t} = useLanguage();
  const [lead, accent] = t.experienceHeading;

  return (
    <section id="experience" className="section sectionCream">
      <div className={`container ${styles.grid}`}>
        <div className={styles.aside} data-reveal>
          <span className="eyebrow">{t.experienceTitle}</span>
          <h2 className="sectionTitle">
            {lead}
            <em>{accent}</em>
          </h2>
          <p className="sectionLead">{t.experienceLead}</p>
        </div>

        <ol className={styles.timeline}>
          {t.experience.map((job) => {
            const link = "link" in job && job.link !== "#" ? job.link : null;
            return (
              <li key={job.company} className={styles.job} data-reveal>
                <p className={styles.period}>{job.period}</p>
                <h3 className={styles.company}>
                  {link ? (
                    <a href={link} target="_blank" rel="noreferrer">
                      {job.company}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    job.company
                  )}
                </h3>
                <ul className={styles.points}>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className={styles.stack}>
                  {job.stack.split(", ").map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
