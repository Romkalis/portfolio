import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import MainContact from "@/components/MainContact/MainContact";
import Support from "@/components/Support/Support";
import AdvantagesList from "@/components/AdvantagesList/AdvantagesList";
import Disclaimer from "@/components/Disclaimer/Disclaimer";
import LeadersMain from "@/components/LeadersMain/LeadersMain";
import LeadersTable from "@/components/LeadersTable/LeadersTable";


export const metadata: Metadata = {
  title: "Check Out the Top Players and Rankings at EnjoyGamesNow",
  description: "See who's leading the pack on EnjoyGamesNow’s leaderboards! Track achievements, compare your scores, and challenge others for a spot at the top.",
  alternates: {
    canonical: `https://${sitePreferences.name}/leaders/`,
  },
  openGraph: {
    title: "Check Out the Top Players and Rankings at EnjoyGamesNow",
    description: "See who's leading the pack on EnjoyGamesNow’s leaderboards! Track achievements, compare your scores, and challenge others for a spot at the top.",
    url: `https://${sitePreferences.name}/leaders/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>

      <LeadersMain />
      <LeadersTable />

      <div className="gradient-page">
        <MainContact/>
        <Support/>
        <AdvantagesList/>

        <Disclaimer />
      </div>
    </>
  );
}
