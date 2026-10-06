'use client';
import React from 'react';
import s from './LoginBlock.module.css'

const LoginBlock = () => {

  const [fields, setFields] = React.useState<{mail: string, pass: string}>({mail: '', pass: ''});
  const [isFill, setIsFill] = React.useState(false);
  const [isSended, setIsSended] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields(prev => {
      return {...prev, [e.target.name]: e.target.value};
    })
    if ( fields.mail.includes("@") && fields.pass.length > 6) {
      setIsFill(true);
    } else {
      setIsFill(false);
    }
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFields({mail: '', pass: ''});
    setIsSended(true);
  };

  return (
    <>
      <div className={s.formBlock}>
        <h2 className={s.title} title={'Welcome to EnjoyGamesNow!'}>
          Welcome to EnjoyGamesNow!
        </h2>
        <p className={s.description}>
          { isSended ?
            'Letter was sent to your mail!'
            :
            'Enter your social gaming world and keep the adventure going.'
          }
        </p>

        <form onSubmit={handleSubmit} className={s.form}>
          <label className={s.label}>
            <span className={s.labelTitle}>
              Email Address
            </span>
            <input onInput={handleInputChange} type="email" name={'mail'} className={s.input} aria-label={'Email Address'} title={'Email Address'}
                   placeholder={'Enter your email'} required value={fields.mail}/>
          </label>
          <label className={s.label}>
            <span className={s.labelTitle}>
              Password
            </span>
            <input onInput={handleInputChange} type="password" name={'pass'} className={s.input} aria-label={'Password'} title={'Password'}
                   placeholder={'Enter your password'} required value={fields.pass}/>
          </label>
          <button className={`${s.button} button`} aria-label={'Submit'} title={'Enter Arena'} disabled={!isFill}>
            Enter Arena
          </button>
        </form>

        <p className={s.bottom}>
          New here? <a href="/registration/" aria-label={'Create account'} title={'Create account'}>Create account</a>
        </p>
      </div>
    </>
  );
};

export default LoginBlock;
