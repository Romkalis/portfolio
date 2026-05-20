import React from 'react';
import s from './GamesList.module.css';

type Game = {
  id: number;
  name: string;
  studio: 'romantech' | 'adp';
  category: 'fun' | 'arcade' | 'sport';
  theme: 'modern' | 'retro';
  rate: number;
  path: string;
};

type Props = {
  games: Game[];
};

const GamesList = ({games}: Props) => {
  return (
    <>
      <section className={`${s.gamesListSection} container`}>

        <div className={s.topDeco}>
          <div></div>
          <div></div>
          <div>🎮</div>
        </div>

        <div className={s.head}>
          <h2 className={`${s.title} sec__title`} title={'Available\n' +
            'Games'}>
            Available <br/>
            Games
          </h2>

          <div className={s.bottomBlock}>
            All games are free to play
          </div>
        </div>

        <ul aria-label={'Games list'} className={s.gamesList}>
          {games.length === 0 && (
            <li>Nothing found</li>
          )}
          {games.map((g) => (
            <li key={g.id} className={s.item}>
              <img src={`/eg-docs/ejGam332-games-pic/ejGam332-${g.path}.webp`} alt={g.name} className={s.pic} title={g.name}/>
              <div className={s.info}>
                <p className={s.name}>{g.name}</p>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.0677 0.701484L13.2255 5.30978C13.3877 5.65684 13.7011 5.89688 14.0644 5.95217L19.0456 6.71447C19.959 6.85448 20.3234 8.04039 19.6623 8.72039L16.0612 12.4205C15.7978 12.6911 15.6777 13.0805 15.7399 13.4628L16.5633 18.5265C16.7299 19.5535 15.7111 20.3371 14.8377 19.8535L10.5177 17.4594C10.1932 17.2794 9.8065 17.2794 9.48316 17.4594L5.16637 19.8512C4.2919 20.3358 3.26962 19.5512 3.43741 18.5217L4.26086 13.4628C4.32308 13.0805 4.20301 12.6911 3.93967 12.4205L0.338508 8.72039C-0.323737 8.04039 0.0406412 6.85448 0.955109 6.71447L5.93638 5.95217C6.29861 5.89688 6.61196 5.65684 6.7753 5.30978L8.93316 0.701484C9.36761 -0.233828 10.6298 -0.233828 11.0677 0.701484Z"
                    fill={`url(#paint0_linear_${g.id})`}/>
                  <defs>
                    <linearGradient id={`paint0_linear_${g.id}`} x1="9.75412" y1="29.3124" x2="-9.2511" y2="8.4088"
                                    gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ED8300" offset="1"/>
                      <stop offset="1" stopColor="#EDD700"/>
                    </linearGradient>
                  </defs>
                </svg>

                <p className={s.rate}>({g.rate})</p>
              </div>
              <a href={`/games/${g.path}/index.html`} className={`${s.button} button`} title={'Play now'}
                 aria-label={`Play now: ${g.name}`}>Play now</a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default GamesList;
