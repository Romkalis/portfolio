import React from 'react';
import s from './ContactPage.module.css';
import Contact from "@/components/contact/Contact";

const ContactPage = () => {
  return (
    <>
      <section className={s.contactPage}>
        <h1 className={`${s.title} sec__title`} title={'Contactez-nous'}>
          Contactez-nous
        </h1>
        <p className={s.text}>
          Si vous avez des questions, des suggestions ou rencontré un problème, nous sommes toujours heureux de vous
          aider. Remplissez le formulaire ci-dessous ou utilisez les coordonnées pour nous contacter directement. Notre
          service d'assistance fonctionne quotidiennement de 9h00 à 18h00
        </p>

        <div className={s.contacts}>
          <p className={`${s.contactTitle} sec__title`}>
            Coordonnées
          </p>
          <ul className={s.contactsList} aria-label={'Contacts List'}>
            <li className={s.contactItem}>
              <p className={s.contactItemTitle}>E-mail:</p>
              <a href="mailto:privacy@demo-portfolio.example" className={s.text} title={'privacy@demo-portfolio.example'} aria-label={'Mail Us: privacy@demo-portfolio.example'}>privacy@demo-portfolio.example</a>
            </li>
            <li className={s.contactItem}>
              <p className={s.contactItemTitle}>Numéro de téléphone:</p>
              <a href="tel:+10000000000" className={s.text} title={'+1 (000) 000-0000'} aria-label={'Call Us: +1 (000) 000-0000'}>+1 (000) 000-0000</a>
            </li>
            <li className={s.contactItem}>
              <p className={s.contactItemTitle}>Emplacement:</p>
              <p  className={s.text}>123 Example Street 00000 Paris, France</p>
            </li>
            <li className={s.contactItem}>
              <p className={s.contactItemTitle}>Heures de travail:</p>
              <p  className={s.text}>Lun - ven: 9h00 à 18h00 Sat - Soleil: fermé</p>
            </li>
          </ul>
        </div>

      <Contact />

      </section>
    </>
  );
};

export default ContactPage;
