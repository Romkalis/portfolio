import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import Warn from "@/components/Warning/Warning";

export const metadata: Metadata = {
  title: "Politique relative aux cookies – Utilisation et gestion",
  description:
    "Découvrez la Politique relative aux cookies: types de cookies utilisés, finalités (nécessaires, analyse, publicité, réseaux sociaux) et options de gestion. Transparence et contrôle pour une navigation en toute confiance.",
  alternates: {
    canonical: `https://${sitePreferences.name}/cookies/`,
  },
  openGraph: {
    title: "Politique relative aux cookies – Utilisation et gestion",
    description:
      "Consultez la Politique relative aux cookies: informations sur l’utilisation, la gestion et vos choix concernant les cookies.",
    url: `https://${sitePreferences.name}/cookies/`,
    siteName: `${sitePreferences.name}`,
  },
};



export default function Home() {

  return (
    <>
     <div className="politics container">
         <section>
           <h1 title="Politique relative aux cookies">Politique relative aux cookies</h1>
         </section>

         <section>
           <h2 title="Introduction">Introduction</h2>
           <p>
             Bienvenue sur le site web de la Loterie australienne. Nous utilisons des cookies pour assurer le bon fonctionnement de notre site,
             à des fins d'analyse et de personnalisation du contenu. Cette politique explique quels types de cookies nous utilisons,
             pourquoi nous les utilisons et comment vous pouvez les contrôler.
           </p>
         </section>

         <section>
           <h2 title="Que sont les cookies ?">Que sont les cookies ?</h2>
           <p>
             Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous consultez des sites web.
             Ils permettent au site web de mémoriser vos actions et vos préférences.
           </p>
         </section>

         <section>
           <h2 title="Quels cookies utilisons-nous">Quels cookies utilisons-nous</h2>
           <ul aria-label="Types de cookies utilisés">
             <li><strong>Cookies nécessaires :</strong> Ils sont indispensables au bon fonctionnement du site, comme la connexion ou les achats.</li>
             <li><strong>Cookies d’analyse :</strong> Ils nous aident à comprendre comment les visiteurs interagissent avec notre site afin de l’améliorer.</li>
             <li><strong>Cookies publicitaires :</strong> Ils sont utilisés pour vous proposer des publicités plus pertinentes en fonction de vos centres d’intérêt.</li>
             <li><strong>Cookies de réseaux sociaux :</strong> Ils vous permettent de partager notre contenu sur les réseaux sociaux et peuvent suivre votre comportement en dehors de notre site.</li>
           </ul>
         </section>

         <section>
           <h2 title="Gestion des cookies">Gestion des cookies</h2>
           <p>
             Vous pouvez contrôler l’utilisation des cookies via les paramètres de votre navigateur ou l’interface de notre site web.
             Voici les principales méthodes :
           </p>
           <ul aria-label="Méthodes de gestion des cookies">
             <li>Utilisez notre formulaire de consentement sur la page d’accueil pour accepter ou refuser des catégories spécifiques de cookies.</li>
             <li>Les paramètres de votre navigateur vous permettent de bloquer ou de supprimer tous les cookies.</li>
           </ul>
         </section>

         <section>
           <h2 title="Refuser les cookies">Refuser les cookies</h2>
           <p>
             Si vous choisissez de désactiver certains cookies, certaines fonctionnalités du site pourraient ne pas fonctionner correctement.
             Par exemple, vous pourriez ne pas pouvoir vous connecter à votre compte ou enregistrer vos préférences.
           </p>
         </section>

         <section>
           <h2 title="Mises à jour des politiques">Mises à jour des politiques</h2>
           <p>
             Nous sommes susceptibles de mettre à jour cette politique de temps à autre afin de nous conformer aux exigences légales
             ou à l'évolution de nos pratiques. Nous vous encourageons à consulter cette page régulièrement.
           </p>
         </section>

         <section>
           <h2 title="Coordonnées">Coordonnées</h2>
           <p>Si vous avez des questions ou des demandes concernant notre utilisation des cookies, veuillez nous contacter :</p>
           <ul aria-label="Coordonnées de contact">
             <li>Courriel : privacy@demo-portfolio.example</li>
           </ul>
         </section>
        <Warn />
     </div>
    </>
  );
}
