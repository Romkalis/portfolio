"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {contacts} from "@/data/resume";
import {useLanguage} from "@/context/LanguageContext";
import {useInView} from "@/hooks/useInView";
import styles from "./SkillsTerminal.module.css";

type Translation = ReturnType<typeof useLanguage>["t"];
type Entry = {id: number; command: string};

const AUTOPLAY = ["whoami", "ls skills/frontend", "ls skills/tools", "ls skills/api"];
const HINTS = ["help", "skills", "ls frontend", "contact", "sudo hire roman", "clear"];
const TYPE_SPEED = 45;
const COMMAND_PAUSE = 450;
const START_DELAY = 500;

function Prompt() {
  return (
    <span className={styles.prompt}>
      <span className={styles.user}>roman@portfolio</span>
      <span className={styles.muted}>:</span>
      <span className={styles.path}>~/skills</span>
      <span className={styles.muted}>$</span>
    </span>
  );
}

function SkillList({items}: {items: readonly string[]}) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ContactLinks() {
  return (
    <div className={styles.contacts}>
      <span>
        telegram → <a href={contacts.telegram} target="_blank" rel="noreferrer">{contacts.telegramHandle}</a>
      </span>
      <span>
        email&nbsp;&nbsp;&nbsp;&nbsp;→ <a href={contacts.email}>{contacts.emailAddress}</a>
      </span>
    </div>
  );
}

function renderOutput(command: string, t: Translation) {
  const terminal = t.terminal;
  const [name, ...args] = command.trim().split(/\s+/);
  const arg = args.join(" ").toLowerCase();
  const groups = t.skillsGroups;

  switch (name.toLowerCase()) {
    case "":
      return null;
    case "help":
      return (
        <dl className={styles.help}>
          {terminal.help.map(([cmd, description]) => (
            <div key={cmd}>
              <dt>{cmd}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      );
    case "whoami":
      return <p className={styles.text}>{terminal.whoami}</p>;
    case "skills":
      return groups.map((group) => (
        <div key={group.id} className={styles.group}>
          <p className={styles.dir}>▸ {group.title}</p>
          <SkillList items={group.items} />
        </div>
      ));
    case "ls":
    case "cat": {
      const slug = arg.replace(/^(\.\/)?skills\/?/, "").replace(/\/$/, "");
      if (!slug) {
        return (
          <ul className={styles.list}>
            {groups.map((group) => (
              <li key={group.id} className={styles.dir}>
                {group.id}/
              </li>
            ))}
          </ul>
        );
      }
      const group = groups.find((item) => item.id === slug);
      if (!group) {
        return (
          <p className={styles.error}>
            {name}: {terminal.noGroup} {arg}
          </p>
        );
      }
      return <SkillList items={group.items} />;
    }
    case "cd":
      return <p className={styles.text}>{terminal.cd}</p>;
    case "contact":
      return (
        <>
          <p className={styles.text}>{terminal.contact}</p>
          <ContactLinks />
        </>
      );
    case "sudo":
      if (arg === "hire roman") {
        return (
          <>
            <p className={styles.success}>{terminal.hire}</p>
            <ContactLinks />
          </>
        );
      }
      break;
  }

  return (
    <p className={styles.error}>
      zsh: {terminal.notFound} {name}
      <span className={styles.muted}> — {terminal.notFoundHint}</span>
    </p>
  );
}

export default function SkillsTerminal() {
  const {t} = useLanguage();
  const {ref, inView} = useInView<HTMLDivElement>(0.35);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);
  const wantsFocus = useRef(false);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [autoplayDone, setAutoplayDone] = useState(false);

  const push = useCallback((commands: string[]) => {
    setEntries((current) => [
      ...current,
      ...commands.map((command) => ({id: nextId.current++, command})),
    ]);
  }, []);

  // Auto-type the intro commands once the terminal scrolls into view.
  useEffect(() => {
    if (!inView || autoplayDone) {
      return;
    }

    if (autoIndex >= AUTOPLAY.length) {
      setAutoplayDone(true);
      return;
    }

    const command = AUTOPLAY[autoIndex];
    const isTyping = typed.length < command.length;
    const delay = isTyping ? (typed === "" && autoIndex === 0 ? START_DELAY : TYPE_SPEED) : COMMAND_PAUSE;

    const timer = setTimeout(() => {
      if (isTyping) {
        setTyped(command.slice(0, typed.length + 1));
      } else {
        push([command]);
        setTyped("");
        setAutoIndex((index) => index + 1);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [inView, autoplayDone, autoIndex, typed, push]);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  }, [entries, typed]);

  const skipAutoplay = () => {
    if (autoplayDone) {
      return;
    }
    push(AUTOPLAY.slice(autoIndex));
    setTyped("");
    setAutoplayDone(true);
  };

  const run = (raw: string) => {
    skipAutoplay();
    const command = raw.trim();
    if (command.toLowerCase() === "clear") {
      setEntries([]);
    } else {
      push([command]);
    }
    setInput("");
    setHistoryIndex(null);
  };

  const commandHistory = entries.map((entry) => entry.command).filter(Boolean);

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      run(input);
      return;
    }

    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      if (!commandHistory.length) {
        return;
      }
      const last = commandHistory.length - 1;
      let index = historyIndex ?? commandHistory.length;
      index = event.key === "ArrowUp" ? Math.max(0, index - 1) : index + 1;
      if (index > last) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(index);
        setInput(commandHistory[index]);
      }
    }

    if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setEntries([]);
    }
  };

  const focusInput = () => {
    if (window.getSelection()?.toString()) {
      return;
    }
    wantsFocus.current = true;
    skipAutoplay();
    inputRef.current?.focus({preventScroll: true});
  };

  useEffect(() => {
    if (autoplayDone && wantsFocus.current) {
      inputRef.current?.focus({preventScroll: true});
    }
  }, [autoplayDone]);

  const [lead, accent, tail] = t.skillsHeading;

  return (
    <section id="skills" className={`section sectionNavy ${styles.section}`}>
      <div className="container">
        <div className="sectionHead">
          <span className="eyebrow">{t.skillsTitle}</span>
          <h2 className="sectionTitle">
            {lead}
            <em>{accent}</em>
            {tail}
          </h2>
          <p className="sectionLead">{t.skillsLead}</p>
        </div>

        <div ref={ref} className={styles.window}>
          <div className={styles.bar}>
            <span className={styles.dots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className={styles.title}>{t.terminal.title}</span>
          </div>

          <div ref={bodyRef} className={styles.body} onClick={focusInput}>
            {entries.map((entry) => (
              <div key={entry.id} className={styles.entry}>
                <p className={styles.line}>
                  <Prompt /> <span className={styles.command}>{entry.command}</span>
                </p>
                {renderOutput(entry.command, t)}
              </div>
            ))}

            <label className={styles.line}>
              <Prompt />{" "}
              {autoplayDone ? (
                <span className={styles.inputWrap}>
                  <input
                    ref={inputRef}
                    className={styles.input}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={onKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                    aria-label={t.terminal.title}
                  />
                  <span className={styles.ghost} aria-hidden="true">
                    {input}
                    <span className={styles.cursor} />
                  </span>
                </span>
              ) : (
                <span className={styles.command}>
                  {typed}
                  <span className={styles.cursor} />
                </span>
              )}
            </label>
          </div>
        </div>

        <div className={styles.hints}>
          <span>{t.terminal.tryLabel}</span>
          {HINTS.map((hint) => (
            <button key={hint} type="button" onClick={() => run(hint)}>
              {hint}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
