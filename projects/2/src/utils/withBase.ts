const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix internal path with Next.js basePath (e.g. /demos/enjoygamesnow). */
export function withBase(path: string): string {
  if (!path || path.startsWith("http") || path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return BASE ? `${BASE}${normalized}` : normalized;
}
