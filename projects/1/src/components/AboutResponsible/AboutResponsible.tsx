import React from 'react';
import s from './AboutResponsible.module.css';

const AboutResponsible = () => {
  return (
    <>
      <section className={`${s.respons} container`}>
        <h2 className={`${s.title} sec__title text-center`} title={'Responsible Entertainment'}>
          Responsible Entertainment
        </h2>
        <p className={s.sub}>
          Your Comfort Comes First
        </p>

        <div className={s.wrap}>
          <div className={s.wrapContent}>
          At EnjoyGamesNow, we believe entertainment should always feel light, safe, and positive. Our platform is built entirely for fun—no pressure, no financial mechanics, just enjoyable social play. We encourage balanced screen habits and provide tips to help keep your experience healthy, inspiring, and worry-free
          <ul className={s.list} aria-label={'Info list'}>
            <li>• 18+ Community Only</li>
            <li>• 100% Fun-Focused Play</li>
            <li>• No Real-Money Features</li>
          </ul>
          </div>
        </div>
      </section>

      <section className={`${s.notice} container`}>
        <div className={s.top}>
          <div className={s.icon}>
            <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.545 2.15848C17.618 2.01092 17.7309 1.8867 17.8707 1.79986C18.0106 1.71301 18.172 1.66699 18.3367 1.66699C18.5013 1.66699 18.6627 1.71301 18.8026 1.79986C18.9425 1.8867 19.0553 2.01092 19.1283 2.15848L22.9783 9.95681C23.232 10.4701 23.6063 10.9142 24.0694 11.2509C24.5324 11.5876 25.0702 11.807 25.6367 11.8901L34.2467 13.1501C34.4098 13.1738 34.5631 13.2426 34.6891 13.3488C34.8152 13.455 34.909 13.5944 34.96 13.7512C35.011 13.9079 35.0171 14.0758 34.9776 14.2359C34.9382 14.3959 34.8547 14.5417 34.7367 14.6568L28.51 20.7201C28.0994 21.1203 27.7921 21.6143 27.6147 22.1595C27.4373 22.7048 27.3951 23.285 27.4917 23.8501L28.9617 32.4168C28.9905 32.5799 28.9728 32.7478 28.9108 32.9013C28.8488 33.0548 28.7449 33.1878 28.6109 33.2851C28.4769 33.3825 28.3183 33.4401 28.1531 33.4516C27.9879 33.4631 27.8228 33.428 27.6767 33.3501L19.98 29.3035C19.4729 29.0372 18.9086 28.8981 18.3358 28.8981C17.763 28.8981 17.1988 29.0372 16.6917 29.3035L8.99666 33.3501C8.85054 33.4275 8.68565 33.4623 8.52074 33.4506C8.35583 33.4389 8.19752 33.3811 8.06382 33.2838C7.93011 33.1866 7.82638 33.0538 7.76442 32.9005C7.70246 32.7472 7.68476 32.5797 7.71332 32.4168L9.18166 23.8518C9.27865 23.2864 9.23663 22.7058 9.05922 22.1602C8.88181 21.6146 8.57434 21.1204 8.16332 20.7201L1.93666 14.6585C1.81765 14.5435 1.73331 14.3975 1.69326 14.2369C1.65321 14.0764 1.65905 13.9078 1.71012 13.7505C1.76119 13.5931 1.85544 13.4532 1.98212 13.3468C2.1088 13.2404 2.26283 13.1716 2.42666 13.1485L11.035 11.8901C11.6021 11.8076 12.1406 11.5886 12.6043 11.2518C13.068 10.915 13.4428 10.4706 13.6967 9.95681L17.545 2.15848Z" stroke="#E65F2A" strokeWidth="3.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        <h2 className={`${s.title} sec__title text-center`} title={'Platform Notice'}>
          Platform Notice
        </h2>
        </div>
        <p className={s.noticeText}>
          Important: EnjoyGamesNow is a virtual entertainment platform created solely for recreational purposes. No real-money transactions take place. All experiences use virtual elements and are intended for adults aged 18 and older.
        </p>
      </section>
    </>
  );
};

export default AboutResponsible;
