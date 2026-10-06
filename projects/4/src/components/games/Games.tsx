'use client'
import {withBase} from "@/utils/withBase";
import React from 'react';
import s from './Games.module.css';
import {usePathname} from "next/navigation";

const data = {
  games: [
    {
      name: 'Valhalla game',
      path: 'valhalla',
      pic: 'valhalla',
      rate: 8,
      likes: 2345,
    },
    {
      name: 'Donuts game',
      path: 'donuts',
      pic: 'donuts',
      rate: 10,
      likes: 2566,
    },
    {
      name: 'Deep Sea',
      path: 'sea',
      pic: 'sea',
      rate: 10,
      likes: 1430,
    },
    {
      name: 'Wild Love',
      path: 'love',
      pic: 'love',
      rate: 9,
      likes: 1045,
    },
  ],
  title: 'Hot Games Right Now',
  description: 'See what games people are hooked on this week! There\'s everything from exciting quests to tricky puzzles. These popular games are a hit for a reason – jump in and find out what all the fuss is about!',
  button: 'Try the game',
}

const Games = () => {
  const path = usePathname()
  const isGamePage = path.replaceAll('/', '') === 'play-our-games';
  return (
    <>
      <section className={`${s.games} `}>
        <div className="container">
          {isGamePage
            ? <>
              <h1 className={`${s.title} sec__title`} title={'Hot Games Everyone\'s Playing'}>
                Hot Games Everyone's Playing
              </h1>
              <p className={s.description}>
                Want to know what games people can't put down this week? There's a bit of everything, from cool quests
                to brain-teasing puzzles. These games are super popular right now for a reason – give them a try and see
                what you think!
              </p>
            </>
            : <>
              <h2 className={`${s.title} sec__title`} title={data.title}>{data.title}</h2>
              <p className={s.description}>{data.description}</p>
            </>
          }

          <ul className={`${isGamePage ? s.gamePageList: s.gamesList }`} aria-label={'GAmes items list'}>

            {data.games.map((game, i) => (
              <li className={s.item} key={i + game.name}>

                <div className={s.pic}>
                  <img src={withBase(`/astra-docs/__g3k21aa-/astra_crds/astra-${game.pic}.webp`)} alt={game.name}
                       title={`Play ${game.name}`}/>
                  <p className={s.likes}><span className={s.heart}></span>{game.likes}</p>
                </div>

                <div className={s.info}>
                  <p className={s.name}>{game.name}</p>
                  <p className={s.rate}><span className={s.star}></span>{game.rate}/10
                  </p>
                </div>

                <a href={withBase(`/games/${game.path}/index.html`)} className={`${s.link} `} aria-label={'Game Link'}
                   title={data.button}>{data.button}</a>

              </li>
            ))}
          </ul>
        </div>
      </section>

    </>
  )
    ;
};

export default Games;
