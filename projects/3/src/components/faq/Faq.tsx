import React from 'react';
import s from './Faq.module.css';
import {Lang} from "@/data/lang";
import Accordion from "@/components/accordion/Accordion";

const data = {
  de: {
    title: 'FAQ',
    description: 'Hast du Fragen zu unserer Online-Spieleplattform? Hier gibt\'s Antworten!',
    questions: [
      {
        title: 'Brauche ich ein Konto, um zu zocken?',
        answer: 'Nö, viele Games kannst du sofort ausprobieren. Aber wenn du noch mehr willst und alles erleben möchtest, melde dich einfach kostenlos an.',
      },
      {
        title: 'Kostet AstraReels.com was?',
        answer: 'Nein, unsere Seite ist komplett gratis. Du kannst loslegen, ohne versteckte Kosten oder Abos.',
      },
      {
        title: 'Kann ich mit meinen Kumpels spielen?',
        answer: 'Klar! AstraReels.com ist perfekt, um zusammen abzuhängen. Lade deine Freunde ein, spielt zusammen und zeigt euch gegenseitig, was ihr drauf habt.',
      },
      {
        title: 'Geht AstraReels.com auch auf dem Handy?',
        answer: 'Logo. Die Plattform passt sich jedem Gerät an – egal ob Smartphone, Tablet oder PC.',
      },
    ]
  },
  en: {
    title: 'FAQ',
    description: 'Got questions about our online gaming platform? Here are the answers!',
    questions: [
      {
        title: 'Do I need an account to play?',
        answer: 'Nope! You can try out many games right away. But if you want more and the full experience, just sign up for free.',
      },
      {
        title: 'Does AstraReels.com cost anything?',
        answer: 'No, our site is completely free. You can start playing with no hidden fees or subscriptions.',
      },
      {
        title: 'Can I play with my friends?',
        answer: 'Absolutely! AstraReels.com is perfect for hanging out together. Invite your friends, play together, and show off your skills.',
      },
      {
        title: 'Does AstraReels.com work on mobile?',
        answer: 'Totally. The platform adapts to any device — smartphone, tablet, or PC.',
      },
    ]
  },
  it: {
    title: 'FAQ',
    description: 'Hai domande sulla nostra piattaforma di giochi online? Ecco le risposte!',
    questions: [
      {
        title: 'Serve un account per giocare?',
        answer: 'No! Puoi provare molti giochi subito. Ma se vuoi di più e vivere l’esperienza completa, registrati gratuitamente.',
      },
      {
        title: 'AstraReels.com è a pagamento?',
        answer: 'No, il sito è completamente gratuito. Puoi iniziare a giocare senza costi nascosti o abbonamenti.',
      },
      {
        title: 'Posso giocare con i miei amici?',
        answer: 'Certo! AstraReels.com è perfetto per divertirsi insieme. Invita i tuoi amici, giocate insieme e sfoggiate le vostre abilità.',
      },
      {
        title: 'AstraReels.com funziona anche su cellulare?',
        answer: 'Assolutamente. La piattaforma si adatta a qualsiasi dispositivo — smartphone, tablet o PC.',
      },
    ]
  }
}


const Faq = ({lang}: { lang: Lang }) => {
  return (
    <>
      <section className={`${s.faq} container`}>
        <h2 className={`${s.title} sec__title`} title={data[lang].title}>
          {data[lang].title}
        </h2>
        {/*<p className={s.description}>*/}
        {/*  {data[lang].description}*/}
        {/*</p>*/}

        <Accordion />
      </section>
    </>
  );
};

export default Faq;
