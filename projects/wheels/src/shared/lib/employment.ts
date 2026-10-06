import { z } from "zod";

/** Значения enum EmployeeEmploymentType без импорта @prisma/client (валидаторы грузятся в auth/middleware). */
export const EMPLOYMENT_TYPE_VALUES = ["PERMANENT", "PART_TIME"] as const;

export type EmploymentTypeValue = (typeof EMPLOYMENT_TYPE_VALUES)[number];

export const employmentTypeSchema = z.enum(EMPLOYMENT_TYPE_VALUES);
