'use client'
import {withBase} from "@/utils/withBase";
import React, {useLayoutEffect, useState} from 'react';
import s from './Header.module.css';
import {sitePreferences} from "@/data/preferences";
import {usePathname} from "next/navigation";
import FloatingParticles from "@/components/ui/FloatingParticles/FloatingParticles";

const headerLinks = {
  '': {
    title: 'Home',
    svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 21V13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12H10C9.73478 12 9.48043 12.1054 9.29289 12.2929C9.10536 12.4804 9 12.7348 9 13V21"
        stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path
        d="M3 9.99999C2.99993 9.70906 3.06333 9.42161 3.18579 9.15771C3.30824 8.8938 3.4868 8.65979 3.709 8.47199L10.709 2.47199C11.07 2.1669 11.5274 1.99951 12 1.99951C12.4726 1.99951 12.93 2.1669 13.291 2.47199L20.291 8.47199C20.5132 8.65979 20.6918 8.8938 20.8142 9.15771C20.9367 9.42161 21.0001 9.70906 21 9.99999V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9.99999Z"
        stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  },
  'play-games': {
    title: "Games",
    svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 11H10" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 9V13" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15 12H15.01" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 10H18.01" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path
        d="M17.32 5H6.68C5.69028 5.00023 4.73579 5.36738 4.00103 6.03046C3.26628 6.69355 2.80345 7.60549 2.702 8.59C2.696 8.642 2.692 8.691 2.685 8.742C2.604 9.416 2 14.456 2 16C2 16.7956 2.31607 17.5587 2.87868 18.1213C3.44129 18.6839 4.20435 19 5 19C6 19 6.5 18.5 7 18L8.414 16.586C8.78899 16.2109 9.29761 16.0001 9.828 16H14.172C14.7024 16.0001 15.211 16.2109 15.586 16.586L17 18C17.5 18.5 18 19 19 19C19.7956 19 20.5587 18.6839 21.1213 18.1213C21.6839 17.5587 22 16.7956 22 16C22 14.455 21.396 9.416 21.315 8.742C21.308 8.692 21.304 8.642 21.298 8.591C21.1968 7.60631 20.7341 6.69413 19.9993 6.03083C19.2645 5.36754 18.3099 5.00026 17.32 5Z"
        stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>


  },
  'leaders': {
    title: 'Leaderboard',
    svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 14.6602V16.2862C9.99622 16.6288 9.90448 16.9647 9.73358 17.2617C9.56268 17.5586 9.31834 17.8067 9.024 17.9822C8.39914 18.445 7.89084 19.0471 7.53948 19.7408C7.18813 20.4345 7.00341 21.2006 7 21.9782"
        stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path
        d="M14 14.6602V16.2862C14.0038 16.6288 14.0955 16.9647 14.2664 17.2617C14.4373 17.5586 14.6817 17.8067 14.976 17.9822C15.6009 18.445 16.1092 19.0471 16.4605 19.7408C16.8119 20.4345 16.9966 21.2006 17 21.9782"
        stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path
        d="M18 9H19.5C20.163 9 20.7989 8.73661 21.2678 8.26777C21.7366 7.79893 22 7.16304 22 6.5C22 5.83696 21.7366 5.20107 21.2678 4.73223C20.7989 4.26339 20.163 4 19.5 4H18"
        stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 22H20" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path
        d="M6 9C6 10.5913 6.63214 12.1174 7.75736 13.2426C8.88258 14.3679 10.4087 15 12 15C13.5913 15 15.1174 14.3679 16.2426 13.2426C17.3679 12.1174 18 10.5913 18 9V3C18 2.73478 17.8946 2.48043 17.7071 2.29289C17.5196 2.10536 17.2652 2 17 2H7C6.73478 2 6.48043 2.10536 6.29289 2.29289C6.10536 2.48043 6 2.73478 6 3V9Z"
        stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path
        d="M6 9H4.5C3.83696 9 3.20107 8.73661 2.73223 8.26777C2.26339 7.79893 2 7.16304 2 6.5C2 5.83696 2.26339 5.20107 2.73223 4.73223C3.20107 4.26339 3.83696 4 4.5 4H6"
        stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  },
  'about': {
    title: 'About',
    svg: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 16V12" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8H12.01" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  },
  'keep-in-touch': {
    title: 'Contact',
    svg: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.832 15.568C13.0385 15.6628 13.2712 15.6845 13.4917 15.6294C13.7122 15.5744 13.9073 15.4458 14.045 15.265L14.4 14.8C14.5863 14.5516 14.8279 14.35 15.1056 14.2111C15.3833 14.0723 15.6895 14 16 14H19C19.5304 14 20.0391 14.2107 20.4142 14.5858C20.7893 14.9609 21 15.4696 21 16V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21C14.2261 21 9.64773 19.1036 6.27208 15.7279C2.89642 12.3523 1 7.7739 1 3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H6C6.53043 1 7.03914 1.21071 7.41421 1.58579C7.78929 1.96086 8 2.46957 8 3V6C8 6.31049 7.92771 6.61672 7.78885 6.89443C7.65 7.17214 7.44839 7.41371 7.2 7.6L6.732 7.951C6.54842 8.09118 6.41902 8.29059 6.36579 8.51535C6.31256 8.74012 6.33878 8.97638 6.44 9.184C7.80668 11.9599 10.0544 14.2048 12.832 15.568Z"
        stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  },
  'faq': {
    title: 'FAQ',
    svg: <svg width="22" height="22" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path stroke="none" fillRule="evenodd" d="M10 3a7 7 0 100 14 7 7 0 000-14zm-9 7a9 9 0 1118 0 9 9 0 01-18 0zm8.423-3a.923.923 0 00-.923.923v.385a1 1 0 11-2 0v-.385A2.923 2.923 0 019.423 5H10c1.941 0 3.5 1.591 3.5 3.516 0 .927-.48 1.8-1.276 2.29l-1.7 1.046a1 1 0 01-1.048-1.704l1.7-1.046a.691.691 0 00.324-.586C11.5 7.679 10.82 7 10 7h-.577zm.587 8a1 1 0 100-2H10a1 1 0 100 2h.01z"/>
    </svg>,
  }
}


