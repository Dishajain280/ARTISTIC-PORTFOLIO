import { Currency } from '../types';

export const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; prefix: string }> = {
  USD: { rate: 1, symbol: '$', prefix: '$' },
  EUR: { rate: 0.92, symbol: '€', prefix: '€' },
  GBP: { rate: 0.79, symbol: '£', prefix: '£' },
  JPY: { rate: 155, symbol: '¥', prefix: '¥' },
};

export function formatPrice(amountUsd: number, currency: Currency = 'USD'): string {
  const { rate, symbol } = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
  const converted = Math.round(amountUsd * rate);
  
  if (currency === 'JPY') {
    return `${symbol}${converted.toLocaleString('en-US')}`;
  }
  return `${symbol}${converted.toLocaleString('en-US')}`;
}
