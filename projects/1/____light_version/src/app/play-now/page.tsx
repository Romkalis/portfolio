import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import MainContact from "@/components/MainContact/MainContact";
import Support from "@/components/Support/Support";
import AdvantagesList from "@/components/AdvantagesList/AdvantagesList";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import PlayNowPageTop from "@/components/PlayNowPageTop/PlayNowPageTop";


export const metadata: Metadata = {
  title: "Login to EnjoyGamesNow - Access Your Account and Play Now!",
  description: "Log in to EnjoyGamesNow to track your progress, join new games, and enjoy exciting challenges with other players. Your gaming experience awaits!",
  alternates: {
    canonical: `https://${sitePreferences.name}/play-now/`,
  },
  openGraph: {
    title: "Login to EnjoyGamesNow - Access Your Account and Play Now!",
    description: "Log in to EnjoyGamesNow to track your progress, join new games, and enjoy exciting challenges with other players. Your gaming experience awaits!",
    url: `https://${sitePreferences.name}/play-now/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <h1 className="visually-hidden">
        Login to EnjoyGamesNow - Access Your Account and Play Now!
      </h1>
      <PlayNowPageTop />
      <div className="gradient-page">
        <MainContact/>
        <Support/>
        <AdvantagesList/>

        <Disclaimer />
      </div>
    </>
  );
}
