import React from 'react';
import s from './PrivacyTop.module.css';

const PrivacyTop = () => {
  return (
    <>
      <section className={`${s.top} container`}>
        <h1 className={`sec__title ${s.title}`} title={'Privacy Policy'}>
          Privacy Policy
        </h1>

        <div className={s.date}>
          Last updated: December 12, 2025
        </div>
      </section>
    </>
  );
};

export default PrivacyTop;
