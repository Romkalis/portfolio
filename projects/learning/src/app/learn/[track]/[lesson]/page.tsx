import Link from "next/link";
import { notFound } from "next/navigation";
import { Markdown } from "@/components/Markdown/Markdown";
import { loadLessonMarkdown } from "@/lib/content";
import { curriculum, getLesson } from "@/lib/curriculum";
import styles from "./lesson.module.scss";

export function generateStaticParams() {
  return curriculum.flatMap((t) =>
    t.lessons.map((l) => ({ track: t.id, lesson: l.slug })),
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ track: string; lesson: string }>;
}) {
  const { track: trackId, lesson: lessonSlug } = await params;
  const found = getLesson(trackId, lessonSlug);
  if (!found) notFound();

  const { track, lesson } = found;
  const content = loadLessonMarkdown(lesson.file);
  const lessonIndex = track.lessons.findIndex((l) => l.slug === lessonSlug);
  const prev = lessonIndex > 0 ? track.lessons[lessonIndex - 1] : null;
  const next =
    lessonIndex < track.lessons.length - 1 ? track.lessons[lessonIndex + 1] : null;
  const nextTrack = curriculum.find((t) => t.order === track.order + 1);
  const nextAfterTrack =
    !next && nextTrack ? { track: nextTrack, lesson: nextTrack.lessons[0] } : null;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <Link href="/learn" className={styles.back}>
          ← Все разделы
        </Link>
        <p className={styles.trackLabel}>{track.title}</p>
        <nav>
          {track.lessons.map((l) => (
            <Link
              key={l.slug}
              href={`/learn/${track.id}/${l.slug}`}
              className={l.slug === lessonSlug ? styles.active : undefined}
            >
              {l.title}
            </Link>
          ))}
        </nav>
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <span className={styles.breadcrumb}>
            <Link href={`/learn/${track.id}/${track.lessons[0].slug}`}>{track.title}</Link>
            {" / "}
            {lesson.title}
          </span>
          <h1>{content.title || lesson.title}</h1>
          {lesson.description && <p className={styles.desc}>{lesson.description}</p>}
          <span className={styles.duration}>{lesson.duration}</span>
        </header>
        <Markdown content={content.body} trackId={track.id} />
        <footer className={styles.footer}>
          {prev && (
            <Link href={`/learn/${track.id}/${prev.slug}`} className={styles.navPrev}>
              ← {prev.title}
            </Link>
          )}
          {next && (
            <Link href={`/learn/${track.id}/${next.slug}`} className={styles.navNext}>
              {next.title} →
            </Link>
          )}
          {nextAfterTrack && (
            <Link
              href={`/learn/${nextAfterTrack.track.id}/${nextAfterTrack.lesson.slug}`}
              className={styles.navNext}
            >
              Далее: {nextAfterTrack.track.title} →
            </Link>
          )}
        </footer>
      </main>
    </div>
  );
}
