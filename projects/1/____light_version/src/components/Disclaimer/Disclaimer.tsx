import React from 'react';
import s from './Disclaimer.module.css';

const Disclaimer = () => {
  return (
    <>
      <section className={`${s.disclaimer} container`}>
        <h2 className={`${s.title}`} title={'IMPORTANT:'}>
          IMPORTANT:
        </h2>
        <p className={s.text}>
          All the games on EnjoyGamesNow are designed with one goal in mind: fun and relaxation. They are entirely free to play, with no real-world rewards or cash value. Aimed at players 18 and older, we promote responsible gaming, taking regular breaks, and, above all, ensuring an enjoyable, stress-free experience!
        </p>
      </section>
    </>
  );
};

export default Disclaimer;
