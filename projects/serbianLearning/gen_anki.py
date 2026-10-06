#!/usr/bin/env python3
"""Собрать Anki-колоды из data/*.tsv (только stdlib)."""

from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"

DECKS = [
    (
        "ru-sr-anki.txt",
        "Русско-сербский (слова)",
        [DATA / "vocab_1.tsv", DATA / "vocab_2.tsv", DATA / "vocab_3.tsv", DATA / "vocab_4.tsv"],
    ),
    (
        "ru-sr-phrases-anki.txt",
        "Русско-сербский (фразы)",
        [DATA / "phrases.tsv"],
    ),
]


def load_tsv(path: Path) -> list[tuple[str, str]]:
    rows: list[tuple[str, str]] = []
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        parts = line.split("\t")
        if len(parts) == 2:
            ru, back = parts[0].strip(), parts[1].strip()
        elif len(parts) >= 3:
            ru = parts[0].strip()
            sr, lat = parts[1].strip(), parts[2].strip()
            back = f"{sr} [{lat}]"
        else:
            raise ValueError(f"{path}: need 2+ columns: {line[:60]}")
        rows.append((ru, back))
    return rows


def card_line(ru: str, back: str) -> str:
    # Anki HTML: кириллица, перенос, курсивная транскрипция в []
    if " [" in back and back.endswith("]"):
        sr, rest = back.rsplit(" [", 1)
        lat = rest[:-1]
        back_html = f"{sr}<br><i>[{lat}]</i>"
    else:
        back_html = back
    return f"{ru}\t{back_html}"


def write_deck(out_name: str, deck_title: str, sources: list[Path]) -> int:
    lines = [
        "#separator:tab",
        "#html:true",
        f"#deck:{deck_title}",
        "#columns:Русский\tСербский",
    ]
    count = 0
    for src in sources:
        for ru, back in load_tsv(src):
            lines.append(card_line(ru, back))
            count += 1
    (ROOT / out_name).write_text("\n".join(lines) + "\n", encoding="utf-8")
    return count


def main() -> None:
    for out_name, title, sources in DECKS:
        n = write_deck(out_name, title, sources)
        print(f"{out_name}: {n} cards")


if __name__ == "__main__":
    main()
