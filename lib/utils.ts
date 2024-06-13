// Importing necessary dependencies for class name manipulation
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Function to combine class names using clsx and tailwind-merge
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
