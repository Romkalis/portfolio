'use client';
import React, {useRef} from 'react';
import s from './Reviews.module.css';
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Grid } from "swiper/modules"
import type {NavigationOptions, PaginationOptions, SwiperOptions} from "swiper/types"



const reviews = [
  {
    name: 'xX_HeadshotXx',
    text: '"Got my AWP skin in 10 minutes! Fast and secure. Highly recommend!"',
    game: 'CS2',
  },
  {
    name: 'L0rd_Fortnite',
    text: '"Ordered V-Bucks and received them instantly. Great service and awesome prices!"',
    game: 'Fortnite',
  },
  {
    name: 'V1per_Valorant',
    text: '"Never thought buying skins could be this easy. Everything went smoothly, and I got my items right away."',
    game: 'Valorant',
  },
  {
    name: 'ShadowSniper_21',
    text: '"Very happy with my purchase! The price was great, and the delivery was lightning fast. I\'ll be back for sure!"',
    game: 'CS2',
  },
  {
    name: 'xX_HeadshotXx',
    text: '"Got my AWP skin in 10 minutes! Fast and secure. Highly recommend!"',
    game: 'CS2',
  },
  {
    name: 'L0rd_Fortnite',
    text: '"Ordered V-Bucks and received them instantly. Great service and awesome prices!"',
    game: 'Fortnite',
  },
  {
    name: 'V1per_Valorant',
    text: '"Never thought buying skins could be this easy. Everything went smoothly, and I got my items right away."',
    game: 'Valorant',
  },
  {
    name: 'ShadowSniper_21',
    text: '"Very happy with my purchase! The price was great, and the delivery was lightning fast. I\'ll be back for sure!"',
    game: 'CS2',
  },
]


const Reviews = () => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const swiperConfig: SwiperOptions = {
    loop: true,
    spaceBetween: 24,
    slidesPerView: 4,
    slidesPerGroup: 1,
    observer: true,
    observeParents: true,
    updateOnWindowResize: true,
    pagination: {
      el: ".custom-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      600: {slidesPerView: 2},
      768: {slidesPerView: 3},
      1024: {slidesPerView: 4},
    },
  };

  return (
    <section className={`${s.reviews} container`}>
      <div className={s.top}>
        <h2 className={`${s.title} sec__title`}>
          Gamers <span className="text-color">Trust</span> PixelPowerShop
        </h2>

        <div className={s.navigation}>
          <button ref={prevRef} className={s.button} aria-label={'Next button'}>
            &lsaquo;
          </button>
          <div className={`${s.pagination} custom-pagination`}/>
          <button ref={nextRef} className={s.button} aria-label={'Previous button'}>
            &rsaquo;
          </button>
        </div>
      </div>

      <div className={s.slider}>
        <Swiper className={s.swiper}
          modules={[Navigation, Pagination, Grid]}
          {...swiperConfig}
          onInit={(swiper) => {
            // Привязка стрелок
            (swiper.params.navigation as NavigationOptions).prevEl = prevRef.current;
            (swiper.params.navigation as NavigationOptions).nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();

            // Привязка пагинации
            (swiper.params.pagination as PaginationOptions).el = ".custom-pagination";
            swiper.pagination.init();
            swiper.pagination.render();
            swiper.pagination.update();
          }}
        >
          {reviews.map((review, i) => (
            <SwiperSlide className={s.slide} key={review.name + i}>
              <div className={s.reviewTop}>
                <p className={s.name}>{review.name}</p>
                <ul className={s.rateList} aria-label={'Decorative list'}>
                  <li className={s.rateStar}></li>
                  <li className={s.rateStar}></li>
                  <li className={s.rateStar}></li>
                  <li className={s.rateStar}></li>
                  <li className={s.rateStar}></li>
                </ul>
              </div>
              <p className={s.rateText}>{review.text}</p>
              <p className={s.reviewGame}>{review.game}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
