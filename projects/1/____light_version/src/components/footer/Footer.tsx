import React from 'react';
import s from './Footer.module.css'

function Footer() {

  return (
    <footer className={`${s.footer}`}>
      <div className={`${s.footerWrap} container`}>
        <blockquote className={s.cite}>
          © 2025 EnjoyGamesNow. All rights reserved.
        </blockquote>

        <nav className={s.nav} aria-label={'Navigation'}>
          <ul className={s.list} aria-label={'Navigation list'}>
            <li className={s.item}>
              <a href="/privacy-giude/" title={'Privacy Guidelines'} aria-label={'Privacy Guidelines'}>Privacy Guidelines</a>
            </li>
            <li className={s.item}>
              <a href="/terms-giude/" title={'Platform Terms'} aria-label={'Platform Terms'}>Platform Terms</a>
            </li>
          </ul>
        </nav>

      </div>
    </footer>
  );
}

export default Footer;
