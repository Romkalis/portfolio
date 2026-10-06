import {sitePreferences} from "@/data/preferences";

export function generateHreflangTags(pathname: string) {
  const baseUrl = `https://${sitePreferences.name}`;

  // Убираем языковой префикс, если он есть
  const basePath = pathname
    .replace(/^\/(en|it)/, '') // удаляет /en или /it
    .replace(/\/$/, ''); // удаляет trailing slash для нормализации

  // Формируем корректный путь с trailing slash
  const normalizedPath = basePath === '' ? '/' : `${basePath}/`;

  return [
    { hrefLang: 'en', href: `${baseUrl}/en${normalizedPath}` },
    { hrefLang: 'it', href: `${baseUrl}/it${normalizedPath}` },
    { hrefLang: 'de', href: `${baseUrl}${normalizedPath}` },
    { hrefLang: 'x-default', href: `${baseUrl}${normalizedPath}` }
  ];
}
