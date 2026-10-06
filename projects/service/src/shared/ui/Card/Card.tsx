import { cn } from "@/shared/lib/utils";
import styles from "./Card.module.scss";

export function Card({
  className,
  children,
  title,
}: {
  className?: string;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className={cn(styles.card, className)}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {children}
    </div>
  );
}
