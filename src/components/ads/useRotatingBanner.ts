import { useCallback, useEffect, useRef, useState } from 'react';

export interface AdItem {
  id: string;
  imageUrl: string;
  alt: string;
  link: string;
  background?: string;
  label?: string;
}

interface UseRotatingBannerOptions {
  intervalMs?: number;
  items: AdItem[];
  autoStart?: boolean;
}

export function useRotatingBanner({ items, intervalMs = 5000, autoStart = true }: UseRotatingBannerOptions) {
  const [index, setIndex] = useState(0);
  const [isPaused, setPaused] = useState(!autoStart);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setIndex((current) => {
      if (items.length === 0) return 0;
      return (current + 1) % items.length;
    });
  }, [items.length]);

  const goTo = useCallback(
    (target: number) => {
      if (target < 0 || target >= items.length) return;
      setIndex(target);
    },
    [items.length],
  );

  const pause = useCallback(() => {
    setPaused(true);
  }, []);

  const resume = useCallback(() => {
    if (items.length > 1) {
      setPaused(false);
    }
  }, [items.length]);

  useEffect(() => {
    if (items.length === 0) {
      setIndex(0);
      return;
    }
    if (index >= items.length) {
      setIndex(0);
    }
  }, [index, items.length]);

  useEffect(() => {
    if (isPaused || items.length <= 1) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      next();
    }, intervalMs);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [intervalMs, isPaused, items.length, next]);

  return {
    index,
    current: items[index],
    pause,
    resume,
    goTo,
    isPaused,
    hasItems: items.length > 0,
    count: items.length,
  };
}
