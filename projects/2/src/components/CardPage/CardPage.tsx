import {withBase} from "@/utils/withBase";
import React from 'react';
import {Data} from "@/data/interfaces";
import s from './CardPage.module.css'

const CardPage = ({data}: { data: Data }) => {
  return (
    <>
      <h1 className="visually-hidden">
        {data.mainTitle}
      </h1>

      <p className={`${s.platformName} sec__title text-center`}>{data.title}</p>

      <div className={s.card}>
        <a href={data.link} className={s.logo} target={'_blank'} aria-label={data.title}
           rel={'noreferrer nofollow noopener'} title={data.title}>
          <img src={withBase(`/assets-pictures/lGty67q/items-pic/lGty67q-${data.pic}.webp`)} alt={data.title + ' logo'} className={s.logo}
               width={247} height={113}/>
        </a>
        <div className={s.rating}>
          <p className={s.rate}>{data.rate}</p>
          <ul className={s.rateList} title={'Rate ' + data.title + ': ' + data.rate} aria-label={'DEcorative list'}>
            <li className={s.rateItem}></li>
            <li className={s.rateItem}></li>
            <li className={s.rateItem}></li>
            <li className={s.rateItem}></li>
            <li className={s.rateItem}></li>
          </ul>
        </div>
        <a href={data.link} className={s.bonusSection} title={data.title + ' bonus ' + data.bonus} aria-label={data.title + ' bonus ' + data.bonus} target={'_blank'}
           rel={'noreferrer nofollow noopener'}>
          <p className={s.bonusTitle}>
            BONUS
          </p>
          <p className={s.bonusText}>
            {data.bonus}
          </p>
        </a>
        <a href={data.link} className={`${s.button} button`} title={'Réclamer le bonus'} target={'_blank'}
           rel={'noreferrer nofollow noopener'} aria-label={'Réclamer le bonus'}>Réclamer le bonus</a>
      </div>

      <ul className={s.blocks} aria-label={'Elements list'}>
        {
          data.blocks.map((block, i) => (
            <li className={s.block} key={i + block.title}>
              <p className={s.blockTitle}>
                {block.title}
              </p>
              <p className={s.blockText}>
                {block.text}
              </p>
            </li>
          ))
        }
      </ul>
      <ul className={s.listsInfo} aria-label={'Decorative list'}>
        {data.lists.map((list, i) => (
          <li className={s.bottomItem} key={list.title + i}>
            <p className={s.blockTitle}>{list.title}</p>
            <ul aria-label={'Docrative list'}>
              {list.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </li>
        ))}
      </ul>

      <p className={`${s.bottomPlatformName} sec__title text-center`}>Notre favori personnel</p>
      <div className={`${s.card} ${s.cardBottom}`}>
        <a href={data.link} className={s.logo} target={'_blank'} title={data.bottomCard.title} aria-label={data.bottomCard.title}
           rel={'noreferrer nofollow noopener'}>
          <img src={withBase(`/assets-pictures/lGty67q/items-pic/lGty67q-${data.bottomCard.pic}.webp`)} alt={data.bottomCard.title}
               className={s.logo}
               width={247} height={113}/>
        </a>
        <div className={s.rating}>
          <p className={s.rate}>{data.bottomCard.rate}</p>
          <ul className={s.rateList} title={'Rate ' + data.bottomCard.title + ': ' + data.bottomCard.rate} aria-label={'Docrative list'}>
            <li className={s.rateItem}></li>
            <li className={s.rateItem}></li>
            <li className={s.rateItem}></li>
            <li className={s.rateItem}></li>
            <li className={s.rateItem}></li>
          </ul>
        </div>
        <a href={data.bottomCard.link} target={'_blank'}
           rel={'noreferrer nofollow noopener'} className={s.bonusSection}
           title={data.bottomCard.title + ' bonus ' + data.bottomCard.bonus} aria-label={data.bottomCard.title + ' bonus ' + data.bottomCard.bonus}>
          <p className={s.bonusTitle}>
            BONUS
          </p>
          <p className={s.bonusText}>
            {data.bottomCard.bonus}
          </p>
        </a>
        <a href={data.bottomCard.link} target={'_blank'}
           rel={'noreferrer nofollow noopener'} className={`${s.button} button`} title={'Réclamer le bonus'} aria-label={'Réclamer le bonus'}>Réclamer le
          bonus</a>
      </div>
    </>
  );
};

export default CardPage;
