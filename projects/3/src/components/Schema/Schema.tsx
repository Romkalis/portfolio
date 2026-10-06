import {generateSchema, SchemaOptions} from '@/components/Schema/utils/generateSchema';
import {sitePreferences} from "@/data/preferences";
import Script from "next/script";



interface SchemaProps {
  options?: SchemaOptions
  pathname?: string
}

export default function Schema({ options = { type: 'all' }, pathname = '/' }: SchemaProps) {
  const isMainpage = pathname === '/'

  const schema = generateSchema(options)

  return (
    <>
      {isMainpage && (
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema)
          }}
          strategy="beforeInteractive"
        />
      )}


      <meta name="DC.title" content={sitePreferences.name}/>
      <meta name="copyright" content={sitePreferences.name}/>
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="twitter:card" content={sitePreferences.logoUrl} />
      <meta name="twitter:site" content={`https://twitter.com/${sitePreferences.organization.name}`} />
      <meta name="twitter:title" content={`${sitePreferences.name} - ${sitePreferences.title}`} />
      <meta name="twitter:description" content={`${sitePreferences.name} - ${sitePreferences.description}`} />
      <meta name="twitter:image" content={sitePreferences.logoUrl}/>
      <meta property="og:image" content={sitePreferences.logoUrl} />
      <meta property="og:type" content={'site'}/>
    </>
  )
}

// Экспорт для удобства использования
export {Schema}
