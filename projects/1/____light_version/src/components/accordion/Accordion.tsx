import React from 'react';
import AccordionItem from "@/components/accordion/accordionItem/AccordionItem";
import s from './Accordion.module.css'

const faqListData = [
  {
    id: 1,
    question: "Comment acheter un ticket ?",
    answer: "Choisissez une loterie, remplissez votre ticket et payez via une passerelle de paiement sécurisée."

  },
  {
    id: 2,
    question: "Les offres de bienvenue sont-elles réellement avantageuses ?",
    answer: "Oui, mais seulement si vous lisez attentivement les conditions. Certains bonus ont des exigences de mise élevées ou des restrictions de retrait. Un bon bonus est celui qui reste avantageux même après avoir respecté toutes les conditions."
  },
  {
    id: 3,
    question: "Vos évaluations sont-elles complètement impartiales ?",
    answer: "Oui. Nos analyses reposent sur des critères objectifs : sécurité, rapidité des paiements, diversité des paris, et qualité du service client. Aucune marque ne peut influencer nos notes ou nos classements."
  },
  {
    id: 4,
    question: "Quelles sont les bonnes pratiques pour jouer de façon responsable ?",
    answer: "Fixez-vous un budget et ne pariez jamais plus que ce que vous pouvez vous permettre de perdre. Faites des pauses régulières et utilisez les outils d’auto-limitation disponibles sur les sites agréés. Le jeu doit rester un plaisir, pas une contrainte."
  },
  {
    id: 5,
    question: "À quel rythme actualisez-vous vos évaluations ?",
    answer: "Nos reviews sont mises à jour au moins une fois par mois, ou dès qu’un changement important intervient (nouvelle offre, mise à jour de la licence, ou modification du service client). Cela garantit des informations toujours actuelles et fiables."
  }

];


const Accordion = () => {
  return (
    <>
      <p className={`sec__title text-center ${s.title}`} title={'FAQ'} aria-label={'Question list'}>
        FAQ
      </p>
      <ul className={`${s.accordions}`}>
        {
          faqListData.map((item) => <AccordionItem key={item.id} item={item}/>)
        }
      </ul>
    </>
  );
};

export default Accordion;
