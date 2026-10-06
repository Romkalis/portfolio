import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";

export const metadata: Metadata = {
  title: "Conditions d'utilisation – Règles et obligations légales",
  description:
    "Prenez connaissance des Conditions d'utilisation : règles de participation aux loteries, modalités de paiement, responsabilité, confidentialité et cadre juridique. Utilisez notre site en toute transparence et sécurité.",
  alternates: {
    canonical: `https://${sitePreferences.name}/condition/`,
  },
  openGraph: {
    title: "Conditions d'utilisation – Règles et obligations légales",
    description:
      "Découvrez les Conditions d'utilisation : fonctionnement du service, obligations légales, protection des données et limitations de responsabilité.",
    url: `https://${sitePreferences.name}/condition/`,
    siteName: `${sitePreferences.name}`,
  },
};



export default function Home() {

  return (
    <>
     <div className="politics container">

       <section>
         <h1 title="Conditions d'utilisation">Conditions d'utilisation</h1>
         <p>
           Bienvenue sur notre site Web. En utilisant notre site Web, vous acceptez d'être lié par les conditions d'utilisation suivantes.
           Veuillez les lire attentivement avant de participer aux loteries ou d'utiliser notre service.
         </p>
       </section>

       <section>
         <h2 title="1. Dispositions générales">1. Dispositions générales</h2>
         <ul aria-label="Liste des dispositions générales">
           <li>1.1. Ces termes régissent votre utilisation du site Web et la participation aux loteries en ligne menées via notre ressource.</li>
           <li>1.2. En continuant à utiliser ce site Web, vous confirmez que vous avez 18 ans ou plus et avez le droit de conclure des accords juridiquement contraignants.</li>
           <li>1.3. Nous nous réservons le droit de modifier ces conditions à tout moment sans préavis. Nous vous recommandons de vérifier périodiquement cette page pour vous familiariser avec la version actuelle.</li>
         </ul>
       </section>

       <section>
         <h2 title="2. Participation à la loterie">2. Participation à la loterie</h2>
         <ul aria-label="Règles de participation à la loterie">
           <li>2.1. Tous les participants doivent avoir l'âge légal conformément aux lois de leur pays de résidence.</li>
           <li>2.2. Chaque billet est acheté sous réserve des termes et conditions énoncés sur le site Web, y compris les règles de la loterie pertinente.</li>
           <li>2.3. Nous agissons comme intermédiaire entre vous et l'opérateur officiel de la loterie. Vous n'achetez pas de billet directement chez nous, mais commandez le service de participation en votre nom.</li>
           <li>2.4. L'achat de billets est définitif et n'est pas remboursable, sauf indication contraire expressément dans les règles.</li>
         </ul>
       </section>

       <section>
         <h2 title="3. Paiement et remboursements">3. Paiement et remboursements</h2>
         <ul aria-label="Conditions de paiement et de remboursement">
           <li>3.1. Tous les paiements sont effectués dans la monnaie indiquée sur le site Web.</li>
           <li>3.2. Nous utilisons des méthodes de paiement sécurisées, mais ne sommes pas responsables des retards ou des erreurs causés par les systèmes de paiement.</li>
           <li>3.3. Les remboursements ne sont possibles que dans les cas stipulés par les règles de loterie ou en cas d'échecs techniques confirmés par notre service d'assistance.</li>
         </ul>
       </section>

       <section>
         <h2 title="4. Clause de non-responsabilité">4. Clause de non-responsabilité</h2>
         <ul aria-label="Clause de non-responsabilité">
           <li>4.1. Nous ne sommes pas l'opérateur de la loterie officielle et ne sommes pas responsables des résultats des tirages.</li>
           <li>4.2. Les informations présentées sur le site Web sont fournies « telles quelles » et nous ne garantissons pas sa précision ou sa complétude absolue.</li>
           <li>4.3. Nous ne sommes pas responsables des pertes subies en raison de l'utilisation des informations du site Web ou de la participation aux loteries.</li>
         </ul>
       </section>

       <section>
         <h2 title="5. Confidentialité">5. Confidentialité</h2>
         <ul aria-label="Dispositions en matière de confidentialité">
           <li>5.1. L'utilisation du site Web est également régie par notre politique de confidentialité.</li>
           <li>5.2. En vous inscrivant sur le site Web, vous consentez au traitement de vos données personnelles conformément à la politique.</li>
         </ul>
       </section>

       <section>
         <h2 title="6. Protection de la propriété intellectuelle">6. Protection de la propriété intellectuelle</h2>
         <ul aria-label="Protection de la propriété intellectuelle">
           <li>6.1. Tous les documents publiés sur le site Web, y compris les textes, les images, les logos et les conceptions, sont protégés par des droits d'auteur et protégés par la loi.</li>
           <li>6.2. L'utilisation de documents sans autorisation écrite est interdite.</li>
         </ul>
       </section>

       <section>
         <h2 title="7. Actions interdites">7. Actions interdites</h2>
         <ul aria-label="Actions interdites sur le site">
           <li>7.1. Il est interdit d'utiliser le site Web :</li>
         </ul>
         <ul aria-label="Liste des usages interdits">
           <li>à des fins frauduleuses;</li>
           <li>avec l'aide de programmes automatisés (robots, analyseurs);</li>
           <li>en violation des lois de votre pays ou du pays où se trouve le serveur de sites Web.</li>
         </ul>
       </section>

       <section>
         <h2 title="8. Limitation de la responsabilité">8. Limitation de la responsabilité</h2>
         <ul aria-label="Limites de responsabilité">
           <li>8.1. Nous ne sommes pas responsables de :</li>
         </ul>
         <ul aria-label="Liste des exclusions de responsabilité">
           <li>échec temporaire du site Web;</li>
           <li>retards dans la livraison d'informations sur les gains;</li>
           <li>dommages accessoires ou indirects résultant de l'utilisation du site Web ou de la participation à des loteries.</li>
         </ul>
       </section>

       <section>
         <h2 title="9. Résiliation du compte">9. Résiliation du compte</h2>
         <p>
           Nous nous réservons le droit de suspendre ou de supprimer un compte d'utilisateur en cas de violation des conditions
           d'utilisation, de fourniture de fausses informations ou de fraude suspectée.
         </p>
       </section>

       <section>
         <h2 title="10. Loi gouvernante">10. Loi gouvernante</h2>
         <ul aria-label="Lois applicables et juridictions">
           <li>10.1. Ces conditions seront régies et interprétées conformément aux lois de l'Australie.</li>
           <li>10.2. Tous les litiges liés à l'utilisation du site sont pris en compte devant les tribunaux d'Australie.</li>
         </ul>
       </section>

       <div>
         <p>
           Si vous avez des questions concernant nos conditions d'utilisation, n'hésitez pas à nous les poser. Nous serons ravis d'y répondre.
         </p>
         <p>Merci de jouer avec nous&nbsp;!</p>
       </div>
     </div>
    </>
  );
}
