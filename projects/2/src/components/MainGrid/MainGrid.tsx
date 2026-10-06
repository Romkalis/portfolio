'use client'
import React, {useLayoutEffect, useState} from 'react';
import s from './MainGrid.module.css';
import Header from "@/components/header/Header";
import Finder from "@/components/Finder/Finder";

const MainGrid = ({children}:{children: React.ReactNode}) => {

  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return (
    <>
      <div className={s.container}>
        <Header />
        <main className={s.main}>
          <div className={s.isMobile}>
          {!isMobile && <Finder />}
          </div>
          {children}
        </main>
      </div>
    </>
  );
};

export default MainGrid;
