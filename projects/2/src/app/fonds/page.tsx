import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import MainTop from "@/components/mainTop/MainTop";
import Counters from "@/components/Counters/Counters";
import Warn from "@/components/Warning/Warning";


export const metadata: Metadata = {
  title: "Gestion des fonds – Sécurité et transparence",
  description:
    "Découvrez comment les fonds sont gérés : séparation des comptes, protection des dépôts et retraits, transparence des opérations et conformité aux normes internationales. Une gestion responsable pour garantir la sécurité et la confiance des utilisateurs.",
  alternates: {
    canonical: `https://${sitePreferences.name}/fonds/`,
  },
  openGraph: {
    title: "Gestion des fonds – Sécurité et transparence",
    description:
      "Informations sur la gestion des fonds : sécurité des transactions, séparation des comptes et transparence des opérations.",
    url: `https://${sitePreferences.name}/fonds/`,
    siteName: `${sitePreferences.name}`,
  },
};



export default function Home() {

  return (
    <>
      <MainTop/>
      <Counters />
      <Warn />
    </>
  );
}
