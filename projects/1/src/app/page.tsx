import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import MainTop from "@/components/mainTop/MainTop";
import RotatingCards from "@/components/RotatingCards/RotatingCards";
import Ad from "@/components/Ad/Ad";
import MainContact from "@/components/MainContact/MainContact";
import Support from "@/components/Support/Support";
import AdvantagesList from "@/components/AdvantagesList/AdvantagesList";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import News from "@/components/News/News";


export const metadata: Metadata = {
  title: " Discover the Best Games and Enjoy Endless Fun at EnjoyGamesNow",
  description: " Explore a wide variety of exciting games at EnjoyGamesNow. Join our community, connect with friends, and dive into a world of adventure, excitement, and endless fun.",
  alternates: {
    canonical: `https://${sitePreferences.name}/`,
  },
  openGraph: {
    title: " Discover the Best Games and Enjoy Endless Fun at EnjoyGamesNow",
    description: " Explore a wide variety of exciting games at EnjoyGamesNow. Join our community, connect with friends, and dive into a world of adventure, excitement, and endless fun.",
    url: `https://${sitePreferences.name}/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <MainTop/>
      <RotatingCards/>
      <Ad/>
      <div className="gradient-page">
        <MainContact/>
        <Support/>
        <AdvantagesList/>
        <News />

        <Disclaimer />
      </div>
    </>
  );
}
