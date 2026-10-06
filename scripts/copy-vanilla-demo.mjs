#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { SANITIZE_PATTERNS } from "./demo-sanitize-patterns.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");

const VANILLA_DEMOS = [
  { id: "5", slug: "dreamfin" },
  { id: "6", slug: "design-ceh" },
  { id: "7", slug: "uralruin" },
];

const EXT = new Set([".html", ".css", ".js", ".webmanifest", ".xml"]);

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else if (EXT.has(path.extname(e.name))) files.push(full);
  }
  return files;
}

function collectHtmlNames(srcDir) {
  const names = new Set();
  for (const f of walk(srcDir)) {
    if (!f.endsWith(".html")) continue;
    names.add(path.basename(f));
    const rel = path.relative(srcDir, f).replace(/\\/g, "/");
    if (rel !== path.basename(f)) names.add(rel);
  }
  return names;
}

function resolvePageHref(hrefPath, base, htmlNames, srcDir) {
  if (!hrefPath.startsWith("/") || hrefPath.startsWith("//")) return hrefPath;

  const hashIdx = hrefPath.indexOf("#");
  const pathPart = hashIdx >= 0 ? hrefPath.slice(0, hashIdx) : hrefPath;
  const hash = hashIdx >= 0 ? hrefPath.slice(hashIdx) : "";

  if (pathPart === "/" || pathPart === "") return `${base}/${hash}`;

  const clean = pathPart.replace(/^\//, "");
  if (/\.[a-z0-9]+$/i.test(clean)) return `${base}/${clean}${hash}`;

  const withHtml = `${clean}.html`;
  if (htmlNames.has(withHtml) || fs.existsSync(path.join(srcDir, withHtml))) {
    return `${base}/${withHtml}${hash}`;
  }

  return `${base}/${clean}${hash}`;
}

function prefixSrcsetImgPaths(inner, base) {
  return inner.replace(/(^|, )\/img\//g, (_, sep) => `${sep}${base}/img/`);
}

function rewriteContent(content, base, htmlNames, srcDir) {
  let out = content;
  for (const [re, rep] of SANITIZE_PATTERNS) out = out.replace(re, rep);

  out = out.replace(/href="(\/[^"]*)"/g, (_, p) => `href="${resolvePageHref(p, base, htmlNames, srcDir)}"`);
  out = out.replace(/href='(\/[^']*)'/g, (_, p) => `href='${resolvePageHref(p, base, htmlNames, srcDir)}'`);
  // Markup embedded in JS bundles uses escaped quotes: href=\"/page\"
  out = out.replace(/href=\\"(\/[^"\\]*)\\"/g, (_, p) => `href=\\"${resolvePageHref(p, base, htmlNames, srcDir)}\\"`);

  out = out.replace(/src="\/([^"]*)"/g, (_, p) => `src="${base}/${p}"`);
  out = out.replace(/src='\/([^']*)'/g, (_, p) => `src='${base}/${p}'`);

  out = out.replace(/srcset="([^"]*)"/g, (_, inner) => `srcset="${prefixSrcsetImgPaths(inner, base)}"`);
  out = out.replace(/srcset='([^']*)'/g, (_, inner) => `srcset='${prefixSrcsetImgPaths(inner, base)}'`);

  out = out.replace(/url\(\.\.\/\.\.\/\.\.\/img\//g, `url(${base}/img/`);
  out = out.replace(/url\(\.\.\/\.\.\/img\//g, `url(${base}/img/`);

  // Skip urls already prefixed by the ../img/ rules above (avoids /demos/x/demos/x/).
  out = out.replace(/url\(\/(?!\/|demos\/)/g, `url(${base}/`);
  out = out.replace(/url\("\/(?!\/|demos\/)/g, `url("${base}/`);
  out = out.replace(/url\('\/(?!\/|demos\/)/g, `url('${base}/`);

  // Relative image paths in JS data ("../../../img/...") resolve against the page URL.
  out = out.replace(/(["'])(?:\.\.\/)+img\//g, `$1${base}/img/`);

  out = out.replace(/"\/img\//g, `"${base}/img/`);
  out = out.replace(/'\/img\//g, `'${base}/img/`);
  out = out.replace(/\\"\/img\//g, `\\"${base}/img/`);
  out = out.replace(/, \/img\//g, `, ${base}/img/`);

  return out;
}

for (const { id, slug } of VANILLA_DEMOS) {
  const srcDir = path.join(ROOT, "projects", id);
  const destDir = path.join(ROOT, "dist", "demos", slug);
  const base = `/demos/${slug}`;

  if (!fs.existsSync(srcDir)) {
    console.warn(`skip ${id}: missing ${srcDir}`);
    continue;
  }

  const htmlNames = collectHtmlNames(srcDir);
  let count = 0;

  if (fs.existsSync(destDir)) fs.rmSync(destDir, { recursive: true, force: true });
  fs.cpSync(srcDir, destDir, {
    recursive: true,
    filter: (src) => !src.includes(`${path.sep}node_modules${path.sep}`),
  });

  for (const file of walk(destDir)) {
    const raw = fs.readFileSync(file, "utf8");
    const next = rewriteContent(raw, base, htmlNames, srcDir);
    if (next !== raw) {
      fs.writeFileSync(file, next);
      count++;
    }
  }

  // A demo's own .htaccess may force HTTPS; that is decided once by the site's root
  // .htaccess (scripts/hosting), otherwise the demo breaks on a domain without SSL.
  const htaccess = path.join(destDir, ".htaccess");
  if (fs.existsSync(htaccess)) {
    const rules = fs.readFileSync(htaccess, "utf8");
    const stripped = rules.replace(
      /(#[^\n]*HTTPS[^\n]*\n)?(RewriteCond[^\n]*(HTTPS|X-Forwarded-Proto)[^\n]*\n)+RewriteRule[^\n]*https:\/\/[^\n]*\n/g,
      "# HTTPS redirect is handled by the site's root .htaccess\n",
    );
    if (stripped !== rules) fs.writeFileSync(htaccess, stripped);
  }

  console.log(`  • vanilla ${id} → demos/${slug} (${count} files patched)`);
}
