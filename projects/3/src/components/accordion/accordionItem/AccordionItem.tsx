'use client'
import React, {useState} from 'react';
import s from './AccordionItem.module.css'

export type FAQItem = {
  id: number;
    question: string;
    answer: string;
};

const AccordionItem = ({item}: {item: FAQItem}) => {

  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <>
      <li className={`${s.accordion}`}>
        <button onClick={handleOpen} className={s.toggleButton} aria-label={'Toggle accordion'} title="Toggle accordion"></button>
        <p  className={`${s.accordionTop}`}>
          <span className={s.accordionTitle}>{item.question}</span>
          <span className={`${s.button} ${isOpen && s.rotate}`}></span>
        </p>
        <p className={`${s.text} ${isOpen && s.show}`}>
          {item.answer}
        </p>
      </li>
    </>
  );
};

export default AccordionItem;
