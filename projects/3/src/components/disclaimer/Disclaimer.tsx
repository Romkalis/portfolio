import React from 'react';
import s from './Disclaimer.module.css';
import {Lang} from "@/data/lang";

const data = {
  de: {
    title: 'Haftungsausschluss',
    texts: [
      'AstraReels.com ist ein kostenloses Spiel, bei dem es nur um den Spaß geht. Hier gibt es kein Glücksspiel und du kannst auch nichts gewinnen. Die Spielwährung ist nur virtuell, sie hat keinen Wert und du kannst sie weder kaufen noch auszahlen lassen.',
      'Im Spiel läuft alles zufällig ab, damit alles fair ist. Du brauchst weder Skill noch eine Strategie – es geht nur um die Unterhaltung. Wir fragen keine persönlichen Daten ab und du musst dich auch nicht anmelden. AstraReels.com ist für Leute ab 18 Jahren gedacht, die einfach chillen und zocken wollen. Wer Probleme mit seinem Spielverhalten hat, sollte sich Hilfe suchen.'
    ]
  },
  en: {
    title: 'Disclaimer',
    texts: [
      'AstraReels.com is all about fun, offering cool casual games and stuff to do. Everything here is just for kicks and to get better at playing – there\'s no real gambling or chances to win money.',
'Just so you know, even though we want AstraReels.com to be super fun, the games are only for entertainment. Anything you win or any progress you make doesn\'t translate to real money.',
'We try hard to keep everything on AstraReels.com accurate and looking good. But sometimes, we might tweak the games a bit, so things might look a little different than what you saw before.',
  'When you hop onto AstraReels.com, you\'re agreeing that it\'s all for fun. This site is for people 18+, and we want everyone to play responsibly, take breaks, and not spend too much time staring at screens.',
  'Got a question? Hit us up through the Contact section. We\'re always around to help out.'
    ]
  },
  it: {
    title: 'Disclaimer',
    texts: [
      'AstraReels.com è un gioco gratuito pensato solo per il divertimento. Non c’è gioco d’azzardo e non si vince nulla. La valuta di gioco è solo virtuale, non ha valore e non può essere acquistata né riscattata.',
      'Nel gioco tutto avviene in modo casuale per garantire equità. Non servono abilità né strategie — è solo intrattenimento. Non raccogliamo dati personali e non è richiesta la registrazione. AstraReels.com è pensato per persone dai 18 anni in su che vogliono rilassarsi e giocare. Se hai problemi con il tuo comportamento di gioco, cerca aiuto.'
    ]
  }
}


const Disclaimer = ({lang}: { lang: Lang }) => {
  return (
      <section className={`${s.disclaimerBottom}  `}>
        <div className={`${s.wrapper} container`}>
        <div className={s.age}></div>
        <h2 className={`${s.title} sec__title`} title={data[lang].title}>{data[lang].title}</h2>

        {
          data[lang].texts.map( (t, i) => <p className={s.text} key={i + t.slice(0,10)}>{t}</p>)
        }
        </div>
      </section>
  );
};

export default Disclaimer;
