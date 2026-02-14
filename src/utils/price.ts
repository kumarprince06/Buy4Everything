/**
 * price.ts
 *
 * Price helpers used across product cards and product details.
 * - formatPrice: formats number as "₹ <amount>" for display
 * - calculateDiscountPercentage: (original - current) / original * 100
 */

export const calculateDiscountPercentage = (originalPrice: number, currentPrice: number): number => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const formatPrice = (price: number): string => {
  return `₹ ${price}`;
};
