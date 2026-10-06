import React from 'react';
import AccordionItem from "@/components/accordion/accordionItem/AccordionItem";
import s from './Accordion.module.css'

const faqListsData = [
  {
    title: 'General Questions',
    question: [{
      question: "What is PixelPowerShop?",
      answer: "PixelPowerShop is a trusted online store offering in-game skins, currency, and digital items for popular games like CS2, Valorant, and Fortnite. We provide fast, secure, and reliable delivery for every purchase."
    },
      {
        question: "What kind of items can I buy on PixelPowerShop?",
        answer: "You can purchase weapon skins, game credits, points, and other cosmetic items for top multiplayer games. Our catalog is constantly updated with the latest and most popular products."
      },
      {
        question: "How fast will I receive my items?",
        answer: "We provide instant delivery right after your payment is confirmed. Items are sent directly to your game account or delivered as a secure redemption code."
      },
      {
        question: "How can I find the item I’m looking for?",
        answer: "Use our easy-to-navigate catalog to browse by category — such as skins, currency, or bundles. You can also use filters to find specific games or item types quickly."
      },
      {
        question: "Do you support all platforms and game versions?",
        answer: "Yes, we support major platforms for CS2, Valorant, and Fortnite. Just make sure your account is active and eligible to receive in-game items."
      },
      {
        question: "What if I can’t find a specific item?",
        answer: "If the item you’re looking for isn’t available, contact our support team. We may be able to find a similar product for you or notify you once it becomes available."
      },
    ]
  },
  {
    title: 'Transactions & Payments',
    question: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept a variety of payment options, including credit/debit cards, e-wallets, and cryptocurrency. Choose your preferred payment method during checkout."
      },
      {
        question: "Are transactions on PixelPowerShop secure?",
        answer: "Absolutely. All transactions are protected with advanced encryption and security protocols. Your personal and payment details are kept 100% confidential and secure."
      },
    ]
  },
  {
    title: 'Popular Questions',
    question: [
      {
        question: "Can I get a refund after purchasing an item?",
        answer: "Due to the digital nature of our products, refunds are generally not available. However, if there’s an issue with your order, please contact our support — we’ll do our best to resolve it quickly."
      },
      {
        question: "Are the items authentic and safe to use?",
        answer: "Yes. All items sold on PixelPowerShop are authentic and sourced from official, verified platforms. Every product is guaranteed to be safe and legitimate."
      },
      {
        question: "How can I contact customer support?",
        answer: "You can reach our support team through the contact form on our website or by email. Our team is available 24/7 to assist you with any questions or concerns."
      },
    ]
  },
]

const Accordion = () => {
  return (
    <>
      <section className={s.question}>
        <div className={s.pic}></div>
        <div className={s.accordionBlock}>
          <h2 className={`${s.title} sec__title`} title={'FAQ'}>FAQ</h2>

          {
            faqListsData.map((list) => (
              <div key={list.title}>
                <p className={s.listTitle} key={list.title}>{list.title}</p>
                <ul className={`${s.accordions}`} aria-label={'Accordions items list'}>
                  {
                    list.question.map((item) => (
                        <AccordionItem key={item.question} item={item}/>
                    ))
                  }
                </ul>
              </div>
            ))
          }
        </div>
      </section>

    </>
  );
};

export default Accordion;
