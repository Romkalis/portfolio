'use client'

import React, { ChangeEvent, useState } from 'react';
import s from './FormPopup.module.css';

interface FormPopupProps {
  isShown: () => void;
}

const FormPopup: React.FC<FormPopupProps> = ({isShown}) => {
  const data = [
    {
      case: 'signUp',
      title: 'Sign Up',
      link: 'Already have an account?',
      showRepeat: true
    },
    {
      case: 'login',
      title: 'Log in',
      link: 'Don\'t have an account yet?',
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
  const [showData, setShowData] = useState(data[1]);
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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      dataToSend.append('email', formData.email)
      dataToSend.append('pwd', formData.password)

      const response = await fetch('/mail.php', {
        method: 'POST',
        body: dataToSend,
      });

      // const result = await response.text();
      setFormData({
        email: '',
        password: '',
        comparePassword: '',
      })

      setShowData(data[2])
      setShowFinal(true)

      if (!response.ok) {
        throw new Error (`Sending form error: ${response.status}`)
      }
    } catch (e) {
      console.error('Ошибка отправки формы:', e);
    }
  };
  const handlePopupClose = () => {
    isShown()
  }

  return (
    <div className={s.wrap}>
      <button onClick={handlePopupClose} className={s.closeButton}></button>
      <h3 className={s.title}>{showData.title}</h3>

      <form className={`${s.form} ${showFinal && s.formHide }`} onSubmit={handleSubmit}>
        <label>
          <input
            name="email"
            className={s.input}
            type="email"
            required
            placeholder="Email..."
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
            placeholder="Password..."
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
              placeholder="Repeat a password"
              value={formData.comparePassword}
              onChange={handleChange}
            />
          </label>
        )}



        <button type="submit" className={s.loginButton} disabled={!formData.email || formData.password.length < 6}>
          {showData.title}
        </button>

        <button type="button" onClick={handleToggleForm} className={s.changeButton}>
          {showData.link}
        </button>
      </form>

      { showData.case === 'final' && (
        <div className={s.finalScreen}>
          <p className={s.finalText}>{showData.text}</p>
          <button className={s.loginButton} onClick={handlePopupClose}>OK</button>
        </div>
      )}

    </div>
  );
};

export default FormPopup;
