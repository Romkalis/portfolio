import React from 'react';
import s from './PrivacyDisclaimer.module.css';

const PrivacyDisclaimer = () => {
  return (
    <>
      <section className={`${s.disclaimer} container`}>
        <h2 className="visually-hidden">Privacy Disclaimer</h2>
        <div className={s.ageIcon}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M36.2161 29.9997L22.8827 6.66639C22.592 6.1534 22.1704 5.7267 21.6609 5.42984C21.1515 5.13297 20.5724 4.97656 19.9827 4.97656C19.3931 4.97656 18.814 5.13297 18.3045 5.42984C17.7951 5.7267 17.3735 6.1534 17.0827 6.66639L3.74939 29.9997C3.45553 30.5087 3.30144 31.0862 3.30274 31.6739C3.30404 32.2616 3.46069 32.8385 3.7568 33.3461C4.05292 33.8537 4.47797 34.274 4.98889 34.5644C5.4998 34.8548 6.07841 35.005 6.66606 34.9997H33.3327C33.9176 34.9991 34.4919 34.8447 34.9982 34.5519C35.5044 34.2591 35.9248 33.8382 36.2169 33.3316C36.5091 32.8249 36.6628 32.2504 36.6626 31.6655C36.6625 31.0807 36.5085 30.5062 36.2161 29.9997Z"
              stroke="#E7000B" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 15V21.6667" stroke="#E7000B" strokeWidth="3.33333" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M20 28.333H20.0167" stroke="#E7000B" strokeWidth="3.33333" strokeLinecap="round"
                  strokeLinejoin="round"/>
          </svg>

        </div>

        <p className={s.text}>
          These Privacy Policy apply to SlotStallion's social gaming platform services. For questions,
          contact us at <a href="mailto:support@enjoygamesnow.com" title={'support@enjoygamesnow.com'} aria-label={'support@enjoygamesnow.com'}>
          support@enjoygamesnow.com
        </a>
        </p>

      </section>
    </>
  );
};

export default PrivacyDisclaimer;