function Navigation() {

  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);


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
      <nav className={`${s.wrapper} `} aria-label="Navigation">
        <div className={s.top}>
          {!isMobile && <FloatingParticles counts={8}/>}
          <a
            href={withBase(`/`)} className={s.logo}
            title={`Header: ${sitePreferences.name}`}>
            <img src={withBase("/eg-docs/logo-bend.webp")} alt="Logotype" width={64}
                 height={64}/>

            <p className={s.aTitle}>
              EnjoyGamesNow
            </p>
            <p className={s.aText}>
              Social Gaming Hub
            </p>
          </a>

        </div>


        <ul className={isBurgerOpen ? `${s.navList} ${s.navListActive}` : s.navList} aria-label="Navigation list">


          <li className={`${s.navEl}`}>
            <a href={withBase("/play-now/")} className={`${s.buttonPlay} ${s.topButton} button`} aria-label={'Play Now'}
               title={'Play Now'}>Play Now</a>
          </li>
          <li className={`${s.navEl}`}>
            <a href={withBase("/registration/")} className={`${s.buttonJoin} ${s.topButton} button btn2`} aria-label={'Join'}
               title={'Join'}>Join</a>
          </li>

          {
            Object.entries(headerLinks).map(([key, {title, svg}]) => (
              <li key={title} className={`${s.navItem} ${isActiveLink(key) && s.itemActive}`}>
                <a href={withBase(`/${key}`)} className={`${s.navLink} ${isActiveLink(key) && s.linkActive}`} title={title}
                   aria-label={title}>
                  <span className={s.svgWrap}>{svg}</span> {title}
                </a>
              </li>
            ))}
        </ul>
      </nav>
      <button className={s.language} aria-label={'Check language: not available yet'}
              title={'Will be available soon!'}></button>

      <div className={s['burger-menu']}>
        <button className={

          isBurgerOpen ? `${s.burger} ${s.active}` : s.burger

        } onClick={burgerHandler} aria-label={'Appuyez sur le bouton Burger pour ouvrir le menu.'}>

          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

    </header>
  );
}

export default Navigation;
