import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import s from './styles.module.css';
import LastDeals from "@/components/LastDeals/LastDeals";
import Reviews from "@/components/reviews/Reviews";

export const metadata: Metadata = {
  title: "Easy Steps to Buy Skins & Currency – PixelPowerShop",
  description: "Learn how to easily purchase skins and in-game items for CS2, Dota 2, and Fortnite. Fast, secure transactions and instant delivery at PixelPowerShop.",
  alternates: {
    canonical: `https://${sitePreferences.name}/how-to-buy/`,
  },
  openGraph: {
    title: "Easy Steps to Buy Skins & Currency – PixelPowerShop",
    description: "Learn how to easily purchase skins and in-game items for CS2, Dota 2, and Fortnite. Fast, secure transactions and instant delivery at PixelPowerShop.",
    url: `https://${sitePreferences.name}/how-to-buy/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <main>
        <h1 className="visually-hidden">Easy Steps to Buy Skins & Currency – PixelPowerShop</h1>
        <section className={`${s.howToBuy} container`}>
          <div className={s.info}>
            <h2 className={`${s.title} sec__title`} title={'Easy 3-Step Purchase Process'}>
              Easy 3-Step Purchase Process
            </h2>
            <p className={s.subtitle}>
              Choose Item
            </p>
            <p className={s.text}>
              Browse our catalog and find the skin, currency, or item you want to purchase. We offer a wide variety of
              products for popular games like CS2, Valorant, and Fortnite. Simply select your desired item and proceed
              to the next step.
            </p>

            <p className={s.subtitle}>
              Place Order
            </p>
            <p className={s.text}>
              Fill out the payment form with your details. Choose your preferred payment method and complete the
              transaction. Our secure system ensures that all your information is kept private and safe.
            </p>

            <p className={s.subtitle}>
              Instant Delivery
            </p>
            <p className={s.text}>
              Once your payment is processed, your items will be delivered instantly. You’ll receive them directly to
              your game account or via a secure code, so you can start using them right away.
            </p>
          </div>
          <div className={s.pic}></div>
        </section>
        <div className={s.pageLine}>
          <p className={`${s.pageLineText} container`}>
            All items are legit and delivered securely. 100% satisfaction guaranteed.
          </p>
        </div>
        <LastDeals />
        <Reviews />
      </main>
    </>
  );
}
