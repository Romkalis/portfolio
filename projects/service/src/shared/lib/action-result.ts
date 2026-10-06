"use client";

import { toast } from "sonner";

/** Ответ Server Action при отсутствии сессии (guardAdminAction). */
export function isUnauthorizedResult(
  result: unknown,
): result is { error: "Требуется авторизация" } {
  return (
    typeof result === "object" &&
    result !== null &&
    "error" in result &&
    (result as { error: string }).error === "Требуется авторизация"
  );
}

/** Показать toast при ошибке action; true = была ошибка. */
export function notifyActionError(result: unknown): boolean {
  if (isUnauthorizedResult(result)) {
    toast.error("Сессия истекла. Войдите снова.");
    window.location.href = "/login";
    return true;
  }
  if (
    typeof result === "object" &&
    result !== null &&
    "error" in result &&
    typeof (result as { error: string }).error === "string"
  ) {
    toast.error((result as { error: string }).error);
    return true;
  }
  return false;
}
