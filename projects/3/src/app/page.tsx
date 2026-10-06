import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import MainTop from "@/components/mainTop/MainTop";
import Games from "@/components/games/Games";
import Contact from "@/components/contact/Contact";
import WeeklyGame from "@/components/_weeklyGame/WeeklyGame";
import Demo from "@/components/demo/Demo";
import Reviews from "@/components/reviews/Reviews";
import Survey from "@/components/Survey/Survey";
import Disclaimer from "@/components/disclaimer/Disclaimer";

export const metadata: Metadata = {
  title: "Top Rated & Safe Games — One of the Best Lists | AstraReels.com",
  description: "Enjoy a vibrant collection of games carefully selected for every taste. Explore new titles and experience smooth, secure, and exciting gameplay on AstraReels.com.",
  alternates: {
    canonical: `https://${sitePreferences.name}/`,
  },
  openGraph: {
    title: "Top Rated & Safe Games — One of the Best Lists | AstraReels.com",
    description: "Enjoy a vibrant collection of games carefully selected for every taste. Explore new titles and experience smooth, secure, and exciting gameplay on AstraReels.com.",
    url: `https://${sitePreferences.name}/`,
    siteName: `${sitePreferences.name}`,
  },
};

export default function Home() {

const lang = 'en'
  return (
    <>
      <MainTop/>
      <Games />
      <WeeklyGame />
      <Demo />
      <Reviews />
      <Survey />
      <Contact lang={lang}/>
      <Disclaimer lang={lang} />
    </>
  );
}
