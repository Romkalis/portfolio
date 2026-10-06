'use client'
import React, {useState} from 'react';
import s from './Survey.module.css';

const data = [
  {
    step: 1,
    text: '1. Which game stole your heart this week?',
    questions: ['Valhalla — can’t stop the grind!', 'Donuts — pure chaos and sugar rush', 'Deep Sea — chill vibes only', 'Wild Love — all about the feels']

  },
  {
    step: 2,
    text: '2. What kind of gameplay do you vibe with most?',
    questions: ['⚔️ Action and adventure', '🧩 Puzzles and strategy', '🌈 Story-driven fun', '🎯 Quick arcade hits']
  },
  {
    step: 3,
    text: '3. Who’s your go-to gaming partner?',
    questions: ['I fly solo', 'My friends or fam', 'Randoms online', 'Depends on the mood']
  },
  {
    step: 4,
    text: '4. What keeps you coming back to AstraReels.com?',
    questions: ['🚀 Fresh new games every week', '🎨 Cool visuals and smooth UI', '🎮 Easy access and fast loading', '💬 Community and fun vibes']
  },
  {
    step: 5,
    text: '5. What was your favorite in-game moment this week?',
    questions: ['Beating a tough level in Valhalla', 'Unlocking the craziest combo in Donuts', 'Finding hidden treasure in Deep Sea', 'Finishing a love arc in Wild Love']
  }
]

const Survey = () => {
  const [step, setStep] = useState(0)
  const [isLast, setIsLast] = useState(false);

  const nextHandler = () => {
    if (step >= data.length - 1) {
      setIsLast(true);
      return;
    }
    setStep(step + 1);
  }

  const prevHandler = () => {
    if (step > 0) setStep(step - 1);
  }

  return (
    <>
      <section className={s.survey}>
        <div className={`${s.wrap} container`}>


          <div className={s.surveyWrap}>

            <h2 className={`${s.title} sec__title`} title={'Interactive Corner - Pick Your Side!'}>
              Interactive Corner - Pick Your Side!
            </h2>
            <p className={s.decription}>
              Let's have some fun! Vote on the games you like best, tell us what you think, and check out the games
              others on AstraReels.com are playing this week. Your vote counts!
            </p>

            <ul className={s.stepList}>
              {
                Array.from({length: 5}, (_: undefined, i: number) => i + 1).map((el, i) => (
                  <li key={i} className={`${s.stepItem} ${step === i && s.active}`}>{el}</li>
                ))
              }
            </ul>


            {!isLast &&
              <>
                <p className={s.blockTitle}>{data[step].text}</p>

                <form className={s.form}>
                  {
                    data[step].questions.map((question, i) => (
                      <label className={s.label} key={i}>
                        <input type="radio" name={'question'}/>
                        <span className={s.radioText}>
                            {question}
                        </span>
                      </label>
                    ))
                  }
                </form>

                <div className={s.buttons}>
                  <button onClick={prevHandler} className={`${s.prev} ${s.button}`} disabled={step === 0}>Previous</button>
                  <button onClick={nextHandler} className={`${s.next} ${s.button}`}>Next</button>
                </div>
              </>
            }
            {isLast && (
              <>
                <div className={s.lastScreen}>
                  <svg width="46" height="41" viewBox="0 0 46 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.75 8.25C22.75 8.25 22.75 8.25 20.9133 5.83333C18.7867 3.03 15.645 1 11.875 1C5.8575 1 1 5.8575 1 11.875C1 14.1225 1.67667 16.2008 2.83667 17.9167C4.79417 20.8408 22.75 39.6667 22.75 39.6667M22.75 8.25C22.75 8.25 22.75 8.25 24.5867 5.83333C26.7133 3.03 29.855 1 33.625 1C39.6425 1 44.5 5.8575 44.5 11.875C44.5 14.1225 43.8233 16.2008 42.6633 17.9167C40.7058 20.8408 22.75 39.6667 22.75 39.6667"
                      stroke="#896D46" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>

                  <p className={s.subtitle}>
                    That was fun — thanks for chiming in!
                  </p>
                  <p className={s.text}>
                    You're a star! Keep the good vibes going!
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Survey;
