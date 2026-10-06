import {withBase} from "@/utils/withBase";
import React from 'react';
import s from './Ad.module.css';

const Ad = () => {
  return (
    <>
      <section className={`${s.ad} container`}>
        <h2 className={`${s.title} sec__title`} title={'Why Choose Enjoy Games Now'}>
          Why Choose Enjoy Games Now
        </h2>

        <p className={s.sub}>Fun should be simple</p>
        <p className={s.text}>
          EnjoyGamesNow is built for players who enjoy challenge, competition, and instant rewards
        </p>

        <a href={withBase("/play-now/")} className={`${s.link} button`} aria-label={'Start Adventure'} title={'Start Adventure'}>Start Adventure</a>

      </section>
    </>
  );
};

export default Ad;
