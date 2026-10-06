import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { RegisterForm } from "@/features/auth/register-form";
import { isRegistrationAllowed } from "@/shared/lib/auth-server";

export default function RegisterPage() {
  if (!isRegistrationAllowed()) {
    redirect("/login");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>Создайте аккаунт сотрудника</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
        <p className="mt-4 text-center text-sm text-[var(--muted-foreground)]">
          <Link href="/login" className="text-[var(--primary)] hover:underline">
            Уже есть аккаунт
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
