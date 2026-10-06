'use client';

// хук вернет объект формата {day, hour, minutes, seconds}, может принять на вход строку с началом отсчета в формате "дни:часы:минуты:секунды"


import {useEffect, useState} from "react";

function parseTimeString(timeStr: string): number {
  const [d, h, m, s] = timeStr.split(":").map(Number);
  return d * 24 * 3600 + h * 3600 + m * 60 + s;
}

export function useTimer(initial: string = "5:12:32:2") {
  const totalSeconds = parseTimeString(initial);
  const [timeLeft, setTimeLeft] = useState(totalSeconds);

  useEffect(() => {
    const storageKey = "countdownStart";
    const now = Date.now();

    // читаем сохранённое время старта
    const savedStart = localStorage.getItem(storageKey);
    let startTime = savedStart ? parseInt(savedStart, 10) : now;

    // сколько прошло секунд
    const elapsed = Math.floor((now - startTime) / 1000);
    let remaining = totalSeconds - elapsed;

    // если осталось меньше 3 часов — перезапускаем
    if (remaining <= 3 * 3600) {
      startTime = now;
      remaining = totalSeconds;
      localStorage.setItem(storageKey, String(startTime));
    }

    setTimeLeft(remaining);

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          // перезапуск
          localStorage.setItem(storageKey, String(Date.now()));
          return totalSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initial, totalSeconds]);

  const day = Math.floor(timeLeft / (24 * 3600));
  const hour = Math.floor((timeLeft % (24 * 3600)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return {
    day: String(day).padStart(2, "0"),
    hour: String(hour).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}
