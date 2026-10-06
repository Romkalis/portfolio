'use client'
import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from 'react';
import s from './Games.module.css';
import GamesList from "@/components/GamesList/GamesList";


type Filters = {
  query: string;
  studio: 'all' | 'romantech' | 'adp';
  category: 'all' | 'fun' | 'arcade' | 'sport';
  theme: 'all' | 'modern' | 'retro';
};

const games: Game[] = [
  {
    id: 1,
    name: 'Night city',
    studio: 'adp',
    category: 'fun',
    theme: 'modern',
    rate: 5,
    path: 'nightcity'
  },
  {
    id: 2,
    name: 'Alladin Slot',
    studio: 'romantech',
    category: 'arcade',
    theme: 'retro',
    rate: 4.9,
    path: 'alladin'
  },
  {
    id: 3,
    name: 'Kingdom Elf',
    studio: 'adp',
    category: 'fun',
    theme: 'modern',
    rate: 4.9,
    path: 'kingdomelf'
  },
  {
    id: 4,
    name: 'Dark Castle',
    studio: 'romantech',
    category: 'arcade',
    theme: 'retro',
    rate: 4.8,
    path: 'dakcastle'
  },
  {
    id: 5,
    name: 'Donuts Slot',
    studio: 'romantech',
    category: 'fun',
    theme: 'modern',
    rate: 5,
    path: 'donuts'
  },
  {
    id: 6,
    name: 'Magisian',
    studio: 'adp',
    category: 'sport',
    theme: 'modern',
    rate: 5,
    path: 'magician'
  },
  {
    id: 7,
    name: 'Chinese Jackpot',
    studio: 'adp',
    category: 'sport',
    theme: 'retro',
    rate: 4.8,
    path: 'chinatown'
  },
  {
    id: 8,
    name: 'Wild Love',
    studio: 'romantech',
    category: 'fun',
    theme: 'retro',
    rate: 5,
    path: 'wildlove'
  },
  {
    id: 9,
    name: 'Pan slot',
    studio: 'romantech',
    category: 'sport',
    theme: 'retro',
    rate: 4.7,
    path: 'panslot'
  },
  {
    id: 10,
    name: 'Aqua Slot',
    studio: 'romantech',
    category: 'arcade',
    theme: 'modern',
    rate: 4.9,
    path: 'aquaslot'
  },
  {
    id: 11,
    name: 'Horse racing',
    studio: 'adp',
    category: 'sport',
    theme: 'modern',
    rate: 5,
    path: 'horse'
  },
  {
    id: 12,
    name: 'Egypt Adventure',
    studio: 'romantech',
    category: 'fun',
    theme: 'modern',
    rate: 4.8,
    path: 'egypt'
  },
  {
    id: 13,
    name: 'Penalty',
    studio: 'adp',
    category: 'sport',
    theme: 'modern',
    rate: 4.7,
    path: 'penalty'
  },
  {
    id: 14,
    name: 'Vikings',
    studio: 'adp',
    category: 'arcade',
    theme: 'retro',
    rate: 4.9,
    path: 'viking'
  },
  {
    id: 15,
    name: 'Cold Space',
    studio: 'romantech',
    category: 'arcade',
    theme: 'modern',
    rate: 5,
    path: 'coldspace'
  },
  {
    id: 16,
    name: 'Shadow Forest',
    studio: 'adp',
    category: 'fun',
    theme: 'modern',
    rate: 4.9,
    path: 'shadowforest'
  },
  {
    id: 17,
    name: 'Tennis',
    studio: 'romantech',
    category: 'sport',
    theme: 'retro',
    rate: 5,
    path: 'tennis'
  },
  {
    id: 18,
    name: 'Gotham',
    studio: 'romantech',
    category: 'arcade',
    theme: 'retro',
    rate: 4.8,
    path: 'gotham'
  },
  {
    id: 19,
    name: 'Hockey',
    studio: 'romantech',
    category: 'fun',
    theme: 'modern',
    rate: 5,
    path: 'hockey'
  },
  {
    id: 20,
    name: 'Greyhound Race',
    studio: 'adp',
    category: 'sport',
    theme: 'modern',
    rate: 5,
    path: 'greyhound'
  },
  {
    id: 21,
    name: 'Arena of Honor',
    studio: 'romantech',
    category: 'fun',
    theme: 'modern',
    rate: 4.8,
    path: 'honor'
  },
]

