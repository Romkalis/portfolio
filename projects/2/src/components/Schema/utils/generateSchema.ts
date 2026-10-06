import { sitePreferences } from '@/data/preferences'

// Типы для схем
export type SchemaType = 'organization' | 'website' | 'webpage' | 'breadcrumb' | 'all'

export interface SchemaOptions {
  type: SchemaType
  language?: string
  pageUrl?: string
  pageTitle?: string
  pageDescription?: string
  includeBreadcrumbs?: boolean
}

// Базовый тип для всех схем
interface BaseSchema {
  '@type': string
  '@id': string
}

// Типы для конкретных схем
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface OrganizationSchema extends BaseSchema {
  '@type': 'Organization'
  name: string
  url: string
  logo: {
    '@type': 'ImageObject'
    url: string
    width: number
    height: number
  }
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  contactPoint: Array<{
    '@type': 'ContactPoint'
    telephone: string
    contactType: string
    areaServed: string[]
    availableLanguage: string[]
  }>
  sameAs: string[]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface WebsiteSchema extends BaseSchema {
  '@type': 'WebSite'
  url: string
  name: string
  description: string
  publisher: {
    '@id': string
  }
  potentialAction: {
    '@type': 'SearchAction'
    target: {
      '@type': 'EntryPoint'
      urlTemplate: string
    }
    'query-input': string
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface WebPageSchema extends BaseSchema {
  '@type': 'WebPage'
  url: string
  name: string
  description: string
  inLanguage: string
  isPartOf: {
    '@id': string
  }
  primaryImageOfPage: {
    '@type': 'ImageObject'
    url: string
    width: number
    height: number
  }
  datePublished: string
  dateModified: string
  breadcrumb?: {
    '@id': string
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface BreadcrumbSchema extends BaseSchema {
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    item: {
      '@id': string
      name: string
    }
  }>
}

// Объединенный тип для всех схем (используется в комментариях для документации)
// type SchemaItem = OrganizationSchema | WebsiteSchema | WebPageSchema | BreadcrumbSchema

/**
 * Получает текст на нужном языке из мультиязычного контента
 */
function getLocalizedContent(content: string | Record<string, string>, language: string = 'en'): string {
  if (typeof content === 'string') {
    return content
  }
  return content[language] || content.en || Object.values(content)[0] || ''
}

/**
 * Генерирует базовый URL с поддержкой языков
 */
function getBaseUrl(language?: string): string {
  const baseUrl = `https://${sitePreferences.domain}`
  return language && language !== 'en' ? `${baseUrl}/${language}` : baseUrl
}

/**
 * Генерирует схему организации
 */
export function generateOrganizationSchema(options: SchemaOptions = { type: 'organization' }) {
  const baseUrl = getBaseUrl(options.language)
  const logoUrl = `${baseUrl}${sitePreferences.logoUrl}`

  // Use a flexible reference to avoid TS errors when optional fields are missing
  const org = sitePreferences.organization as Record<string, unknown>

  // Build address only with existing fields
  const address: Record<string, unknown> = {}
  if (org['streetAddress']) address.streetAddress = org['streetAddress']
  if (org['addressLocality']) address.addressLocality = org['addressLocality']
  if (org['addressRegion']) address.addressRegion = org['addressRegion']
  if (org['postalCode']) address.postalCode = org['postalCode']
  if (org['addressCountry']) address.addressCountry = org['addressCountry']

  const hasAddress = Object.keys(address).length > 0

  // Build contact point only when relevant fields exist
  const contactPointItem: Record<string, unknown> = { '@type': 'ContactPoint' }
  if (org['telephone']) contactPointItem.telephone = org['telephone']
  if (org['contactType']) contactPointItem.contactType = org['contactType']

  // Optional arrays
  const areaServed = org['areaServed']
  if (Array.isArray(areaServed)) contactPointItem.areaServed = areaServed
  else if (typeof areaServed === 'string' && areaServed.length) contactPointItem.areaServed = [areaServed]

  const availableLanguage = org['availableLanguage']
  if (Array.isArray(availableLanguage)) contactPointItem.availableLanguage = availableLanguage
  else if (typeof availableLanguage === 'string' && availableLanguage.length)
    contactPointItem.availableLanguage = [availableLanguage]

  const hasContactPoint = Object.keys(contactPointItem).length > 1 // more than just @type

  // Optional sameAs/social links
  const socialMedia = org['socialMedia']
  const sameAs = Array.isArray(socialMedia) ? (socialMedia as unknown[]) : []

  return {
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: String(org['name'] ?? sitePreferences.name),
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
      width: sitePreferences.logoWidth,
      height: sitePreferences.logoHeight,
    },
    ...(hasAddress && {
      address: {
        '@type': 'PostalAddress',
        ...address,
      },
    }),
    ...(hasContactPoint && {
      contactPoint: [contactPointItem],
    }),
    ...(sameAs.length > 0 && { sameAs: sameAs as string[] }),
  }
}

/**
 * Генерирует схему веб-сайта
 */
export function generateWebsiteSchema(options: SchemaOptions = { type: 'website' }) {
  const baseUrl = getBaseUrl(options.language)

  return {
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: sitePreferences.organization.name,
    description: getLocalizedContent(sitePreferences.description, options.language),
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Генерирует схему веб-страницы
 */
export function generateWebPageSchema(options: SchemaOptions = { type: 'webpage' }) {
  const baseUrl = getBaseUrl(options.language)
  const pageUrl = options.pageUrl || baseUrl
  const pageTitle = options.pageTitle || getLocalizedContent(sitePreferences.title, options.language)
  const pageDescription = options.pageDescription || getLocalizedContent(sitePreferences.description, options.language)
  const logoUrl = `${baseUrl}${sitePreferences.logoUrl}`

  return {
    '@type': 'WebPage',
    '@id': `${pageUrl}/#webpage`,
    url: pageUrl,
    name: pageTitle,
    description: pageDescription,
    inLanguage: options.language || sitePreferences.language,
    isPartOf: {
      '@id': `${baseUrl}/#website`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: logoUrl,
      width: sitePreferences.logoWidth,
      height: sitePreferences.logoHeight,
    },
    datePublished: sitePreferences.datePublished,
    dateModified: sitePreferences.dateModified,
    ...(options.includeBreadcrumbs && {
      breadcrumb: {
        '@id': `${pageUrl}/#breadcrumb`,
      },
    }),
  }
}

/**
 * Генерирует схему хлебных крошек
 */
export function generateBreadcrumbSchema(options: SchemaOptions = { type: 'breadcrumb' }) {
  const baseUrl = getBaseUrl(options.language)
  const pageUrl = options.pageUrl || baseUrl

  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}/#breadcrumb`,
  }
}

/**
 * Генерирует полную схему со всеми элементами
 */
export function generateFullSchema(options: SchemaOptions = { type: 'all' }) {
  const baseUrl = getBaseUrl(options.language)
  const pageUrl = options.pageUrl || baseUrl

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemas: any[] = [
    generateWebsiteSchema(options),
    generateOrganizationSchema(options),
    generateWebPageSchema({ ...options, pageUrl, includeBreadcrumbs: true }),
  ]

  if (options.includeBreadcrumbs !== false) {
    schemas.push(generateBreadcrumbSchema({ ...options, pageUrl }))
  }

  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  }
}

/**
 * Главная функция генерации схемы
 */
export function generateSchema(options: SchemaOptions = { type: 'all' }) {
  switch (options.type) {
    case 'organization':
      return generateOrganizationSchema(options)
    case 'website':
      return generateWebsiteSchema(options)
    case 'webpage':
      return generateWebPageSchema(options)
    case 'all':
    default:
      return generateFullSchema(options)
  }
}

/**
 * Генерирует схему для конкретной страницы
 */
export function generatePageSchema(pagePath: string, options: Partial<SchemaOptions> = {}) {
  const baseUrl = getBaseUrl(options.language)
  const pageUrl = `${baseUrl}${pagePath}`

  return generateSchema({
    type: 'all',
    pageUrl,
    includeBreadcrumbs: true,
    ...options,
  })
}

/**
 * Генерирует схему для главной страницы
 */
export function generateHomepageSchema(options: Partial<SchemaOptions> = {}) {
  return generatePageSchema('/', {
    pageTitle: sitePreferences.title,
    pageDescription: sitePreferences.description,
    ...options,
  })
}
