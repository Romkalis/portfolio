'use client';
import {withBase} from "@/utils/withBase";
import React from 'react';
import s from './Finder.module.css';
import FormPopup from "@/components/formPopup/FormPopup";

const Finder = () => {
  const [isShow, setIsShow] = React.useState(false);
  const [isRegistration, setIsRegistration] = React.useState(false);

  const popupHandler = () => {
    setIsShow(false);
  }
  const handleLogin = () => {
    setIsRegistration(false);
    setIsShow(true);
  }
  const handleRegistration = () => {
    setIsRegistration(true);
    setIsShow(true);
  }


  return (
    <>
      <div className={s.finder}>
        <label className={s.label}>
          <input type="text" className={s.input} placeholder={'Recherche'} title={'Bientôt disponible'} />
        </label>

        <a href={withBase("/responsible/")} className={`${s.button}  button`} title={'jeu responsable'} aria-label={'jeu responsable'}>
          <span className={s.cap}></span> jeu responsable
        </a>

        <button onClick={handleRegistration}  className={`${s.button} button bt-2`} title={'Inscrivez-vous'} aria-label={'Inscrivez-vous'}>
          Inscrivez-vous
        </button>

        <button onClick={handleLogin} className={`${s.button} button bt-3`} title={'Connexion'} aria-label={'Connexion'}>
          Connexion
        </button>

      </div>

      {
        isShow && (
          isRegistration ? <FormPopup isShown={popupHandler} isReg={true} />
                         : <FormPopup isShown={popupHandler} isReg={false} />
        )
      }

    </>

  );
};

export default Finder;
