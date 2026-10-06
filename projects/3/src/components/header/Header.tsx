'use client'
import {withBase} from "@/utils/withBase";
import React, {useState} from 'react';
import s from './Header.module.css';
import {sitePreferences} from "@/data/preferences";
// import {Lang} from "@/data/lang";
import {usePathname} from "next/navigation";
// import getPrefix from "@/utils/getPrefix";

const headerLinks = {
  en: {
    'play-our-games': 'Games',
    'about-page': 'About us',
    'our-contacts': 'Contact',
    // 'privacy-policy': 'Privacy Policy',
    // 'terms-of-use': 'Terms of Use',
    // 'responsible-gaming': 'Responsible Gaming',
  },
}



function Header({lang}: { lang: 'en' }) {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false)

  const path = usePathname();

  const burgerHandler = () => {
    setIsBurgerOpen(prev => !prev)
  }

  const isActiveLink = (key: string):boolean => {
    return key === path.replaceAll('/', '')
  }


  return (
    <header className={`${s.header}`}>
      <nav className={`${s.wrapper} container`}>
        <a
          href={withBase(`/`)} className={s.logo}
          title={`Header: ${sitePreferences.name}`}>
          <img src={withBase("/astra-docs/__g3k21aa-/astra_bg/astra_logo.webp")} alt="Logotype Astra Reels"/>
        </a>

        <ul className={isBurgerOpen ? `${s.navList} ${s.navListActive}` : s.navList}>
          <li className={`${s.navItem}`}>
            <a href={withBase(`/`)} className={`${s.navLink} ${path === '/' && s.linkActive}`} title={'Home'}>
              Home
            </a>
          </li>
          {
            Object.entries(headerLinks[lang]).map(([key, value]) => (
              <li key={value} className={`${s.navItem}`}>
                <a href={withBase(`/${key}/`)} className={`${s.navLink} ${isActiveLink(key) && s.linkActive}`} title={value}>
                  {value}
                </a>
              </li>
            ))}
        </ul>

        <div className={`${s.warn} ${s.desktopView}`}>
          Play smart, check out our rules.
        </div>
      </nav>

      <div className={s['burger-menu']}>
        <button className={

          isBurgerOpen ? `${s.burger} ${s.active}` : s.burger

        } onClick={burgerHandler} aria-label={'Open Burger'}>

          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

    </header>
  );
}

export default Header;
