import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import GamesTop from "@/components/GamesTop/GamesTop";
import MainContact from "@/components/MainContact/MainContact";
import Support from "@/components/Support/Support";
import AdvantagesList from "@/components/AdvantagesList/AdvantagesList";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import Games from "@/components/Games/Games";
import AdGames from "@/components/AdGames/AdGames";



export const metadata: Metadata = {
  title: "Explore Our Exciting Game Collection at EnjoyGamesNow",
  description: "EnjoyGamesNow offers a diverse collection of interactive and thrilling games. Whether you're playing solo or with friends, you'll always find something new to enjoy",
  alternates: {
    canonical: `https://${sitePreferences.name}/play-games/`,
  },
  openGraph: {
    title: "Explore Our Exciting Game Collection at EnjoyGamesNow",
    description: "EnjoyGamesNow offers a diverse collection of interactive and thrilling games. Whether you're playing solo or with friends, you'll always find something new to enjoy",
    url: `https://${sitePreferences.name}/play-games/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <GamesTop/>
      <Games />
      <AdGames />

      <div className="gradient-page">
        <MainContact/>
        <Support/>
        <AdvantagesList/>

        <Disclaimer />
      </div>
    </>
  );
}
