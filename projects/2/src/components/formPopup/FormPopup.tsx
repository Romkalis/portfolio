'use client'

import React, {ChangeEvent, useState} from 'react';
import s from './FormPopup.module.css';

interface FormPopupProps {
  isShown: () => void;
  isReg: boolean;
}

const FormPopup: React.FC<FormPopupProps> = ({isShown, isReg}) => {
  const data = [
    {
      case: 'signUp',
      title: 'Créer un compte',
      link: 'Vous avez déjà un compte ?',
      showRepeat: true
    },
    {
      case: 'login',
      title: 'Entrée',
      link: 'Vous n’avez pas encore de compte ?',
      showRepeat: false
    },
    {
      case: "final",
      title: '',
      link: '',
      text: 'The letter was send by mail.',
      showRepeat: false
    }

  ];
  const [showData, setShowData] = useState(isReg? data[0]: data[1]);
  const [showForgotten, setShowForgotten] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    comparePassword: '',
  });
  const [showFinal, setShowFinal] = useState(false)

  const handleToggleForm = () => {
    setShowData(showData.case === 'signUp' ? data[1] : data[0]);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handlePopupClose = () => {
    setShowFinal(false)
    setShowForgotten(false)
    isShown()
  }
  const handlePassSended = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowFinal(true)
  }
  const handleToggleShowForgotten =() => {
    setShowForgotten(true)
    setShowFinal(false)
  }


  const finalMessage = showForgotten
    ? "Nous vous enverrons un mot de passe temporaire à votre e‑mail sous peu."
    : "Nous vous avons envoyé un e‑mail ! Veuillez vérifier votre boîte de réception.";

  return (
    <>
      <div className={s.bg}>
        <div className={s.wrap}>
          <button onClick={handlePopupClose} className={s.closeButton}></button>

          {showFinal ? (
            <div className={s.finalScreen}>
              <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="62" height="62" rx="31" fill="#FE0CD2"/>
                <path d="M17 30.5L26.6727 40L45 22" stroke="#25003D" strokeWidth="4"/>
              </svg>

              <p className={`${s.text} text-center`}>{finalMessage}</p>
            </div>
          ) : (
            showForgotten ? (
                <>
                {
                  (
                    <>
                      <p className={s.title}>Récupérer le mot de passe</p>
                      <p className={`${s.text} text-center`}>Entrez votre e-mail et nous vous enverrons votre mot de
                        passe</p>
                        <form className={`${s.form} `}>
                          <div className={s.buttons}>
                            <label>
                              <input
                                name="email"
                                className={s.input}
                                type="email"
                                required
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleChange}
                              />
                            </label>
                            <button onClick={handlePassSended} className={`${s.loginButton} button bt-3`} title={'Envoyer'}
                                    aria-label={'Envoyer button'}>
                              Envoyer
                            </button>
                          </div>
                        </form>
                        </>)

                      }
                    </>
                  ) : (
                  <>
                  <p className={s.title}>{showData.title}</p>
              <form className={`${s.form} ${showFinal && s.formHide}`}>
                <label>
                  <input
                    name="email"
                    className={s.input}
                    type="text"
                    required
                    placeholder="Nom"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  <input
                    name="password"
                    className={s.input}
                    type="password"
                    required
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </label>

                {showData.showRepeat && (
                  <label>
                    <input
                      name="comparePassword"
                      className={s.input}
                      type="password"
                      required
                      placeholder="Répéter le mot de passe"
                      value={formData.comparePassword}
                      onChange={handleChange}
                    />
                  </label>
                )}
                {
                  !showData.showRepeat && (
                    <button onClick={handleToggleShowForgotten} className={s.forgottenLink} title={'Mot de passe oublié ?'} aria-label={'Mot de passe oublié ?'}>Mot de passe oublié ?</button>

                  )
                }
                <div className={s.buttons}>
                  <button className={`${s.loginButton} button bt-2`} onClick={handlePassSended}
                          disabled={!formData.email || formData.password.length < 6} title={'Se connecter'}
                          aria-label={'Se connecter button'}>
                    Se connecter
                  </button>
                  <button onClick={ showData.case === 'signUp' ? handlePassSended : handleToggleForm} className={`${s.loginButton} button bt-3`} title={'Inscription'}
                          aria-label={'Inscription button'}>
                    Inscription
                  </button>
                </div>

                <button type="button" onClick={handleToggleForm} className={s.changeButton}>
                  {showData.link}
                </button>
              </form>
            </>
            ))}
        </div>
      </div>
    </>
);
};

export default FormPopup;
