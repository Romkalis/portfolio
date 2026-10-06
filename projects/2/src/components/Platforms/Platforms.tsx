"use client";
import {withBase} from "@/utils/withBase";
import "swiper/css";
import s from './Platforms.module.css';

const cards = [
  {
    id: 1,
    title: 'Or Médaille',
    name: 'Plateforme E',
    pic: 'netbet',
    bonus: 'Bonus exclusif: 100% jusqu\'à €100 + 50 free spins',
    link: '#',
  },

  {
    id: 2,
    title: 'Argent Médaille',
    name: 'Plateforme B',
    pic: 'bwin',
    bonus: 'Bonus exclusif: 100% jusqu\'à €100 + 50 free spins',
    link: '#',
  },
  {
    id: 3,
    title: "Bronze Médaille",
    name: 'Plateforme A',
    pic: 'betclick',
    bonus: 'Bonus exclusif: 100% jusqu\'à €100 + 50 free spins',
    link: '#',
  },

];


export default function Platforms() {


  return (
    <section className={`${s.platforms} `}>
      <h2 className={`${s.title} sec__title text-center`}
          title={"best casinos"}>
        best casinos
      </h2>
      <ul className={`${s.list}`} aria-label={'Contact list'}>
        {cards.map((card, i) => (
          <li
            key={card.id} className={`${s.slide}`}>
            <a href={card.link} className={s.picBg} target={'_blank'} rel={'noreferrer nofollow noopener'} title={`${card.name} ${i%2===0 ? 'online casino': 'casino en ligne'}`} aria-label={'Link to ' + card.name}>
              <img src={withBase(`/docs_pic/bg/${card.pic}.webp`)} alt={card.name} title={`${card.name} ${i%2===0 ? 'online casino': 'casino en ligne'}`} className={s.logo}/>
            </a>

            <div className={s.top}>
              <p className={s.platformTitle}>{card.title}</p>
              <ul className={s.rateList}  aria-label={'Decorative list'}>
                <li className={s.rateItem}>
                  <img src={withBase("/docs_pic/logos-a5q/star.svg")}
                       alt={i % 2 === 0 ? 'Rating' : 'Notation'}
                       title={`${card.name} ${i % 2 === 0 ? 'rating' : 'notation'}`}/>
                </li>
                <li className={s.rateItem}>
                  <img src={withBase("/docs_pic/logos-a5q/star.svg")}
                       alt={i % 2 === 0 ? 'Rating' : 'Notation'}
                       title={`${card.name} ${i % 2 === 0 ? 'rating' : 'notation'}`}/>
                </li>
                <li className={s.rateItem}>
                  <img src={withBase("/docs_pic/logos-a5q/star.svg")}
                       alt={i % 2 === 0 ? 'Rating' : 'Notation'}
                       title={`${card.name} ${i % 2 === 0 ? 'rating' : 'notation'}`}/>
                </li>
                <li className={s.rateItem}>
                  <img src={withBase("/docs_pic/logos-a5q/star.svg")}
                       alt={i % 2 === 0 ? 'Rating' : 'Notation'}
                       title={`${card.name} ${i % 2 === 0 ? 'rating' : 'notation'}`}/>
                </li>
                <li className={s.rateItem}>
                  <img src={withBase("/docs_pic/logos-a5q/star.svg")}
                       alt={i % 2 === 0 ? 'Rating' : 'Notation'}
                       title={`${card.name} ${i % 2 === 0 ? 'rating' : 'notation'}`}/>
                </li>
              </ul>
            </div>

            <a href={card.link} target={'_blank'} rel={'noreferrer nofollow noopener'}
               title={`${card.title} bonus: ${card.bonus}`} aria-label={card.title} className={s.bonusText}>{card.bonus}</a>

            <ul className={s.payments} aria-label={'Payments list'}>
              <li className={s.item}>
                <img src={withBase('/docs_pic/logos-a5q/mastercard.svg')} alt={'Mastercard'}
                     title={card.name +  ' Mastercard'} className={s.payment}/>
              </li>
              <li className={s.item}>
                <img src={withBase('/docs_pic/logos-a5q/a-pay.svg')} alt={'Apple Pay'}
                     title={card.name +  ' Apple Pay'} className={s.payment}/>
              </li>
              <li className={s.item}>
                <img src={withBase('/docs_pic/logos-a5q/btc.svg')} alt={'Bitcoin'}
                     title={card.name +  ' Bitcoin'} className={s.payment}/>
              </li>
            </ul>

            <a href={card.link} className={`button bt-2 ${s.button}`}
            target={'_blank'}
               rel={'noreferrer nofollow noopener'}
               title={'Participer'}>Participer</a>
          </li>

        ))}
      </ul>
    </section>
  );
}
