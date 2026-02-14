/**
 * Common type definitions for the application
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  weight?: string;
  image: any;
  rating?: number;
  reviewCount?: number;
  categoryId?: string;
  description?: string;
  discountAmount?: number; // OFF amount in rupees
  isNew?: boolean;
  discountPercentage?: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: any;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  isDefault?: boolean;
}

export interface NavigationParams {
  product?: Product;
  categoryName?: string;
  phoneNumber?: string;
}
