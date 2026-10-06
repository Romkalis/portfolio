import React from 'react';
import s from './AboutSpecial.module.css';

const AboutSpecial = () => {
  return (
    <>
      <section className={`${s.spec} container`}>
        <h2 className={`${s.title} sec__title`} title={'What Makes us Special'}>
          What Makes us Special
        </h2>

        <p className={`${s.text} text-center`}>
          What makes us unique
        </p>

        <ul className={s.grid} aria-label={'Info list'}>
          <li className={s.empty}></li>

          <li className={s.item}>
            <p className={s.itemTitle}>Safe & Reliable</p>
            <p className={s.text}> At EnjoyGamesNow, we implement top-tier security protocols and advanced encryption to ensure your safety while offering a fair and exciting social gaming experience.</p>
          </li>
          <li className={s.item}>
            <p className={s.itemTitle}>Premium Gaming Experience</p>
            <p className={s.text}> Enjoy high-quality social gaming entertainment, designed for seamless interaction and immersive digital adventures that keep you engaged at every turn.</p>
          </li>

          <li className={s.empty}></li>
          <li className={s.empty}></li>

          <li className={s.item}>
            <p className={s.itemTitle}>Thriving Community</p>
            <p className={s.text}> Join a vibrant, ever-growing community of players at EnjoyGamesNow, where dynamic social gaming connects you with others for endless fun and competition.</p>
          </li>
          <li className={s.item}>
            <p className={s.itemTitle}>24/7 Support</p>
            <p className={s.text}> With EnjoyGamesNow, help is always at hand. Our support team is available 24/7 to assist you with any questions and enhance your overall experience.</p>
          </li>

          <li className={s.empty}></li>

        </ul>
      </section>
    </>
  );
};

export default AboutSpecial;
