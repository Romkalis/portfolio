'use client'
import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './FallingStars.module.css';

interface Star {
  id: number;
  x: number;
  size: number;
  rotation: number;
}

const FALL_DURATION_MS = 5000;
const REMOVAL_DELAY_MS = FALL_DURATION_MS + 500;
const MAX_STARS = 30; //  максимальное количество шаров здесь

const FallingStars = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [isClient, setIsClient] = useState(false);
  const nextStarId = useRef(0);
  const activeTimeoutsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  // Включаем эффект только на клиенте
  useEffect(() => {
    setIsClient(true);
  }, []);

  const removeStar = useCallback((idToRemove: number) => {
    setStars(prevStars => prevStars.filter(star => star.id !== idToRemove));
    const activeTimeouts = activeTimeoutsRef.current;
    if (activeTimeouts.has(idToRemove)) {
      clearTimeout(activeTimeouts.get(idToRemove)!);
      activeTimeouts.delete(idToRemove);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const activeTimeouts = activeTimeoutsRef.current;
    const addStarInterval = setInterval(() => {
      if (activeTimeoutsRef.current.size >= MAX_STARS) return;

      const newStarId = nextStarId.current++;
      const randomX = Math.random();
      const randomSize = Math.random();
      const randomRotation = Math.floor(Math.random() * 360);

      setStars(prevStars => [
        ...prevStars,
        {
          id: newStarId,
          x: randomX,
          size: randomSize,
          rotation: randomRotation
        }
      ]);

      const timeoutId = setTimeout(() => {
        removeStar(newStarId);
      }, REMOVAL_DELAY_MS);

      activeTimeouts.set(newStarId, timeoutId);
    }, 250);

    return () => {
      clearInterval(addStarInterval);
      activeTimeouts.forEach(timeout => clearTimeout(timeout));
      activeTimeouts.clear();
    };
  }, [stars.length, removeStar, isClient]);

  // Не рендерим на сервере
  if (!isClient) {
    return <div className={styles.container} />;
  }

  return (
    <div className={styles.container}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={styles.star}
          style={{
            '--random-x': star.x,
            '--star-size': star.size,
            '--star-rotation': `${star.rotation}deg`
          } as React.CSSProperties}
        ></div>
      ))}
    </div>
  );
};

export default FallingStars;
