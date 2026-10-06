
import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import Catalog from "@/components/Catalog/Catalog";

export const metadata: Metadata = {
  title: "Exclusive Skins & Game Currency for CS2, Dota 2, Fortnite",
  description: "Browse a wide range of skins, in-game currency, and items for CS2, Dota 2, and Fortnite. Fast delivery and top-quality products at PixelPowerShop.",
  alternates: {
    canonical: `https://${sitePreferences.name}/catalog/`,
  },
  openGraph: {
    title: "Exclusive Skins & Game Currency for CS2, Dota 2, Fortnite",
    description: "Browse a wide range of skins, in-game currency, and items for CS2, Dota 2, and Fortnite. Fast delivery and top-quality products at PixelPowerShop.",
    url: `https://${sitePreferences.name}/catalog/`,
    siteName: `${sitePreferences.name}`,
  },
};





 export default function Home() {

  return (
    <>
      <main className="container">
        <h1 className="visually-hidden">
          Exclusive Skins & Game Currency for CS2, Dota 2, Fortnite
        </h1>
        <Catalog />
      </main>
    </>
  );
}
