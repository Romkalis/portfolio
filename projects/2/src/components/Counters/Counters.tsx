"use client";
import React, {useEffect, useState} from 'react';
import s from './Counters.module.css';
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";

const Counters = () => {

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 520);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    window.addEventListener('orientationchange', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('orientationchange', checkIsMobile);
    };
  }, []);

  if (!mounted) return null;


  return (
    <>
      <section className={s.counters}>
        <h2 className="visually-hidden">counters</h2>

        {isMobile ? (
          <Swiper
            className={s.slider}
            slidesPerView={1.1}
            centeredSlides={false}
            spaceBetween={16}
            loop={false}
            observeParents={true}
            updateOnWindowResize={true}
            watchOverflow={true}
            onSwiper={(swiper) => swiper.update()}
          >
            <SwiperSlide className={s.counter}>
              <div className={s.pic}></div>
              <div className={s.info}>
                <p className={s.count}>34.4k</p>
                <p className={s.text}>Engagements</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className={s.counter}>
              <div className={s.pic}></div>
              <div className={s.info}>
                <p className={s.count}>4.2k</p>
                <p className={s.text}>Clients satisfaits</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className={s.counter}>
              <div className={s.pic}></div>
              <div className={s.info}>
                <p className={s.count}>2.4k</p>
                <p className={s.text}>Clients de retour</p>
              </div>
            </SwiperSlide>
            <SwiperSlide className={s.counter}>
              <div className={s.pic}></div>
              <div className={s.info}>
                <p className={s.count}>1.3k</p>
                <p className={s.text}>Bonnes critiques</p>
              </div>
            </SwiperSlide>
          </Swiper>
        ) : (
          <ul className={s.counterList} aria-label={'Counter list'}>
            <li className={s.counter}>
              <div className={s.pic}></div>
              <div className={s.info}>
                <p className={s.count}>34.4k</p>
                <p className={s.text}>Engagements</p>
              </div>
            </li>
            <li className={s.counter}>
              <div className={s.pic}></div>
              <div className={s.info}>
                <p className={s.count}>4.2k</p>
                <p className={s.text}>Clients satisfaits</p>
              </div>
            </li>
            <li className={s.counter}>
              <div className={s.pic}></div>
              <div className={s.info}>
                <p className={s.count}>2.4k</p>
                <p className={s.text}>Clients de retour</p>
              </div>
            </li>
            <li className={s.counter}>
              <div className={s.pic}></div>
              <div className={s.info}>
                <p className={s.count}>1.3k</p>
                <p className={s.text}>Bonnes critiques</p>
              </div>
            </li>
          </ul>
        )}
      </section>
    </>
  );
};

export default Counters;
