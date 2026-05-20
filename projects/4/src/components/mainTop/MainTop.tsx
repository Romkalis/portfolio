'use client';
import {withBase} from "@/utils/withBase";
import React from 'react';
import s from './MainTop.module.css'
import FloatingParticles from "@/components/ui/FloatingParticles/FloatingParticles";
import CountUp from "react-countup";


const MainTop = () => {

  return (
    <>
      <section className={`${s.top}  `}>
        <FloatingParticles/>
        <div className={`${s.wrap} container`}>
          <div className={s.info}>
            <ul className={s.reviews} aria-label={'Reviews list'}>
              <li className={s.reviewItem}>
                <img src={withBase("/asset-files/akjsd5/logotypes-icons/bNya67Asd-rate-it.svg")} alt="RateIt"/>
              </li>
              <li className={s.reviewItem}>
                <ul className={s.reviewStars} aria-label={'Decorative stars list'}>
                  <li className={s.reviewStar}></li>
                  <li className={s.reviewStar}></li>
                  <li className={s.reviewStar}></li>
                  <li className={s.reviewStar}></li>
                  <li className={s.reviewStar}></li>
                </ul>
                <p className={s.reviewCount}>
                  <CountUp end={5624} duration={10} separator={''} /> Reviews
                </p>
              </li>
              <li className={s.reviewItem}>
                <img src="./asset-files/akjsd5/logotypes-icons/bNya67Asd-trust-pilot.svg" alt="TrustPilot"/>
              </li>
              <li className={s.reviewItem}>
                <ul className={s.reviewStars} aria-label={'Decorative stars list'}>
                  <li className={s.reviewStar}></li>
                  <li className={s.reviewStar}></li>
                  <li className={s.reviewStar}></li>
                  <li className={s.reviewStar}></li>
                  <li className={s.reviewStar}></li>
                </ul>
                <p className={s.reviewCount}>
                  <CountUp end={1263} duration={10} separator={''} /> Reviews
                </p>
              </li>
            </ul>
            <h1
              className={`${s.title} sec__title`} title={`Power Up Your Game with Skins & Currency`}>
              Power Up <span className="text-color">Your Game</span> with Skins & Currency
            </h1>
            <p className={s.description}>
              Fast, safe, and reliable delivery of CS2, Valorant, and Fortnite in-game items.
            </p>
            <a href={withBase(`/catalog/`)} className={`${s.button} button`} aria-label={'Catalog link'}
               title={'Catalog'}>Catalog</a>
          </div>
          <div className={s.sectionPicture}></div>
        </div>
      </section>
    </>
  );
};

export default MainTop;
