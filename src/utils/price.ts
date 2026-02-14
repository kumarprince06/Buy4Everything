/**
 * Price calculation utilities
 */

export const calculateDiscountPercentage = (originalPrice: number, currentPrice: number): number => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const formatPrice = (price: number): string => {
  return `₹${price}`;
};
