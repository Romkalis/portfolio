import {withBase} from "@/utils/withBase";
import React from 'react';
import s from './MainTop.module.css'
import FloatingParticles from "@/components/ui/FloatingParticles/FloatingParticles";



const MainTop = () => {

  return (
    <>
      <section className={`${s.top}  `}>
        <FloatingParticles />
        <div className={`${s.wrap} container`}>
          <h1
            className={`${s.title} sec__title`} title={`AstraReels.com: Your New Go-To for Gaming`}>
            AstraReels.com: Your New <br/>
            Go-To for Gaming
          </h1>
           <p className={s.description}>Check out AstraReels.com for tons of games! There's something for everyone,
             with cool worlds and challenges that'll keep you hooked.</p>
          <a href={withBase(`/play-our-games/`)} className={`${s.button} button`}
             title={'Play now!'}>Rate the game</a>
        </div>
      </section>
    </>
  );
};

export default MainTop;
