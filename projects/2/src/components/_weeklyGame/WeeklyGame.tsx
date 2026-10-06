import React from 'react';
import s from './WeeklyGame.module.css';

const Games = () => {
  return (
    <>
      <section className={s.weeklyGame}>
        <div className={'container'}>
          <div className={s.weeklyWrap}>
            <div className={s.info}>
              <h2 className={`${s.title} sec__title`}
                  title={'Game of the Week: Deep Sea'}>{'Game of the Week: Deep Sea'}</h2>
              <p
                className={s.description}>
                Check out Deep Sea and jump into the deep blue! You can look around cool coral reefs, run into strange
                ocean animals, and maybe even find some treasure. Gamers are really liking how good it looks and how
                easy it is to play. Give Deep Sea a shot and see what all the fuss is about!
              </p>
            </div>

            <div className={s.pic}></div>

          </div>
        </div>

      </section>
    </>
  )
    ;
};

export default Games;
