'use client'
import {withBase} from "@/utils/withBase";
import React, {useEffect, useState} from 'react';
import s from './LastDeals.module.css';
import 'keen-slider/keen-slider.min.css'
import {useKeenSlider} from 'keen-slider/react';
import CountUp from "react-countup";

const lastSoldItems = [
  {
    title: 'AWP | Asiimov',
    pic: 'bNya67Asd-asiimov'
  },
  {
    title: 'MP7 | Urban Hazard',
    pic: 'bNya67Asd-urban-hazard'
  },
  {
    title: 'AWP | Worm God',
    pic: 'bNya67Asd-worm-god'
  },
  {
    title: 'USP-S | Stainless',
    pic: 'bNya67Asd-stainles'
  },
  {
    title: 'M4A4 | Faded Zebra',
    pic: 'bNya67Asd-faded-zebra'
  },
  {
    title: 'R8 | Bone Mask',
    pic: 'bNya67Asd-bone-mask'
  },
]

const LastDeals = () => {
    const [sliderRef] = useKeenSlider<HTMLUListElement>({
      loop: true,
      slides: {
        perView: 1.4,
        spacing: 16,       // регулируй отступы, чтобы выглядывали края соседних
        origin: "center",  // центрируем текущий слайд
      },
      breakpoints: {
        "(min-width: 401px)": {
          slides: {
            perView: 2.4,
            spacing: 28,
            origin: "center",
          },
        },
      },
    })

    const RESOLUTION = 600
    const [isSlider, setIsSlider] = useState(false);

    useEffect(() => {
      const isActivateSlider = () => {
        if (window.innerWidth <= RESOLUTION) {
          setIsSlider(true);
        } else {
          setIsSlider(false);
        }
      }
      window.addEventListener('resize', isActivateSlider);
      isActivateSlider();

      return () => window.removeEventListener('resize', isActivateSlider);
    }, [])

    return (
      <>
        <section className={s.deals}>
          <div className={`${s.wrap} container`}>
            <div className={s.info}>
              <h2 className={s.title} title={'Latest deals'}>
                Latest deals
              </h2>
              <p className={s.text}>
                <CountUp end={1234345} separator={'.'} duration={32}/> Sold
              </p>
            </div>

            {isSlider
              ? (
                <ul className={'keen-slider'} ref={sliderRef} aria-label={'Catalog items list'}>
                  {lastSoldItems.map((el) => (
                    <li className={`${s.item} ${s.sliderItem} keen-slider__slide`} key={el.title}>
                      <img src={withBase(`/asset-files/akjsd5/cs/${el.pic}.webp`)} alt={el.title}/>
                      <p className={s.name}>
                        {el.title}
                      </p>
                    </li>

                  ))}
                </ul>
              )
              : (
                <ul className={s.list} aria-label={'Catalog Items list'}>
                  {lastSoldItems.map((el) => (
                    <li className={s.item} key={el.title}>
                      <img src={withBase(`/asset-files/akjsd5/cs/${el.pic}.webp`)} alt={el.title}/>
                      <p className={s.name}>
                        {el.title}
                      </p>
                    </li>

                  ))}
                </ul>
              )
            }
          </div>
        </section>
      </>
    );
  }
  ;

  export default LastDeals;
