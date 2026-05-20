'use client'

import React, {useEffect, useState} from 'react';
import s from './AgePopup.module.css';

const popupText = {
    title: 'Check your age!',
    text: 'To access this site, the user must be over 18 years of age. Confirm that you are 18 years old',
    buttonAccept: 'I am over 18.',
    buttonReject: 'I am under 18.',
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
        <p className={s.title} title={popupText.title}>{popupText.title}</p>
        <p>
          {popupText.text}
        </p>
        <div className={s.buttons}>
          <button onClick={handleStorage} className={s.button}>{popupText.buttonAccept}</button>
          <button onClick={handleStorage} className={`${s.button} ${s.buttonReject}`}>{popupText.buttonReject}</button>
        </div>

      </div>
    </div>
  );
}

export default AgePopup;
