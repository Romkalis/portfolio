import React from 'react';
import s from './TermsList.module.css'

const TermsList = () => {
  return (
    <>
      <ul className={`${s.list} container`}>
        <li className={s.item}>
          <p className={s.number}>1</p>
          <p className={s.listTitle}> Agreement to Terms</p>
          <p className={s.listText}>By using or accessing EnjoyGamesNow.com, you agree to abide by these Terms &
            Conditions and all relevant Australian laws. If you do not accept any part of these Terms, please
            discontinue use of the platform immediately.</p>
        </li>

        <li className={s.item}>
          <p className={s.number}>2</p>
          <p className={s.listTitle}>Service overview</p>
          <p className={s.listText}>
            EnjoyGamesNow offers a social gaming platform focused on entertainment, social interaction, and skill-based
            enjoyment - without any real-money wagering involved. The services provided may include: <br/>
            -Access to themed virtual experiences and interactive games. <br/>
            -Community features, events, and friendly competitions. <br/>
            -Educational content within games. <br/>
            -Leaderboards, progress tracking, and achievement systems.<br/>
            All services are designed for fun and engagement within a safe, virtual space.
          </p>
        </li>

        <li className={s.item}>
          <p className={s.number}>3</p>
          <p className={s.listTitle}>Eligibility Criteria</p>
          <p className={s.listText}>
            To use EnjoyGamesNow, you must: <br/>
            -Be at least 18 years old in accordance with Australian law. <br/>
            -Have the legal capacity to enter into agreements. <br/>
            -Use the platform for personal and recreational purposes only. <br/>
            -Adhere to all applicable Australian laws and regulations. <br/>
            Age and identity verification may be requested if deemed necessary.
          </p>
        </li>

        <li className={s.item}>
          <p className={s.number}>4</p>
          <p className={s.listTitle}>Prohibited Actions</p>
          <p className={s.listText}>
            Users are prohibited from: <br/>
            -Using the platform for real-money gambling or wagering. <br/>
            -Engaging in fraudulent, unlawful, or deceptive activities. <br/>
            -Attempting to compromise the platform’s security or integrity. <br/>
            -Creating multiple accounts to gain unfair advantage. <br/>
            -Using bots, scripts, or unauthorized tools. <br/>
            -Sharing harmful, offensive, or illegal content. <br/>
            Violations may lead to immediate account suspension or termination.
          </p>
        </li>

        <li className={s.item}>
          <p className={s.number}>5</p>
          <p className={s.listTitle}>Virtual Goods and Rewards</p>
          <p className={s.listText}>
            All in-game rewards, virtual items, tokens, or collectibles: <br/>
            -Hold no real-world monetary value. <br/>
            -Are intended solely for entertainment and progression within the platform. <br/>
            -May be altered, removed, or reset at our discretion. <br/>
            -Do not grant any rights outside the virtual environment. <br/>
            -Cannot be transferred or traded externally.
          </p>
        </li>

        <li className={s.item}>
          <p className={s.number}>6</p>
          <p className={s.listTitle}>Intellectual Property</p>
          <p className={s.listText}>All content on EnjoyGamesNow.com, including logos, text, artwork, graphics, and
            software: <br/>
            -Is owned by EnjoyGamesNow or its licensors. <br/>
            -Cannot be copied, distributed, or reproduced without written consent. <br/>
            -Cannot be used to create derivative works or replicate branding. <br/>
            All intellectual property is protected under both Australian and international law.</p>
        </li>

        <li className={s.item}>
          <p className={s.number}>7</p>
          <p className={s.listTitle}>Privacy and Data Collection</p>
          <p className={s.listText}>Your privacy is important to us. By using the platform, you consent to the practices
            described in our Privacy Policy, which explains how your data is collected, stored, and utilized.</p>
        </li>
        <li className={s.item}>
          <p className={s.number}>8</p>
          <p className={s.listTitle}>Service Availability</p>
          <p className={s.listText}>While we aim to provide continuous access, uninterrupted service cannot be
            guaranteed. EnjoyGamesNow may: <br/>
            -Modify, suspend, or discontinue services at any time. <br/>
            -Carry out system maintenance, updates, or improvements. <br/>
            -Restrict access due to technical, operational, or legal reasons. <br/>
            We are not liable for disruptions, delays, or data loss caused by system maintenance or third-party issues.
          </p>
        </li>

        <li className={s.item}>
          <p className={s.number}>9</p>
          <p className={s.listTitle}>User Conduct</p>
          <p className={s.listText}>All users are expected to act responsibly and respectfully. Access may be restricted
            or revoked for: <br/>
            -Violating these Terms or community standards. <br/>
            -Engaging in harassment, abuse, or harmful behavior. <br/>
            -Exploiting system vulnerabilities or manipulating the platform. <br/>
            -Providing false information or impersonating others. <br/>
            Illegal activities may be reported to relevant Australian authorities.</p>
        </li>

        <li className={s.item}>
          <p className={s.number}>10</p>
          <p className={s.listTitle}>Limitation of Liability</p>
          <p className={s.listText}>
            The platform and its contents are provided "as is. EnjoyGamesNow is not responsible for: <br/>
            -Technical malfunctions, connectivity issues, or service interruptions. <br/>
            -Loss of progress, virtual items, or achievements. <br/>
            -Indirect or consequential damages. <br/>
            -Content from third-party websites or services. <br/>
            Use of the platform is at your own risk.
          </p>
        </li>

        <li className={s.item}>
          <p className={s.number}>11</p>
          <p className={s.listTitle}>Modifications to Terms</p>
          <p className={s.listText}>joyGamesNow may revise these Terms periodically. Any updates will take effect
            immediately upon posting. Continued use of the platform signifies your acceptance of the modified Terms.</p>
        </li>

        <li className={s.item}>
          <p className={s.number}>12</p>
          <p className={s.listTitle}>Termination of Access</p>
          <p className={s.listText}>
            Your access may be suspended or terminated without prior notice if: <br/>
            -You breach any of these Terms. <br/>
            -Your actions pose security, legal, or operational risks. br
            Upon termination, all rights granted to you under these Terms will cease.
          </p>
        </li>

        <li className={s.item}>
          <p className={s.number}>13</p>
          <p className={s.listTitle}> Governing Law</p>
          <p className={s.listText}>These Terms are governed by the laws of Australia. Any disputes arising will fall
            under the jurisdiction of Australian courts.</p>
        </li>


      </ul>


      <section className={`${s.disclaimer} container`}>
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
        <h2 className={s.disclaimerTitle} title={'🔞 Must be 18+ to participate'}>
          🔞 Must be 18+ to participate
        </h2>

        <p className={s.text}>
          By using EnjoyGamesNow, you confirm that you are 18 years or older and accept our Platform Terms.
        </p>

        <p className={s.bottom}>
          For questions, contact us at
          <a href="mailto:contact@demo-portfolio.example" title={'contact@demo-portfolio.example'}
                                          aria-label={'contact@demo-portfolio.example'}> contact@demo-portfolio.example</a>
        </p>
      </section>

    </>
  );
};

export default TermsList;
