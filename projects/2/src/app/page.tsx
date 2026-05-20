import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import MainTop from "@/components/mainTop/MainTop";
import ReviewsSlider from "@/components/ReviewsSlider/ReviewsSlider";
import PromoOne from "@/components/PromoOne/PromoOne";
import Platforms from "@/components/Platforms/Platforms";
import Counters from "@/components/Counters/Counters";
import Subscription from "@/components/Subscription/Subscription";
import AdvantagesCards from "@/components/advantagesCards/AdvantagesCards";
import Accordion from "@/components/accordion/Accordion";
import Warn from "@/components/Warning/Warning";
import News from "@/components/News/News";


export const metadata: Metadata = {
  title: "Meilleures plateformes de paris en ligne 2025 – Sites légaux, bonus et avis fiables",
  description: "Exemple de site vitrine portfolio : comparatifs et contenus fictifs sur des plateformes de démonstration, à titre illustratif uniquement.",
  alternates: {
    canonical: `https://${sitePreferences.name}/`,
  },
  openGraph: {
    title: "Meilleures plateformes de paris en ligne 2025 – Sites légaux, bonus et avis fiables",
    description: "Exemple de site vitrine portfolio : comparatifs et contenus fictifs sur des plateformes de démonstration, à titre illustratif uniquement.",
    url: `https://${sitePreferences.name}/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <MainTop/>
      <ReviewsSlider />
      <PromoOne />
      <Platforms />
      <News />
      <Counters />
      <Subscription />
      <AdvantagesCards />
      <Accordion />
      <Warn />
    </>
  );
}
