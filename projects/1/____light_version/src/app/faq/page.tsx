import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import MainContact from "@/components/MainContact/MainContact";
import Support from "@/components/Support/Support";
import AdvantagesList from "@/components/AdvantagesList/AdvantagesList";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import FaqPage from "@/components/FaqPage/FaqPage";


export const metadata: Metadata = {
  title: "EnjoyGamesNow FAQ - Answers to Your Common Questions",
  description: "Have questions about EnjoyGamesNow? Check out our FAQ for answers to common queries, including game features, account management, and more!",
  alternates: {
    canonical: `https://${sitePreferences.name}/faq/`,
  },
  openGraph: {
    title: "EnjoyGamesNow FAQ - Answers to Your Common Questions",
    description: "Have questions about EnjoyGamesNow? Check out our FAQ for answers to common queries, including game features, account management, and more!",
    url: `https://${sitePreferences.name}/faq/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <FaqPage />
      <div className="gradient-page">
        <MainContact/>
        <Support/>
        <AdvantagesList/>

        <Disclaimer />
      </div>
    </>
  );
}
