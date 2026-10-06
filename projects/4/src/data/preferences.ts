import {withBase} from "@/utils/withBase";
import {demoContacts} from "@/data/demoContacts";

export const sitePreferences = {
  name: "pixelspowershop.com",
  domain: "pixelspowershop.com",
  title: "Buy CS2, Dota 2, & Fortnite Skins & Currency – PixelPowerShop",
  description: "PixelPowerShop offers exclusive skins, credits, and items for CS2, dota 2, and Fortnite. Fast, secure delivery and 24/7 support. Shop now for great deals!",
  language: "en",
  logoUrl: withBase("/asset-files/akjsd5/logotypes-icons/site-logo.svg"),
  logoWidth: 268,
  logoHeight: 30,
  datePublished: "2025-11-10",
  dateModified: "2025-11-10",
  organization: {
    name: "PixelPowerShop",
    telephone: demoContacts.phone,
    contactType: "customer service",
    socialMedia: [],
  },
}
