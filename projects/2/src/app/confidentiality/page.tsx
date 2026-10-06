import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import Warn from "@/components/Warning/Warning";

export const metadata: Metadata = {
  title: "Politique de Confidentialité – Gestion et protection des données personnelles | Parimaster",
  description:
    "Découvrez la Politique de Confidentialité de Parimaster : comment vos données personnelles sont collectées, utilisées, stockées et protégées conformément au RGPD et aux lois applicables. Transparence, sécurité et respect de votre vie privée.",
  alternates: {
    canonical: `https://${sitePreferences.name}/confidentiality/`,
  },
  openGraph: {
    title: "Politique de Confidentialité – Gestion et protection des données personnelles | Parimaster",
    description:
      "Consultez la Politique de Confidentialité de Parimaster : informations sur la collecte, l’utilisation et la protection de vos données personnelles, en conformité avec le RGPD et la législation en vigueur.",
    url: `https://${sitePreferences.name}/confidentiality/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
     <div className="politics container">
         <section>
           <h1 title="Politique de Confidentialité">Politique de Confidentialité</h1>
         </section>

         <section>
           <h2 title="1. Introduction">1. Introduction</h2>
           <p>
             Notre site de loterie en ligne est situé en Australie et respecte votre vie privée. Cette politique est conforme aux exigences de la loi de 1988 sur la protection de la vie privée et aux principes australiens de protection de la vie privée (APP). Nous collectons le minimum de données nécessaires pour participer aux tirages, vérifier les comptes et fournir nos services.
           </p>
         </section>

         <section>
           <h2 title="2. Collecte d'informations">2. Collecte d'informations</h2>
           <ul aria-label="Types d'informations collectées">
             <li>Prénom et nom</li>
             <li>E-mail</li>
             <li>Date de naissance</li>
             <li>Adresse (pour la réception des gains)</li>
             <li>Informations financières (pour les dépôts/retraits)</li>
             <li>Adresse IP et données de l'appareil</li>
           </ul>
         </section>

         <section>
           <h2 title="3. Utilisation des informations">3. Utilisation des informations</h2>
           <ul aria-label="Utilisations des informations">
             <li>Inscription et autorisation sur le site</li>
             <li>Gestion du compte</li>
             <li>Participation à la loterie et réception des prix</li>
             <li>Service client</li>
             <li>Respect des obligations légales</li>
           </ul>
         </section>

         <section>
           <h2 title="4. Stockage et protection des données">4. Stockage et protection des données</h2>
           <p>
             Nous utilisons des mesures de sécurité avancées pour protéger vos données contre tout accès non autorisé, perte ou divulgation. Toutes les données sont stockées cryptées sur des serveurs situés en Australie. Seuls les employés autorisés y ont accès.
           </p>
         </section>

         <section>
           <h2 title="5. Divulgation d'informations">5. Divulgation d'informations</h2>
           <p>
             Nous ne partageons pas vos données avec des tiers, sauf lorsque la loi l'exige (par exemple, demandes des forces de l'ordre) ou dans le cadre de transactions (systèmes de paiement).
           </p>
         </section>

         <section>
           <h2 title="6. Vos droits">6. Vos droits</h2>
           <ul aria-label="Droits des utilisateurs">
             <li>Demander une copie de vos données</li>
             <li>Corriger des données erronées</li>
             <li>Demander la suppression de vos données (lorsqu'il existe un motif légal)</li>
             <li>Retirer votre consentement au traitement des données</li>
           </ul>
         </section>

         <section>
           <h2 title="7. Modifications de la politique">7. Modifications de la politique</h2>
           <p>
             Nous sommes susceptibles de mettre à jour cette politique de confidentialité de temps à autre. Toute modification sera publiée sur cette page. Nous vous recommandons de la consulter régulièrement pour prendre connaissance des dernières versions.
           </p>
         </section>

         <section>
           <h2 title="8. Nous contacter">8. Nous contacter</h2>
           <p>Pour toute question ou pour exercer vos droits, veuillez nous contacter :</p>
           <ul aria-label="Coordonnées de contact">
             <li>Courriel : privacy@demo-portfolio.example</li>
             <li>Téléphone : +1 (000) 000-0000</li>
             <li>Adresse du siège social : 123 Avenue des Champs-Élysées, 75008 Paris, France</li>
           </ul>
         </section>
       <Warn />
     </div>
    </>
  );
}
