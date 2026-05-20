'use client';
import useNews from "@/components/useNews";
import s from './News.module.css';


// type NewsType = {
//   name: string;
//   created_at: string;
//   new_text: string[];
// };
//
// const mockNewsData = [
//   {
//     name: "La Evolución del Gaming: De Pac-Man a los eSports",
//     created_at: "2025-12-19 10:19:05",
//     new_text: [
//       "Desde sus humildes inicios en los años 80 con títulos icónicos como Pac-Man, la industria de los videojuegos ha recorrido un camino impresionante. Hoy, los gráficos hiperrealistas y los mundos abiertos vastos son la norma, pero lo que realmente ha transformado el panorama es la emergente cultura de los eSports. Cada vez más, los videojuegos se han convertido en un deporte competitivo, atrayendo a millones de fanáticos que no solo disfrutan jugando, sino también viendo a sus jugadores favoritos en torneos de alto nivel.",
//       "Las comunidades de gamers han florecido, impulsadas por plataformas de streaming como Twitch y YouTube, donde los usuarios comparten estrategias, consejos y, sobre todo, su pasión por el juego. Títulos como League of Legends y Valorant no solo dominan las listas de ventas, sino que también crean vínculos entre jugadores de todo el mundo. En esta nueva era, los videojuegos son más que entretenimiento; son un fenómeno cultural que une a las personas y redefine lo que significa jugar y competir en un entorno digital cada vez más conectado."
//     ]
//   },
//   {
//     name: "Leveling Up: The Revolutionary Impact of Indie Games",
//     created_at: "2025-12-10 00:11:19",
//     new_text: [
//       "In recent years, indie games have surged into the spotlight, dramatically reshaping the gaming landscape. Titles like \"Hollow Knight\" and \"Celeste\" have captivated players and proved that creativity often flourishes outside the confines of major studios. This newfound freedom allows indie developers to experiment with unique art styles, captivating narratives, and innovative mechanics, fostering a rich tapestry of gaming experiences that resonate on personal levels with players. The passion behind these projects often translates into gameplay that feels both fresh and meaningful, stirring emotions that larger titles may struggle to evoke.",
//       "Moreover, the rise of platforms like Steam and itch.io has facilitated greater accessibility, allowing smaller developers to reach their target audiences without the need for traditional publishing constraints. This democratization of game development has birthed a thriving community that champions originality over blockbuster formulas. As more players embrace the charm and depth of indie titles, it's clear that these games are not just a trend but a vital component of gaming culture, pushing the industry toward innovation and inclusivity."
//     ]
//   },
//   {
//     name: "The Rise of Indie Games: A New Era of Creativity",
//     created_at: "2025-12-05 00:13:29",
//     new_text: [
//       "In recent years, the indie game movement has exploded, redefining the gaming landscape and nurturing a vibrant community of developers. Titles like 'Hades' and 'Stardew Valley' showcase how smaller studios are pushing the boundaries of creativity, diving deep into storytelling and gameplay mechanics that often overshadow blockbuster releases. This surge is a testament to the passion and innovation that independent creators bring to the table, often driven by a desire to craft personal experiences rather than conform to mainstream expectations.",
//       "Moreover, platforms like Steam and itch.io have democratized game distribution, allowing emerging talent to reach audiences without the constraints of traditional publishing. As eSports continues to rise, some indie games are even breaking into competitive circuits, often captivating players with their unique mechanics and engaging gameplay. This shift not only highlights the diverse narratives present in gaming but also fosters a more inclusive culture where anyone with a creative spark can leave their mark in the industry."
//     ]
//   }
// ]


const News = () => {
  const {news, loadMore, hasNext, loading} = useNews();

  return (
    <>
      <section className={`${s.news} container`}>
        <h2 className={`${s.title} sec__title`} title={'Actualités'}>
          {loading ? 'Nous chargeons les dernières actualités...' : 'Actualités'}
        </h2>


        <ul className={s.list}>
          {
            news.map((news) => (
              <li className={s.item} key={news.created_at}>
                <p className={s.newsTitle}>{news.name}</p>
                <p className={s.text}>{news.new_text}</p>
              </li>
            ))
          }
        </ul>

        <button className={`${s.button} button`} onClick={loadMore}
                disabled={!hasNext || loading}> {loading ? 'Chargement...' : 'Charger plus'} </button>
      </section>
    </>
  );
};

export default News;
