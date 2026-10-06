import {
  getAdjacentMonthAnchor,
  getWorkCalendarMonth,
} from "@/services/work-calendar.service";
import { formatDateOnly, parseDateOnly } from "@/shared/lib/utils";

export async function loadScheduleCalendarMonth(monthParam?: string) {
  const anchor = monthParam
    ? parseDateOnly(monthParam.slice(0, 10))
    : new Date();

  const data = await getWorkCalendarMonth(anchor);

  return {
    ...data,
    prevMonthYmd: getAdjacentMonthAnchor(anchor, -1),
    nextMonthYmd: getAdjacentMonthAnchor(anchor, 1),
    monthAnchorYmd: formatDateOnly(
      new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth(), 1)),
    ),
  };
}
