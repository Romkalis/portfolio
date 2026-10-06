import React from 'react';
import s from './About.module.css'


const About = () => {

  return (
    <>
      <section className={`${s.about} container`}>

        <div className={s.info}>
          <h2 className={`sec__title ${s.title}`} title={'Unleash Your Power with PixelPowerShop'}>
            Unleash Your Power with PixelPowerShop
          </h2>
          <p className={s.text}>
            PixelPowerShop offers a fast, secure, and reliable way to enhance your gaming experience. Whether you're
            looking for rare skins, in-game currency, or custom credits for popular games like CS2, Valorant, and
            Fortnite, we've got you covered. With our easy 3-step purchase process and instant delivery, you can power
            up your game in no time. All products are 100% authentic and delivered directly to your account or via a
            secure code. Elevate your gameplay and stand out in the gaming world with PixelPowerShop!
          </p>
        </div>

        <div className={s.pic}></div>

      </section>

    </>
  );
};

export default About;
