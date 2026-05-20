import React from 'react';
import s from './TermsTop.module.css';

const TermsTop = () => {
  return (
    <>
      <section className={`${s.top} container`}>
        <h1 className={`sec__title ${s.title}`} title={'Terms & Conditions'}>
          Terms & Conditions
        </h1>

        <div className={s.date}>
          Last updated: December 12, 2025
        </div>
      </section>
    </>
  );
};

export default TermsTop;
