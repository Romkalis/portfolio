import React from 'react';
import s from './Support.module.css';

const Support = () => {
  return (
    <>
        <section className={`${s.support} container`}>
          <h2 className={`${s.title} sec__title`} title={'Support for you'}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="32" fill="#FF9600" fillOpacity="0.2"/>
              <path d="M37 19.0308L36.344 19.7498C34.875 21.3668 33.664 22.0898 32.656 22.5628C31.648 23.0348 30.801 23.1758 29.969 23.8128C29.082 24.4928 27.793 25.7968 27.25 28.1248C26.086 28.3788 25.234 28.8248 24.562 29.4058C23.898 29.9798 23.398 30.6328 22.782 31.3438C22.777 31.3518 22.785 31.3668 22.782 31.3748C21.898 32.3908 21.125 33.4848 19.625 34.0628L19 34.3128V44.9998H38.063C39.156 44.9408 39.914 44.1838 40.375 43.4368C40.835 42.6908 41.09 41.8828 41.219 41.2188C41.551 39.5268 42.156 34.6558 42.156 34.6558L42.188 34.5628V34.4688C42.156 33.7928 41.878 33.2188 41.531 32.6868L42.656 29.3438L44.438 26.6558L44.938 25.9368L44.281 25.3438L37.719 19.6558L37 19.0308ZM37.063 21.7808L42.281 26.3128L40.906 28.3428L40.813 28.4378L40.781 28.5938L39.875 31.2808C39.402 31.0858 38.915 30.9488 38.375 30.9688H38.312L32 30.9998H31V34.8748C30.86 35.9648 30.254 36.3868 29.5 36.6878C29.25 36.7888 29.219 36.7338 29 36.7808V30.9698C28.836 27.2628 30.156 26.1958 31.188 25.4068C31.473 25.1878 32.308 24.9348 33.5 24.3758C34.496 23.9068 35.734 23.0658 37.063 21.7808ZM27.063 30.3748C27.059 30.6018 26.988 30.7618 27 30.9998V38.9998H28C28 38.9998 29.07 38.9878 30.219 38.5308C31.368 38.0738 32.754 37.0038 33 35.1248V32.9998L38.375 32.9688H38.406C38.8451 32.9442 39.276 33.0949 39.6041 33.3877C39.9322 33.6806 40.1307 34.0917 40.156 34.5308C40.152 34.5468 40.106 34.9178 40.094 34.9998H36V36.9998H39.844C39.738 37.7728 39.641 38.2578 39.531 38.9998H36V40.9998H39.219C39.1009 41.4836 38.9111 41.947 38.656 42.3748C38.383 42.8198 38.148 42.9878 37.938 42.9998H21V35.5308C22.621 34.6708 23.629 33.4338 24.281 32.6878C24.957 31.9138 25.421 31.3278 25.875 30.9378C26.172 30.6838 26.637 30.5388 27.063 30.3748Z" fill="#C10007"/>
            </svg>
            Support for you
          </h2>
          <p className={s.sub}>
            Professional Help Resources
          </p>

          <ul className={s.list} aria-label={'Info list'}>
            <li className={s.item}>
              <div className={s.icon}></div>
              <p className={s.text}><b>
                Professional Support
              </b></p>
              <p className={s.text}>
                Personalized advice when you need it
              </p>
            </li>

            <li className={s.item}>
              <div className={s.icon}></div>
              <p className={s.text}><b>
                Professional Support
              </b></p>
              <p className={s.text}>
                Helpful resources and expert insights
              </p>
            </li>

            <li className={s.item}>
              <div className={s.icon}></div>
              <p className={s.text}><b>
                Professional Support
              </b></p>
              <p className={s.text}>
                Ongoing support every step of the way
              </p>
            </li>
          </ul>
        </section>
    </>
  );
};

export default Support;