const Games = () => {

  const [filters, setFilters] = useState<Filters>({
    query: '',
    studio: 'all',
    category: 'all',
    theme: 'all',
  });

  const emitFiltersChange = useCallback((detail: Filters) => {
    window.dispatchEvent(new CustomEvent('eg:gamesFiltersChange', { detail }));
  }, []);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    const nextFilters: Filters = { ...filters, query: next };
    setFilters(nextFilters);
    emitFiltersChange(nextFilters);
  }, [emitFiltersChange, filters]);

  const handleStudioChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as Filters['studio'];
    const nextFilters: Filters = { ...filters, studio: next };
    setFilters(nextFilters);
    emitFiltersChange(nextFilters);
  }, [emitFiltersChange, filters]);

  const handleCategoryChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as Filters['category'];
    const nextFilters: Filters = { ...filters, category: next };
    setFilters(nextFilters);
    emitFiltersChange(nextFilters);
  }, [emitFiltersChange, filters]);

  const handleThemeChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as Filters['theme'];
    const nextFilters: Filters = { ...filters, theme: next };
    setFilters(nextFilters);
    emitFiltersChange(nextFilters);
  }, [emitFiltersChange, filters]);

  const handleReset = useCallback(() => {
    const reset: Filters = { query: '', studio: 'all', category: 'all', theme: 'all' };
    setFilters(reset);
    window.dispatchEvent(new CustomEvent('eg:gamesFiltersReset', { detail: reset }));
  }, []);

  const filteredGames = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return games.filter(g => {
      const matchQuery = q === '' || g.name.toLowerCase().includes(q);
      const matchStudio = filters.studio === 'all' || g.studio === filters.studio;
      const matchCategory = filters.category === 'all' || g.category === filters.category;
      const matchTheme = filters.theme === 'all' || g.theme === filters.theme;
      return matchQuery && matchStudio && matchCategory && matchTheme;
    });
  }, [filters]);

  const PAGE_SIZE = 8;
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => {
    const count = Math.ceil(filteredGames.length / PAGE_SIZE) || 1;
    return count;
  }, [filteredGames.length]);

  const pagedGames = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredGames.slice(start, start + PAGE_SIZE);
  }, [filteredGames, page]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  const nextPage = useCallback(() => setPage(p => Math.min(p + 1, totalPages)), [totalPages]);
  const prevPage = useCallback(() => setPage(p => Math.max(p - 1, 1)), []);


  return (
    <>
      <section className={`${s.games} container`}>
        <h2 className="visually-hidden">Our games</h2>

        <div className={s.formWrapper}>
        <form className={s.form}>

          <div className={s.top}>
            <label className={s.label}>
            <input
              type="text"
              className={s.find}
              title={'Finder input'}
              aria-label={'Finder input'}
              placeholder={'Find adventures...'}
              value={filters.query}
              onChange={handleInputChange}
            />
            </label>
            <button type="button" onClick={handleReset} title={`Reset Filters`} aria-label={`Reset Filters`}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.2093 4.20702L4.06973 12.0624" stroke="#260501" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.20928 4.06738L12.0697 12.202" stroke="#260501" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              Reset Filters
            </button>
          </div>

          <div className={s.round}></div>

          <div className={s.selects}>
            <div className={s.optBlock}>
              <p className={s.title}>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.38756 16.8037C8.38479 16.9585 8.4252 17.111 8.50426 17.2441C8.58332 17.3772 8.6979 17.4856 8.83515 17.5572L10.4865 18.4192C10.6124 18.4849 10.753 18.5173 10.8949 18.5134C11.0369 18.5094 11.1755 18.4693 11.2975 18.3967C11.4196 18.3241 11.5211 18.2215 11.5923 18.0987C11.6636 17.9758 11.7023 17.8368 11.7047 17.6948L11.8065 11.8644C11.8139 11.4516 11.9743 11.0562 12.2566 10.755L18.3889 4.20579C18.4988 4.0882 18.5723 3.94128 18.6005 3.7828C18.6287 3.62433 18.6103 3.46108 18.5477 3.3128C18.4851 3.16452 18.3808 3.03756 18.2476 2.94728C18.1143 2.85699 17.9577 2.80725 17.7968 2.80406L2.8043 2.54237C2.64322 2.53961 2.48479 2.58363 2.34821 2.66908C2.21164 2.75452 2.10277 2.87774 2.0348 3.02381C1.96682 3.16987 1.94266 3.33251 1.96523 3.49202C1.98781 3.65154 2.05616 3.80109 2.16199 3.92255L8.06367 10.6818C8.3353 10.9927 8.48181 11.3934 8.47479 11.8062L8.38756 16.8037Z" stroke="#FF6900" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                All Studios
              </p>

              <select name="studio" value={filters.studio} onChange={handleStudioChange}>
                <option value="all">All Providers</option>
                <option value="romantech">Roman-Tech</option>
                <option value="adp">ADP</option>
              </select>
            </div>

            <div className={s.optBlock}>
              <p className={s.title}>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.18896 9.25391L8.52179 9.31208" stroke="#E65F2A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.88477 7.61621L6.82659 10.949" stroke="#E65F2A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.6748 10.2183L12.6831 10.2184" stroke="#E65F2A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.2036 8.59521L15.2119 8.59536" stroke="#E65F2A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14.7095 4.41864L5.84287 4.26388C5.0181 4.24967 4.21735 4.54174 3.59541 5.08363C2.97347 5.62551 2.57451 6.37873 2.47565 7.19768C2.4699 7.24093 2.46585 7.2817 2.45927 7.3241C2.38197 7.88459 1.80533 12.0758 1.78287 13.3625C1.77129 14.0255 2.02359 14.666 2.48424 15.143C2.9449 15.62 3.57619 15.8945 4.23923 15.9061C5.07256 15.9207 5.4965 15.5113 5.92044 15.1019L7.11935 13.9441C7.43729 13.637 7.86421 13.4687 8.3062 13.4763L11.9262 13.5395C12.3682 13.5473 12.789 13.7304 13.096 14.0484L14.2538 15.2473C14.6632 15.6713 15.0726 16.0952 15.9059 16.1098C16.5689 16.1213 17.2094 15.869 17.6865 15.4084C18.1635 14.9477 18.438 14.3164 18.4495 13.6534C18.472 12.3659 18.042 8.15794 17.9843 7.59509C17.9792 7.55332 17.9766 7.5116 17.9723 7.46901C17.9023 6.64696 17.53 5.88008 16.9273 5.31665C16.3246 4.75321 15.5344 4.43326 14.7095 4.41864Z" stroke="#E65F2A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                All Categories
              </p>

              <select name="category" value={filters.category} onChange={handleCategoryChange}>
                <option value="all">All Types</option>
                <option value="fun">Funny</option>
                <option value="arcade">Arcade</option>
                <option value="sport">Sport</option>
              </select>
            </div>

            <div className={s.optBlock}>
              <p className={s.title}>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.48916 2.50537C9.5282 2.31483 9.63265 2.14395 9.78442 2.02231C9.9362 1.90067 10.1257 1.83595 10.3202 1.83934C10.5147 1.84274 10.7018 1.91404 10.8493 2.0409C10.9967 2.16775 11.0951 2.34218 11.1275 2.53397L11.9225 7.18093C11.9789 7.5113 12.1337 7.81699 12.3665 8.05809C12.5993 8.29918 12.8994 8.4645 13.2276 8.53245L17.844 9.48913C18.0346 9.52817 18.2054 9.63262 18.3271 9.7844C18.4487 9.93617 18.5134 10.1257 18.51 10.3202C18.5066 10.5146 18.4353 10.7018 18.3085 10.8492C18.1816 10.9967 18.0072 11.0951 17.8154 11.1275L13.1685 11.9225C12.8381 11.9789 12.5324 12.1336 12.2913 12.3665C12.0502 12.5993 11.8849 12.8994 11.8169 13.2276L10.8603 17.844C10.8212 18.0345 10.7168 18.2054 10.565 18.327C10.4132 18.4487 10.2237 18.5134 10.0292 18.51C9.83474 18.5066 9.64758 18.4353 9.50015 18.3085C9.35271 18.1816 9.25429 18.0072 9.22192 17.8154L8.42693 13.1684C8.37047 12.8381 8.21574 12.5324 7.98291 12.2913C7.75009 12.0502 7.44999 11.8849 7.12178 11.8169L2.5054 10.8602C2.31486 10.8212 2.14397 10.7167 2.02234 10.565C1.9007 10.4132 1.83597 10.2237 1.83937 10.0292C1.84276 9.83471 1.91406 9.64755 2.04092 9.50012C2.16778 9.35269 2.34221 9.25426 2.534 9.22189L7.18096 8.4269C7.51133 8.37045 7.81702 8.21571 8.05811 7.98288C8.29921 7.75006 8.46452 7.44996 8.53248 7.12175L9.48916 2.50537Z" stroke="#FB5A46" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.9868 1.95752L16.9286 5.29035" stroke="#FB5A46" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.6238 3.65339L15.291 3.59521" stroke="#FB5A46" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3.36214 18.3912C4.28248 18.4073 5.04158 17.6742 5.05764 16.7539C5.07371 15.8335 4.34065 15.0744 3.42032 15.0584C2.49998 15.0423 1.74088 15.7754 1.72482 16.6957C1.70875 17.616 2.44181 18.3751 3.36214 18.3912Z" stroke="#FB5A46" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                All Themes
              </p>

              <select name="theme" value={filters.theme} onChange={handleThemeChange}>
                <option value="all">All Themes</option>
                <option value="modern">Modern</option>
                <option value="retro">Retro</option>
              </select>
            </div>
          </div>
        </form>

        <div className={s.bottomBlock}>
          1,247 adventures available
        </div>

        </div>
      </section>

      <GamesList games={pagedGames} />

      <div className={s.pagination}>
        <button
          type="button"
          className={s.pageButton}
          onClick={prevPage}
          disabled={page === 1}
          aria-label={'Previous page'}
        ><svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 9L9 18L10.4 16.5L3 9L10.4 1.5L9 0L0 9Z" fill="#020B08"/>
        </svg>
        </button>
        <span className={s.pageIndicator}>{page}/{totalPages}</span>
        <button
          type="button"
          className={s.pageButton}
          onClick={nextPage}
          disabled={page === totalPages}
          aria-label={'Next page'}
        ><svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.4 0L0 1.5L7.4 9L0 16.5L1.4 18L10.4 9L1.4 0Z" fill="#020B08"/>
        </svg>
        </button>
      </div>
    </>
  );
};

export default Games;
type Game = {
  id: number;
  name: string;
  studio: 'romantech' | 'adp';
  category: 'fun' | 'arcade' | 'sport';
  theme: 'modern' | 'retro';
  rate: number;
  path: string;
};
