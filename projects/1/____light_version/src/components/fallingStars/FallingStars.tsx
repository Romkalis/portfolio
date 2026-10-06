'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './FallingStars.module.css';

// Определяем интерфейс для объекта звезды
interface Star {
  id: number;
  x: number; // Случайная позиция X для каждой звезды
}

const FALL_DURATION_MS = 5000; // Должно соответствовать animation-duration в CSS (например, 5s = 5000ms)
const REMOVAL_DELAY_MS = FALL_DURATION_MS + 500;

const FallingStars = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const nextStarId = useRef(0);
  const activeTimeouts = useRef<Map<number, NodeJS.Timeout>>(new Map());

  const removeStar = useCallback((idToRemove: number) => {
    setStars(prevStars => prevStars.filter(star => star.id !== idToRemove));
    if (activeTimeouts.current.has(idToRemove)) {
      clearTimeout(activeTimeouts.current.get(idToRemove)!);
      activeTimeouts.current.delete(idToRemove);
    }
  }, []);

  useEffect(() => {
    // Сохраняем ссылку на Map в начале эффекта
    const timeoutsMap = activeTimeouts.current;

    const addStarInterval = setInterval(() => {
      const newStarId = nextStarId.current++;
      const randomX = Math.random();

      setStars(prevStars => [
        ...prevStars,
        { id: newStarId, x: randomX }
      ]);

      const timeoutId = setTimeout(() => {
        removeStar(newStarId);
      }, REMOVAL_DELAY_MS);

      timeoutsMap.set(newStarId, timeoutId);

    }, 200); // Частота появления новых звезд (каждые 200мс)

    return () => {
      clearInterval(addStarInterval);
      timeoutsMap.forEach(timeout => clearTimeout(timeout));
      timeoutsMap.clear();
    };
  }, [removeStar]); // Зависимость от removeStar, хотя useCallback гарантирует стабильность

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className={styles.star}
          style={{ "--random-x": star.x } as React.CSSProperties}
        ></div>
      ))}
    </>
  );
};

export default FallingStars;
