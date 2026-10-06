'use client'
import {withBase} from "@/utils/withBase";

import React, {useEffect, useState} from 'react';
import s from './CookiePopup.module.css';



const popupText = {
    title: 'Cookie Policy',
    text: 'We use cookies to improve your experience and analyze website traffic. If you continue browsing, we consider that you accept its use.',
    buttonAccept: 'PLAY NOW',
    buttonInfo: 'More information',

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
          href={withBase("/our-privacy-policy/")}
          title={popupText.buttonInfo}>
            {popupText.buttonInfo}
        </a>

      </div>
    </div>
  );
}

export default CookiePopup;
