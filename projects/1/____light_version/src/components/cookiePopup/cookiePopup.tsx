'use client'

import React, {useEffect, useState} from 'react';
import s from './CookiePopup.module.css';



const popupText = {
  title: "Politique des Cookies",
  text: "Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic du site. En continuant à naviguer, nous considérons que vous acceptez leur utilisation.",
  buttonAccept: "JOUER MAINTENANT",
  buttonInfo: "Plus d’informations",
}


const CookiePopup = () => {

  const [isShowed, setIsShowed] = useState(false)

  useEffect(() => {
    const popupStorage = localStorage.getItem('cookie-info-popup');
    if (!popupStorage) {
      setIsShowed(true);
    }
  }, [])

  const handleStorage = () => {
    localStorage.setItem("cookie-info-popup", "ok");
    setIsShowed(false)
  }

  return (
    <div className={`${s.popup} ${isShowed && s.active}`}>
      <div className={`${s.wrap} container`}>
        <div className={s.text}>
          <p className={s.title} title={popupText.title}>{popupText.title}</p>
          <p>
            {popupText.text}
          </p>
        </div>
        <div className={s.buttons}>
          <button onClick={handleStorage} className={s.button}>{popupText.buttonAccept}</button>
          <a
            className={`${s.button} ${s.buttonAcc}`}
            href={`/politique-des-cookies/`}
            title={popupText.buttonInfo}>
              {popupText.buttonInfo}
          </a>

        </div>
      </div>
    </div>
  );
}

export default CookiePopup;
