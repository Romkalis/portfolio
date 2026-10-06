'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import '@/styles/fullcalendar.css';

type BookingEventChangeArg = {
  event: {
    id: string;
    start: Date | null;
    end: Date | null;
    extendedProps: { type?: string };
  };
  revert: () => void;
};

type Booking = {
  id: string;
  carId: string;
  startAt: string;
  endAt: string;
  status: string;
};

type Block = {
  id: string;
  type: string;
  startAt: string;
  endAt: string;
  reason: string | null;
};

const statusColors: Record<string, string> = {
  pending: '#f59e0b',
  confirmed: '#3b82f6',
  active: '#22c55e',
  completed: '#64748b',
  cancelled: '#ef4444',
  overdue: '#dc2626',
};

export default function BookingCalendar() {
  const token = useAuthStore((s) => s.accessToken);
  const queryClient = useQueryClient();

  const [range, setRange] = useState(() => getMonthRange(new Date()));

  const { data } = useQuery({
    queryKey: ['calendar', range.from, range.to],
    queryFn: () =>
      apiFetch<{ bookings: Booking[]; blocks: Block[] }>(
        `/bookings/calendar?from=${encodeURIComponent(range.from)}&to=${encodeURIComponent(range.to)}`,
        { token },
      ),
  });

  const events = [
    ...(data?.bookings.map((b) => ({
      id: b.id,
      title: `Booking · ${b.status}`,
      start: b.startAt,
      end: b.endAt,
      backgroundColor: statusColors[b.status] ?? '#3b82f6',
      editable: b.status !== 'cancelled' && b.status !== 'completed',
      extendedProps: { type: 'booking' as const },
    })) ?? []),
    ...(data?.blocks.map((b) => ({
      id: `block-${b.id}`,
      title: `Block · ${b.type}`,
      start: b.startAt,
      end: b.endAt,
      backgroundColor: '#475569',
      editable: false,
      extendedProps: { type: 'block' as const },
    })) ?? []),
  ];

  async function reschedule(bookingId: string, start: Date, end: Date) {
    await apiFetch(`/bookings/${bookingId}/reschedule`, {
      method: 'PATCH',
      token,
      body: JSON.stringify({
        startAt: start.toISOString(),
        endAt: end.toISOString(),
      }),
    });
    await queryClient.invalidateQueries({ queryKey: ['calendar'] });
  }

  async function onEventDrop(arg: BookingEventChangeArg) {
    if (arg.event.extendedProps.type !== 'booking') {
      arg.revert();
      return;
    }
    try {
      await reschedule(arg.event.id, arg.event.start!, arg.event.end ?? arg.event.start!);
    } catch {
      arg.revert();
    }
  }

  async function onEventResize(arg: BookingEventChangeArg) {
    if (arg.event.extendedProps.type !== 'booking') {
      arg.revert();
      return;
    }
    try {
      await reschedule(arg.event.id, arg.event.start!, arg.event.end!);
    } catch {
      arg.revert();
    }
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      height="auto"
      editable
      events={events}
      eventDrop={onEventDrop}
      eventResize={onEventResize}
      datesSet={(info) => {
        setRange({
          from: info.start.toISOString(),
          to: info.end.toISOString(),
        });
      }}
    />
  );
}

function getMonthRange(date: Date) {
  const from = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
  const to = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).toISOString();
  return { from, to };
}
