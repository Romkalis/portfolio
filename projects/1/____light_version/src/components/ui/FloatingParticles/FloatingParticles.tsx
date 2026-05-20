'use client'
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo
} from 'react';
import styles from './FloatingParticles.module.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

const PARTICLE_LIFESPAN_MS = 1000;
const REMOVAL_DELAY_MS = PARTICLE_LIFESPAN_MS + 500;

const FloatingParticles = ({ counts = 150, type = 'float' }) => {
  const MAX_PARTICLES = useMemo(() => counts, [counts]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClient, setIsClient] = useState(false);
  const nextId = useRef(0);
  const timeouts = useRef<Map<number, NodeJS.Timeout>>(new Map());

  // Включаем эффект только на клиенте
  useEffect(() => {
    setIsClient(true);
  }, []);

  const removeParticle = useCallback((id: number) => {
    setParticles(prev => prev.filter(p => p.id !== id));
    const map = timeouts.current;
    if (map.has(id)) {
      clearTimeout(map.get(id)!);
      map.delete(id);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const timeoutMap = timeouts.current; // фиксируем ссылку
    const interval = setInterval(() => {
      if (particles.length >= MAX_PARTICLES) return;

      const id = nextId.current++;
      const randomX = Math.random();
      const randomY = Math.random();
      const randomSize = Math.random();

      setParticles(prev => [
        ...prev,
        { id, x: randomX, y: randomY, size: randomSize }
      ]);

      const timeoutId = setTimeout(() => {
        removeParticle(id);
      }, REMOVAL_DELAY_MS);

      timeoutMap.set(id, timeoutId);
    }, 500);

    return () => {
      clearInterval(interval);
      timeoutMap.forEach(timeout => clearTimeout(timeout));
      timeoutMap.clear();
    };
  }, [particles, removeParticle, MAX_PARTICLES, isClient]);

  // Не рендерим на сервере
  if (!isClient) {
    return <div className={styles.particlesWrapper} />;
  }

  return (
    <div className={styles.particlesWrapper}>
      {particles.map(p => (
        <div
          key={p.id}
          className={type !== 'float' ?styles.particle2 : styles.particle}
          style={{
            '--random-x': p.x,
            '--random-y': p.y,
            '--particle-size': p.size
          } as React.CSSProperties}
        ></div>
      ))}
    </div>
  );
};

export default FloatingParticles;
