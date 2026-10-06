import Link from "next/link";
import { curriculum } from "@/lib/curriculum";
import styles from "./roadmap.module.scss";

export default function RoadmapPage() {
  const sorted = [...curriculum].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.wrap}>
      <h1>Roadmap обучения</h1>
      <p>
        Визуальный путь от нуля до уровня проекта <code>projects/service</code> (CRM
        автосервиса).
      </p>
      <div className={styles.timeline}>
        {sorted.map((track, i) => (
          <div key={track.id} className={styles.item}>
            <div className={styles.dot}>{i + 1}</div>
            <div className={styles.body}>
              <h2>
                <Link href={`/learn/${track.id}/${track.lessons[0].slug}`}>
                  {track.title}
                </Link>
              </h2>
              <p>{track.subtitle}</p>
              <ul>
                {track.lessons.map((l) => (
                  <li key={l.slug}>
                    <Link href={`/learn/${track.id}/${l.slug}`}>{l.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.finish}>
        <h2>Финиш</h2>
        <p>
          После курса откройте <code>projects/service</code>, прочитайте{" "}
          <code>docs/INDEX.md</code> и повторите архитектуру на практике.
        </p>
        <Link href="/learn/capstone/01-obzor-arhitektury" className={styles.cta}>
          Обзор CRM-проекта →
        </Link>
      </div>
    </div>
  );
}
