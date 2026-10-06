'use client';
import {withBase} from "@/utils/withBase";
import React, {useState} from 'react';
import s from './Demo.module.css';

const Demo = () => {
  const [isPlay, setIsPlay] = useState(false);

  const handlePlay = () => {
    setIsPlay(true);
  };

  return (
    <>
      <section className={`${s.demo} container`}>
        <div className={`${s.wrap}`}>
        <div className={s.wrap}>
          <h2 className={`${s.title} sec__title visually-hidden`} title={'DEMO'}>
            DEMO
          </h2>
          {isPlay && (
            <iframe
              className={s.iframe}
              src={withBase('/games/sea/index.html')}
              title="Demo game"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          )}

          <div className={`${s.cover} ${isPlay && s.hide}`}>
            <div className={s.info}>
              <button className={`${s.play} button`} onClick={handlePlay} aria-label={'Play button'}>DEMO GAME</button>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default Demo;
