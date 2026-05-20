import {withBase} from "@/utils/withBase";
import {demoContacts} from "@/data/demoContacts";

export const sitePreferences = {
  name: "meilleurs-jeuxx.fr",
  domain: "meilleurs-jeuxx.fr",
  title: "Guide démo — plateformes de jeux en ligne (portfolio)",
  description: "Exemple de site vitrine : comparatifs, guides et contenus à titre de démonstration portfolio uniquement.",
  language: "fr",
  logoUrl: withBase("/assets-pictures/lGty67q/logotypes-icons/logo-a5q.webp"),
  logoWidth: 164,
  logoHeight: 100,
  datePublished: "2025-11-12",
  dateModified: "2025-11-12",
  address: {
    streetAddress: demoContacts.addressLines[0],
    addressLocality: demoContacts.company,
    addressRegion: demoContacts.addressLines[1],
    postalCode: "00000",
    addressCountry: demoContacts.addressLines[2],
  },
  organization: {
    name: "Meilleurs-Jeuxx Demo",
    telephone: demoContacts.phone,
    contactType: "customer service",
    socialMedia: [],
  },
}
