import { cn } from "@/shared/lib/utils";
import styles from "./Input.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return <input className={cn(styles.input, className)} {...props} />;
}
