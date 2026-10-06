import {withBase} from "@/utils/withBase";
import React from 'react';
import s from './Offer.module.css'

const Offer = () => {
  return (
    <>
      <section className={`${s.offer} container`}>
        <h2 className="visually-hidden">Our offer</h2>
        <div className={s.grid}>
          <div className={s.pic}/>
          <ul className={s.offersList} aria-label={'Offers list'}>
            <li className={s.item}>
              <div className={s.itemPic}></div>
              <p className={s.itemTitle}>CS2: Skins & Credits</p>
              <div className={s.itemInfo}>
                <p className={s.itemText}>Enhance your CS2 experience with exclusive skins and in-game credits. Choose
                  from a wide range of weapon skins, including rare and premium designs, and boost your gameplay with
                  credits for unlocking items and upgrades.</p>
                <a href={withBase("/catalog/")} className={`${s.button} button`} title={'Shop Now'} aria-label={'Catalog Link'}>
                  Shop Now
                </a>
              </div>
            </li>

            <li className={s.item}>
              <div className={s.itemPic}></div>
              <p className={s.itemTitle}>Dota 2: Points & Skins</p>
              <div className={s.itemInfo}>
                <p className={s.itemText}>"Power up your Dota 2 gameplay with Dota 2 Points (DP) and stylish hero skins.
                  Use DP to purchase new skins, hero variants, and other cosmetics that will make your heroes stand out
                  in every battle."</p>
                <a href={withBase("/catalog/")} className={`${s.button} button`} title={'Shop Now'} aria-label={'Catalog Link'}>
                  Shop Now
                </a>
              </div>
            </li>

            <li className={s.item}>
              <div className={s.itemPic}></div>
              <p className={s.itemTitle}>Fortnite: V-Bucks & Skins</p>
              <div className={s.itemInfo}>
                <p className={s.itemText}>Get V-Bucks and skins to personalize your Fortnite experience. Use V-Bucks to unlock skins, emotes, and other exciting cosmetics, giving you the perfect look for every battle royale match.
                </p>
                <a href={withBase("/catalog/")} className={`${s.button} button`} title={'Shop Now'} aria-label={'Catalog Link'}>
                  Shop Now
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>

    </>
  );
};

export default Offer;
