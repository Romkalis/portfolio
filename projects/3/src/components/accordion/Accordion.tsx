import React from 'react';
import AccordionItem from "@/components/accordion/accordionItem/AccordionItem";
import s from './Accordion.module.css'

const faqListData = [
  {
    id: 1,
    question: "Do I need to make a deposit to play?",
    answer: "No, all the games on latvialotto are entirely virtual and do not require any financial commitment."

  },
  {
    id: 2,
    question: "How is my data protected?",
    answer: "We employ advanced technologies to safeguard personal information, ensuring your privacy is always secure."

  },
  {
    id: 3,
    question: "Are there age restrictions?",
    answer: "Yes, only individuals 18 and older are allowed to play."

  },
  {
    id: 4,
    question: "Can I play on mobile devices?",
    answer: "Yes, our platform is optimized for a seamless gaming experience on smartphones and tablets."

  },
];


const Accordion = () => {
  return (
    <>
      <ul className={`${s.accordions}`}>
        {
          faqListData.map((item) => <AccordionItem key={item.id} item={item}/>)
        }
      </ul>
    </>
  );
};

export default Accordion;
