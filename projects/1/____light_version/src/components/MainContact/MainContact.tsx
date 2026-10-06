import React from 'react';
import s from './MainContact.module.css'

const MainContact = () => {
  return (
    <>
      <section className={`${s.contact} container`}>
        <h2 className="visually-hidden">Contacts list and information</h2>
        <ul className={s.contactList} aria-label="contact info List">
          <li className={s.contactItem}>
            <div className={s.contactItemTop}>
              <img src="/eg-docs/logo-bend.webp" alt="site logo" className={s.logo} title={'logo'}/>
              <p className={`${s.logoTitle} sec__title`}>
                EnjoyGamesNow
              </p>
              <p className={s.logoText}>
                Social Gaming Champion
              </p>
            </div>
            <p className={s.text}>
              Our dedicated support team is always here to help. Whether you need assistance, advice, or have a
              technical issue, we are available around the clock to ensure your experience runs smoothly.
            </p>
            <a href="mailto:support@enjoygamesnow.com" className={s.contactItemLink} title={'support@enjoygamesnow.com'}
               aria-label={'support@enjoygamesnow.com'}>support@enjoygamesnow.com</a>
          </li>


          <li className={s.contactItem}>
            <div className={s.itemTop2}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="16" fill="#E65F2A" fillOpacity="0.2"/>
                <path d="M17 35.6668V14.6668C17 14.048 17.2458 13.4545 17.6834 13.0169C18.121 12.5793 18.7145 12.3335 19.3333 12.3335H28.6667C29.2855 12.3335 29.879 12.5793 30.3166 13.0169C30.7542 13.4545 31 14.048 31 14.6668V35.6668H17Z" stroke="#E65F2A" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.0002 24H14.6668C14.048 24 13.4545 24.2458 13.0169 24.6834C12.5793 25.121 12.3335 25.7145 12.3335 26.3333V33.3333C12.3335 33.9522 12.5793 34.5457 13.0169 34.9832C13.4545 35.4208 14.048 35.6667 14.6668 35.6667H17.0002" stroke="#E65F2A" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M31 20.5H33.3333C33.9522 20.5 34.5457 20.7458 34.9832 21.1834C35.4208 21.621 35.6667 22.2145 35.6667 22.8333V33.3333C35.6667 33.9522 35.4208 34.5457 34.9832 34.9832C34.5457 35.4208 33.9522 35.6667 33.3333 35.6667H31" stroke="#E65F2A" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.6665 17H26.3332" stroke="#E65F2A" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.6665 21.6665H26.3332" stroke="#E65F2A" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.6665 26.3335H26.3332" stroke="#E65F2A" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.6665 31H26.3332" stroke="#E65F2A" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className={`${s.itemTopTitl} sec__title`}>
                Company Information
              </p>
            </div>

            <div className={`${s.contactItemLink} ${s.top2}`}>
              AWESOME BY DESIGN LIMITED
            </div>

            <ul className={s.contactsInnerList} aria-label={'Info list'}>
              <li>
                <div className={s.cIcon}></div>
                <p className={s.smallText}>
                  Bazeli Trading Ltd <br/>
                  Archiepiskopou Makariou III,<br/>
                  84, Office 1, <br/>
                  Larnaca 6017 <br/>
                  Cyprus
                </p>
              </li>

              <li>
                <div className={s.cIcon}></div>
                <a href={'tel:+18076989286'} className={s.smallText} aria-label={'Phone Number: +1 (807) 698-9286'} title={'+1 (807) 698-9286'}>
                  +1 (807) 698-9286
                </a>
              </li>

              <li>
                <div className={s.cIcon}></div>
                <p className={s.smallText} >
                  Corp #1293531-7
                </p>
              </li>
            </ul>
          </li>
        </ul>


        <ul className={s.dvantages} aria-label={'Advantages list'}>
          <li>
            <p className={`${s.advTitle} sec__title`}>Gaming</p>
            <p className={s.advText}>
              Spin Adventures <br/>
              Card Challenges <br/>
              Interactive Quests <br/>
              Special Events
            </p>
          </li>
          <li>
            <p className={`${s.advTitle} sec__title`}>Community</p>
            <p className={s.advText}>
              Support Hub <br/>
              Get Assistance <br/>
              Frequently Asked <br/>
              Gaming Guides
            </p>
          </li>
          <li>
            <p className={`${s.advTitle} sec__title`}>Player Account</p>
            <p className={s.advText}>
              Create Account <br/>
              Player Login</p>
          </li>
          <li>
            <p className={`${s.advTitle} sec__title`}>Platform</p>
            <p className={s.advText}>
              Our Journey <br/>
              Join Us <br/>
              Updates <br/>
              Safe Gaming
            </p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default MainContact;
