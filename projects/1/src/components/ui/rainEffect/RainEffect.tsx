'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './RainEffect.module.css';

type Drop = {
  id: string;
  left: number;
  width: number;
  height: number;
  duration: number;
};

type RainEffectProps = {
  intensity?: number; // капель в секунду
  maxDrops?: number; // максимальное количество капель одновременно
};

const RainEffect: React.FC<RainEffectProps> = ({ intensity = 30, maxDrops = 50 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [drops, setDrops] = useState<Drop[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Включаем эффект только на клиенте
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setDrops(prev => {
        // Ограничиваем максимальное количество капель
        if (prev.length >= maxDrops) {
          return prev.slice(1); // Удаляем старую каплю
        }

        const id = crypto.randomUUID();
        const left = Math.random() * 100;
        const width = Math.random() * 1.5 + 0.5;
        const height = Math.random() * 17 + 5;
        const duration = 2.5 + (2.5 - width);

        return [...prev, { id, left, width, height, duration }];
      });
    }, 1000 / intensity);

    return () => clearInterval(interval);
  }, [intensity, maxDrops, isClient]);

  useEffect(() => {
    if (!isClient) return;

    const cleanupInterval = setInterval(() => {
      setDrops(prev => {
        // Удаляем капли старше 3 секунд (гарантированно упали)
        return prev.slice(-maxDrops);
      });
    }, 3000);

    return () => clearInterval(cleanupInterval);
  }, [maxDrops, isClient]);

  // Не рендерим на сервере
  if (!isClient) {
    return <div className={styles.rainWrapper} ref={containerRef} data-component="RainEffect" />;
  }

  return (
    <div className={styles.rainWrapper} ref={containerRef} data-component="RainEffect">
      {drops.map(({ id, left, width, height, duration }) => (
        <div
          key={id}
          className={styles.drop}
          style={{
            left: `${left}%`,
            width: `${width}px`,
            height: `${height}px`,
            animationDuration: `${duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default RainEffect;
