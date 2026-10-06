import {sitePreferences} from "@/data/preferences";
import {demoContacts} from "@/data/demoContacts";

interface SchemaProps {
  pathname?: string;
}

export default function Schema({pathname = "/"}: SchemaProps) {
  const isMainpage = pathname === "/";
  const siteUrl = `https://${sitePreferences.domain}`;

  return (
    <>
      {isMainpage && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `${siteUrl}/#webpage`,
                url: `${siteUrl}/`,
                name: sitePreferences.title,
                description: sitePreferences.description,
                inLanguage: sitePreferences.language,
                isPartOf: {"@id": `${siteUrl}/#website`},
                primaryImageOfPage: {
                  "@type": "ImageObject",
                  url: `${siteUrl}${sitePreferences.logoUrl}`,
                  width: sitePreferences.logoWidth,
                  height: sitePreferences.logoHeight,
                },
                datePublished: sitePreferences.datePublished,
                dateModified: sitePreferences.dateModified,
              },
              {
                "@type": "Organization",
                "@id": `${siteUrl}/#organization`,
                name: sitePreferences.organization.name,
                url: siteUrl,
                logo: {
                  "@type": "ImageObject",
                  url: `${siteUrl}${sitePreferences.logoUrl}`,
                  width: sitePreferences.logoWidth,
                  height: sitePreferences.logoHeight,
                },
                address: {
                  "@type": "PostalAddress",
                  streetAddress: demoContacts.addressLines[0],
                  addressLocality: demoContacts.addressLines[1],
                  addressCountry: demoContacts.addressLines[2],
                },
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: demoContacts.phone,
                    email: demoContacts.email,
                    contactType: "customer service",
                  },
                ],
              },
            ],
          })}
        </script>
      )}

      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="twitter:card" content={sitePreferences.logoUrl} />
      <meta name="twitter:title" content={`${sitePreferences.name} - ${sitePreferences.title}`} />
      <meta name="twitter:description" content={sitePreferences.description} />
      <meta name="twitter:image" content={sitePreferences.logoUrl} />
      <meta property="og:image" content={sitePreferences.logoUrl} />
      <meta property="og:type" content="website" />
    </>
  );
}

export {Schema};
