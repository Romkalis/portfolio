import React from 'react';
import s from './Disclaimer.module.css';

const Disclaimer = () => {
  return (
    <>
      <section className={`${s.disclaimer} container`}>
        <h2 className={`${s.title} sec__title`} title={'Jouez avec prudence et discernement'}>
          Jouez avec prudence et discernement
        </h2>
        <p className={s.text}>
          Les jeux d’argent doivent toujours demeurer une activité récréative, pratiquée pour le plaisir et dans la limite du raisonnable. Ne les percevez jamais comme un moyen d’obtenir des revenus ou de résoudre des difficultés financières. Pariez uniquement des montants que vous pouvez vous permettre de perdre, sans chercher à rattraper vos pertes. Évitez d’utiliser l’argent réservé à vos dépenses essentielles — comme le logement, les factures ou la nourriture. Prenez l’habitude de suivre régulièrement votre activité de jeu afin de garder le contrôle sur votre budget. <br/>
          Si vous ressentez une perte de maîtrise ou un mal-être lié au jeu, n’hésitez pas à demander de l’aide ou à contacter des organismes spécialisés pour en parler et obtenir un accompagnement adapté.
        </p>
      </section>
    </>
  );
};

export default Disclaimer;
