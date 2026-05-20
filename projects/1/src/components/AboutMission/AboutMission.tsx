import React from 'react';
import s from './AboutMission.module.css';

const AboutMission = () => {
  return (
    <>
      <section className={`${s.mission} container`}>
        <h2 className={`${s.title} sec__title text-center`} title={'Our Mission'}>
          Our Mission
        </h2>

        <div className={s.missionWrap}>
          At EnjoyGamesNow, we’re here to deliver engaging social play that brings people together in a positive, secure, and welcoming digital space. Our focus is on fair interaction, safe entertainment, and community-driven fun—every moment crafted for enjoyment, not pressure.
          <ul className={s.decorative}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default AboutMission;
