import {withBase} from "@/utils/withBase";
import React from 'react';
import s from './Footer.module.css'

const navLinks = {
  'catalog/#cs': 'CS2: Skins & Credits',
  'catalog/#dota': 'Dota 2: Points & Skins',
  'catalog/#fortnite': 'Fortnite: V-Bucks & Skins',
}
const politicsLinks = {
  'privacy-policy': 'Privacy Policy ',
  'terms-and-conditions': 'Terms and conditions',
  'sales-terms': 'Terms of Sales',
}

function Footer() {

  return (
    <footer className={`${s.footer}`} >
      <div className={`${s.footerWrap} container`}>
        <ul className={s.top} aria-label={'Information List'}>
          <li className={s.topBlock}>
            <a href={withBase(`/`)} className={s.logo} title={'Homepage'} aria-label={'Homepage link'}>
              <img src={withBase("/asset-files/akjsd5/logotypes-icons/bNya67Asd-header-logo.webp")} alt="PixelPowerShop demo"
                   className={s.logo} height={60}
                   title={'Logo'}/>
            </a>
            <p className={s.text}>
              <b><span className="text-color">PixelPowerShop</span> – Your Trusted Partner for In-Game Item and Currency
                Purchases.</b> <br/>
              We offer fast and secure transactions for CS2, Valorant, and Fortnite. Buy skins, credits, and in-game
              items at competitive prices. We process orders quickly and reliably, ensuring instant delivery and secure
              transactions. Available 24/7, so you can top up your inventory anytime!
            </p>
          </li>
          <li className={`${s.topBlock} ${s.navBlock}`}>
            <nav className={s.nav} aria-label="Catalog">
              <p className={s.subtitle} >Catalog</p>
              <ul className={s.navList} aria-label="Catalog list">
                {
                  Object.entries(navLinks).map(([key, value], i) => (
                    <li className={s.navItem} key={i + key} aria-label={'Elemento de la lista de navegación'}>
                      <a href={withBase(`/${key}/`)} className={s.navLink} title={value} aria-label={value}>{value}</a>
                    </li>
                  ))
                }
              </ul>
            </nav>
            <nav className={s.nav} aria-label="Politics Navigation">
              <p className={s.subtitle}>Contact</p>
              <ul className={s.navList} aria-label="Politics Navigation List">
                {
                  Object.entries(politicsLinks).map(([key, value], i) => (
                    <li className={s.navItem} key={i + key}>
                      <a href={withBase(`/${key}/`)} className={s.navLink} title={value} aria-label={value}>{value}</a>
                    </li>
                  ))
                }
              </ul>
            </nav>
          </li>
        </ul>
      </div>
      <div className={s.restriction}  aria-label="disclaimer-subtitle">
        <div className={`${s.restrictionWrap} container`}>
        <p className={s.text}>
          PixelPowerShop is an independent third-party platform and is not affiliated, associated, or endorsed by
          Valve Corporation, Riot Games, or Epic Games in any way. All trademarks, logos, and game content are the
          property of their respective owners. Our services offer in-game items, credits, and skins for popular games
          such as CS2, Valorant, and Fortnite, but we are not authorized by or partnered with the companies that
          develop these games. We provide a safe and legitimate marketplace for players, but please be aware that the
          items and services offered on this site are not directly provided by the official game developers.
        </p>
        <blockquote className={s.cite}>
          © 2025 PixelPowerShop.com — In-Game Currency & Skins Store
        </blockquote>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
