import React from 'react';
import s from './AboutMain.module.css'

const AboutMain = () => {
  return (
    <>
      <section className={`${s.about} container`}>
        <div className={s.info}>
          <h2 className={`${s.title} sec__title`} title={'Social Gaming Platform'}>
            Social <br/>
            Gaming <br/>
            Platform
          </h2>

          <p className={s.sub}>
            <b>
              Welcome to EnjoyGamesNow!
            </b>
          </p>

          <p className={s.text}>
            EnjoyGamesNow is your new favorite hub for social gaming fun. Dive into interactive online experiences built
            for excitement, connection, and pure entertainment—always safe, always social, always just for fun.
          </p>

          <div className={s.buttons}>
            <a href="/play-now/" className={`${s.button} button`} title={'Start adventure'}
               aria-label={'Start adventure'}>
              Start adventure
            </a>
            <a href="/play-games/" className={`${s.button2} button`} title={'Explorer game'}
               aria-label={'Explorer game'}>
              Explorer game
            </a>
          </div>
        </div>

        <ul className={s.list} aria-label={'Info list'}>
          <li>
            <p className={`${s.count} sec__title`}>
              3000+
            </p>
            <p>
              Experiences Played
            </p>
          </li>

          <li>
            <p className={`${s.count} sec__title`}>
              85+
            </p>
            <p>
              Fun-Filled Game Genres
            </p>
          </li>

          <li>
            <p className={`${s.count} sec__title`}>
              200+
            </p>
            <p>
              Innovation Creators
            </p>
          </li>

          <li>
            <p className={`${s.count} sec__title`}>
              100%
            </p>
            <p>
              Powered by Community
            </p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default AboutMain;
