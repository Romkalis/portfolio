import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import Warn from "@/components/Warning/Warning";

export const metadata: Metadata = {
  title: "Jeu responsable – Conseils et prévention",
  description:
    "Découvrez nos recommandations pour un jeu responsable : fixer des limites financières, éviter de compenser les pertes, utiliser des outils d’auto-surveillance et préserver votre bien-être. Jouez pour le plaisir, en toute sécurité et avec équilibre.",
  alternates: {
    canonical: `https://${sitePreferences.name}/responsible/`,
  },
  openGraph: {
    title: "Jeu responsable – Conseils et prévention",
    description:
      "Consultez la section Jeu responsable : principes, conseils pratiques et outils pour garder le contrôle et protéger votre santé financière.",
    url: `https://${sitePreferences.name}/responsible/`,
    siteName: `${sitePreferences.name}`,
  },
};




export default function Home() {

  return (
    <>
      <div className="politics container">
        <section>
          <h1 title="Jeu responsable">Jeu responsable</h1>
        </section>

        <section>
          <h2 title="Introduction">Introduction</h2>
          <p>
            Jouer à la loterie peut être amusant et excitant, mais il est important de se rappeler qu'il s'agit d'une forme de divertissement et non d'une source de revenus.
            Nous encourageons tous les joueurs à suivre les principes du jeu responsable afin de maintenir un équilibre entre le plaisir de la participation et la préservation de leur bien-être financier.
          </p>
        </section>

        <section>
          <h2 title="Comment jouer de manière responsable ?">Comment jouer de manière responsable ?</h2>
          <ul aria-label="Principes du jeu responsable">
            <li>
              <h3>1. Fixer des limites financières :</h3> Déterminez un montant maximum que vous êtes prêt à dépenser pour la loterie par mois ou par semaine. Respectez cette limite, même si vous pensez que vous aurez de la chance au prochain tirage.
            </li>
            <li>
              <h3>2. Ne dépassez pas vos capacités :</h3> Jouez uniquement avec de l'argent que vous pouvez vous permettre de perdre. N'utilisez jamais de fonds destinés à payer des factures ou des dépenses essentielles.
            </li>
            <li>
              <h3>3. N'essayez pas de compenser les pertes :</h3> Si vous perdez plusieurs fois de suite, n'augmentez pas vos mises pour tenter de récupérer vos pertes. Cela peut entraîner des pertes encore plus importantes.
            </li>
            <li>
              <h3>4. Sachez quand s'arrêter :</h3> Si vous sentez que le jeu prend le contrôle de votre comportement, arrêtez immédiatement. Votre santé et votre bien-être sont plus importants que toute combinaison gagnante.
            </li>
            <li>
              <h3>5. Utilisez des fonctionnalités d'auto-surveillance :</h3> Des outils sont disponibles pour fixer des limites de temps et de dépenses sur votre jeu. Servez-vous-en pour garder le contrôle.
            </li>
            <li>
              <h3>6. Soyez attentif :</h3> N'oubliez pas que la loterie est un jeu de hasard. Il n'y a aucune garantie de gain et les probabilités de gagner restent faibles. Participez pour le plaisir, pas dans l'espoir de devenir riche rapidement.
            </li>
          </ul>
        </section>

        <Warn />
      </div>
    </>
  );
}
