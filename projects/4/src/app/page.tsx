 import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import MainTop from "@/components/mainTop/MainTop";
 import DividerList from "@/components/dividerList/DividerList";
 import About from "@/components/about/About";
 import Reviews from "@/components/reviews/Reviews";
 import LastDeals from "@/components/LastDeals/LastDeals";
 import Offer from "@/components/Offer/Offer";

export const metadata: Metadata = {
  title: "Buy CS2, Dota 2, & Fortnite Skins & Currency – PixelPowerShop",
  description: "PixelPowerShop offers exclusive skins, credits, and items for CS2, dota 2, and Fortnite. Fast, secure delivery and 24/7 support. Shop now for great deals!",
  alternates: {
    canonical: `https://${sitePreferences.name}/`,
  },
  openGraph: {
    title: "Buy CS2, Dota 2, & Fortnite Skins & Currency – PixelPowerShop",
    description: "PixelPowerShop offers exclusive skins, credits, and items for CS2, dota 2, and Fortnite. Fast, secure delivery and 24/7 support. Shop now for great deals!",
    url: `https://${sitePreferences.name}/`,
    siteName: `${sitePreferences.name}`,
  },
};


 export default function Home() {

  return (
    <>
      <MainTop/>
      <DividerList />
      <LastDeals />
      <Offer/>
      <About/>
      <Reviews />
    </>
  );
}
