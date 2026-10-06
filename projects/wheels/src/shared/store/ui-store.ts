import { create } from "zustand";

export type CalendarView = "table" | "week" | "month";

type UiState = {
  sidebarOpen: boolean;
  calendarView: CalendarView;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setCalendarView: (view: CalendarView) => void;
};

export const useUiStore = create<UiState>((set) => ({
  sidebarOpen: false,
  calendarView: "week",
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setCalendarView: (view) => set({ calendarView: view }),
}));
