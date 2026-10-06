"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Label } from "@/shared/ui/Label/Label";
import { toast } from "sonner";
import styles from "./LoginForm.module.scss";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    const res = await signIn("credentials", {
      login: fd.get("login"),
      password: fd.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      toast.error("Неверный логин или пароль");
      return;
    }
    toast.success("Добро пожаловать!");
    router.push(searchParams.get("callbackUrl") ?? "/schedule");
    router.refresh();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.field}>
        <Label htmlFor="login">Логин</Label>
        <Input id="login" name="login" defaultValue="admin" required autoComplete="username" />
      </div>
      <div className={styles.field}>
        <Label htmlFor="password">Пароль</Label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue="admin123"
          required
          autoComplete="current-password"
        />
      </div>
      <Button type="submit" disabled={loading} className={styles.submit}>
        {loading ? "Вход..." : "Войти"}
      </Button>
    </form>
  );
}
