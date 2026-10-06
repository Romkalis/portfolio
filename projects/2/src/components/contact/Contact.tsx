'use client';

import React, {useState, useEffect} from 'react';
import s from './Contact.module.css';
// import {usePathname} from "next/navigation";


const formTexts = {
  title: "Contact",
  description: [
    "",
  ],
  firstNameTitle: "Votre nom *",
  lastNameTitle: "Nom *",
  emailTitle: "Email ",
  phoneTitle: "Téléphone",
  messageTitle: "Message *",
  firstNamePlaceholder: "Votre nom",
  lastNamePlaceholder: "Nom *",
  emailPlaceholder: "Email",
  phonePlaceholder: "Téléphone",
  messagePlaceholder: "Votre message",
  sendButton: "Envoyer",
  formSended: "Votre message a été envoyé."
};

const Contact = () => {
  // const path = usePathname()
  // const isContactPage = path.replaceAll('/', '') === 'our-contacts';
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isFormSended, setIsFormSended] = useState(false)
  const [isValid, setIsValid] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;

    setFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setTimeout(() => {

      setFields({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
      setIsFormSended(true)

    }, 2000)

  };

  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email);
    const allFilled =
      fields.firstName.trim() !== '' &&
      // fields.lastName.trim() !== '' &&
      fields.message.trim() !== '' &&
      isEmailValid;

    setIsValid(allFilled);
  }, [fields]);

  return (

        <div className={s.wrap}>
          <p className={s.title} title={'Formulaire de rétroaction'}>Formulaire de rétroaction</p>
          <div className={s.info}>
            {isFormSended
              ? (
                <div className={s.isSended}>
                  <span className={s.finaltext}>{formTexts.formSended}</span>
                </div>
              )
              : (
                <form className={s.form} onSubmit={handleSubmit}>
                  <label className={s.label}>
                    <input
                      type="text"
                      name="firstName"
                      className={s.input}
                      placeholder={formTexts.firstNamePlaceholder}
                      value={fields.firstName}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  {/*<label className={s.label}>*/}
                  {/*  <input*/}
                  {/*    type="text"*/}
                  {/*    name="lastName"*/}
                  {/*    className={s.input}*/}
                  {/*    placeholder={formTexts.lastNamePlaceholder}*/}
                  {/*    value={fields.lastName}*/}
                  {/*    onChange={handleChange}*/}
                  {/*    required*/}
                  {/*  />*/}
                  {/*</label>*/}

                  <label className={s.label}>
                    <input
                      type="email"
                      name="email"
                      className={s.input}
                      placeholder={formTexts.emailPlaceholder}
                      value={fields.email}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  {/*<label className={s.label}>*/}
                  {/*  <input*/}
                  {/*    type="tel"*/}
                  {/*    name="phone"*/}
                  {/*    className={s.input}*/}
                  {/*    placeholder={formTexts.phonePlaceholder}*/}
                  {/*    value={fields.phone}*/}
                  {/*    onChange={handleChange}*/}
                  {/*  />*/}
                  {/*</label>*/}

                  <label className={s.label}>
                    <textarea
                      name="message"
                      className={s.input}
                      placeholder={formTexts.messagePlaceholder}
                      rows={3}
                      value={fields.message}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <button
                    type="submit"
                    className={`${s.button} button bt-2`}
                    disabled={!isValid}
                  >
                    {formTexts.sendButton}
                  </button>
                </form>
              )
            }
          </div>
        </div>
  );
};

export default Contact;
