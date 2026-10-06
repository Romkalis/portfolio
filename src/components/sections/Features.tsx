"use client";

import {useLanguage} from "@/context/LanguageContext";
import styles from "./Features.module.css";

const icons = [
  // Lightning — performance
  <path key="bolt" d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  // Sliders — tailored
  <g key="sliders">
    <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="10" cy="12" r="2" />
    <circle cx="18" cy="18" r="2" />
  </g>,
  // Code brackets — pixel-perfect code
  <g key="code">
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
  </g>,
  // Devices — responsive
  <g key="devices">
    <rect x="2" y="4" width="15" height="11" rx="1.5" />
    <path d="M6 19h7M9.5 15v4" />
    <rect x="17" y="9" width="5" height="11" rx="1" />
  </g>,
];

export default function Features() {
  const {t} = useLanguage();

  return (
    <section id="features" className={styles.features} aria-label={t.featuresTitle}>
      <div className={`container ${styles.grid}`}>
        {t.features.map((feature, index) => (
          <article key={feature.title} className={styles.item}>
            <span className={styles.icon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {icons[index]}
              </svg>
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
