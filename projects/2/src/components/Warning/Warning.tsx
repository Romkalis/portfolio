import React from 'react';
import s from './Warning.module.css';

const Warn = () => {
  return (
    <>
      <section className={s.warning}>
        <h2 className={`${s.title} sec__title`} title={'Informations importantes'}>
          Informations importantes
        </h2>
        <p className={s.text}>
          Ce site web est destiné uniquement à des fins de divertissement. Les joueurs doivent avoir 18 ans ou plus. Le
          jeu peut entraîner une dépendance. Veuillez jouer de manière responsable et ne risquez pas d'argent que vous
          ne pouvez pas vous permettre de perdre. Nous recommandons de définir des limites de temps et de budget. Si
          vous sentez que le jeu commence à vous contrôler, demandez de l'aide professionnelle. Contactez-nous :
          contact@demo-portfolio.example
        </p>

        <ul className={s.careList} aria-label={'Care List'}>
          <li className={s.careItem}>
            <a href="#" className={s.careLink}
               title={'Responsible gaming — demo badge'}
               aria-label={'Responsible gaming — demo badge'} target={"_blank"}
               rel={"noreferrer nofollow noopener"}></a>
          </li>
          <li className={s.careItem}>
            <a href="#" className={s.careLink} title={'Play responsibly — demo badge'}
               aria-label={'Play responsibly — demo badge'} target={"_blank"}
               rel={"noreferrer nofollow noopener"}></a>
          </li>
          <li className={s.careItem}></li>
        </ul>
      </section>
    </>
  );
};

export default Warn;
