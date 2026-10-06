import React from 'react';
import s from "@/components/accordion/Accordion.module.css";
import AccordionItem from "@/components/accordion/accordionItem/AccordionItem";


const faqListData = [
  {
    id: 1,
    question: "Comment acheter un ticket ?",
    answer: "Choisissez une loterie, remplissez votre ticket et payez via une passerelle de paiement sécurisée."
  },
  {
    id: 2,
    question: "Comment réclamer un prix ?",
    answer: "Les gains sont automatiquement crédités sur votre compte. Pour les montants importants, vous serez contacté par notre service client afin de vérifier vos informations et organiser le transfert."
  },
  {
    id: 3,
    question: "Quelles mesures de sécurité sont utilisées ?",
    answer: "Nous utilisons le chiffrement SSL, des serveurs sécurisés en Australie et des protocoles conformes aux normes internationales pour protéger vos données et vos transactions."
  },
  {
    id: 4,
    question: "Est-il possible de jouer sans créer un compte ?",
    answer: "Non, la création d’un compte est obligatoire afin de vérifier votre identité, assurer la sécurité des transactions et vous permettre de recevoir vos gains."
  },
  {
    id: 5,
    question: "Quels sont les modes de paiement acceptés pour l'achat de tickets ou des paris ?",
    answer: "Nous acceptons les cartes bancaires (Visa, Mastercard), les portefeuilles électroniques (PayPal, Skrill, Neteller) ainsi que les virements bancaires sécurisés."
  },
  {
    id: 6,
    question: "Comment puis-je retirer mes gains ?",
    answer: "Vous pouvez retirer vos gains via virement bancaire ou portefeuille électronique. Les délais de traitement varient entre 1 et 5 jours ouvrables selon la méthode choisie."
  },
  {
    id: 7,
    question: "Existe-t-il une limite de mise minimum et maximum ?",
    answer: "Oui, une mise minimum est fixée à 1 €, tandis que la mise maximum dépend de la loterie ou du pari choisi et est indiquée avant la validation de votre ticket."
  },
];


const QuestionsPage = () => {
  return (
    <>
      <section className={s.questions}>

        <h1 className={`sec__title text-center ${s.title}`} title={'FAQ'}>
          FAQ
        </h1>
        <ul className={`${s.accordions}`} aria-label={'Question list'}>
          {
            faqListData.map((item) => <AccordionItem key={item.id} item={item}/>)
          }
        </ul>
      </section>
    </>
  );
};

export default QuestionsPage;
