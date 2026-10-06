'use client';

import React, {useState, useEffect} from 'react';
import s from './Contact.module.css';
// import {usePathname} from "next/navigation";


const formTexts = {
  title: "Contact",
  description: [
    "",
  ],
  firstNameTitle: "First Name",
  lastNameTitle: "Last Name",
  emailTitle: "Email Address",
  phoneTitle: "Téléphone",
  messageTitle: "Your Message",
  firstNamePlaceholder: "Enter your first name",
  lastNamePlaceholder: "Enter your last name",
  emailPlaceholder: "Enter your email",
  phonePlaceholder: "Téléphone",
  messagePlaceholder: "Describe your question...",
  sendButton: "Send Message",
  formSended: "Thank you! We'll answer in 24 hours!"
};

const Contact = () => {
  // const path = usePathname()
  // const isContactPage = path.replaceAll('/', '') === 'our-contacts';
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
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
      <div className={s.top}>
        <p className={s.title} title={'Contact Form'}>Contact Form</p>
        <p className={s.description}>
          Fill out the form below, and we'll get back to you within 24 hours.
        </p>
      </div>

      <div className={s.info}>
        {isFormSended
          && (
            <div className={s.isSended}>
              <span className={s.finaltext}>{formTexts.formSended}</span>
            </div>
          )}

        <form className={s.form} onSubmit={handleSubmit}>
          <label className={s.label}>
            <span className={s.inputTitle}>{formTexts.firstNameTitle}</span>
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

          <label className={s.label}>
            <span className={s.inputTitle}>{formTexts.lastNameTitle}</span>
            <input
              type="text"
              name="lastName"
              className={s.input}
              placeholder={formTexts.lastNamePlaceholder}
              value={fields.lastName}
              onChange={handleChange}
              required
            />
          </label>

          <label className={s.label}>
            <span className={s.inputTitle}>{formTexts.emailTitle}</span>
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

          <label className={s.label}>
            <span className={s.inputTitle}>Topic</span>
            <select name="topic" className={s.select}>
              <option value="general">General Inquiry</option>
              <option value="policy">Policy</option>
              <option value="question">Question</option>
            </select>
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
            <span className={s.inputTitle}>{formTexts.messageTitle}</span>
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

      </div>
    </div>
  );
};

export default Contact;
