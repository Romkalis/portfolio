import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import Games from "@/components/games/Games";
import WeeklyGame from "@/components/_weeklyGame/WeeklyGame";
import Demo from "@/components/demo/Demo";

export const metadata: Metadata = {
  title: "Discover and Enjoy a World of Games | AstraReels.com",
  description: "Explore a diverse library of exciting games designed for every player. From vibrant adventures to relaxing experiences — find your next favorite on AstraReels.com.",
  alternates: {
    canonical: `https://${sitePreferences.name}/play-our-games/`,
  },
  openGraph: {
    title: "Discover and Enjoy a World of Games | AstraReels.com",
    description: "Explore a diverse library of exciting games designed for every player. From vibrant adventures to relaxing experiences — find your next favorite on AstraReels.com.",
    url: `https://${sitePreferences.name}/play-our-games/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <main>
        <Games/>
        <WeeklyGame/>
        <Demo/>
      </main>
    </>
  );
}
