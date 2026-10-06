'use client';

import React, {useState, useEffect} from 'react';
import s from './Contact.module.css';
import {Lang} from "@/data/lang";
import {usePathname} from "next/navigation";


const formTexts = {
  de: {
    title: "Haben Sie Fragen?",
    description: ['Klar, wenn du Fragen, Ideen oder Feedback hast, meld dich einfach! \n',
      'Schreib uns über das Kontaktformular, wir antworten dir fix.'],
    nameTitle: 'Name',
    emailTitle: 'E-mail',
    messageTitle: 'Nachricht',
    namePlaceholder: "Ihr Name",
    emailPlaceholder: "mail@example.com",
    messagePlaceholder: "Schreiben Sie hier Ihre Nachricht ....",
    sendButton: "Senden Sie eine Nachricht",
    formSended: "Deine Nachricht wurde gesendet!",
  },
  en: {
    title: "Want to Talk?",
    description: [
      "Got questions, ideas, or just want to chat? Get in touch with the AstraReels.com team – we’re always happy to hear from you and ready to help you make your gaming better.",
    ],
    nameTitle: "Name",
    emailTitle: "Email",
    messageTitle: "Message",
    namePlaceholder: "John",
    emailPlaceholder: "yourmail@goooogle.com",
    messagePlaceholder: "Write your message here",
    sendButton: "Send",
    formSended: "Your message was successfully delivered."
  },
  it: {
    title: "Hai domande?",
    description: [
      "Certo! Se hai domande, idee o suggerimenti, contattaci!",
      "Scrivici tramite il modulo di contatto — ti risponderemo presto."
    ],
    nameTitle: "Nome",
    emailTitle: "E-mail",
    messageTitle: "Messaggio",
    namePlaceholder: "Il tuo nome",
    emailPlaceholder: "mail@example.com",
    messagePlaceholder: "Scrivi qui il tuo messaggio...",
    sendButton: "Invia un messaggio",
    formSended: "Il tuo messaggio è stato inviato!",
  }
};

const Contact = ({lang}: { lang: Lang }) => {
  const path = usePathname()
  const isContactPage = path.replaceAll('/', '') === 'our-contacts';
  const [fields, setFields] = useState({
    name: '',
    mail: '',
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

    // try {
    //   const dataToSend = new FormData();
    //   dataToSend.append('name', fields.name);
    //   dataToSend.append('mail', fields.mail);
    //   dataToSend.append('message', fields.message);
    //
    //   const response = await fetch('/mail.php', {
    //     method: 'POST',
    //     body: dataToSend,
    //   });

    // Очистить форму
    setTimeout(() => {

      setFields({
        name: '',
        mail: '',
        message: '',
      });
      setIsFormSended(true)

    }, 2000)


    // Перенаправление после успешной отправки
    // window.location.href = '/wildbandito';

    //показываем текст
    // setIsFormSended(true)

    //   if (!response.ok) {
    //
    //     throw new Error(`Sending form error: ${response.status}`);
    //   }
    //
    // } catch (e) {
    //   console.error('Ошибка отправки формы:', e);
    // }
  };

  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.mail);
    const allFilled =
      fields.name.trim() !== '' &&
      fields.message.trim() !== '' &&
      isEmailValid;

    setIsValid(allFilled);
  }, [fields]);

  return (
    <section className={`${s.contact} `}>
      <div className={`${s.contactWrap} container`}>
        { isContactPage
          ? <>
            <h1 className={`${s.title} text-center sec__title`} title="Contact us">
              Contact us
            </h1>
            <p className={s.description}>
              Got questions, ideas, or just want to chat? Contact the AstraReels.com squad – we’re always glad to hear from you and ready to help you improve your gaming.
            </p>
          </>
          : <>
            <h2 className={`${s.title} text-center sec__title`} title={formTexts[lang].title}>
              {formTexts[lang].title}
            </h2>
            <div className={s.description}>
              {
                formTexts[lang].description.map((t, i) => <p className={s.text} key={i}>{t}</p>)
              }
            </div>
          </>
        }

        <div className={s.wrap}>
          <div className={s.info}>
            {isFormSended
              ? (
                <div className={s.isSended}>
                  <span className={s.finaltext}>{formTexts[lang].formSended}</span>
                </div>
              )
              : (
                <form className={s.form} onSubmit={handleSubmit}>
                  <label className={s.label}>
                    {formTexts[lang].nameTitle}
                    <input
                      type="text"
                      name="name"
                      className={s.input}
                      placeholder={formTexts[lang].namePlaceholder}
                      value={fields.name}
                      onChange={handleChange}
                    />
                  </label>

                  <label className={s.label}>
                    {formTexts[lang].emailTitle}
                    <input
                      type="email"
                      name="mail"
                      className={s.input}
                      placeholder={formTexts[lang].emailPlaceholder}
                      value={fields.mail}
                      onChange={handleChange}
                    />
                  </label>

                  <label className={s.label}>
                    {formTexts[lang].messageTitle}
                    <textarea
                      name="message"
                      className={s.input}
                      placeholder={formTexts[lang].messagePlaceholder}
                      rows={3}
                      value={fields.message}
                      onChange={handleChange}
                    />
                  </label>

                  <button
                    type="submit"
                    className={`${s.button} button`}
                    disabled={!isValid}
                  >
                    {formTexts[lang].sendButton}
                  </button>
                </form>
              )
            }
          </div>
        </div>

      </div>
    </section>


  );
};

export default Contact;
