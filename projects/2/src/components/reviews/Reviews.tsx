import React from 'react';
import s from './Reviews.module.css';

const Reviews = () => {
  return (
    <>
      <section className={`${s.reviews} container`}>
        <div className={s.top}>
          O que o pessoal está falando?
        </div>

        <h2 className={`${s.title} sec__title`} title={'Reseñas'}>
          Reseñas
        </h2>

          <ul className={s.list} aria-label={'Information list'}>
            <li className={s.item}>
              <p className={s.itemText}>"Site de démo très clair pour comparer des plateformes fictives. Les textes sur le jeu responsable sont utiles pour comprendre la mise en page."</p>
              <p className={s.name}>
                <span className={s.letter}>R</span> Renata
              </p>
            </li>

            <li className={s.item}>
              <p className={s.itemText}>"Soy novata en esto y me dejaron todo clarísimo con los pagos. Lo de Mercado Pago me vino de diez. Se nota que la info está primero y no solo las promos."</p>
              <p className={s.name}>
                <span className={s.letter}>E</span> Ezequiel
              </p>
            </li>

            <li className={s.item}>
              <p className={s.itemText}>"Uso el sitio para ver novedades y promos, siempre chequeando términos y condiciones. Sus guías de bonos son re claras y prácticas."</p>
              <p className={s.name}>
                <span className={s.letter}>M</span> Marisol
              </p>
            </li>

            <li className={s.item}>
              <p className={s.itemText}>"Es mi referencia para ver seguridad y licencias. Me dio paz elegir un casino regulado y con buena reputación."</p>
              <p className={s.name}>
                <span className={s.letter}>F</span> Fabián
              </p>
            </li>

          </ul>
      </section>

    </>
  );
};

export default Reviews;
