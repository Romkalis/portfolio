import Link from "next/link";
import { curriculum } from "@/lib/curriculum";
import styles from "./learn.module.scss";

export default function LearnIndexPage() {
  const sorted = [...curriculum].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.wrap}>
      <h1>Учебник</h1>
      <p className={styles.intro}>
        Полный путь от основ до стека CRM. Рекомендуем проходить модули сверху вниз.
      </p>
      {sorted.map((track, trackIndex) => (
        <section key={track.id} className={styles.track}>
          <div className={styles.trackHead}>
            <span className={styles.order}>{trackIndex + 1}</span>
            <div>
              <h2>
                <Link href={`/learn/${track.id}/${track.lessons[0].slug}`}>{track.title}</Link>
              </h2>
              <p>{track.subtitle}</p>
              {track.officialDocs && (
                <a href={track.officialDocs} target="_blank" rel="noopener noreferrer">
                  Официальная документация ↗
                </a>
              )}
            </div>
          </div>
          <ol className={styles.lessons}>
            {track.lessons.map((lesson, i) => (
              <li key={lesson.slug}>
                <Link href={`/learn/${track.id}/${lesson.slug}`}>
                  <span className={styles.lessonNum}>
                    {trackIndex + 1}.{i + 1}
                  </span>
                  {lesson.title}
                  <span className={styles.duration}>{lesson.duration}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
