import { cn } from "@/shared/lib/utils";
import styles from "./Badge.module.scss";

const variantMap: Record<string, string> = {
  PENDING: styles.pending,
  IN_PROGRESS: styles.progress,
  COMPLETED: styles.completed,
  CONFIRMED: styles.progress,
  CANCELLED: styles.cancelled,
};

const labels: Record<string, string> = {
  PENDING: "Ожидает",
  IN_PROGRESS: "В работе",
  COMPLETED: "Завершён",
  CONFIRMED: "Подтверждена",
  CANCELLED: "Отменена",
};

export function Badge({ status }: { status: string }) {
  return (
    <span className={cn(styles.badge, variantMap[status] ?? styles.pending)}>
      {labels[status] ?? status}
    </span>
  );
}
