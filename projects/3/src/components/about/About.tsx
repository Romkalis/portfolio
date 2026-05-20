import {withBase} from "@/utils/withBase";
import React from 'react';
import {Lang} from "@/data/lang";
import s from './About.module.css'

interface PropsType {
  lang: Lang
}

const aboutText = {
  de: {
    title: 'Über uns',
    text: [
      'AstraReels.com ist eine Plattform für soziale Online-Spiele, die geschaffen wurde, um Menschen aus aller Welt zusammenzubringen. Unser Fokus liegt nicht nur auf dem Spielen selbst, sondern auch auf dem gemeinsamen Erlebnis, dem Austausch und dem Gefühl, Teil einer lebendigen Community zu sein.',
      'Wir bieten eine große Auswahl an Spielen, die für jeden Geschmack etwas bereithalten – von schnellen und unterhaltsamen Herausforderungen bis hin zu spannenden Spielabenteuern, die Sie gemeinsam mit anderen erleben können. Dabei steht der soziale Aspekt im Mittelpunkt: Sie können mit Freunden spielen, neue Kontakte knüpfen und Ihre Spielerfahrungen teilen.',
      'Unser Ziel ist es, eine sichere, unterhaltsame und leicht zugängliche Plattform bereitzustellen, die sowohl für Gelegenheitsspieler als auch für begeisterte Gamer geeignet ist. AstraReels.com verbindet Spielspaß mit sozialem Austausch und schafft eine Umgebung, in der jeder willkommen ist.',
      'Tauchen Sie ein in die Welt der sozialen Online-Spiele und entdecken Sie, wie viel Freude es macht, gemeinsam zu spielen.'
    ],
    titleCards: 'Warum wir?',
    cards: [
      {
        title: 'Spiele für jeden Geschmack',
        text: 'Auf AstraReels.com gibt\'s echt viele coole Online-Games. Egal, ob du was Kurzes suchst oder lieber länger zockst – hier ist für jeden was dabei.',
      },
      {
        title: 'Gemeinschaft erleben',
        text: 'Bei uns triffst du Leute: Spiel mit deinen Kumpels, lern neue Zocker kennen und tauscht euch in unserer Community aus.',
      },
      {
        title: 'Super einfach zu bedienen',
        text: 'Egal, ob du neu bist oder schon lange spielst: Unsere Seite ist easy, sicher und immer für dich da. Leg einfach los!',
      },
    ]
  },
  en: {
    title: 'About our platform',
    text: [
      'Topaulot is a contemporary online social gaming platform designed for a safe and enjoyable experience. Our goal is to offer thrilling games in a secure, friendly environment, where fun and excitement are free from any financial risks.'
    ],
    // titleCards: 'Why Us?',
    // cards: [
    //   {
    //     title: 'Games for Every Taste',
    //     text: 'AstraReels.com has tons of cool online games. Whether you’re into quick sessions or longer adventures – there’s something here for everyone.',
    //   },
    //   {
    //     title: 'Experience Community',
    //     text: 'Meet people here: play with your buddies, connect with new gamers, and chat in our community.',
    //   },
    //   {
    //     title: 'Super Easy to Use',
    //     text: 'Whether you’re new or a longtime player – our site is simple, safe, and always ready for you. Just jump in!',
    //   },
    // ]
  },
  it: {
    title: 'Chi siamo',
    text: [
      'AstraReels.com è una piattaforma di giochi online sociali creata per unire persone da tutto il mondo. Il nostro obiettivo non è solo giocare, ma vivere esperienze condivise, scambiare idee e sentirsi parte di una community viva e attiva.',
      'Offriamo un’ampia selezione di giochi per tutti i gusti – dalle sfide rapide e divertenti alle avventure emozionanti da vivere insieme ad altri. L’aspetto sociale è centrale: puoi giocare con amici, conoscere nuovi gamer e condividere le tue esperienze.',
      'Il nostro scopo è offrire una piattaforma sicura, divertente e accessibile, adatta sia ai giocatori occasionali che agli appassionati. AstraReels.com unisce il piacere del gioco con l’interazione sociale, creando un ambiente accogliente per tutti.',
      'Immergiti nel mondo dei giochi online sociali e scopri quanto è bello giocare insieme.'
    ],
    titleCards: 'Perché noi?',
    cards: [
      {
        title: 'Giochi per tutti i gusti',
        text: 'Su AstraReels.com trovi tantissimi giochi online divertenti. Che tu voglia una partita veloce o un’avventura più lunga – qui c’è qualcosa per te.',
      },
      {
        title: 'Vivi la community',
        text: 'Qui incontri persone: gioca con i tuoi amici, conosci nuovi gamer e scambia idee nella nostra community.',
      },
      {
        title: 'Facile da usare',
        text: 'Che tu sia alle prime armi o un giocatore esperto – il nostro sito è semplice, sicuro e sempre pronto. Inizia subito!',
      },
    ]
  },
}
const About: React.FC<PropsType> = ({lang}) => {

  return (
    <>
      <section className={`${s.about} container`}>
        <div className={s.wrap}>
          <h2 className={`sec__title ${s.title}`} title={aboutText[lang].title}>
            {aboutText[lang].title}
          </h2>
          <div className={s.texts}>
            {
              aboutText[lang].text.map((t, i) => <p className={s.text} key={i + t}>{t}</p>
              )
            }
          </div>
          <a href={withBase("/about-page/")} className="button" title={'about-page'}>More details...</a>
        </div>
        <div className={s.pic}></div>
      </section>
      {/*<section className={`${s.cardsSection} container`}>*/}
      {/*  <h2 className={`sec__title ${s.title}`} title={aboutText[lang].titleCards}>*/}
      {/*    {aboutText[lang].titleCards}*/}
      {/*  </h2>*/}
      {/*  <ul className={s.cards}>*/}
      {/*    {*/}
      {/*      aboutText[lang].cards.map((c, i) => (*/}
      {/*        <li className={`${s.card} gr-border`} key={i + c.title}>*/}
      {/*          <div className={s.pic}></div>*/}
      {/*          <p className={s.cardTitle}>{c.title}</p>*/}
      {/*          <p className={s.cardText}>{c.text}</p>*/}
      {/*        </li>*/}
      {/*      ))*/}
      {/*    }*/}
      {/*  </ul>*/}
      {/*</section>*/}
    </>
  );
};

export default About;
