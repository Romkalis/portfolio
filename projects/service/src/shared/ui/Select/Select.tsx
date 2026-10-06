import { cn } from "@/shared/lib/utils";
import styles from "./Select.module.scss";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select className={cn(styles.select, className)} {...props}>
      {children}
    </select>
  );
}
