'use client';

import React, { useEffect, useRef } from 'react';
import styles from './ParallaxWrapper.module.css';

type ParallaxWrapperProps = {
  children: React.ReactNode;
  strength?: number; // Насколько сильно двигать (по умолчанию 20)
};

const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({ children, strength = 50 }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX / innerWidth - 0.5) * strength;
      const offsetY = (e.clientY / innerHeight - 0.5) * strength;

      wrapper.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return (
    <div className={styles.parallaxContainer}>
      <div ref={wrapperRef} className={styles.inner}>
        {children}
      </div>
    </div>
  );
};

export default ParallaxWrapper;
