import { cn } from "@/shared/lib/utils";
import styles from "./Label.module.scss";

export function Label({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn(styles.label, className)} {...props}>
      {children}
    </label>
  );
}
