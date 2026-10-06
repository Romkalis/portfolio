import Link from "next/link";
import { curriculum, totalLessons } from "@/lib/curriculum";
import styles from "./page.module.scss";

export default function HomePage() {
  const sorted = [...curriculum].sort((a, b) => a.order - b.order);

  return (
    <main>
      <section className={styles.hero}>
        <span className={styles.badge}>Fullstack с нуля · на русском</span>
        <h1 className={styles.title}>
          Учебник по технологиям
          <br />
          CRM-проекта автосервиса
        </h1>
        <p className={styles.lead}>
          Конспекты на русском по каждой технологии: что обязательно знать, примеры из CRM,
          частые ошибки и шпаргалки — без «перейдите по ссылке и читайте сами». От JavaScript
          до Docker и Server Actions. Цель — уровень проекта <code>projects/service</code>.
        </p>
        <div className={styles.actions}>
          <Link href="/learn/javascript/01-vvedenie" className={styles.btnPrimary}>
            Начать с JavaScript
          </Link>
          <Link href="/learn" className={styles.btnSecondary}>
            Все разделы
          </Link>
          <Link href="/roadmap" className={styles.btnSecondary}>
            Roadmap
          </Link>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <strong>{sorted.length}</strong>
            <span>технологий</span>
          </div>
          <div className={styles.stat}>
            <strong>{totalLessons}</strong>
            <span>уроков</span>
          </div>
          <div className={styles.stat}>
            <strong>~25 ч</strong>
            <span>материала</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Программа курса</h2>
        <p className={styles.sectionSub}>
          Проходите по порядку — каждый модуль опирается на предыдущий.
        </p>
        <div className={styles.grid}>
          {sorted.map((track) => (
            <Link
              key={track.id}
              href={`/learn/${track.id}/${track.lessons[0].slug}`}
              className={styles.card}
            >
              <span className={styles.cardIcon}>{track.icon}</span>
              <h3 className={styles.cardTitle}>{track.title}</h3>
              <p className={styles.cardSub}>{track.subtitle}</p>
              <span className={styles.cardMeta}>
                {track.lessons.length} урок
                {track.lessons.length === 1 ? "" : track.lessons.length < 5 ? "а" : "ов"}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
