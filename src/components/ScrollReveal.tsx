"use client";

import {useEffect} from "react";

const SELECTOR = "[data-reveal]";

// Fades in every [data-reveal] element the first time it enters the viewport,
// including elements rendered later (language switch, project filter).
export default function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const intersection = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            intersection.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.12, rootMargin: "0px 0px -40px 0px"},
    );

    const observeAll = () => {
      document
        .querySelectorAll(`${SELECTOR}:not(.revealed)`)
        .forEach((node) => intersection.observe(node));
    };

    observeAll();
    const mutation = new MutationObserver(observeAll);
    mutation.observe(document.body, {childList: true, subtree: true});

    return () => {
      intersection.disconnect();
      mutation.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
