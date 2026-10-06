import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import MainContact from "@/components/MainContact/MainContact";
import Support from "@/components/Support/Support";
import AdvantagesList from "@/components/AdvantagesList/AdvantagesList";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import PrivacyTop from "@/components/PrivacyTop/PrivacyTop";
import PrivacyInfo from "@/components/PrivacyInfo/PrivacyInfo";
import PrivacyDisclaimer from "@/components/PrivacyDisclaimer/PrivacyDisclaimer";


export const metadata: Metadata = {
  title: "Protecting Your Privacy at EnjoyGamesNow - Our Commitment",
  description: "At EnjoyGamesNow, your privacy is important to us. Learn how we collect, store, and use your personal information, ensuring a secure and trusted gaming experience.",
  alternates: {
    canonical: `https://${sitePreferences.name}/privacy-giude/`,
  },
  openGraph: {
    title: "Protecting Your Privacy at EnjoyGamesNow - Our Commitment",
    description: "At EnjoyGamesNow, your privacy is important to us. Learn how we collect, store, and use your personal information, ensuring a secure and trusted gaming experience.",
    url: `https://${sitePreferences.name}/privacy-giude/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <PrivacyTop />
      <PrivacyInfo />
      <PrivacyDisclaimer />
      <div className="gradient-page">
        <MainContact/>
        <Support/>
        <AdvantagesList/>
        <Disclaimer />
      </div>
    </>
  );
}
