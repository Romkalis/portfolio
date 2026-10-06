import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import Warn from "@/components/Warning/Warning";
import ContactPage from "@/components/ContactPage/ContactPage";


export const metadata: Metadata = {
  title: "Contactez-nous – Service client et assistance",
  description:
    "Vous avez une question ou besoin d’aide ? Contactez notre équipe via le formulaire ou par téléphone. Nous sommes disponibles pour répondre à vos demandes concernant les paris en ligne, les bonus et l’utilisation de nos services.",
  alternates: {
    canonical: `https://${sitePreferences.name}/contact/`,
  },
  openGraph: {
    title: "Contactez-nous – Service client et assistance",
    description:
      "Besoin d’informations ou d’un support ? Retrouvez toutes nos coordonnées et contactez notre équipe directement via la page Contact.",
    url: `https://${sitePreferences.name}/contact/`,
    siteName: `${sitePreferences.name}`,
  },
};



export default function Home() {

  return (
    <>
      <ContactPage />
      <Warn />
    </>
  );
}
