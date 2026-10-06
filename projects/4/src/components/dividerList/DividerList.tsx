import React from 'react';
import s from './styles.module.css';

const dividerData = [
  {
    id: 1,
    title: "Fast & Reliable Delivery",
    text: "Get your in-game items delivered in minutes with 100% reliability.",
  },
  {
    id: 2,
    title: "Secure Transactions",
    text: "Your account and payment details are fully encrypted for safe transactions.",
  },
  {
    id: 3,
    title: "Authentic Products",
    text: "All skins, credits, and items are directly sourced from official game platforms.",
  },
  {
    id: 4,
    title: "24/7 Support",
    text: "Our team is available around the clock to assist you with any questions or issues.",
  },
]

const DividerList = () => {
  return (
    <div className={s.wrapper}>

      <ul className={`${s.list} container`} aria-label={'Advantages list'}>
        {
          dividerData.map( el => (
            <li className={s.item} key={el.id}>
              <div className={s.icon}></div>
              <p className={s.itemTitle}>{el.title}</p>
              <p className={s.text}>{el.text}</p>
            </li>
          ))
        }
      </ul>

    </div>
  );
};

export default DividerList;
