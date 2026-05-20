import {withBase} from "@/utils/withBase";
import React from 'react';
import s from './Footer.module.css'
import {Lang} from "@/data/lang";
// import getPrefix from "@/utils/getPrefix";

const navLinks = {
  de: {
    'about-page': 'Über uns',
    'kontakt': 'Kontakt',
    'privacy-policy': 'Datenschutzrichtlinie',
    'terms-of-use': 'Nutzungsbedingungen',
    'responsible-gaming': 'Verantwortungsbewusstes Spielen',
    'questions': 'FAQ',
  },
  en: {
    'our-privacy-policy': 'Privacy Policy',
    // 'about-page': 'About Us',
    // 'questions': 'FAQ',
    // 'contact-us': 'Contact',
    // 'abouty-cookies': 'Cookie policy',
    'terms-of-use': 'Terms & Conditions',
    'play-responsible': 'Play Responsibly',
  },
  it: {
    'about-page': 'Chi siamo',
    'kontakt': 'Contatto',
    'privacy-policy': 'Informativa sulla privacy',
    'terms-of-use': 'Termini di utilizzo',
    'responsible-gaming': 'Gioco responsabile',
    'questions': 'FAQ',
  }
}


// const texts = {
//   de: {
//     responsibility: {
//       title: 'Haftungsausschluss',
//       text: 'Hey, AstraReels.com ist nur zur Unterhaltung da. Wir sind nicht verantwortlich für Links zu anderen Seiten oder deren Inhalte.'
//     },
//     cookie: {
//       title: 'Cookies',
//       text: 'AstraReels.com nutzt Cookies, damit alles flüssig läuft und du eine gute Zeit hast. Wenn du hier bleibst, ist das okay für dich.'
//     },
//     ages: {
//       title: 'Altersbeschränkung 18+',
//       text: 'Diese Seite ist nur für Leute ab 18 Jahren. Checkst du AstraReels.com, sagst du Ja, ich bin alt genug!.'
//     }
//   },
//   en: {
//     responsibility: {
//       title: 'Disclaimer',
//       text: 'Hey, AstraReels.com is just for entertainment. We’re not responsible for links to other sites or their content.'
//     },
//     cookie: {
//       title: 'Cookies',
//       text: 'AstraReels.com uses cookies to keep things running smoothly and make sure you have a good time. If you stay here, that’s okay with you.'
//     },
//     ages: {
//       title: 'Age Restriction 18+',
//       text: 'This site is only for people aged 18 and over. By visiting AstraReels.com, you say Yes, I’m old enough!'
//     }
//   },
//   it: {
//     responsibility: {
//       title: 'Disclaimer',
//       text: 'Ehi, AstraReels.com è solo per divertimento. Non siamo responsabili dei link ad altri siti o dei loro contenuti.'
//     },
//     cookie: {
//       title: 'Cookie',
//       text: 'AstraReels.com utilizza i cookie per garantire un funzionamento fluido e offrirti una buona esperienza. Se resti qui, significa che ti sta bene.'
//     },
//     ages: {
//       title: 'Restrizione di età 18+',
//       text: 'Questo sito è solo per persone di almeno 18 anni. Visitando AstraReels.com, dichiari: Sì, ho l’età giusta!'
//     }
//   }
// }

function Footer({lang}: { lang: Lang }) {

  // const prefix = getPrefix(lang);

  return (
    <footer className={`${s.footer}`}>
      <div className={`${s.footerWrap} container`}>
        <nav className={s.nav}>
          <a href={withBase(`/`)} className={s.logo} title={'Homepage'}>
            <img src={withBase("/astra-docs/__g3k21aa-/astra_bg/astra-footer_logo.webp")} alt="" className={s.logo} height={60} title={'Logo'}/>
          </a>
          <blockquote className={s.cite}>© 2025 AstraReels.com. All rights reserved.</blockquote>
          <ul className={s.navList}>
            {
              Object.entries(navLinks[lang]).map(([key, value], i) => (
                <li className={s.navItem} key={i + key}>
                  <a href={withBase(`/${key}/`)} className={s.navLink} title={value}>{value}</a>
                </li>

              ))

            }
            <li className={s.age}></li>
          </ul>
        </nav>
        <div className={s.contacts}>
          <div className={s.advert}>
            <p className={s.advTitle}>Contact us</p>
            <p className={s.text}>
              📧 Email:
              <a href="mailto:contact@demo-portfolio.example" className={s.text} title={'contact@demo-portfolio.example'}>contact@demo-portfolio.example</a>
            </p>
            <br/>
            <p className={s.text}>
              📞 Phone:
              <a href="tel:+10000000000" className={s.text} title={'+1 (000) 000-0000'}>+1 (000) 000-0000</a>
            </p>
          </div>
        </div>
        <ul className={s.info}>
          <li className={s.advert}>
            <p className={s.advTitle}>Cookies:</p>
            <p className={s.text}>
              We use cookies to make your experience on our site better. If you keep browsing, you're good with our cookie use.
            </p>
          </li>

          <li className={s.advert}>
            <p className={s.advTitle}>Disclaimer</p>
            <p className={s.text}>
              The games here are just for fun, and you can't win any real cash or prizes.
            </p>
          </li>
        </ul>


      </div>
    </footer>
  );
}

export default Footer;
