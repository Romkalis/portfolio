import React from 'react';
import s from './PrivacyInfo.module.css';

const PrivacyInfo = () => {
  return (
    <>
      <div className={`${s.top} container`}>
        <div className={s.topWrap}>
          <p>Welcome to EnjoyGamesNow – Your Privacy and Enjoyable Experience Are Our Top Priority At EnjoyGamesNow,
            safeguarding your privacy and providing a secure, fun environment for our players in Australia is at the
            heart
            of what we do. We’re committed to protecting your personal information while offering a safe and engaging
            social gaming experience.</p>
        </div>
      </div>

      <ul className={`${s.list} container`} aria-label={'Policy information list'}>


        <li className={s.item}>
          <div className={s.count}>
            <p className={s.num}>
              1
            </p>
            <p className={s.title}>
              Overview
            </p>
          </div>
          <p className={s.text}>
            We prioritize your privacy at EnjoyGamesNow and manage all personal information in full compliance with
            Australian privacy laws. We only collect the necessary data to ensure a personalized, safe, and enjoyable
            experience.
          </p>
        </li>

        <li className={s.item}>
          <div className={s.count}>
            <p className={s.num}>
              2
            </p>
            <p className={s.title}>
              Information we collect
            </p>
          </div>
          <p className={s.text}>
            The types of data we may collect include: <br/>
            -Personal Information: Your name, email, or contact details when registering, reaching out to support, or
            subscribing to our updates.<br/>
            -Usage Data: Device details, browser information, IP address, and your interactions with our platform to
            enhance its performance and usability.<br/>
            -Preferences and Activities: Data related to your gameplay choices, achievements, or selected challenges to
            personalize your experience.<br/>
            -Cookies: Small files stored on your device to remember settings and improve functionality (please refer to
            our Cookie Policy for more information).
          </p>
        </li>

        <li className={s.item}>
          <div className={s.count}>
            <p className={s.num}>
              3
            </p>
            <p className={s.title}>
              How We Use Your Information
            </p>
          </div>
          <p className={s.text}>
            We use your data to: <br/>
            -Provide access to games and interactive features. <br/>
            -Personalize your gaming experience and suggest relevant activities. <br/>
            -Respond to customer inquiries and support requests. <br/>
            -Ensure platform security, maintain performance, and comply with regulations. <br/>
            -Send updates or promotional content, but only if you’ve opted in. <br/>
            -Fulfill legal or regulatory obligations. <br/>
          </p>
        </li>

        <li className={s.item}>
          <div className={s.count}>
            <p className={s.num}>
              4
            </p>
            <p className={s.title}>
              Data sharing and disclosure
            </p>
          </div>
          <p className={s.text}>
            We do not sell or rent your personal data. However, we may share data in specific cases: <br/>
            -With trusted service providers for hosting, analytics, or security, under strict confidentiality
            agreements. <br/>
            -When required by law or government authorities. <br/>
            -During business transitions like mergers or acquisitions, ensuring your data remains protected. <br/>
          </p>
        </li>

        <li className={s.item}>
          <div className={s.count}>
            <p className={s.num}>
              5
            </p>
            <p className={s.title}>
              Data security
            </p>
          </div>
          <p className={s.text}>
            We implement robust security measures, including: <br/>s
            -Encryption of stored and transmitted data. <br/>
            -Restricted access, with only authorized personnel handling personal data. <br/>
            -Routine security audits and system checks. <br/>
            -Firewalls and monitoring to prevent unauthorized access. <br/>
            While we ensure top-level protection, no system is entirely foolproof. In case of a breach, affected users
            will be notified as per Australian privacy regulations. <br/>
          </p>
        </li>

        <li className={s.item}>
          <div className={s.count}>
            <p className={s.num}>
              6
            </p>
            <p className={s.title}>
              Your rights and choices
            </p>
          </div>
          <p className={s.text}>
            As a user, you have the right to: <br/>
            -Access and view your personal data. <br/>
            -Correct or delete incorrect information. <br/>
            -Withdraw consent for data processing at any time. <br/>
            -Opt out of promotional communications. <br/>
            To exercise your rights, please contact our Privacy Officer at support@enjoygamesnow.com. We will address
            all requests promptly.
          </p>
        </li>

        <li className={s.item}>
          <div className={s.count}>
            <p className={s.num}>
              7
            </p>
            <p className={s.title}>
              Cookies and tracking
            </p>
          </div>
          <p className={s.text}>
            We use cookies to: <br/>
            -Remember your preferences and session details. <br/>
            -Monitor site performance and improve navigation. <br/>
            -Enhance your social gaming experience. <br/>
            You can manage or disable cookies through your browser settings, though some features may not work without
            them.
          </p>
        </li>

        <li className={s.item}>
          <div className={s.count}>
            <p className={s.num}>
              8
            </p>
            <p className={s.title}>
              Third-Party links
            </p>
          </div>
          <p className={s.text}>
            Our platform may contain links to external websites. Please note, EnjoyGamesNow is not responsible for the
            privacy practices of these third-party sites. We recommend reviewing their privacy policies before sharing
            any personal information.
          </p>
        </li>

        <li className={s.item}>
          <div className={s.count}>
            <p className={s.num}>
              9
            </p>
            <p className={s.title}>
              Children’s privacy
            </p>
          </div>
          <p className={s.text}>
            Our services are intended solely for individuals aged 18 and older. We do not knowingly collect information
            from minors. If we discover any data belonging to users under 18, it will be promptly deleted.
          </p>
        </li>

        <li className={s.item}>
          <div className={s.count}>
            <p className={s.num}>
              10
            </p>
            <p className={s.title}>
              Updates to this policy
            </p>
          </div>
          <p className={s.text}>
            We may update this Privacy Policy periodically to reflect changes in the law, technology, or platform
            operations. Updates will be posted with a new “Last Updated” date. Continued use of EnjoyGamesNow after
            updates signifies your acceptance of the revised policy.
          </p>
        </li>

      </ul>
    </>
  );
};

export default PrivacyInfo;
