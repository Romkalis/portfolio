'use client';
import React from 'react';
import s from './MainTop.module.css'
import FloatingParticles from "@/components/ui/FloatingParticles/FloatingParticles";
import {useTimer} from "@/hooks/useTimer";
import CountUp from "react-countup";
import {usePathname} from "next/navigation";

const MainTop = () => {
  const {day, hour, minutes, seconds} = useTimer()
  const isFondPage = usePathname().includes("fonds");
  return (
    <>
      <section className={`${s.top} `}>
        <FloatingParticles />
        <div className={`${s.wrap} `}>

          <div className={s.info}>
            {isFondPage ? (
              <>
                <h1 className="visually-hidden">Gestion des fonds – Sécurité et transparence</h1>
                <h2
                  className={`${s.title} sec__title`} title={`Fonds de prix`}>
                  Fonds de prix
                </h2>
              </>
            ) : (
              <h1
                className={`${s.title} sec__title`} title={`Fonds de prix`}>
                Fonds de prix
              </h1>
            )}

            <p className={s.price}>
              €<CountUp start={1000000} end={4526532} separator={' '} duration={25}/>
            </p>
            <ul className={s.list}>
              <li className={s.item}>
                <p className={s.count}>
                  {day}
                </p>
                <p className={s.text}>Jours</p>
              </li>
              <li className={s.item}>:</li>
              <li className={s.item}>
                <p className={s.count}>
                  {hour}
                </p>
                <p className={s.text}>Heures</p>
              </li>
              <li className={s.item}>:</li>
              <li className={s.item}>
                <p className={s.count}>
                  {minutes}
                </p>
                <p className={s.text}>Minutes</p>
              </li>
              <li className={s.item}>:</li>
              <li className={s.item}>
                <p className={s.count}>
                  {seconds}
                </p>
                <p className={s.text}>Secondes</p>
              </li>
            </ul>
          </div>

          <div className={s.box}></div>
        </div>
          <div className={s.hero}></div>
      </section>
    </>
  );
};

export default MainTop;
