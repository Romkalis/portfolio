import {withBase} from "@/utils/withBase";
import {demoContacts} from "@/data/demoContacts";

export const sitePreferences = {
  name: "enjoygamesnow.com",
  domain: "enjoygamesnow.com",
  title: " Discover the Best Games and Enjoy Endless Fun at EnjoyGamesNow",
  description: " Explore a wide variety of exciting games at EnjoyGamesNow. Join our community, connect with friends, and dive into a world of adventure, excitement, and endless fun.",
  language: "en",
  logoUrl: withBase("/eg-docs/logo-bend.webp"),
  logoWidth: 64,
  logoHeight: 64,
  datePublished: "2025-12-12",
  dateModified: "2025-12-12",
  address: {
    streetAddress: demoContacts.addressLines[0],
    addressLocality: demoContacts.company,
    addressRegion: demoContacts.addressLines[1],
    postalCode: "00000",
    addressCountry: demoContacts.addressLines[2],
  },
  organization: {
    name: "EnjoyGamesNow",
    telephone: demoContacts.phone,
    contactType: "customer service",
    socialMedia: [],
  },
}
