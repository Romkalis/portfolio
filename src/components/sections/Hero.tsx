"use client";

import {useEffect, useState} from "react";
import {useLanguage} from "@/context/LanguageContext";
import styles from "./Hero.module.css";

const TYPE_SPEED = 70;
const ERASE_SPEED = 35;
const HOLD_DELAY = 1800;

function useTypewriter(words: readonly string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    setWordIndex(0);
    setText("");
    setErasing(false);
  }, [words]);

  useEffect(() => {
    const word = words[wordIndex % words.length];

    if (!erasing && text === word) {
      const timer = setTimeout(() => setErasing(true), HOLD_DELAY);
      return () => clearTimeout(timer);
    }

    if (erasing && text === "") {
      setErasing(false);
      setWordIndex((index) => index + 1);
      return;
    }

    const timer = setTimeout(
      () => {
        setText(
          erasing ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1),
        );
      },
      erasing ? ERASE_SPEED : TYPE_SPEED,
    );
    return () => clearTimeout(timer);
  }, [words, wordIndex, text, erasing]);

  return text;
}

export default function Hero() {
  const {t} = useLanguage();
  const word = useTypewriter(t.heroWords);
  const [lead, accent, tail] = t.heroHeadline;

  return (
    <section className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={`${styles.orb} ${styles.orbBlue}`} />
        <span className={`${styles.orb} ${styles.orbPurple}`} />
        <span className={`${styles.orb} ${styles.orbRed}`} />
      </div>

      <div className={`container ${styles.content}`}>
        <p className={styles.badge}>{t.heroBadge}</p>
        <h1 className={styles.title}>
          {lead}
          <em>{accent}</em>
          {tail}
        </h1>
        <p className={styles.tagline}>
          {t.heroTaglineStart}{" "}
          <span className={styles.word}>{word}</span>
          <span className={styles.caret} aria-hidden="true" />
        </p>
        <div className={styles.actions}>
          <a href="#projects" className="btn btnPrimary">
            {t.heroCtaProjects}
          </a>
          <a href="#contact" className="btn btnGhost">
            {t.heroCtaContact}
          </a>
        </div>
      </div>

      <a href="#features" className={styles.scroll}>
        <span>{t.heroScroll}</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
