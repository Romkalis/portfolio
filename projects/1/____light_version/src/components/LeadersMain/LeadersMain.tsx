import React from 'react';
import s from './LeadersMain.module.css';

const LeadersMain = () => {
  return (
    <>
      <section className={s.lead}>
        <div className={s.wrap}>
          <h1 className={`${s.title} sec__title`} title={'Elite Social Gaming Legends'}>
            Elite Social Gaming Legends
          </h1>
          <p className={`${s.description} sec__title`}>
            Top Social Gaming Heroes
          </p>

          <div className={s.text}>
            Uncover the leading players in our community challenges and see
            who’s racking up the most adventure points.
          </div>
        </div>
      </section>
    </>
  );
};

export default LeadersMain;
