import React from 'react';
import s from './AdGames.module.css'

const AdGames = () => {
  return (
    <>
      <section className={`${s.adGames} container`}>
        <div className={s.grid}>
          <div className={s.info}>
            <h2 className={`${s.title} sec__title`} title={'Begin Your \n' +
              'Adventure in Fun'}>
              Begin Your <br/>
              Adventure in Fun
            </h2>

            <p className={s.description}>
              Step into a world where thousands of players connect, compete, and enjoy free daily games crafted for pure
              entertainment
            </p>
          </div>

          <ul className={s.list}>
            <li>
              <p className={s.icon}>
                ⭐
              </p>
              <div className={s.itemText}>
                <p className={s.itemTitle}>
                  Play & Progress
                </p>
                <p className={s.text}>
                  complete challenges, level up, and unlock exciting rewards
                </p>
              </div>
            </li>

            <li>
              <p className={s.icon}>
                ⭐
              </p>
              <div className={s.itemText}>
                <p className={s.itemTitle}>
                  Social Vibes
                </p>
                <p className={s.text}>
                  play together, compete, share wins, and join a growing community
                </p>
              </div>
            </li>

            <li>
              <p className={s.icon}>
                ⭐
              </p>
              <div className={s.itemText}>
                <p className={s.itemTitle}>
                  Non-Stop Fun
                </p>
                <p className={s.text}>
                  endless games designed to entertain, challenge, and surprise
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default AdGames;
