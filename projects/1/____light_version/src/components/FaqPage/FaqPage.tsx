import React from 'react';
import styles from "@/components/ContactGrid/ContactGrid.module.css";
import s from './FaqPage.module.css';

const FaqPage = () => {
  return (
    <>
      <section className={`${s.faq} container`}>
        <div className={s.grid}>
          <div className={styles.cards}>
            <h1 className={`${styles.title} sec__title`} title={'Frequently Asked Questions'}>
              Frequently Asked Questions
            </h1>

            <ul className={styles.questionsList}>
              <li>
                <p className={styles.itemTitle}>What is EnjoyGamesNow?</p>
                <p className={styles.itemText}>EnjoyGamesNow is a social online gaming platform where you can play,
                  complete
                  challenges, collect rewards, and compete with the community — all just for fun, no real money
                  involved.</p>
              </li>
              <li>
                <p className={styles.itemTitle}>Do I need to pay to play?</p>
                <p className={styles.itemText}>No, the platform is completely free. You can play games, earn bonuses,
                  and unlock rewards without any purchases or real-money transactions</p>
              </li>
              <li>
                <p className={styles.itemTitle}>How do I claim rewards and bonuses?</p>
                <p className={styles.itemText}>Simply log in daily, complete tasks, and collect rewards directly in your
                  profile. Bonuses refresh every day and can be used instantly in games</p>
              </li>
              <li>
                <p className={styles.itemTitle}>Can I play on my phone?</p>
                <p className={styles.itemText}>Yes! EnjoyGamesNow works on mobile, tablet, and desktop. No downloads
                  required — just open and play</p>
              </li>
              <li>
                <p className={styles.itemTitle}>Is there a community or leaderboard?</p>
                <p className={styles.itemText}>Yes! You can track your progress, compete with other players, and climb
                  the leaderboard in a safe, friendly social gaming environment</p>
              </li>
            </ul>
          </div>
          <div className={s.left}>

            <div className={`${s.popular}`}>
              <div className={s.top}>
                <p className={s.secTitle}>
                  Popular Sections
                </p>
                <p className={s.text}>
                  Here are some of the top areas you might be interested in
                </p>
              </div>

              <ul className={s.advList} aria-label={'Advantages List'}>
                <li>
                  <div className={s.icon}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 12.8335H11.6667" stroke="#FF6900" strokeWidth="2.33333" strokeLinecap="round"
                            strokeLinejoin="round"/>
                      <path d="M9.33398 10.5V15.1667" stroke="#FF6900" strokeWidth="2.33333" strokeLinecap="round"
                            strokeLinejoin="round"/>
                      <path d="M17.5 14H17.5117" stroke="#FF6900" strokeWidth="2.33333" strokeLinecap="round"
                            strokeLinejoin="round"/>
                      <path d="M21 11.6665H21.0117" stroke="#FF6900" strokeWidth="2.33333" strokeLinecap="round"
                            strokeLinejoin="round"/>
                      <path
                        d="M20.2073 5.8335H7.79398C6.63931 5.83377 5.52574 6.2621 4.66852 7.0357C3.81131 7.80931 3.27134 8.87324 3.15298 10.0218C3.14598 10.0825 3.14132 10.1397 3.13315 10.1992C3.03865 10.9855 2.33398 16.8655 2.33398 18.6668C2.33398 19.5951 2.70273 20.4853 3.35911 21.1417C4.01549 21.7981 4.90573 22.1668 5.83398 22.1668C7.00065 22.1668 7.58398 21.5835 8.16732 21.0002L9.81698 19.3505C10.2545 18.9129 10.8479 18.667 11.4667 18.6668H16.5347C17.1534 18.667 17.7468 18.9129 18.1843 19.3505L19.834 21.0002C20.4173 21.5835 21.0007 22.1668 22.1673 22.1668C23.0956 22.1668 23.9858 21.7981 24.6422 21.1417C25.2986 20.4853 25.6673 19.5951 25.6673 18.6668C25.6673 16.8643 24.9627 10.9855 24.8682 10.1992C24.86 10.1408 24.8553 10.0825 24.8483 10.023C24.7302 8.87419 24.1904 7.80998 23.3331 7.03614C22.4759 6.26229 21.3622 5.83379 20.2073 5.8335Z"
                        stroke="#FF6900" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className={s.advInfo}>
                    <p className={s.subttile}>All Games</p>
                    <p className={s.text}>Explore our full collection of games.</p>
                  </div>
                </li>

                <li>
                  <div className={s.icon}>
                    <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12.2806 1.51055C12.3317 1.40725 12.4107 1.3203 12.5086 1.25951C12.6066 1.19872 12.7195 1.1665 12.8348 1.1665C12.95 1.1665 13.063 1.19872 13.1609 1.25951C13.2588 1.3203 13.3378 1.40725 13.3889 1.51055L16.0839 6.96938C16.2615 7.32867 16.5236 7.63952 16.8477 7.87524C17.1718 8.11096 17.5483 8.26451 17.9448 8.32271L23.9718 9.20471C24.086 9.22126 24.1933 9.26943 24.2815 9.34378C24.3698 9.41813 24.4354 9.51569 24.4711 9.62542C24.5068 9.73516 24.5111 9.85269 24.4835 9.96472C24.4558 10.0768 24.3974 10.1788 24.3148 10.2594L19.9561 14.5037C19.6687 14.7838 19.4536 15.1296 19.3294 15.5113C19.2052 15.893 19.1757 16.2991 19.2433 16.6947L20.2723 22.6914C20.2924 22.8055 20.2801 22.923 20.2367 23.0305C20.1933 23.138 20.1205 23.2311 20.0267 23.2992C19.933 23.3673 19.8219 23.4077 19.7063 23.4158C19.5907 23.4238 19.4751 23.3992 19.3728 23.3447L13.9851 20.512C13.6301 20.3256 13.2352 20.2283 12.8342 20.2283C12.4332 20.2283 12.0383 20.3256 11.6833 20.512L6.29678 23.3447C6.1945 23.3989 6.07908 23.4232 5.96364 23.415C5.8482 23.4068 5.73739 23.3664 5.64379 23.2983C5.5502 23.2302 5.47759 23.1373 5.43421 23.03C5.39084 22.9227 5.37845 22.8054 5.39845 22.6914L6.42628 16.6959C6.49418 16.3001 6.46476 15.8937 6.34058 15.5118C6.21639 15.1299 6.00116 14.7839 5.71345 14.5037L1.35478 10.2605C1.27147 10.1801 1.21244 10.0778 1.1844 9.96547C1.15637 9.85309 1.16046 9.7351 1.19621 9.62494C1.23196 9.51477 1.29793 9.41686 1.3866 9.34236C1.47528 9.26786 1.5831 9.21976 1.69778 9.20355L7.72361 8.32271C8.12058 8.26496 8.49757 8.11161 8.82213 7.87586C9.14669 7.64012 9.4091 7.32903 9.58678 6.96938L12.2806 1.51055Z"
                        stroke="#FF6900" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                  </div>
                  <div className={s.advInfo}>
                    <p className={s.subttile}>Featured Games</p>
                    <p className={s.text}>Check out the games that are currently trending.</p>
                  </div>
                </li>

                <li>
                  <div className={s.icon}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.666 8.1665H25.666V15.1665" stroke="#FF6900" strokeWidth="2.33333"
                            strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M25.6673 8.1665L15.7507 18.0832L9.91732 12.2498L2.33398 19.8332" stroke="#FF6900"
                            strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                  </div>
                  <div className={s.advInfo}>
                    <p className={s.subttile}>New Releases</p>
                    <p className={s.text}>Find the newest games we've added.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className={styles.wrap}>

              <p className={styles.sub}>Email Support</p>
              <p className={styles.text}>Receive full support and assistance through email for all your inquiries.</p>
              <a href="mailto:support@enjoygamesnow.com" className={styles.link}
                 title={'Send Email: support@enjoygamesnow.com'} aria-label={'support@enjoygamesnow.com'}>
                <span>support@enjoygamesnow.com</span>
                <span className={styles.btn}>
                Send Email
              </span>
              </a>
            </div>

            <div className={s.troubles}>
              <p className={s.troubleTitle}>
                <span className={s.icon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.0002 21.0002L16.6602 16.6602" stroke="#FF6900" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round"/>
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="#FF6900" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>Still Having Trouble Finding It?
              </p>
              <p className={s.text}>
                If you're searching for a particular game or page, try using our search tool or explore our categories.
                Our collection is always expanding!
              </p>

              <ul className={s.troubleList} aria-label={'Decorative elements list'}>
                <li>🆓 Free to Play</li>
                <li>🎮 Entertainment Only</li>
                <li>🔒 Safe & Secure</li>
              </ul>

              <p className={s.troubleBottom}>
                Need help? Contact us at <a href="mailto:support@enjoygamesnow.com"
                                            aria-label={'support@enjoygamesnow.com'}
                                            title={'support@enjoygamesnow.com'}>support@enjoygamesnow.com</a>
              </p>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqPage;
