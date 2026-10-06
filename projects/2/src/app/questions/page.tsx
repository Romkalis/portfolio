import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import Warn from "@/components/Warning/Warning";
import QuestionsPage from "@/components/QuestionsPage/QuestionsPage";


export const metadata: Metadata = {
  title: "Questions fréquentes – Aide et réponses",
  description:
    "Retrouvez les réponses aux questions fréquentes : inscription, participation aux loteries, paiements, sécurité et utilisation du site. Consultez notre FAQ pour obtenir une assistance claire et rapide.",
  alternates: {
    canonical: `https://${sitePreferences.name}/questions/`,
  },
  openGraph: {
    title: "Questions fréquentes – Aide et réponses",
    description:
      "Explorez la section Questions fréquentes : informations utiles sur l’inscription, les paiements, la sécurité et l’utilisation du site.",
    url: `https://${sitePreferences.name}/questions/`,
    siteName: `${sitePreferences.name}`,
  },
};



export default function Home() {

  return (
    <>
      <QuestionsPage />
      <Warn />
    </>
  );
}
