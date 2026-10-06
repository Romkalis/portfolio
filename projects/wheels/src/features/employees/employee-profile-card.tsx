"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { employeeProfileUpdateSchema } from "@/shared/lib/validators";
import type { z } from "zod";
import { updateOwnEmployeeProfile } from "./actions";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type FormValues = z.infer<typeof employeeProfileUpdateSchema>;

export function EmployeeProfileCard({
  phone,
  position,
}: {
  phone: string | null;
  position: string;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(employeeProfileUpdateSchema),
    defaultValues: { phone: phone ?? "", position },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Мои данные</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-3 sm:max-w-md"
          onSubmit={handleSubmit(async (data) => {
            const fd = new FormData();
            if (data.phone !== undefined) fd.append("phone", data.phone);
            if (data.position) fd.append("position", data.position);
            const res = await updateOwnEmployeeProfile(fd);
            if (res.error) toast.error("Ошибка");
            else {
              toast.success("Сохранено");
              router.refresh();
            }
          })}
        >
          <div className="space-y-2">
            <Label>Телефон</Label>
            <Input {...register("phone")} />
          </div>
          <div className="space-y-2">
            <Label>Должность</Label>
            <Input {...register("position")} />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Сохранить
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
