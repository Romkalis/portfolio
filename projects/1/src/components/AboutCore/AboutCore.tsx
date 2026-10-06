import React from 'react';
import s from './AboutCore.module.css';

const AboutCore = () => {
  return (
    <>
      <section className={`${s.core} container`}>
        <h2 className={`${s.title} sec__title text-center`} title={'Core Values'}>
          Core Values
        </h2>

        <ul className={s.list} aria-label={'Core Values list'}>
          <li className={s.item}>
            <div className={s.icon}>
              <svg width="30" height="26" viewBox="0 0 30 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.33301 8.68788C1.33304 7.20415 1.78313 5.75532 2.62385 4.53276C3.46457 3.31021 4.65636 2.37142 6.04182 1.84041C7.42728 1.3094 8.94122 1.21114 10.3837 1.5586C11.8262 1.90607 13.1293 2.68292 14.121 3.78655C14.1909 3.86123 14.2753 3.92077 14.3691 3.96148C14.4629 4.00219 14.5641 4.02319 14.6663 4.02319C14.7686 4.02319 14.8698 4.00219 14.9636 3.96148C15.0574 3.92077 15.1418 3.86123 15.2117 3.78655C16.2003 2.67575 17.5037 1.89237 18.9485 1.54068C20.3933 1.18899 21.911 1.28567 23.2995 1.81786C24.688 2.35004 25.8815 3.29248 26.7212 4.51975C27.5608 5.74701 28.0068 7.20089 27.9997 8.68788C27.9997 11.7412 25.9997 14.0212 23.9997 16.0212L16.677 23.1052C16.4286 23.3906 16.1222 23.6198 15.7784 23.7776C15.4346 23.9355 15.0611 24.0183 14.6827 24.0207C14.3044 24.0231 13.9299 23.945 13.5841 23.7915C13.2382 23.638 12.929 23.4127 12.677 23.1305L5.33301 16.0212C3.33301 14.0212 1.33301 11.7545 1.33301 8.68788Z"
                  stroke="#FF6900" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className={s.sub}>
              Entertainment First
            </p>
            <p>
              At EnjoyGamesNow, we believe that digital experiences should be exciting, accessible, and enjoyable for
              everyone, ensuring fun for all players.
            </p>
          </li>

          <li className={s.item}>
            <div className={s.icon}>
              <svg width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.67089 17.3365C2.41857 17.3373 2.1712 17.2666 1.95749 17.1325C1.74379 16.9983 1.57253 16.8063 1.46362 16.5787C1.35471 16.3511 1.31261 16.0973 1.34222 15.8467C1.37183 15.5961 1.47193 15.3591 1.63089 15.1631L14.8309 1.56315C14.9299 1.44886 15.0648 1.37162 15.2135 1.34412C15.3622 1.31663 15.5159 1.3405 15.6492 1.41182C15.7825 1.48314 15.8877 1.59768 15.9473 1.73662C16.007 1.87557 16.0177 2.03068 15.9776 2.17648L13.4176 10.2031C13.3421 10.4052 13.3167 10.6225 13.3437 10.8365C13.3706 11.0505 13.4491 11.2547 13.5723 11.4317C13.6956 11.6087 13.8599 11.7532 14.0513 11.8527C14.2426 11.9522 14.4552 12.0038 14.6709 12.0031H24.0042C24.2565 12.0023 24.5039 12.073 24.7176 12.2072C24.9313 12.3413 25.1026 12.5333 25.2115 12.7609C25.3204 12.9885 25.3625 13.2424 25.3329 13.4929C25.3033 13.7435 25.2032 13.9805 25.0442 14.1765L11.8442 27.7765C11.7452 27.8908 11.6103 27.968 11.4616 27.9955C11.3129 28.023 11.1593 27.9991 11.0259 27.9278C10.8926 27.8565 10.7874 27.742 10.7278 27.603C10.6681 27.4641 10.6575 27.309 10.6976 27.1631L13.2576 19.1365C13.333 18.9344 13.3584 18.7171 13.3314 18.5031C13.3045 18.2892 13.226 18.0849 13.1028 17.9079C12.9795 17.7309 12.8152 17.5865 12.6239 17.4869C12.4325 17.3874 12.2199 17.3358 12.0042 17.3365H2.67089Z" stroke="#E65F2A" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

            </div>
            <p className={s.sub}>
              Creative Innovation
            </p>
            <p>
              We’re always pushing the boundaries with cutting-edge technology and fresh, innovative concepts in social gaming, keeping our platform dynamic and forward-thinking.
            </p>
          </li>

          <li className={s.item}>
            <div className={s.icon}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.3337 28V25.3333C21.3337 23.9188 20.7718 22.5623 19.7716 21.5621C18.7714 20.5619 17.4148 20 16.0003 20H8.00033C6.58584 20 5.22928 20.5619 4.22909 21.5621C3.2289 22.5623 2.66699 23.9188 2.66699 25.3333V28" stroke="#FB5A46" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.333 4.1709C22.4767 4.46739 23.4895 5.13525 24.2126 6.06965C24.9356 7.00405 25.3279 8.15208 25.3279 9.33357C25.3279 10.515 24.9356 11.6631 24.2126 12.5975C23.4895 13.5319 22.4767 14.1997 21.333 14.4962" stroke="#FB5A46" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M29.333 27.9995V25.3329C29.3321 24.1512 28.9388 23.0032 28.2148 22.0693C27.4908 21.1353 26.4772 20.4683 25.333 20.1729" stroke="#FB5A46" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.0003 14.6667C14.9458 14.6667 17.3337 12.2789 17.3337 9.33333C17.3337 6.38781 14.9458 4 12.0003 4C9.05481 4 6.66699 6.38781 6.66699 9.33333C6.66699 12.2789 9.05481 14.6667 12.0003 14.6667Z" stroke="#FB5A46" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

            </div>
            <p className={s.sub}>
              Community Spirit
            </p>
            <p>
              We foster a welcoming and inclusive space where players can connect, share experiences, and build lasting relationships through our social gaming environment.
            </p>
          </li>

          <li className={s.item}>
            <div className={s.icon}>
              <svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.6663 16.0003C22.6663 22.6669 17.9997 26.0003 12.453 27.9336C12.1626 28.032 11.8471 28.0273 11.5597 27.9203C5.99967 26.0003 1.33301 22.6669 1.33301 16.0003V6.66694C1.33301 6.31332 1.47348 5.97418 1.72353 5.72413C1.97358 5.47408 2.31272 5.33361 2.66634 5.33361C5.33301 5.33361 8.66634 3.73361 10.9863 1.70694C11.2688 1.46561 11.6281 1.33301 11.9997 1.33301C12.3712 1.33301 12.7305 1.46561 13.013 1.70694C15.3463 3.74694 18.6663 5.33361 21.333 5.33361C21.6866 5.33361 22.0258 5.47408 22.2758 5.72413C22.5259 5.97418 22.6663 6.31332 22.6663 6.66694V16.0003Z" stroke="#FF6900" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

            </div>
            <p className={s.sub}>
              Ethical Standards
            </p>
            <p>
              We are committed to promoting responsible entertainment, ensuring that our platform operates with the highest moral values and respects the well-being of every player.
            </p>
          </li>
        </ul>

      </section>
    </>
  );
};

export default AboutCore;
