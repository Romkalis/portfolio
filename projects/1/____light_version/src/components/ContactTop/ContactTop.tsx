import React from 'react';
import s from './ContactTop.module.css';

const ContactTop = () => {
  return (
    <>
      <section className={`${s.top} container`}>
        <h1 className={`${s.title} sec__title text-center`} title={'Keep in touch with us'}>
          Keep in touch with us
        </h1>
        <div className={s.description}>
          Got questions or need assistance? Contact our approachable team,
          and we'll ensure you get the most out of your exciting adventure!
        </div>
      </section>
    </>
  );
};

export default ContactTop;
