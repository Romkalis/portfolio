#!/usr/bin/env node
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");

function walkHtml(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walkHtml(full, files);
    else if (e.name.endsWith(".html")) files.push(full);
  }
  return files;
}

function patchUralRuin(html) {
  let out = stripLegalMailto(html);

  out = out.replace(
    /\s*<a href="#" class="index__link"[^>]*>Екатеринбург[^<]*<\/a>\s*/g,
    "\n"
  );
  out = out.replace(/\s*<a href="mailto:[^"]*" class="index__link"[^>]*>[^<]*<\/a>\s*/gi, "\n");
  out = out.replace(/\s*<a href="tel:[^"]*" class="index__link"[^>]*>[^<]*<\/a>\s*/gi, "\n");

  out = out.replace(/\s*<div class="index__social">[\s\S]*?<\/div>\s*(?=<\/div>\s*<nav)/g, "\n");

  out = out.replace(/\s*<section class="about__contacts container">[\s\S]*?<\/section>\s*/g, "\n");

  out = out.replace(
    /\s*<li class="accordion-item">\s*<p class="accordion-title">\s*Остались вопросы\?[\s\S]*?<\/li>\s*/g,
    "\n"
  );

  out = out.replace(
    /Напишите нам на&#160;почту\s*<a href="mailto:[^"]*" class="underline">[^<]*<\/a>,/g,
    "Напишите нам,"
  );

  out = out.replace(/\s*<div class="footer__social">[\s\S]*?<\/div>\s*(?=<p class="footer__copyright")/g, "\n");

  return out;
}

function patchDreamfin(html) {
  let out = html;

  out = out.replace(
    /(<div class="header__contacts">\s*)<a href="tel:[^"]*"[^>]*>[^<]*<\/a>\s*/gi,
    "$1"
  );
  out = out.replace(
    /(<div class="header__contacts">[\s\S]*?)<a href="(?:email|mailto):[^"]*"[^>]*>[^<]*<\/a>\s*/gi,
    "$1"
  );

  out = out.replace(/\s*<div class="footer__contacts-links">[\s\S]*?<\/div>\s*/g, "\n");
  out = out.replace(/\s*<ul class="footer__contacts-social-list">[\s\S]*?<\/ul>\s*/g, "\n");

  return out;
}

function stripLegalMailto(html) {
  let out = html.replace(/<a\s+href="mailto:[^"]*"[^>]*>([\s\S]*?)<\/a>/gi, "$1");
  out = out.replace(/\s+href="mailto:[^"]*"/gi, "");
  return out;
}

function patchDesignCeh(html) {
  let out = stripLegalMailto(html);

  out = out.replace(
    /\s*<li class="header__navigation-item">\s*<a href="\/contacts[^"]*" class="header__navigation-link"[^>]*>Контакты<\/a>\s*<\/li>\s*/g,
    "\n"
  );

  out = out.replace(/\s*<ul class="footer__contacts-list">[\s\S]*?<\/ul>\s*/g, "\n");

  out = out.replace(/\s*<section class="contacts-info">[\s\S]*?<\/section>\s*/g, "\n");

  out = out.replace(/href="\/contacts\.html"/g, 'href="/#form"');
  out = out.replace(/href="\/contacts"/g, 'href="/#form"');

  return out;
}

const PROJECT_PATCHERS = {
  "5": patchDreamfin,
  "6": patchDesignCeh,
  "7": patchUralRuin,
};

function processDir(dir, patcher, label) {
  let n = 0;
  for (const file of walkHtml(dir)) {
    const raw = fs.readFileSync(file, "utf8");
    const next = patcher(raw);
    if (next !== raw) {
      fs.writeFileSync(file, next);
      n++;
    }
  }
  console.log(`  ${label}: ${n} html files`);
  return n;
}

let total = 0;
for (const [id, patcher] of Object.entries(PROJECT_PATCHERS)) {
  total += processDir(path.join(ROOT, "projects", id), patcher, `project ${id}`);
}

const distVanilla = ["dreamfin", "design-ceh", "uralruin"];
for (const slug of distVanilla) {
  const patcher = PROJECT_PATCHERS[{ dreamfin: "5", "design-ceh": "6", uralruin: "7" }[slug]];
  total += processDir(path.join(ROOT, "dist", "demos", slug), patcher, `dist/${slug}`);
}

console.log(`done (${total} files patched)`);
