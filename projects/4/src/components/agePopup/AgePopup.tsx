'use client'

import React, {useEffect, useState} from 'react';
import s from './AgePopup.module.css';

const popupText = {
  title: 'For adults over 18 only',
  text: 'Do you confirm that you are over 18 years old?',
  buttonAccept: 'I am over 18',
}


const AgePopup = () => {

  const [isShowed, setIsShowed] = useState(false)

  useEffect(() => {
    // const popupStorage = localStorage.getItem('age-popup');
    // if (!popupStorage) {
    //   setIsShowed(true);
    // }
    const timer = setTimeout(() => {
      setIsShowed(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleStorage = () => {
    localStorage.setItem("age-popup", "ok");
    setIsShowed(prev => !prev)
  }

  return (
    <div className={`${s.popup} ${isShowed && s.active}`}>
      <div className={s.wrap}>
        <button onClick={() => {setIsShowed(prev => !prev)}} className={s.close} aria-label={'botón para cerrar la ventana emergente'}></button>
        <p className={s.title} title={popupText.title}>{popupText.title}</p>
        <p>
          {popupText.text}
        </p>
        <div className={s.buttons}>
          <button onClick={handleStorage} className={`button ${s.button}`} aria-label={'Accept button'}>{popupText.buttonAccept}</button>
        </div>
      </div>
    </div>
  );
}

export default AgePopup;
