import React from 'react';
import s from './PromoOne.module.css';

const PromoOne = () => {
  return (
    <>
      <section className={s.promo}>
        <div className={`${s.pic} ${s.wizard1}`}></div>
        <div className={s.info}>
          <h2 className={`${s.title} sec__title`} title={'À propos de nous'}>
            À propos de nous
          </h2>
          <p className={s.text}>
            Nous sommes le principal agrégateur de loteries en ligne en Australie. Notre objectif est de rendre la
            participation aux loteries sûre, pratique et bénéfique pour tous les joueurs. Toutes nos opérations sont
            régies par la loi australienne et respectent les normes les plus élevées de sécurité et d'intégrité.
          </p>
        </div>
        <div className={`${s.pic} ${s.wizard2}`}></div>
      </section>
    </>
  );
};

export default PromoOne;
