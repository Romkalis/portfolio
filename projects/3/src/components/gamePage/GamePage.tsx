'use client'
import React, {useState} from 'react';
import s from './GamePage.module.css'

const GamePage = () => {
  const [isGame, setIsGame] = useState(false);

  return (
    <>
      <section className={`${s.game} container`}>
        <h1 className={`${s.title} sec__title`} title={'WILD BANDITO:'}>WILD BANDITO:</h1>

        <div className={`${s.gameWrap} container`}>
          {
            !isGame && (
              <div className={s.picture}>
                <button onClick={() => setIsGame( prev => !prev)} className={`${s.button} button`}>Play Now!</button>
              </div>
            )
          }
          {
            isGame && <iframe className={s.iframe}
                              src="https://m.pgsoft-games.com/104/index.html?l=en&ot=ca7094186b309ee149c55c8822e7ecf2&btt=2&language=en-EN&__refer=m.pg-redirect.net&or=static.pg-demo.com"></iframe>
          }
        </div>

      </section>

    </>
  );
};

export default GamePage;
