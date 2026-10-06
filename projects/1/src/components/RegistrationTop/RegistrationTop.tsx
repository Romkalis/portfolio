import React from 'react';
import s from './RegistrationTop.module.css';
import RegisterBlock from "@/components/RegisterBlock/RegisterBlock";


const PlayNowPageTop = () => {
  return (
    <>
      <section className={s.sect}>
        <div className={`${s.container} container`}>
          <RegisterBlock />
          <div className={s.infoBlock}>
            <p className={s.title}>
              Step Into the Champions Circle
            </p>
            <p className={s.text}>
              See why EnjoyGamesNow stands out as a top destination for immersive social gaming.
            </p>
            <ul aria-label={'Info List'}>
              <li>
                🎁 Virtual Token Starter Bonus
              </li>
              <li>
                🎰 Explore 3000+ Interactive Social Game Experiences
              </li>
              <li>
                🏆 Community-Driven Gameplay Features
              </li>
              <li>
                🎮 Entertainment Progress & Achievement System
              </li>
              <li>
                📞 Dedicated Player Support Team
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlayNowPageTop;
