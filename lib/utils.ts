import { MONTHS, TAILWIND_COLORS } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

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
export async function getServerCookieValue(
  name: string,
): Promise<string | undefined> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

// Client-side cookie utilities
export function getClientCookieValue(name: string): string | undefined {
  const cookies = document.cookie.split("; ").reduce(
    (acc, c) => {
      const [key, value] = c.split("=");
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );

  return cookies[name];
}

export function setClientCookieValue(
  name: string,
  value: string,
  maxAge: number,
): void {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
}

export const authFormSchema = (type: string) =>
  z
    .object({
      first_name:
        type === "sign-in" ? z.string().optional() : z.string().min(3),
      last_name: type === "sign-in" ? z.string().optional() : z.string().min(2),
      email: z.email(),
      password:
        type === "sign-in"
          ? z.string().min(1, "Password is required")
          : z
              .string()
              .min(8, "Password must be at least 8 characters")
              .regex(
                /[A-Z]/,
                "Password must contain at least 1 uppercase letter",
              )
              .regex(/[0-9]/, "Password must contain at least 1 number")
              .regex(
                /[^A-Za-z0-9]/,
                "Password must contain at least 1 special character",
              ),
      ...(type === "sign-up" && {
        confirmPassword: z.string(),
      }),
    })
    .refine(
      (data) => type === "sign-in" || data.password === data.confirmPassword,
      { message: "Passwords don't match", path: ["confirmPassword"] },
    );

export const getAvailableMonths = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthIndex = now.getMonth();

  const startYear = 2025;
  const result: Record<number, string[]> = {};

  for (let year = startYear; year <= currentYear; year++) {
    const lastMonthIndex = year === currentYear ? currentMonthIndex : 11;
    result[year] = Object.entries(MONTHS)
      .filter(([index]) => Number(index) <= lastMonthIndex)
      .map(([, name]) => name);
  }
  return result;
};

export const fmt = (n: number, c = "CAD") =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: c,
    minimumFractionDigits: 2,
  }).format(n);

export const uid = () => Math.random().toString(36).slice(2, 8);

export const getHexColor = (
  bgClass: string,
  isDark: boolean = false,
): string => {
  const entry = TAILWIND_COLORS[bgClass];
  if (!entry) return "#9ca3af";
  return isDark ? entry.dark : entry.light;
};
