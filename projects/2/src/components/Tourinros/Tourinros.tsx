'use client';
import React from 'react';
import s from './Tourinros.module.css';
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
    name: 'Élodie Moreau',
    nick: '@LuckyÉtoile',
    points: 23950,
    pic: 1,
  },
  {
    name: 'Antoine Dubois',
    nick: '@RoiDesCartes',
    points: 55100,
    pic: 2,
  },
]

const Tourinros = () => {
  return (
    <>
      <section className={s.tour}>
        <h1 className={`${s.title} sec__title`} title={'Gagnants précédents'}>
          Gagnants précédents
        </h1>

        <div className={s.topGrid}>
          <div className={s.pic}></div>
          <div className={s.info}>
            <p className={s.infoTitle}>
              Gagnant
            </p>
            <div className={s.infoWrap}>
              <div className={`${s.flex} ${s.winnerBlock}`}>
                <div className={s.icon}></div>
                <div className={s.text}>
                  <p className={s.name}>Kamilia Laurent</p>
                  <p className={s.nick}>@CamilleSlots</p>
                </div>
                <div className={s.count}>
                  €<CountUp end={18950} duration={20} separator={' '}/>
                </div>
              </div>
              <div className={s.flex}>
                <div className={s.winBlock}>
                  <div className={s.winIcon}></div>
                  <p className={s.name}>Parties jouées</p>
                  <p className={s.nick}>1 256</p>
                </div>
                <div className={s.winBlock}>
                  <div className={s.winIcon}></div>
                  <p className={s.name}>Victoires</p>
                  <p className={s.nick}>532</p>
                </div>
                <div className={s.winBlock}>
                  <div className={s.winIcon}></div>
                  <p className={s.name}>rang du joueur</p>
                  <p className={s.nick}>VIP Bronze</p>
                </div>
              </div>
            </div>
          </div>
          <div className={s.pic}></div>
        </div>

        <div className={s.players}>
          <p className={s.subtitle}>Gagnants précédents</p>
        <ul className={s.playersList} aria-label={'Players list'}>
          {
            reviews.map( (card) => (
              <li className={s.slide} key={card.name}>
                <div className={s.icon}></div>
                <div className={s.text}>
                  <p className={s.name}>{card.name}</p>
                  <p className={s.nick}>{card.nick}</p>
                </div>
                <div className={s.count}>
                  €<CountUp end={card.points} duration={20} />
                </div>
              </li>
            ))
          }
        </ul>
        </div>
      </section>
    </>
  );
};

export default Tourinros;
