'use client';
import {withBase} from "@/utils/withBase";

import React, {useState, useEffect} from 'react';
import s from './Contact.module.css';
// import {usePathname} from "next/navigation";


const formTexts = {
    title: "Contact Us – We're Here to Help!",
    description: [
      'At PixelPowerShop, we value every customer and strive to provide a seamless shopping experience. If you have any questions, need assistance with your order, or would like more information about our products and services, don\'t hesitate to reach out to us.',
       'Whether you’re placing an order, need help with delivery, or want to discuss a custom request, our dedicated support team is available 24/7 to ensure your satisfaction.',
    ],
    nameTitle: "Nombre",
    emailTitle: "Email",
    messageTitle: "Mensaje",
    namePlaceholder: "Name / Email / Discord ",
    emailPlaceholder: "Game + Item Selection ",
    messagePlaceholder: "Comments / Special Requests",
    sendButton: "Submit Order",
    formSended: "Thank you for order, our managers will contact you soon. Enjoy gaming!"
};

const Contact = () => {
  // const path = usePathname()
  // const isContactPage = path.replaceAll('/', '') === 'our-contacts';
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
    setTimeout(() => {

      setFields({
        name: '',
        mail: '',
        message: '',
      });
      setIsFormSended(true)

    }, 1000)

  };

  useEffect(() => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.mail);
    const allFilled =
      fields.name.trim() !== '' &&
      fields.message.trim() !== '' &&
      isEmailValid;

    setIsValid(allFilled );
  }, [fields]);

  return (
    <>
    <section className={`${s.contact} container`}>

      <div className={`${s.contactWrap} `}>

        <div className={s.pic}></div>
        <div className={s.wrap}>
          <h2 className={`${s.title} sec__title`} title={formTexts.title}>
            {formTexts.title}
          </h2>
          {formTexts.description.map( (t, i) => (
            <p className={s.description} key={i}>{t}</p>
          ))}
          <div className={s.info}>
            <form className={s.form} onSubmit={handleSubmit} aria-label={'Contact form'}>
                  <label className={s.label}>
                    {/*{formTexts.nameTitle}*/}
                    <input
                      type="text"
                      name="name"
                      className={s.input}
                      placeholder={formTexts.namePlaceholder}
                      aria-label={formTexts.namePlaceholder}
                      value={fields.name}
                      onChange={handleChange}
                    />
                  </label>

                  <label className={s.label}>
                    {/*{formTexts.emailTitle}*/}
                    <input
                      type="text"
                      name="mail"
                      className={s.input}
                      placeholder={formTexts.emailPlaceholder}
                      aria-label={formTexts.emailPlaceholder}
                      value={fields.mail}
                      onChange={handleChange}
                    />
                  </label>

                  <label className={s.label}>
                    {/*{formTexts.messageTitle}*/}
                    <textarea
                      name="message"
                      className={s.input}
                      placeholder={formTexts.messagePlaceholder}
                      rows={3}
                      value={fields.message}
                      onChange={handleChange}
                    />
                  </label>

                  <button
                    type="submit"
                    className={`${s.button} button`}
                    disabled={!isValid}
                    aria-label={'Send button'}
                  >
                    {formTexts.sendButton}
                  </button>
                </form>
          </div>
        </div>

      </div>
    </section>
    <div className={`${s.popupBg} ${isFormSended && s.showPopup}`} onClick={() => setIsFormSended(!isFormSended)}>
      <div className={s.popupField}>
        <p className={`${s.popupTitle} sec__title text-center`}>
          Thank You for Your Order!
        </p>
        <p className={s.text}>
          We’ve received your request, and our team is already reviewing it. You can expect a response from us within the next 12 hours. Whether it’s confirming your order, assisting with any questions, or helping with a special request, we’re here to ensure your experience is smooth and seamless. <br/>
          In the meantime, feel free to check out our <a href={withBase("/catalog/")} className="text-color" aria-label={'Catalog Link'}>catalog</a> for more amazing in-game items or reach out to us through email if you need anything urgently.
          Thank you for choosing PixelPowerShop — we’re excited to help you level up your game!
        </p>
      </div>
    </div>
    </>

  );
};

export default Contact;
