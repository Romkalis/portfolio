import React from 'react';
import Contact from "@/components/contact/Contact";
import s from "./ContactGrid.module.css";

const ContactGrid = () => {
  return (
    <>
      <section className={`${s.mainGrid} container`}>
        <div className={s.block}>
          <h2 className={`${s.title} sec__title`} title={'Send us Your Message'}>
            Send us Your Message

          </h2>
          <Contact/>
        </div>

        <div className={s.block}>
          <p className={`${s.title} sec__title`}>
            Other Ways to Reach Us
          </p>

          <div className={s.wrap}>

            <p className={s.sub}>Email Support</p>
            <p className={s.text}>Receive full support and assistance through email for all your inquiries.</p>
            <a href="mailto:contact@demo-portfolio.example" className={s.link}
               title={'Send Email: contact@demo-portfolio.example'} aria-label={'contact@demo-portfolio.example'}>
              <span>contact@demo-portfolio.example</span>
              <span className={s.btn}>
                Send Email
              </span>
            </a>
          </div>

          <div className={s.cards}>
            <p className={`${s.title} sec__title`}>
              Frequently Asked Questions
            </p>

            <ul className={s.questionsList}>
              <li>
                <p className={s.itemTitle}>What is EnjoyGamesNow?</p>
                <p className={s.itemText}>EnjoyGamesNow is a social online gaming platform where you can play, complete
                  challenges, collect rewards, and compete with the community — all just for fun, no real money
                  involved.</p>
              </li>
              <li>
                <p className={s.itemTitle}>Do I need to pay to play?</p>
                <p className={s.itemText}>No, the platform is completely free. You can play games, earn bonuses, and unlock rewards without any purchases or real-money transactions</p>
              </li>
              <li>
                <p className={s.itemTitle}>How do I claim rewards and bonuses?</p>
                <p className={s.itemText}>Simply log in daily, complete tasks, and collect rewards directly in your profile. Bonuses refresh every day and can be used instantly in games</p>
              </li>
              <li>
                <p className={s.itemTitle}>Can I play on my phone?</p>
                <p className={s.itemText}>Yes! EnjoyGamesNow works on mobile, tablet, and desktop. No downloads required — just open and play</p>
              </li>
              <li>
                <p className={s.itemTitle}>Is there a community or leaderboard?</p>
                <p className={s.itemText}>Yes! You can track your progress, compete with other players, and climb the leaderboard in a safe, friendly social gaming environment</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactGrid;
