#!/usr/bin/env node
import fs from "fs";
import path from "path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PROJECTS = ["1", "2", "3", "4"];

function shouldPrefix(value) {
  if (!value.startsWith("/") || value.startsWith("//")) return false;
  return true;
}

function transform(content) {
  let next = content;
  let changed = false;

  const mark = (before, after) => {
    if (before !== after) changed = true;
    next = after;
  };

  // href="/path" or src='/path'
  mark(
    next,
    next.replace(/(href|src)=(["'])(\/[^"']*)\2/g, (full, attr, q, p) => {
      if (!shouldPrefix(p)) return full;
      return `${attr}={withBase(${q}${p}${q})}`;
    }),
  );

  // href={`/path`} or src={`/path`}
  mark(
    next,
    next.replace(/(href|src)=\{`(\/[^`$]*?)`\}/g, (full, attr, p) => {
      if (!shouldPrefix(p)) return full;
      return `${attr}={withBase(\`${p}\`)}`;
    }),
  );

  // href={`/path/${var}.ext`} — template with expression
  mark(
    next,
    next.replace(/(href|src)=\{`(\/[^`]*?\$\{[^}]+\}[^`]*?)`\}/g, (full, attr, p) => {
      return `${attr}={withBase(\`${p}\`)}`;
    }),
  );

  // href={'/path'} or src={'/path'}
  mark(
    next,
    next.replace(/(href|src)=\{'(\/[^']*)'\}/g, (full, attr, p) => {
      return `${attr}={withBase('${p}')}`;
    }),
  );

  // Remaining src={`/path`} with only static parts missed earlier
  mark(
    next,
    next.replace(/(href|src)=\{`(\/[^`$]+)`\}/g, (full, attr, p) => {
      if (full.includes("withBase")) return full;
      return `${attr}={withBase(\`${p}\`)}`;
    }),
  );

  // href={`/`} alone
  mark(next, next.replace(/(href|src)=\{`\/`\}/g, (_, attr) => `${attr}={withBase('/')}`));

  // logoUrl: "/..."
  mark(
    next,
    next.replace(/logoUrl:\s*"(\/[^"]+)"/g, (full, p) => `logoUrl: withBase("${p}")`),
  );

  if (!changed) return content;

  if (!next.includes('from "@/utils/withBase"') && !next.includes("from '@/utils/withBase'")) {
    const importLine = 'import {withBase} from "@/utils/withBase";\n';
    if (next.startsWith("'use client'") || next.startsWith('"use client"')) {
      const lines = next.split("\n");
      lines.splice(1, 0, importLine.trimEnd());
      next = lines.join("\n");
    } else {
      next = importLine + next;
    }
  }

  return next;
}

for (const id of PROJECTS) {
  const srcDir = path.join(ROOT, "projects", id, "src");
  const files = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
      if (entry.name === "node_modules") continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(tsx|ts)$/.test(entry.name)) files.push(full);
    }
  }

  walk(srcDir);

  // copy withBase util
  const utilSrc = path.join(ROOT, "projects", "1", "src", "utils", "withBase.ts");
  const utilDest = path.join(ROOT, "projects", id, "src", "utils", "withBase.ts");
  fs.mkdirSync(path.dirname(utilDest), {recursive: true});
  fs.copyFileSync(utilSrc, utilDest);

  let count = 0;
  for (const file of files) {
    if (file.endsWith("withBase.ts")) continue;
    const original = fs.readFileSync(file, "utf8");
    const updated = transform(original);
    if (updated !== original) {
      fs.writeFileSync(file, updated);
      count++;
    }
  }

  console.log(`project ${id}: updated ${count} files`);
}
