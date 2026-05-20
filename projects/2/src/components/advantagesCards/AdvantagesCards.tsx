import React from 'react';
import s from './AdvantagesCards.module.css';
import FallingStars from "@/components/ui/fallingStars/FallingStars";


const AdvantagesCards = () => {
  return (
    <>
      <section className={`${s.advantages} container`}>
        <h2 className={`${s.title} sec__title text-center`} title={`Nos avantages`}>
          Nos avantages
        </h2>
        <ul className={s.list} aria-label={'Advantages list'}>

          <li className={s.item}>
            <FallingStars/>
            <p className={s.itemTitle}>Large choix de jeux</p>
            <p className={s.itemText}>Nos machines à sous et jeux de table offrent un divertissement et une excitation
              sans fin pour chaque joueur.</p>
          </li>

          <li className={s.item}>
            <FallingStars/>

            <p className={s.itemTitle}>Sécurité et fiabilité</p>
            <p className={s.itemText}>Nous utilisons des technologies de cryptage avancées pour protéger vos données et
              transactions financières.</p>
          </li>

          <li className={s.item}>
            <FallingStars/>
            <p className={s.itemTitle}>Support 24/7</p>
            <p className={s.itemText}>Notre service client amical est toujours prêt à vous aider à tout moment du jour
              ou de la nuit.</p>
          </li>

          <li className={s.item}>
            <FallingStars/>
            <p className={s.itemTitle}>Bonus généreux</p>
            <p className={s.itemText}>Recevez des paquets de bienvenue, des tours gratuits et des offres exclusives pour
              les clients fidèles.</p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default AdvantagesCards;
