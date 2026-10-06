import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import Warn from "@/components/Warning/Warning";
import Tourinros from "@/components/Tourinros/Tourinros";


export const metadata: Metadata = {
  title: "Tournois en ligne – Compétitions et classements",
  description:
    "Découvrez les tournois organisés : participez à des compétitions exclusives, consultez les classements en temps réel et gagnez des récompenses. Jouez en toute sécurité et profitez d’une expérience compétitive unique.",
  alternates: {
    canonical: `https://${sitePreferences.name}/tournois/`,
  },
  openGraph: {
    title: "Tournois en ligne – Compétitions et classements",
    description:
      "Participez aux tournois : défiez d’autres joueurs, suivez les résultats et remportez des prix exclusifs.",
    url: `https://${sitePreferences.name}/tournois/`,
    siteName: `${sitePreferences.name}`,
  },
};



export default function Home() {

  return (
    <>
      <Tourinros />
      <Warn />
    </>
  );
}
