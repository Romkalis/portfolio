import Link from "next/link";
import styles from "./SiteHeader.module.scss";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>📘</span>
          RKLiss Learning
        </Link>
        <nav className={styles.nav}>
          <Link href="/learn">Учебник</Link>
          <Link href="/roadmap">Roadmap</Link>
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Документация Next ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
