import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import MainContact from "@/components/MainContact/MainContact";
import Support from "@/components/Support/Support";
import AdvantagesList from "@/components/AdvantagesList/AdvantagesList";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import RegistrationTop from "@/components/RegistrationTop/RegistrationTop";


export const metadata: Metadata = {
  title: "Register on EnjoyGamesNow - Join the Fun and Start Playing!",
  description: "Sign up on EnjoyGamesNow to explore a wide range of social games. Join our community, access exciting features, and start your adventure today!",
  alternates: {
    canonical: `https://${sitePreferences.name}/registration/`,
  },
  openGraph: {
    title: "Register on EnjoyGamesNow - Join the Fun and Start Playing!",
    description: "Sign up on EnjoyGamesNow to explore a wide range of social games. Join our community, access exciting features, and start your adventure today!",
    url: `https://${sitePreferences.name}/registration/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <h1 className="visually-hidden">
        Register on EnjoyGamesNow - Join the Fun and Start Playing!
      </h1>
      <RegistrationTop />
      <div className="gradient-page">
        <MainContact/>
        <Support/>
        <AdvantagesList/>

        <Disclaimer />
      </div>
    </>
  );
}
