'use client';
import {withBase} from "@/utils/withBase";
import React, {useLayoutEffect, useState} from 'react';
import s from './Catalog.module.css';


type GameKey = 'cs' | 'dota' | 'fortnite'

interface CatalogItem {
  itemTitle: string
  description: string
  pic: string
  price: string
  isChosen: boolean
}

type CatalogData = Record<GameKey, CatalogItem[]>

const catalogData: CatalogData = {
  cs: [
    {
      itemTitle: 'AWP | Dragon Lore',
      description: 'Sniper Rifle',
      pic: 'dragon-lore',
      price: '13,500.00',
      isChosen: false,
    },
    {
      itemTitle: 'Souvenir AWP | Desert Hydra',
      description: 'Sniper Rifle',
      pic: 'desert-hydra',
      price: '1,300.00',
      isChosen: false,
    },
    {
      itemTitle: 'StatTrak™ AK-47 | Vulcan',
      description: 'Vulcan (VV)',
      pic: 'ak-vulcan',
      price: '400.00',
      isChosen: false,
    },
    {
      itemTitle: 'StatTrak™ Desert Eagle | Golden',
      description: 'Pistol',
      pic: 'desert-eagle-golden',
      price: '375.00',
      isChosen: false,
    },
    {
      itemTitle: 'StatTrak™ Desert Eagle | (FN)',
      description: 'Pistol',
      pic: 'desert-eagle-fn',
      price: '210.00',
      isChosen: false,
    },
    {
      itemTitle: 'Souvenir CZ75-Auto | Chalice',
      description: 'Pistol',
      pic: 'souvenir-chalice',
      price: '175.00',
      isChosen: false,
    },
    {
      itemTitle: 'StatTrak™ AWP | Asiimov',
      description: 'Sniper Rifle',
      pic: 'startrack-asiimov',
      price: '1,151.42',
      isChosen: false,
    },
    {
      itemTitle: 'AWP | BOOM',
      description: 'Sniper Rifle',
      pic: 'boom',
      price: '140.00',
      isChosen: false,
    },
    {
      itemTitle: 'USP-S | Monster Mashup',
      description: 'Pistol',
      pic: 'monster-mashup',
      price: '145.00',
      isChosen: false,
    },
    {
      itemTitle: 'AK-47 | Fuel Injector',
      description: 'Rifle',
      pic: 'fuel-injector',
      price: '135.00',
      isChosen: false,
    },
    {
      itemTitle: 'AWP | Boom',
      description: 'Sniper Rifle',
      pic: 'boom',
      price: '130.00',
      isChosen: false,
    },
    {
      itemTitle: 'AK-47 | First Class',
      description: 'Rifle',
      pic: 'ak-first-class',
      price: '125.00',
      isChosen: false,
    },
  ],
  dota: [
    {
      itemTitle: 'Hell-Spar Anathema of the Crimson',
      description: 'Wearable',
      pic: 'anathema',
      price: '109.00',
      isChosen: false,
    },
    {
      itemTitle: 'Infused claw of the Dark Moon',
      description: 'Wearable',
      pic: 'darkmoon-claw',
      price: '87.50',
      isChosen: false,
    },
    {
      itemTitle: 'Golden Immortal Pantheon',
      description: 'Wearable',
      pic: 'immortal-panteon',
      price: '87.50',
      isChosen: false,
    },
    {
      itemTitle: 'Infused Claws of the Ferocious',
      description: 'Wearable',
      pic: 'ferocosius-claw',
      price: '87.50',
      isChosen: false,
    },
    {
      itemTitle: 'Infused Helm of the Dark Moon',
      description: 'Wearable',
      pic: 'darkmoon-helm',
      price: '22.00',
      isChosen: false,
    },
    {
      itemTitle: 'Fluttering Breeze',
      description: 'Bundle',
      pic: 'fluttering-breeze',
      price: '91.61',
      isChosen: false,
    },
    {
      itemTitle: 'Shadow in the Deep Armor',
      description: 'Wearable',
      pic: 'shadow-armour',
      price: '64.40',
      isChosen: false,
    },
    {
      itemTitle: 'Alpine Stalker\'s Scarf',
      description: 'Wearable',
      pic: 'alipine-scarf',
      price: '52.50',
      isChosen: false,
    },
    {
      itemTitle: 'Mark of the Blood Moon',
      description: 'Bundle',
      pic: 'mark-bloodmoon',
      price: '35.00',
      isChosen: false,
    },
    {
      itemTitle: 'Golden Nothlic Burden',
      description: 'Wearable',
      pic: 'golden-burden',
      price: '33.00',
      isChosen: false,
    },
    {
      itemTitle: 'Avowance of the Veiled Ones',
      description: 'Wearable',
      pic: 'veiled-ones',
      price: '24.90',
      isChosen: false,
    },
    {
      itemTitle: 'Silver Squall - Mount',
      description: 'Wearable',
      pic: 'silver-squall',
      price: '23.50',
      isChosen: false,
    },
  ],
  fortnite: [
    {
      itemTitle: 'Luke Skywalker',
      description: 'Skin',
      pic: 'im-your-father',
      price: '21.15',
      isChosen: false,
    },
    {
      itemTitle: 'Sabrina Carpenter',
      description: 'Skin',
      pic: 'sabrina-carpenter',
      price: '18.80',
      isChosen: false,
    },
    {
      itemTitle: 'Fletcher Kane',
      description: 'Skin',
      pic: 'fletcher-kane',
      price: '21.18',
      isChosen: false,
    },
    {
      itemTitle: 'Helsi',
      description: 'Skin',
      pic: 'helsi',
      price: '17.50',
      isChosen: false,
    },
    {
      itemTitle: 'Gangster Midas',
      description: 'Skin',
      pic: 'midas',
      price: '20.00',
      isChosen: false,
    },
    {
      itemTitle: 'Gift Card',
      description: 'Gift',
      pic: 'gift-card',
      price: '16.46',
      isChosen: false,
    },
    {
      itemTitle: 'Mandalorian Warrior',
      description: 'Skin',
      pic: 'mandalorian',
      price: '22.35',
      isChosen: false,
    },
    {
      itemTitle: 'Jinx',
      description: 'Skin',
      pic: 'jinx',
      price: '16.46',
      isChosen: false,
    },
    {
      itemTitle: 'Pickaxe "Konga"',
      description: 'Pickaxe',
      pic: 'pickaxe',
      price: '35.00',
      isChosen: false,
    },
    {
      itemTitle: 'Xenomorph',
      description: 'Skin',
      pic: 'alien',
      price: '15.30',
      isChosen: false,
    },
  ],
}

