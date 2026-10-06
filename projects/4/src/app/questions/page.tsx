import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import Accordion from "@/components/accordion/Accordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions – PixelPowerShop",
  description: "Find answers to your questions about ordering, payments, and delivery. Get all the information you need to buy skins and items for CS2, Dota 2, and Fortnite.",
  alternates: {
    canonical: `https://${sitePreferences.name}/questions/`,
  },
  openGraph: {
    title: "Frequently Asked Questions – PixelPowerShop",
    description: "Find answers to your questions about ordering, payments, and delivery. Get all the information you need to buy skins and items for CS2, Dota 2, and Fortnite.",
    url: `https://${sitePreferences.name}/questions/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <main className="container">
        <h1 className="visually-hidden">Frequently Asked Questions – PixelPowerShop</h1>
        <Accordion/>
      </main>
    </>
  );
}
