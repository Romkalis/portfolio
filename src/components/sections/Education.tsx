"use client";

import {useLanguage} from "@/context/LanguageContext";
import styles from "./Education.module.css";

export default function Education() {
  const {t} = useLanguage();

  const columns = [
    {icon: "🎓", title: t.educationTitle, items: t.education},
    {icon: "🏆", title: t.achievementTitle, items: [t.achievement]},
    {icon: "🌐", title: t.languagesTitle, items: t.languages},
  ];

  return (
    <section className={`sectionCream ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        {columns.map((column) => (
          <article key={column.title} className={styles.card}>
            <span className={styles.icon} aria-hidden="true">
              {column.icon}
            </span>
            <h3>{column.title}</h3>
            <ul>
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
