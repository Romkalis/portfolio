// import s from './AdvantagesCards.module.css'
// import React from 'react';
// import {Lang} from "@/data/lang";
//
// const data = {
//  en: {
//    title: 'Our Advantages',
//    cards : [
//      {
//         id: 1,
//        title: 'Joy for Every Pharaoh',
//        text: 'Step into a world where both wandering newcomers and true seekers of ancient wisdom find their delight.',
//      },
//      {
//        id: 2,
//        title: 'Thrilling Adventures of the Nile',
//        text: 'Uncover pyramid secrets, take on new quests, and receive the gods’ blessings with regular updates.',
//      },
//      {
//        id: 3,
//        title: 'Together Under Anubis’ Sign',
//        text: 'Join forces with allies, forge your own legends, and experience the magic of Egypt together.',
//      },
//      {
//        id: 4,
//        title: 'Freedom Like the Desert Wind',
//        text: 'No paywalls, no tricks—just endless discoveries and adventures at no cost..',
//      }
//    ]
//  },
//   cz: {
//     title: 'Naše Výhody',
//     cards: [
//       {
//         id: 1,
//         title: 'Radost pro Každého Faraona',
//         text: 'Vstupte do světa, kde si přijdou na své jak bloudící nováčci, tak opravdoví hledači starověké moudrosti.',
//       },
//       {
//         id: 2,
//         title: 'Vzrušující Dobrodružství na Nilu',
//         text: 'Odhalte tajemství pyramid, vydejte se na nové mise a přijímejte požehnání bohů díky pravidelným aktualizacím.',
//       },
//       {
//         id: 3,
//         title: 'Společně pod Znamením Anubise',
//         text: 'Spojte síly se spojenci, tvořte své vlastní legendy a společně zažijte kouzlo Egypta.',
//       },
//       {
//         id: 4,
//         title: 'Svoboda jako Pouštní Vítr',
//         text: 'Žádné poplatky, žádné triky – jen nekonečné objevy a dobrodružství zcela zdarma.',
//       }
//     ]
//   },
// }
//
//   return (
//     <>
//       <section className={`${s.advantages} container`}>
//         <h2 className="visually-hidden" title={data[lang].title}>{data[lang].title}</h2>
//
//         <ul className={s.list}>
//           {
//             data[lang].cards.map( (card, i) => (
//               <li key={i + card.id} className={`${s.card} gr-border`}>
//                 <img src={withBase(`/jeuxscenligne-assets/jeuxscenligne-cards/jeuxscenligne-icon-${card.id}.webp`)} alt="Card Icon" className={s.icon} title={'Advantages: card icon'}/>
//                 <p className={s.title}>{card.title}</p>
//                 <p className={s.text}>{card.text}</p>
//               </li>
//             ))
//           }
//         </ul>
//       </section>
//     </>
//   );
// };
//
// export default AdvantagesCards;
