import { useState, useEffect } from 'react';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isCompleted: boolean;
  isToday: boolean;
}

export const useCountdown = (targetDateIso: string): CountdownTime => {
  const calculateTimeLeft = (): CountdownTime => {
    const targetTime = new Date(targetDateIso).getTime();
    const currentTime = new Date().getTime();
    const difference = targetTime - currentTime;

    if (difference <= 0) {
      // Check if it's the exact day (within 24 hours of target)
      const isToday = Math.abs(difference) <= 24 * 60 * 60 * 1000;
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isCompleted: true,
        isToday: isToday,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days,
      hours,
      minutes,
      seconds,
      isCompleted: false,
      isToday: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDateIso]);

  return timeLeft;
};
