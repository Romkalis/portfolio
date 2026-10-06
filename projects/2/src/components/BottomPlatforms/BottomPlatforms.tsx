"use client";
import {withBase} from "@/utils/withBase";
import {useState, useEffect} from "react";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import s from './BottomPlatforms.module.css';

const cards = [
  {
    id: 1,
    title: 'Plateforme D',
    rate: 9.9,
    pic: 'vbet',
    bonus: '30 € + 60 tours gratuits',
    link: '#',
  },
  {
    id: 2,
    title: "Plateforme Ak",
    rate: 9.9,
    pic: 'betclick',
    bonus: '50 € en Freebet + 20 tours gratuits',
    link: '#',
  },
  {
    id: 3,
    title: 'Plateforme B',
    rate: 9.9,
    pic: 'bwin',
    bonus: '50 € en Freebet + 20 tours gratuits',
    link: '#',
  },
  {
    id: 4,
    title: 'Plateforme C',
    rate: 9.9,
    pic: 'unibet',
    bonus: '50 € en Freebet + 20 tours gratuits',
    link: '#',
  },
];


export default function BottomPlatforms() {
  const [sliderRef] = useKeenSlider<HTMLUListElement>({
    slides: {
      perView: 1.2,
      spacing: 16,
      origin: "center",
    },
    loop: true,
    mode: "free-snap",
  });
  const [isSlider, setIsSlider] = useState(true);

  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth > 468) {
        setIsSlider(false);

      } else {
        setIsSlider(true);
      }
    }
    window.addEventListener('resize', checkWidth);

    checkWidth();

    return () => window.removeEventListener('resize', checkWidth);
  }, [])


  return (
    <section className={`${s.platforms}`}>
      <div className={`${s.top} container`}>
        <h2 className={`${s.title} sec__title`} title={''}>
          Les Meilleurs Sites de Paris en Ligne
        </h2>
        <p className={s.description}>
          Découvrez notre sélection exclusive des plateformes de paris en ligne les plus fiables, choisies avec soin
          pour leur sécurité, la richesse de leurs offres promotionnelles et une expérience utilisateur exceptionnelle.
        </p>
      </div>
      {isSlider
        ? (
          <div style={{overflow: "visible", maxWidth: "100vw"}}>
            <ul ref={sliderRef} className={`keen-slider`} aria-label={'Slider list'}>
              {cards.map((card) => (
                <li
                  key={card.id} className={`keen-slider__slide ${s.slide}`}>

                  <p className={s.rate}>{card.rate}</p>
                  <ul className={s.rateList} title={`${card.title} rating: ${card.rate}`} aria-label={'Decorative list'}>
                    <li className={s.rateItem}></li>
                    <li className={s.rateItem}></li>
                    <li className={s.rateItem}></li>
                    <li className={s.rateItem}></li>
                    <li className={s.rateItem}></li>
                  </ul>
                  <a href={card.link} target="_blank" rel="noopener noreferrer" title={card.title} aria-label={card.title}>
                    <img src={withBase(`/assets-pictures/lGty67q/items-pic/lGty67q-${card.pic}.webp`)} alt={card.title} className={s.logo}
                         width={247} height={113}/>
                  </a>
                  <p className={s.bonusTitle}>BONUS</p>
                  <a href={card.link} target={'_blank'} rel={'noreferrer nofollow noopener'}
                     title={`${card.title} bonus: ${card.bonus}`} className={s.bonusText} aria-label={card.title}>{card.bonus}</a>

                  <a href={card.link} className={`button ${s.button}`} target={'_blank'}
                     rel={'noreferrer nofollow noopener'}
                     title={'Réclamer le bonus'} aria-label={'Réclamer le bonus'}>Réclamer le bonus</a>
                  <a href={withBase(`/${card.pic}/`)} className={`button ${s.buttonSec}`} target={'_blank'}
                     rel={'noreferrer nofollow noopener'}
                     title={'consulter la revue'} aria-label={'consulter la revue'}>consulter la revue</a>
                </li>
              ))}
            </ul>
          </div>)

        : (
          <ul className={`${s.list} container`}>
            {cards.map((card) => (
              <li
                key={card.id} className={`${s.slide}`}>

                <p className={s.rate}>{card.rate}</p>
                <ul className={s.rateList} title={`${card.title} rating: ${card.rate}`} aria-label={'Decorative list'}>
                  <li className={s.rateItem}></li>
                  <li className={s.rateItem}></li>
                  <li className={s.rateItem}></li>
                  <li className={s.rateItem}></li>
                  <li className={s.rateItem}></li>
                </ul>
                <a href={card.link} target="_blank" rel="noopener noreferrer" title={card.title} aria-label={card.title}>
                  <img src={withBase(`/assets-pictures/lGty67q/items-pic/lGty67q-${card.pic}.webp`)} alt={card.title} className={s.logo}
                       width={247} height={113}/>
                </a>
                <p className={s.bonusTitle}>BONUS</p>
                <a href={card.link} target={'_blank'} rel={'noreferrer nofollow noopener'}
                   title={`${card.title} bonus: ${card.bonus}`} className={s.bonusText} aria-label={card.title}>{card.bonus}</a>

                <a href={card.link} className={`button ${s.button}`} target={'_blank'}
                   rel={'noreferrer nofollow noopener'}
                   title={'Réclamer le bonus'} aria-label={'Réclamer le bonus'}>Réclamer le bonus</a>
                <a href={card.pic} className={`button ${s.buttonSec}`}
                   aria-label={'consulter la revue'} title={'consulter la revue'}>consulter la revue</a>
              </li>

            ))}
          </ul>
        )
      }
    </section>
  );
}
