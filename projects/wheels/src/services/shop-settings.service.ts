import { prisma } from "@/shared/lib/prisma";
import { isoWeekdayFromDate } from "@/shared/lib/schedule-time";

const SETTINGS_ID = "default";

export async function getShopSettings() {
  return prisma.shopSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, defaultStartTime: "09:00", defaultEndTime: "21:00" },
    update: {},
  });
}

/** Базовое рабочее время точки (для назначения смен админом). */
export async function getDefaultShiftTimes() {
  const shop = await getShopSettings();
  return {
    startTime: shop.defaultStartTime,
    endTime: shop.defaultEndTime,
  };
}

/** Проставить базовое время всем активным сотрудникам (пн–вс). */
export async function syncEmployeeSchedulesFromShop(
  startTime: string,
  endTime: string,
) {
  const employees = await prisma.employeeProfile.findMany({
    where: { isActive: true },
    select: { id: true },
  });

  for (const emp of employees) {
    for (let weekday = 1; weekday <= 7; weekday++) {
      await prisma.schedule.upsert({
        where: {
          employeeId_weekday: { employeeId: emp.id, weekday },
        },
        create: {
          employeeId: emp.id,
          weekday,
          startTime,
          endTime,
          isActive: true,
        },
        update: { startTime, endTime, isActive: true },
      });
    }
  }
}

export function getEmployeeScheduleForDate(
  schedules: { weekday: number; startTime: string; endTime: string; isActive: boolean }[],
  date: Date,
  shopFallback: { startTime: string; endTime: string },
) {
  const wd = isoWeekdayFromDate(date);
  const row = schedules.find((s) => s.weekday === wd && s.isActive);
  return row
    ? { startTime: row.startTime, endTime: row.endTime }
    : { startTime: shopFallback.startTime, endTime: shopFallback.endTime };
}
