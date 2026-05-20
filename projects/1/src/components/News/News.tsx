'use client';
import useNews from "@/components/useNews";
import s from './News.module.css';


const News = () => {
  const {news, loadMore, hasNext, loading} = useNews();

  return (
    <>
      <section className={`${s.news} `}>
        <div className={'container'}>
        <h2 className={`${s.title} sec__title`} title={'Noticias'}>
          {loading ? 'We are loading the latest news...' : 'News'}
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

        <button className={`${s.button} button`} onClick={loadMore} disabled={!hasNext || loading}>
          {loading ? 'Loading...' : 'Load more'}
        </button>
        </div>
      </section>
    </>
  );
};

export default News;
