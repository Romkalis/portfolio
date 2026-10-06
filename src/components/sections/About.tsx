"use client";

import {useEffect, useState} from "react";
import {resumeDownloads} from "@/data/resume";
import {useLanguage} from "@/context/LanguageContext";
import {useInView} from "@/hooks/useInView";
import styles from "./About.module.css";

const COUNT_DURATION = 1600;

function Counter({value, active}: {value: number; active: boolean}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) {
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / COUNT_DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * value));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);

  return <>{current}</>;
}

export default function About() {
  const {t, locale} = useLanguage();
  const {ref, inView} = useInView<HTMLDivElement>(0.3);
  const resume = resumeDownloads[locale];
  const [greeting, greetingAccent] = t.aboutGreeting;

  return (
    <section id="about" className="section">
      <div className={`container ${styles.grid}`}>
        <div>
          <span className="eyebrow">{t.aboutTitle}</span>
          <h2 className={`sectionTitle ${styles.title}`}>
            {greeting} <em>{greetingAccent}</em>
          </h2>
          <p className={styles.text}>{t.aboutText}</p>
          <div className={styles.actions}>
            <a href={resume.href} download={resume.fileName} className="btn btnPrimary">
              {t.downloadResume}
            </a>
          </div>
        </div>

        <div ref={ref} className={styles.stats}>
          {t.aboutStats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <strong>
                <Counter value={stat.value} active={inView} />
                <span>{stat.suffix}</span>
              </strong>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
