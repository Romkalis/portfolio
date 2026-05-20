import React from 'react';
import s from './styles.module.css';

const DividerList = () => {
  return (
    <div className={s.wrapper}>

      <ul className={`${s.list} container`} aria-label={'Information list'}>

        <li className={s.item}>
          <div className={s.icon}></div>
          <p className={s.text}>Orientación clara</p>
        </li>

        <li className={s.item}>
          <div className={s.icon}></div>
          <p className={s.text}>Análisis imparcial</p>
        </li>

        <li className={s.item}>
          <div className={s.icon}></div>
          <p className={s.text}>Diversión segura</p>
        </li>

      </ul>

    </div>
  );
};

export default DividerList;
