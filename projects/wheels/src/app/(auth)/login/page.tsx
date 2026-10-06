import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { LoginForm } from "@/features/auth/login-form";
import { isRegistrationAllowed } from "@/shared/lib/auth-server";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Вход в Wheels</CardTitle>
        <CardDescription>Только для сотрудников шиномонтажа</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<p className="text-sm text-[var(--muted-foreground)]">Загрузка...</p>}>
          <LoginForm showRegisterLink={isRegistrationAllowed()} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
