#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { SANITIZE_PATTERNS } from "./demo-sanitize-patterns.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");

const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  "out",
  "____light_version",
  ".git",
  ".venv-resume",
]);
const EXT = /\.(html|css|js|ts|tsx|xml|webmanifest|txt|php)$/i;

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name) || e.name.startsWith(".")) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else if (EXT.test(e.name) && !e.name.endsWith("demoContacts.ts")) files.push(full);
  }
  return files;
}

function sanitizeText(text) {
  let out = text;
  for (const [re, rep] of SANITIZE_PATTERNS) out = out.replace(re, rep);
  return out;
}

let total = 0;

for (const id of ["1", "2", "3", "4", "5", "6", "7"]) {
  const projectDir = path.join(ROOT, "projects", id);
  if (!fs.existsSync(projectDir)) continue;

  let n = 0;
  for (const file of walk(projectDir)) {
    const raw = fs.readFileSync(file, "utf8");
    const next = sanitizeText(raw);
    if (next !== raw) {
      fs.writeFileSync(file, next);
      n++;
    }
  }
  console.log(`project ${id}: sanitized ${n} files`);
  total += n;
}

// dist demos (served by npm run serve)
const distDemos = path.join(ROOT, "dist", "demos");
if (fs.existsSync(distDemos)) {
  let n = 0;
  for (const file of walk(distDemos)) {
    const raw = fs.readFileSync(file, "utf8");
    const next = sanitizeText(raw);
    if (next !== raw) {
      fs.writeFileSync(file, next);
      n++;
    }
  }
  console.log(`dist/demos: sanitized ${n} files`);
  total += n;
}

console.log(`done (${total} files patched)`);
