import s from './MainGrid.module.css';
import Header from "@/components/header/Header";

const MainGrid = ({children}: { children: React.ReactNode }) => {

  return (
    <>
      <div className={s.container}>
        <Header/>
        <main className={s.main}>
          {children}
        </main>
      </div>
    </>
  );
};

export default MainGrid;
