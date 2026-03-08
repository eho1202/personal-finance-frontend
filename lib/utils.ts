import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FormatNumber = (number: number) => {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(number);
};

// Server-side cookie utilities
export async function getServerCookieValue(name: string): Promise<string | undefined> {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

// Client-side cookie utilities
export function getClientCookieValue(name: string): string | undefined {
  const cookies = document.cookie.split('; ').reduce((acc, c) => {
    const [key, value] = c.split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  
  return cookies[name];
}

export function setClientCookieValue(name: string, value: string, maxAge: number): void {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
}
