import React from 'react';
import s from './PlayNowPageTop.module.css';
import LoginBlock from "@/components/LoginBlock/LoginBlock";

const PlayNowPageTop = () => {
  return (
    <>
      <section className={s.sect}>
        <div className={`${s.container} container`}>
          <LoginBlock/>
          <div className={s.infoBlock}>
            <p className={s.title}>
              Join the EnjoyGamesNow Arena
            </p>
            <p className={s.text}>
              Step into your social gaming space to unlock exclusive adventures and community-driven features.
            </p>
            <ul aria-label={'Info List'}>
              <li>
                Unlock exclusive gaming experiences
              </li>
              <li>
                Engage with community features
              </li>
              <li>
                Track your progress on entertainment leaderboards
              </li>
              <li>
                Earn and use virtual tokens
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlayNowPageTop;
