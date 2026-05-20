import type { Metadata } from "next";
import { sitePreferences } from "@/data/preferences";
import Contact from "@/components/contact/Contact";

export const metadata: Metadata = {
  title: "Contact Us – PixelPowerShop Support",
  description: "Have questions or need help with your order? Reach out to PixelPowerShop support for assistance with skins, credits, and in-game items for CS2, Dota 2, and Fortnite.",
  alternates: {
    canonical: `https://${sitePreferences.name}/our-contact/`,
  },
  openGraph: {
    title: "Contact Us – PixelPowerShop Support",
    description: "Have questions or need help with your order? Reach out to PixelPowerShop support for assistance with skins, credits, and in-game items for CS2, Dota 2, and Fortnite.",
    url: `https://${sitePreferences.name}/our-contact/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <main>
        <h1 className="visually-hidden">Contact Us – PixelPowerShop Support</h1>
        <Contact />
      </main>
    </>
  );
}
