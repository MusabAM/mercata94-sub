import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Currency configuration with symbols and locales
export const CURRENCY_CONFIG: Record<string, { symbol: string; locale: string; flag: string }> = {
  USD: { symbol: "$", locale: "en-US", flag: "🇺🇸" },
  EUR: { symbol: "€", locale: "de-DE", flag: "🇪🇺" },
  GBP: { symbol: "£", locale: "en-GB", flag: "🇬🇧" },
  INR: { symbol: "₹", locale: "en-IN", flag: "🇮🇳" },
  AED: { symbol: "د.إ", locale: "ar-AE", flag: "🇦🇪" },
  CNY: { symbol: "¥", locale: "zh-CN", flag: "🇨🇳" },
};

/**
 * Formats a price in cents to a localized currency string
 * @param cents - Price in cents (e.g., 2999 for $29.99)
 * @param currency - Currency code (USD, EUR, GBP, INR, AED, CNY)
 * @returns Formatted price string with currency symbol
 */
export function formatPrice(cents: number, currency: string = "USD"): string {
  const config = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;

  try {
    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(cents / 100);
  } catch {
    // Fallback for unsupported currencies
    return `${config.symbol}${(cents / 100).toFixed(2)}`;
  }
}

/**
 * Get currency symbol for a given currency code
 */
export function getCurrencySymbol(currency: string = "USD"): string {
  return CURRENCY_CONFIG[currency]?.symbol || "$";
}
