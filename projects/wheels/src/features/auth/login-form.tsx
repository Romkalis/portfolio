"use client";

import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema } from "@/shared/lib/validators";
import type { z } from "zod";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import Link from "next/link";
import { sanitizeCallbackUrl } from "@/shared/lib/utils";

type LoginForm = z.infer<typeof loginSchema>;

export function LoginForm({ showRegisterLink = true }: { showRegisterLink?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    const res = await signIn("credentials", { redirect: false, ...data });
    setLoading(false);
    if (res?.error) {
      toast.error("Неверный email или пароль");
      return;
    }
    toast.success("Добро пожаловать!");
    const session = await getSession();
    const roleDefault =
      session?.user?.role === "ADMIN" ? "/admin" : "/employee";
    let callback = sanitizeCallbackUrl(
      searchParams.get("callbackUrl"),
      roleDefault,
    );
    if (callback === "/" && roleDefault) callback = roleDefault;
    router.push(callback);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" {...register("email")} />
        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Пароль</Label>
        <Input id="password" type="password" autoComplete="current-password" {...register("password")} />
        {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Вход..." : "Войти"}
      </Button>
      {showRegisterLink && (
        <p className="text-center text-sm text-[var(--muted-foreground)]">
          Нет аккаунта?{" "}
          <Link href="/register" className="text-[var(--primary)] hover:underline">
            Регистрация
          </Link>
        </p>
      )}
    </form>
  );
}
