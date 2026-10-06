'use client';
import React from 'react';
import s from './RegisterBlock.module.css'

type State = {
  mail: string;
  name: string;
  pass: string;
  repeat: string;
}

type Errors = Partial<Record<keyof State | 'terms', string>>;

const RegisterBlock = () => {

  const [fields, setFields] = React.useState<State>({mail: '', name: '', pass: '', repeat: ''});
  const [errors, setErrors] = React.useState<Errors>({});
  const [isFill, setIsFill] = React.useState(false);
  const [isSended, setIsSended] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);

  const validate = (next: State, checked: boolean): Errors => {
    const errs: Errors = {};
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.mail.trim());
    if (!emailOk) errs.mail = 'Please enter a valid email';
    const nameOk = next.name.trim().length >= 2;
    if (!nameOk) errs.name = 'Name must be at least 2 characters';
    const passOk = next.pass.length >= 6;
    if (!passOk) errs.pass = 'Password must be at least 6 characters';
    const repeatOk = next.pass === next.repeat && next.repeat.length > 0;
    if (!repeatOk) errs.repeat = 'Passwords do not match';
    if (!checked) errs.terms = 'You must accept the Terms';
    return errs;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields(prev => {
      const next = {...prev, [name]: value};
      const v = validate(next, isChecked);
      setErrors(v);
      setIsFill(Object.keys(v).filter(k => k !== 'terms').length === 0);
      return next;
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(fields, isChecked);
    setErrors(v);
    const ok = Object.keys(v).length === 0;
    if (!ok) return;
    setFields({mail: '', name: '', pass: '', repeat: ''});
    setIsSended(true);
  };

  return (
    <>
      <div className={s.formBlock}>
        <h2 className={s.title} title={'Discover Games with us'}>
          Discover Games with us
        </h2>
        <p className={s.description}>
          {isSended ?
            'Letter was sent to your mail!'
            :
            'Create your player profile and start your social gaming journey'
          }
        </p>

        <form onSubmit={handleSubmit} className={s.form}>

          <label className={s.label}>
            <span className={s.labelTitle}>
              Email Address
            </span>
            <input onChange={handleInputChange} type="email" name={'mail'} className={`${s.input} ${errors.mail ? s.inputError : ''}`}
                   aria-label={'Email Address'} title={'Email Address'}
                   placeholder={'Enter your email'} required value={fields.mail}/>
            {errors.mail && <span className={s.error}>{errors.mail}</span>}
          </label>

          <label className={s.label}>
            <span className={s.labelTitle}>
              Player Name
            </span>
            <input onChange={handleInputChange} type="text" name={'name'} className={`${s.input} ${errors.name ? s.inputError : ''}`} aria-label={'Player Name'}
                   title={'Player Name'}
                   placeholder={'Enter your name'} required value={fields.name}/>
            {errors.name && <span className={s.error}>{errors.name}</span>}
          </label>

          <label className={s.label}>
            <span className={s.labelTitle}>
              Password
            </span>
            <input onChange={handleInputChange} type="password" name={'pass'} className={`${s.input} ${errors.pass ? s.inputError : ''}`} aria-label={'Password'}
                   title={'Password'}
                   placeholder={'Create password (min 6 char)'} required value={fields.pass}/>
            {errors.pass && <span className={s.error}>{errors.pass}</span>}
          </label>

          <label className={s.label}>
            <span className={s.labelTitle}>
              Confirm Password
            </span>
            <input onChange={handleInputChange} type="password" name={'repeat'} className={`${s.input} ${errors.repeat ? s.inputError : ''}`}
                   aria-label={'Confirm your password'} title={'Confirm your password'}
                   placeholder={'Confirm your password'} required value={fields.repeat}/>
            {errors.repeat && <span className={s.error}>{errors.repeat}</span>}
          </label>

          <label className={s.checkLabel}>
            <input type="checkbox" className={s.checkbox} checked={isChecked}
                   onChange={(e) => {
                     const checked = e.target.checked;
                     setIsChecked(checked);
                     const v = validate(fields, checked);
                     setErrors(v);
                     setIsFill(Object.keys(v).filter(k => k !== 'terms').length === 0);
                   }} required/>
            <span>
            I agree to the
            <a href="/terms-giude/" aria-label={'Terms of Service'} title={'Terms of Service'}> Terms of Service </a>
            and
            <a href="/privacy-giude/" aria-label={'Privacy Policy'} title={'Privacy Policy'}> Privacy Policy </a>
              </span>
          </label>

          <button className={`${s.button} button`} aria-label={'Submit'} title={'Create Profile'}
                  disabled={!(isFill && isChecked)}>
            Create Profile
          </button>
        </form>

        <p className={s.bottom}>
          Already discover the games?  <a href="/play-now/" aria-label={'Enter arena'} title={'Enter arena'}>Enter arena</a>
        </p>

        <p className={s.bottomText}>
          By creating a profile, you agree to our Terms of Use. Social gaming platform for recreation only - no monetary elements. Must be 18+ to participate.
        </p>
      </div>
    </>
  );
};

export default RegisterBlock;
