import React from 'react';
import s from './aboutPage.module.css'
import FloatingParticles from "@/components/ui/FloatingParticles/FloatingParticles";


const AboutPage = () => {
  return (
    <>
      <section className={`${s.aboutPage} `}>
        <FloatingParticles type={'spark'}/>
        <div className={`${s.wrap} container`}>

          <div className={s.pic}></div>

          <div className={s.info}>
            <h1 className={`${s.title} sec__title`} title={'Let\'s jump into the fun world of games together!'}>
              Let's jump into the fun world of games together!
            </h1>
            <p className={s.text}>
              We're a group of game fanatics. We want to give you top-notch entertainment — from classic games to
              special
              ones you can't find anywhere else. <br/>
              <br/>
              With each click, a new place opens up. We pick games that mix fun and excitement. No matter if you are
              exploring or just chilling, you’ll always find something you like. <br/>
              <br/>
              Come join our player community and check out new games each week!
            </p>
          </div>
        </div>

      </section>
    </>
  );
};

export default AboutPage;
