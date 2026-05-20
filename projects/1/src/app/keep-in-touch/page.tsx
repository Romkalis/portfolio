import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import MainContact from "@/components/MainContact/MainContact";
import Support from "@/components/Support/Support";
import AdvantagesList from "@/components/AdvantagesList/AdvantagesList";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import ContactTop from "@/components/ContactTop/ContactTop";
import ContactGrid from "@/components/ContactGrid/ContactGrid";


export const metadata: Metadata = {
  title: "Get in Touch with EnjoyGamesNow for Support and Inquiries",
  description: "Have questions or need help? Reach out to our friendly support team at EnjoyGamesNow. We're here to assist with any inquiries and ensure you have the best experience.",
  alternates: {
    canonical: `https://${sitePreferences.name}/keep-in-touch/`,
  },
  openGraph: {
    title: "Get in Touch with EnjoyGamesNow for Support and Inquiries",
    description: "Have questions or need help? Reach out to our friendly support team at EnjoyGamesNow. We're here to assist with any inquiries and ensure you have the best experience.",
    url: `https://${sitePreferences.name}/keep-in-touch/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <ContactTop />
      <ContactGrid />
      <div className="gradient-page">
        <MainContact/>
        <Support/>
        <AdvantagesList/>

        <Disclaimer />
      </div>
    </>
  );
}
