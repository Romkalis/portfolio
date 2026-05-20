import {withBase} from "@/utils/withBase";
import React from 'react';
import s from './Footer.module.css'
import {sitePreferences} from "@/data/preferences";

const navLinks = {
  '': 'maison',
  'condition': 'Conditions d\'utilisation',
  'tourniuros': 'Gagnants de tournois',
  'confidentiality': 'Politique de confidentialité',
  'cookies': 'Politique de cookies',
  'questions': 'FAQ',
  'fonds': 'Fonds de prix',
}

function Footer() {

  return (
    <footer className={`${s.footer}`}>
      <div className={`${s.footerWrap} container`}>

        <a
          href={withBase(`/`)} className={s.logo}
          title={`Header: ${sitePreferences.name}`}>
          <img src={withBase("/docs_pic/logos-a5q/logo-a5q.webp")} alt="Logotype Parimaster" width={82}
               height={50}/>
        </a>

        <div className={s.footerGrid}>

          <div className={s.restriction}>
            <p className={s.subtitle}>menu principal</p>
            <p className={s.text}>
              Notre casino offre une expérience de jeu passionnante avec un large choix de machines à sous, de jeux de
              table et de tournois. Rejoignez des milliers de joueurs satisfaits et tentez votre chance dès aujourd'hui
              !
            </p>
          </div>

          <nav className={s.nav} aria-label="Navigation principale">
            <p className={s.subtitle}>menu principal</p>
            <ul className={s.navList} aria-label="liste de navigation">
              {
                Object.entries(navLinks).map(([key, value], i) => (
                  <li className={s.navItem} key={i + key}>
                    <a href={withBase(`/${key}`)} className={s.navLink} title={value} aria-label={value}>{value}</a>
                  </li>
                ))
              }
            </ul>
          </nav>

          <div className={s.additional}>
            <div className={s.additionalInfo}>
              <p className={s.subtitle}>Les utilisateurs doivent avoir 18 ans ou plus</p>
              <div className={s.age}></div>
              <p className={s.text}>Les utilisateurs doivent être âgés de 18 ans ou plus. Les jeux sont destinés uniquement à des fins de divertissement. Le jeu peut entraîner une dépendance, jouez de manière responsable.</p>
            </div>
            <ul className={s.services} aria-label="Organisations d'apoyo et de certification">
              <li className={s.service}>
                <a href="#" title={'Responsible gaming'} target="_blank"
                   rel="nofollow noreferrer noopener" aria-label={'Responsible gaming'}>
                  <img src={withBase("/docs_pic/logos-a5q/f-gamcare.webp")} alt="Responsible gaming" width={149}
                       height={40}/>
                </a>
              </li>

              <li className={s.service}>
                <a href="#" title={'Play responsibly'} target="_blank"
                   rel="nofollow noreferrer noopener" aria-label={'Play responsibly'}>
                  <img src={withBase("/docs_pic/logos-a5q/f-gamaware.webp")} alt="Play responsibly"
                       width={177}
                       height={40}/>
                </a>
              </li>

              <li className={s.service}>
                <a href="#" title={'Regulatory demo badge'} target="_blank"
                   rel="nofollow noreferrer noopener" aria-label={'Regulatory demo badge'}>
                  <img src={withBase("/docs_pic/logos-a5q/f-anj.webp")}
                       alt="Regulatory demo badge" width={87} height={40}/>
                </a>
              </li>

              <li className={s.service}>
                <a href="#" title={'La dépendance'} target="_blank"
                   rel="nofollow noreferrer noopener" aria-label={'Mediateur des Jeux'}>
                  <img src={withBase("/docs_pic/logos-a5q/f-mdj.webp")} alt="n'est pas un jeu."
                       width={118}
                       height={40}/>
                </a>
              </li>

            </ul>
          </div>


        </div>
        <blockquote className={s.cite}>
          Droits d'auteur © 2025 meilleurs-jeuxx.fr | Tous droits réservés
        </blockquote>
      </div>
    </footer>
  );
}

export default Footer;
