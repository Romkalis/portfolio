import { Suspense } from "react";
import { LoginForm } from "@/features/auth/LoginForm/LoginForm";
import { Card } from "@/shared/ui/Card/Card";
import styles from "./login.module.scss";

export default function LoginPage() {
  return (
    <Card className={styles.card}>
      <h1 className={styles.title}>Автосервис CRM</h1>
      <p className={styles.subtitle}>Войдите для доступа к системе</p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </Card>
  );
}
