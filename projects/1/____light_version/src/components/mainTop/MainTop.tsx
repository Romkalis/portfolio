'use client';
import React from 'react';
import s from './MainTop.module.css'
import FloatingParticles from "@/components/ui/FloatingParticles/FloatingParticles";
import Finder from "@/components/Finder/Finder";


const MainTop = () => {
  return (
    <>
      <section className={`${s.top} container `}>
        <FloatingParticles/>
        <Finder/>

        <div className={s.wrap}>

          <h1 className={`${s.title} sec__title`} title={'Enjoy Games Now'}>
            Enjoy Games Now
          </h1>
          <p className={s.description}>
            <span className={s.line}></span>
            Discover an exciting variety of games that bring fun and thrills! Start your adventure with us today
            <span className={s.line}></span>
          </p>

          <div className={s.decoration}>
            <p className={s.addTop}>
              Explore Games
            </p>
            <a href="/play-now/" className={`${s.link} button`} aria-label={'Start Adventure'}
               title={'Start Adventure'}>
              Start Adventure
            </a>
          </div>

          <div className={s.bottom}>
            🎮 Entertainment Only • No Real Money • Free to Play
          </div>

        </div>
      </section>
    </>
  );
};

export default MainTop;
