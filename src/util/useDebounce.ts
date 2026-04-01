import { useRef } from "react";

export const useDebounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: Parameters<T>) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
