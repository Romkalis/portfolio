import bcrypt from "bcryptjs";

/** Максимальные длины полей (защита от переполнения). */
export const LIMITS = {
  name: 120,
  email: 254,
  comment: 500,
  expenseName: 200,
  moneyMax: 999_999_999,
  passwordMin: 8,
  passwordMax: 128,
} as const;

const DUMMY_BCRYPT_HASH = bcrypt.hashSync("__timing_safe_dummy__", 12);

/** Сравнение пароля с защитой от timing attack при отсутствии пользователя. */
export async function safePasswordCompare(
  password: string,
  hash: string | null | undefined,
  compare: (plain: string, hashed: string) => Promise<boolean>,
): Promise<boolean> {
  if (!hash) {
    await compare(password, DUMMY_BCRYPT_HASH);
    return false;
  }
  return compare(password, hash);
}
