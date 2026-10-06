'use client';
import React from 'react';
import s from './LeadersTable.module.css'

const players = {
  week: [
    {
      id: 1,
      name: 'LadyDandy',
      games: 412,
      points: '67,890'
    },
    {
      id: 2,
      name: 'TaddyBear21',
      games: 378,
      points: '63,240'
    },
    {
      id: 3,
      name: 'Sunny5',
      games: 445,
      points: '58,750'
    },
    {
      id: 4,
      name: 'FunnyRider1',
      games: 289,
      points: '54,120'
    },
    {
      id: 5,
      name: 'LabbybyHero',
      games: 356,
      points: '49,680'
    }
  ],
  month: [
    {
      id: 1,
      name: 'Sunny5',
      games: 1_230,
      points: '189,400'
    },
    {
      id: 2,
      name: 'LadyDandy',
      games: 1_110,
      points: '182,750'
    },
    {
      id: 3,
      name: 'LabbybyHero',
      games: 980,
      points: '174,300'
    },
    {
      id: 4,
      name: 'FunnyRider1',
      games: 860,
      points: '162,900'
    },
    {
      id: 5,
      name: 'TaddyBear21',
      games: 905,
      points: '158,120'
    }
  ],
  top: [
    {
      id: 1,
      name: 'LadyDandy',
      games: 4_560,
      points: '1,020,000'
    },
    {
      id: 2,
      name: 'Sunny5',
      games: 4_320,
      points: '995,400'
    },
    {
      id: 3,
      name: 'FunnyRider1',
      games: 3_980,
      points: '942,800'
    },
    {
      id: 4,
      name: 'LabbybyHero',
      games: 3_750,
      points: '910,600'
    },
    {
      id: 5,
      name: 'TaddyBear21',
      games: 3_680,
      points: '899,900'
    }
  ]
};

type State = 'week' | 'month' | 'top';


const LeadersTable = () => {
  const [isList, setIsList] = React.useState<State>('week');

  const handleList = (str: State) => {
    setIsList(str);
  }

  return (
    <>
      <section className={`${s.table} container`}>
        <div className={s.grid}>

          <div className={s.players}>
            <div className={s.playersHead}>

              <h2 className={`${s.title} sec__title`} title={'Top Entertainment Players'}>
                Top Entertainment Players
              </h2>

              <div className={s.buttons}>
                <button onClick={() => handleList('week')}
                        className={`${s.button} button ${isList === 'week' ? s.active : ''}`} aria-label={'This Week'}
                        title={'This Week'}>
                  This Week
                </button>

                <button onClick={() => handleList('month')}
                        className={`${s.button} button ${isList === 'month' ? s.active : ''}`} aria-label={'This Month'}
                        title={'This Month'}>
                  This Month
                </button>

                <button onClick={() => handleList('top')}
                        className={`${s.button} button ${isList === 'top' ? s.active : ''}`} aria-label={'Hall of Fame'}
                        title={'Hall of Fame'}>
                  Hall of Fame
                </button>
              </div>
            </div>

            <ul className={s.list} aria-label={'Winners List'}>
              {
                players[isList].map( (el) => (
                  <li className={s.item} key={el.id}>
                    <div className={s.iconWrap}>
                      <div className={s.icon}></div>
                    </div>

                    <div className={s.itemInfo}>
                      <p className={s.name}>{el.name}</p>
                      <p className={s.text}>{el.games} games played</p>
                    </div>

                    <div className={s.points}>
                      {el.points} Adventure Points
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className={s.bonus}>
            <div className={s.playersHead}>

              <p className={`${s.title} sec__title`} title={'Weekly Top Player Bonuses'}>
                Weekly Top Player Bonuses
              </p>

              <p className={s.text}>
                Show your skills, climb the leaderboard, and unlock cool community rewards!
              </p>
            </div>

            <ul className={s.rightList}>
              <li>
                <div className={s.num}>1</div>
                <p className={s.winner}>
                  🏆 1st Place: Legend Crown Badge + 10,000 Reward Points
                </p>
              </li>

              <li>
                <div className={s.num}>2</div>
                <p className={s.winner}>
                  🥈 2nd Place:Silver Star Achievement + 7,500 Points
                </p>
              </li>

              <li>
                <div className={s.num}>3</div>
                <p className={s.winner}>
                  🥉 3rd Place:  Rising Hero Trophy + 5,000 Points
                </p>
              </li>

              <li>
                <div className={s.num}>4</div>
                <p className={s.winner}>
                  Top 10:Exclusive Community Icons + Special Rewards
                </p>
              </li>

            </ul>

          </div>
        </div>
      </section>
    </>
  );
};

export default LeadersTable;
