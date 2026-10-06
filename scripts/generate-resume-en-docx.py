#!/usr/bin/env python3
"""Generate English DOCX resume from the Russian template."""

from pathlib import Path
from shutil import copy2

from docx import Document

ROOT = Path(__file__).resolve().parent.parent
RU_PATH = ROOT / "src/data/Frontend - Бондарчук Роман CV2026RU.docx"
EN_PATH = ROOT / "src/data/Frontend - Roman Bondarchuk CV2026EN.docx"
PUBLIC_DIR = ROOT / "public/resume"

EN_BY_INDEX = {
    0: "Roman Bondarchuk",
    1: "Front-end Developer",
    2: "Contacts:  Telegram: @rkliss   Email: yukkilumen@gmail.com",
    3: "About me",
    4: (
        "Frontend developer focused on building high-quality, scalable web services. "
        "Proficient in modern technologies (HTML5, CSS3, JavaScript ES6, React, Redux Toolkit, "
        "TypeScript, Next.js). Experienced in responsive, user-friendly interfaces with strong "
        "performance (PageSpeed/Lighthouse ≥95)."
    ),
    5: "Skills",
    6: (
        "Frontend: HTML5, CSS3, JavaScript (ES6+), TypeScript, React, Next.js, Redux Toolkit, "
        "MobX, Vue (learning)"
    ),
    7: "Tools: Gulp, LESS, SCSS, Jest, Storybook, Git",
    8: "API: REST API",
    9: (
        "Other: Performance optimization, responsive layout, semantic markup, "
        "component-based architecture"
    ),
    10: "Work experience",
    11: "Boomerang Media",
    12: "Mar 2025 - Jan 2026",
    13: (
        "Delivered 150+ responsive websites (1 to 8 pages each), including 110+ built with "
        "React/Next.js."
    ),
    14: "All projects pass W3C validation with zero errors.",
    15: "Average PageSpeed/Lighthouse scores — 95+.",
    16: "Stack: Next.js, React, HTML, CSS, JS, Gulp, PHP, REST API.",
    17: "Jan 2026 - May 2026",
    18: "Built sales funnels and integrated CheckoutChamp CRM.",
    19: "Integrated new payment systems (PayPal, Klarna) → 30% sales growth.",
    20: "Localized the website into multiple languages → 70% new users acquired.",
    21: (
        "Collected and analyzed user data → 40% conversion growth. "
        "Stack: HTML, CSS, JS, Gulp, PHP, Vanilla JS, REST API."
    ),
    23: "Dreamfin - dreamfin.ru",
    24: "Jul 2024 - Mar 2025",
    25: "Built the project from scratch (12-page website).",
    26: "Complex animations to keep users engaged.",
    27: "Integrated 6 third-party libraries and built responsive sliders.",
    28: " Stack: HTML, CSS, JS, SCSS, Gulp.",
    29: "Agroforsunka - agroforsunka.ru",
    30: "Sep 2024 - Jan 2025",
    31: (
        "Built a responsive online store with a multi-grid layout and reactive behavior."
    ),
    32: "Optimized for mobile devices (sliders instead of static blocks).",
    33: "Stack: HTML, CSS, vanilla JS, SCSS, Gulp.",
    34: "Instalook / Daki.market - instalook.ru, daki.market",
    35: "May 2023 - Mar 2025",
    36: "Developed new pages and animations to improve UX.",
    37: "Optimized rendering for 50+ product layout templates.",
    38: "Deep legacy code refactor (>40,000 lines).",
    39: "Full responsive support for devices from 320px to 1600px.",
    40: "Stack: HTML, CSS, JS, LESS, Grunt, PHP, Git.",
    41: "Education, courses & professional development",
    42: "2024 - Hexlet, TypeScript Developer",
    43: "2023 - HTML Academy, Frontend Development, React Developer",
    44: "Achievements",
    45: (
        'Winner of the "Natashin\'s Chat for Juniors" hackathon (2023), '
        "Frontend track (React)."
    ),
    46: "Languages",
    47: "Russian — native",
    48: "English — B1",
}


def main() -> None:
    if not RU_PATH.exists():
        raise SystemExit(f"Missing Russian resume: {RU_PATH}")

    doc = Document(str(RU_PATH))

    for index, paragraph in enumerate(doc.paragraphs):
        if index in EN_BY_INDEX:
            paragraph.text = EN_BY_INDEX[index]

    EN_PATH.parent.mkdir(parents=True, exist_ok=True)
    doc.save(str(EN_PATH))

    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    copy2(RU_PATH, PUBLIC_DIR / "Roman-Bondarchuk-CV-2026-RU.docx")
    copy2(EN_PATH, PUBLIC_DIR / "Roman-Bondarchuk-CV-2026-EN.docx")

    print(f"Saved: {EN_PATH}")
    print(f"Public: {PUBLIC_DIR}")


if __name__ == "__main__":
    main()
