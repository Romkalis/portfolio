import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import MainContact from "@/components/MainContact/MainContact";
import Support from "@/components/Support/Support";
import AdvantagesList from "@/components/AdvantagesList/AdvantagesList";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import AboutMain from "@/components/AboutMain/AboutMain";
import AboutSpecial from "@/components/AboutSpecial/AboutSpecial";
import AboutMission from "@/components/AboutMission/AboutMission";
import AboutCore from "@/components/AboutCore/AboutCore";
import AboutResponsible from "@/components/AboutResponsible/AboutResponsible";


export const metadata: Metadata = {
  title: "Learn More About EnjoyGamesNow and Our Passion for Gaming",
  description: "We’re dedicated to creating a fun and engaging platform for gamers of all types. Join us and be part of a community that values creativity and excitement.",
  alternates: {
    canonical: `https://${sitePreferences.name}/about/`,
  },
  openGraph: {
    title: "Learn More About EnjoyGamesNow and Our Passion for Gaming",
    description: "We’re dedicated to creating a fun and engaging platform for gamers of all types. Join us and be part of a community that values creativity and excitement.",
    url: `https://${sitePreferences.name}/about/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <AboutMain />
      <AboutSpecial />
      <AboutMission />
      <AboutCore />
      <AboutResponsible />
      <div className="gradient-page">
        <MainContact/>
        <Support/>
        <AdvantagesList/>

        <Disclaimer />
      </div>
    </>
  );
}
