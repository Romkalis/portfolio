import React from 'react';
import s from './Reviews.module.css';

const Reviews = () => {
  return (
    <>
      <section className={s.reviews}>
        <div className={`${s.wrap} container`}>
          <h2 className={`${s.title} sec__title`} title={'What Aussie Players Are Saying'}>
            What Aussie Players Are Saying
          </h2>
          <p className={s.description}>
            Locals are saying Winzony.com is where it's at! People can't stop playing their cool games like 🐼 Pan Slot 2, 🚀 Night City 2, and 🦊 Sombrero.
            Seriously fun, a bit silly, and full of awesome online stuff.
          </p>

          <ul className={s.list}>
            <li className={s.item}>
              <p className={s.itemText}>"Man, AstraReels.com is my new hangout spot. Tried Valhalla first — graphics blew my mind! Now I’m bouncing between Deep Sea and Donuts, can’t pick a fave 😅"</p>
              <p className={s.name}>
                Daryl
              </p>
            </li>

            <li className={s.item}>
              <p className={s.itemText}>"Didn’t expect to get so into it, but Wild Love got me hooked! AstraReels runs smooth and the game variety’s awesome. Super chill to play after work."</p>
              <p className={s.name}>
                Tobias
              </p>
            </li>

            <li className={s.item}>
              <p className={s.itemText}>"Found AstraReels last week and I’m obsessed already. Donuts is hilarious, and Wild Love’s story? Lowkey emotional, not even kidding 😂"</p>
              <p className={s.name}>
                Clifton
              </p>
            </li>

          </ul>
        </div>
      </section>

    </>
  );
};

export default Reviews;
