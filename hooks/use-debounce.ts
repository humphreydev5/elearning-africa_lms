import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value.
 * 
 * @param value The value to debounce.
 * @param delay The delay duration in milliseconds (default is 500ms).
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay || 500);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}
