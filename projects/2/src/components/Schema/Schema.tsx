// import {generateSchema, SchemaOptions} from '@/components/Schema/utils/generateSchema';
import {sitePreferences} from "@/data/preferences";
// import Script from "next/script";



interface SchemaProps {
  pathname?: string
}

export default function Schema(
  { pathname = '/' }: SchemaProps
) {
  const isMainpage = pathname === '/'
  const absoluteLogoUrl = sitePreferences.logoUrl.startsWith('http')
    ? sitePreferences.logoUrl
    : `https://${sitePreferences.domain}${sitePreferences.logoUrl}`
  // const twitterUrl = sitePreferences.organization?.socialMedia?.find((u: string) => u.includes('twitter.com'))
  // const twitterHandle = twitterUrl ? ('@' + twitterUrl.split('/').filter(Boolean).pop()) : sitePreferences.organization?.name

  // Prepare conditional fields from preferences
  // const socialMedia = Array.isArray(sitePreferences.organization?.socialMedia)
  //   ? sitePreferences.organization.socialMedia.filter((u: string) => typeof u === 'string' && u.trim().length > 0)
  //   : []
  const language = typeof sitePreferences.language === 'string' && sitePreferences.language.trim().length > 0
    ? sitePreferences.language.trim()
    : undefined
  const telephone = typeof sitePreferences.organization?.telephone === 'string' && sitePreferences.organization.telephone.trim().length > 0
    ? sitePreferences.organization.telephone.trim()
    : undefined
  const contactType = typeof sitePreferences.organization?.contactType === 'string' && sitePreferences.organization.contactType.trim().length > 0
    ? sitePreferences.organization.contactType.trim()
    : undefined
  const addressEntries = Object.entries(sitePreferences.address || {}).filter(([, v]) => typeof v === 'string' && v.trim().length > 0)
  const address = addressEntries.length > 0 ? Object.fromEntries(addressEntries) as Record<string, string> : undefined


  // const schema = generateSchema(options)

  return (
    <>
      {isMainpage && (
        <script type="application/ld+json">
          {(() => {
            const webPage = {
              "@type": "WebPage",
              "@id": `https://${sitePreferences.domain}/#webpage`,
              "url": `https://${sitePreferences.domain}/`,
              "name": `${sitePreferences.title}`,
              "description": `${sitePreferences.description}`,
              ...(language ? { "inLanguage": language } : {}),
              "isPartOf": {
                "@id": `https://${sitePreferences.domain}/#website`
              },
              "primaryImageOfPage": {
                "@type": "ImageObject",
                "url": absoluteLogoUrl,
                "width": sitePreferences.logoWidth,
                "height": sitePreferences.logoHeight
              },
              "datePublished": `${sitePreferences.datePublished}`,
              "dateModified": `${sitePreferences.dateModified}`
            }

            const organization: Record<string, unknown> = {
              "@type": "Organization",
              "@id": `https://${sitePreferences.domain}/#organization`,
              "name": `${sitePreferences.organization.name}`,
              "url": `https://${sitePreferences.domain}/`,
              "logo": {
                "@type": "ImageObject",
                "url": absoluteLogoUrl,
                "width": sitePreferences.logoWidth,
                "height": sitePreferences.logoHeight
              }
            }

            // if (socialMedia.length > 0) {
            //   organization.sameAs = socialMedia
            // }

            if (address) {
              organization.address = {
                "@type": "PostalAddress",
                ...address
              }
            }

            if (telephone) {
              const contactPoint: Record<string, unknown> = {
                "@type": "ContactPoint",
                "telephone": telephone
              }
              if (contactType) contactPoint.contactType = contactType
              if (language) contactPoint.availableLanguage = language
              organization.contactPoint = [contactPoint]
            }

            return JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [webPage, organization]
            })
          })()}
        </script>
      )}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

    </>
  )
}
export {Schema}
