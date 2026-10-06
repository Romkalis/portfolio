import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import Contact from "@/components/contact/Contact";

export const metadata: Metadata = {
  title: "Get in Touch with the AstraReels Team — We’re Here to Help You",
  description: "Have questions or feedback? The AstraReels.com team is here to help. Reach out to us for support, general inquiries — we’re always happy to connect with our players",
  alternates: {
    canonical: `https://${sitePreferences.name}/contact-us/`,
  },
  openGraph: {
    title: "Get in Touch with the AstraReels Team — We’re Here to Help You",
    description: "Have questions or feedback? The AstraReels.com team is here to help. Reach out to us for support, general inquiries — we’re always happy to connect with our players",
    url: `https://${sitePreferences.name}/contact-us/`,
    siteName: `${sitePreferences.name}`,
  },
};

export default function Home() {

  const lang = 'en'
  return (
    <main>
      <Contact lang={lang}/>
    </main>
  );
}