const Catalog = () => {

  const [game, setGame] = useState<GameKey>('cs')
  const [gameData, setGameData] = useState<CatalogItem[]>(catalogData['cs'])

  useLayoutEffect( () =>
  {
    const onHashChange = () => {
      const hash = window.location.hash;
      if (hash.includes("cs")) {
        setGame("cs");
        setGameData(catalogData["cs"]);
      } else if (hash.includes("dota")) {
        setGame("dota");
        setGameData(catalogData["dota"]);
      } else if (hash.includes("fortnite")) {
        setGame("fortnite");
        setGameData(catalogData["fortnite"]);
      }
    };

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };

  }, [])

  const handleGameData = (e: React.MouseEvent<HTMLButtonElement>) => {
    const choosenGame = (e.currentTarget.dataset.game as GameKey)
    setGame(choosenGame)
    setGameData(catalogData[choosenGame])
  }

  const handleBuy = (e: React.MouseEvent<HTMLButtonElement>) => {
    const title = e.currentTarget.title.replace(/^Buy /, "")
    const changedGames: CatalogItem[] = gameData.map((item) =>
      item.itemTitle === title ? {...item, isChosen: !item.isChosen} : item
    )
    setGameData(changedGames)
  }


  return (
    <>
      <section className={s.catalog}>

        <div className={s.top}>
          <h2 className={s.title} title={'Browse Our Exclusive Collection'}>
            Browse Our Exclusive Collection
          </h2>
          <ul className={s.changer} aria-label={'Change game list'}>
            <li className={s.changeItem}>
              <button className={`${s.changeButton} ${game === 'cs' && s.active}`} onClick={handleGameData}
                      data-game={'cs'} title={'Counter Strike'}
                      aria-label={'Counter Strike'}></button>
            </li>
            <li className={s.changeItem}>
              <button className={`${s.changeButton} ${game === 'dota' && s.active}`} onClick={handleGameData}
                      data-game={'dota'} title={'Dota 2'}
                      aria-label={'Dota 2'}></button>
            </li>
            <li className={s.changeItem}>
              <button className={`${s.changeButton} ${game === 'fortnite' && s.active}`} onClick={handleGameData}
                      data-game={'fortnite'} title={'Fortnite'}
                      aria-label={'Fortnite'}></button>
            </li>
          </ul>
        </div>

        <ul className={s.list} aria-label={'Catalog items list'}>
          {
            gameData.map((c, i) => (
              <li key={i} className={`${s.item} ${c.isChosen && s.inCart}`}>
                <div className={s.itemBg}>
                  <img src={withBase(`/asset-files/akjsd5/${game}/bNya67Asd-${c.pic}.webp`)} alt={c.itemTitle}
                       className={s.image}/>
                  <div className={s.bottom}>
                    <p className={s.price}>
                      <span className={s.grey}>$</span> {c.price}
                    </p>
                    <button onClick={handleBuy} className={`${s.buyButton} `} aria-label={'Buy button'}
                            title={`Buy ${c.itemTitle}`}>{c.isChosen ? 'In Cart' : 'Buy'}</button>
                  </div>
                </div>
                <p className={s.name}>{c.itemTitle}</p>
                <p className={s.description}>
                  {c.description}
                </p>
              </li>
            ))
          }

        </ul>
      </section>
    </>
  );
};

export default Catalog;
