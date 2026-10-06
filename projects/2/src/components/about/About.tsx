import React from 'react';
import s from './About.module.css'


const About = () => {

  return (
    <>
      <section className={`${s.about} container`}>
        <div className={s.top}>
          Así es como vemos las cosas y cómo trabajamos.
        </div>
        <h2 className={`sec__title ${s.title}`} title={'Sobre nosotros'}>
          Sobre nosotros
        </h2>
        <div className={s.wrap}>
          <p className={s.text}>
            Este sitio es un ejemplo de portfolio: textos, marcas y comparativas son ficticios y sirven solo para
            mostrar diseño y estructura. No ofrecemos juegos ni gestionamos depósitos; el contenido es ilustrativo. <br/>
            <br/>
            Los bloques de la página imitan un comparador de plataformas con avisos de juego responsable. Cualquier
            dato de contacto en el pie de página es de demostración (contact@demo-portfolio.example).
          </p>
          <div className={s.pic}></div>
        </div>
      </section>

    </>
  );
};

export default About;
