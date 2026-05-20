import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import MainContact from "@/components/MainContact/MainContact";
import Support from "@/components/Support/Support";
import AdvantagesList from "@/components/AdvantagesList/AdvantagesList";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import TermsTop from "@/components/TermsTop/TermsTop";
import TermsDisclaimer from "@/components/TermsDisclaimer/TermsDisclaimer";
import TermsList from "@/components/TermsList/TermsList";


export const metadata: Metadata = {
  title: " Discover the Best Games and Enjoy Endless Fun at EnjoyGamesNow",
  description: " Explore a wide variety of exciting games at EnjoyGamesNow. Join our community, connect with friends, and dive into a world of adventure, excitement, and endless fun.",
  alternates: {
    canonical: `https://${sitePreferences.name}/terms-giude/`,
  },
  openGraph: {
    title: " Discover the Best Games and Enjoy Endless Fun at EnjoyGamesNow",
    description: " Explore a wide variety of exciting games at EnjoyGamesNow. Join our community, connect with friends, and dive into a world of adventure, excitement, and endless fun.",
    url: `https://${sitePreferences.name}/terms-giude/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <TermsTop />
      <TermsDisclaimer />
      <TermsList />
      <div className="gradient-page">
        <MainContact/>
        <Support/>
        <AdvantagesList/>
        <Disclaimer />
      </div>
    </>
  );
}
