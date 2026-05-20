'use client';
import React, {FormEvent, useState} from 'react';
import s from './Subscription.module.css';

const Subscription = () => {
  const [isSended, setIsSended] = useState(false);

  const handleSended = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSended(!isSended);
  }
  return (
    <>
      <section className={s.subscribe}>
        <h2 className={`${s.title} sec__title`} title={'Abonnez-vous à nos actualités'}>
          Abonnez-vous à nos actualités
        </h2>
        <p className={s.text}>
          Recevez les dernières actualités, les bonus exclusifs et les promotions exceptionnelles !
        </p>
        {
          isSended ? (
            <p className={s.sendedText}>
              Merci pour ton abonnement ! Un e‑mail sera envoyé à ton adresse.
            </p>
          )
            : (
            <form onSubmit={handleSended} className={s.form} aria-label={'Subscription form'}>
              <label className={s.label}>
                <input type="email" required aria-label={'Email input'} placeholder={'E-MAIL'}/>
              </label>
              <button className={`${s.button} button bt-2`} aria-label={'s\'abonner'}>s'abonner</button>
            </form>
          )
        }

      </section>
    </>
  );
};

export default Subscription;
