'use client'
import {withBase} from "@/utils/withBase";
import React, {useState} from 'react';
import s from './Header.module.css';
import {sitePreferences} from "@/data/preferences";
import {usePathname} from "next/navigation";
import CountUp from "react-countup";

const headerLinks = {
  'catalog': 'Catalog',
  'how-to-buy': 'How to Buy',
  'questions': 'FAQ',
}

const topBannerData = [
  {
    id: 1,
    icon: 'wifi',
    value: 816,
    text: 'Online'
  },
  {
    id: 2,
    icon: 'players',
    value: 456261,
    text: 'Users',
  },
  {
    id: 3,
    icon: 'knife',
    value: 1234342,
    text: 'Sold'
  },
  {
    id: 4,
    icon: 'star',
    value: 6823,
    text: 'Reviews'
  },
]


function Header() {

  const [isBurgerOpen, setIsBurgerOpen] = useState(false)

  const path = usePathname();

  const burgerHandler = () => {
    setIsBurgerOpen(prev => !prev)
  }

  const isActiveLink = (key: string): boolean => {
    return key === path.replaceAll('/', '')
  }


  return (
    <header className={`${s.header}`}>
      <div className={s.topLine}>
        <ul className={`${s.topContainer} container`} aria-label="Our descisions">
          {
            topBannerData.map((counter) => (
              <li className={s.topLineItem} key={counter.id}>
                <div className={s.topLineIcon}></div>
                <p className={s.topLineCoumt}>
                  <CountUp start={0} end={counter.value} separator={','} duration={2 * counter.id}/>
                </p>
                <p className={s.topLineText}>
                  {counter.text}
                </p>
              </li>
            ))
          }

        </ul>
      </div>

      <nav className={`${s.wrapper} container`} aria-label="Page Navigation">
        <a
          href={withBase(`/`)} className={s.logo}
          title={`Header: ${sitePreferences.name}`}
          aria-label="Logo - go to main page">
          <img src={withBase("/asset-files/akjsd5/logotypes-icons/bNya67Asd-header-logo.webp")} alt="Logotype" width={133} height={40}/>
        </a>

        <ul className={isBurgerOpen ? `${s.navList} ${s.navListActive}` : s.navList} aria-label="Navigations list">
          {
            Object.entries(headerLinks).map(([key, value]) => (
              <li key={value} className={`${s.navItem}`}>
                <a href={withBase(`/${key}/`)} className={`${s.navLink} ${isActiveLink(key) && s.linkActive}`} title={value} aria-label={'Navigation Link'}>
                  {value}
                </a>
              </li>
            ))}
          <li className={`${s.buttonItem} ${s.desktopView}`}>
            <a href={withBase(`/our-contact/`)} className={`${s.button} button`} title={'Contact Us'} aria-label={'Contacts Link'}>
              Contact
            </a>
          </li>
        </ul>

        <a href={withBase(`/our-contact/`)} className={`${s.button} ${s.mobileView} button`} title={'Contact Us'} aria-label={'Contacts link'}>
          Contact
        </a>
      </nav>

      <div className={s['burger-menu']}>
        <button className={

          isBurgerOpen ? `${s.burger} ${s.active}` : s.burger

        } onClick={burgerHandler} aria-label={'Burger menu button'}>

          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

    </header>
  );
}

export default Header;
