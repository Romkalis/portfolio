'use client'

import React, {useState} from 'react';
import s from './Form.module.css'

function Form() {

  const [formData, setFormData] = useState({
    name: '',
    tel: '',
    email: '',
    message: '',
  });

  const [popupVisible, setPopupVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    try {
      const dataToSend = new FormData();
      dataToSend.append('name', formData.name)
      dataToSend.append('tel', formData.tel)
      dataToSend.append('email', formData.email)
      dataToSend.append('message', formData.message)

      // const response = await fetch('/mail.php', {
      //   method: 'POST',
      //   body: dataToSend,
      // });

      // if (!response.ok) {
      //   throw new Error (`Sending form error: ${response.status}`)
      // }

      // const result = await response.text();



      setPopupVisible(true) // показываем попап

    } catch (e) {
      console.error('Ошибка отправки формы:', e);
    }

  }

  const handlePopupVisible = () => {
    // Очистка формы
    setFormData({ name: '', tel: '', email: '', message: '' });
    setPopupVisible(false)
  }


  return (
    <>
    <form onSubmit={handleSubmit} className={s.form} aria-label={'Contact form'}>
      <label htmlFor="name" className={s.label}>
        <span>Name</span>
        <input onChange={handleChange}
               value={formData.name}
               type="text"
               id="name"
               aria-label={'Name input'}
               className={s.input}
               required/>
      </label>

      <label htmlFor="tel" className={s.label}>
        <span>Phone Number</span>
        <input onChange={handleChange}
               value={formData.tel}
               type="tel"
               id="tel"
               aria-label={'Phone input'}
               className={s.input}
               required/>
      </label>

      <label htmlFor="email" className={s.label}>
        <span>Email</span>
        <input onChange={handleChange}
               value={formData.email}
               type="email" id="email"
               aria-label={'Mail input'}
               className={s.input}
               required/>
      </label>

      <label htmlFor="message" className={s.label}>
        <span>Message</span>
        <textarea onChange={handleChange}
                  value={formData.message}
                  id="message"
                  className={`${s.input} ${s.textarea}`}
                  rows={4}
                  required></textarea>
      </label>

      <button type="submit" className={`button ${s.formButton}`} aria-label={'Send button'}>Send</button>

    </form>

      {
         popupVisible && (

        <div className={s.popup}>
            <span className={s.popup_icon}></span>
            <h2 className={s.popupTitle}>We have accepted
              your reply</h2>
            <p className={s.popupMessage}>
              Our managers will contact you shortly!
            </p>
            <button onClick={handlePopupVisible} className={`${s.popupClose} button`} aria-label={'Accept button'}>OK</button>
        </div>)
      }
    </>
  );
}

export default Form;
