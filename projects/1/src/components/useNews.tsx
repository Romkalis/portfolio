'use client';
import { useState, useEffect } from 'react';

type NewsType = {
  name: string;
  created_at: string;
  new_text: string[];
};

const useNews = () => {
  const [news, setNews] = useState<NewsType[]>([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchNews = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/news.php?page=${pageNum}`);
      const data = await response.json();

      if (data.news) {
        const normalized = data.news.map((item: NewsType) => ({
          ...item,
          new_text: Array.isArray(item.new_text) ? item.new_text : [item.new_text],
        }));
        setNews(prev => [...prev, ...normalized]);
        setHasNext(data.hasNext);
      }
    } catch (err) {
      console.error("Failed to fetch news", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return { news, loadMore, hasNext, loading };
};

export default useNews;
