"use client";
import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import s from './ReviewsSlider.module.css';
import CountUp from "react-countup";

const reviews = [
  {
    name: 'Marcel Duboisfranc',
    nick: '@LuckyMarcel77',
    points: 42500,
    pic: 1,
  },
  {
    name: 'Kamilia Laurent',
    nick: '@CamilleSlots',
    points: 18950,
    pic: 2,
  },
  {
    name: 'Antoine Morel',
    nick: 'AntoineGamer',
    points: 75200,
    pic: 3,
  },
  {
    name: 'Zoé Richard',
    nick: '@ZoeLuckyStar',
    points: 23900,
    pic: 4,
  },
  {
    name: 'Marcel Duboisfranc',
    nick: '@LuckyMarcel77',
    points: 42500,
    pic: 1,
  },
  {
    name: 'Kamilia Laurent',
    nick: '@CamilleSlots',
    points: 18950,
    pic: 2,
  },
  {
    name: 'Antoine Morel',
    nick: 'AntoineGamer',
    points: 75200,
    pic: 3,
  },
  {
    name: 'Zoé Richard',
    nick: '@ZoeLuckyStar',
    points: 23900,
    pic: 4,
  }
]
//

export default function ReviewsSlider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className={`${s.reviews} `}>
      <h2 className={`${s.title} sec__title`} title={'Gagnants précédents'}>
        Gagnants précédents
      </h2>
      <Swiper
        className={s.slider}
        slidesPerView={3}
        centeredSlides={false}
        spaceBetween={16}
        loop={false}
        observeParents={true}
        updateOnWindowResize={true}
        onSwiper={(swiper) => swiper.update()}
        breakpoints={{
          1280: {slidesPerView: 3, spaceBetween: 16},
          1024: {slidesPerView: 3, spaceBetween: 16},
          768: {slidesPerView: 2.2, spaceBetween: 16},
          468: {slidesPerView: 2, spaceBetween: 16},
          359: {slidesPerView: 2, spaceBetween: 16},
          300: {slidesPerView: 1.2, spaceBetween: 16},
        }}
      >
        {reviews.map((card, i) => (
          <SwiperSlide key={card.nick + i} className={s.slide}>
            <div className={s.icon}></div>
            <div className={s.text}>
              <p className={s.name}>{card.name}</p>
              <p className={s.nick}>{card.nick}</p>
            </div>
            <div className={s.count}>
              €<CountUp end={card.points} duration={20} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
