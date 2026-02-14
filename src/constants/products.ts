import { Images } from '../assets/images';
import { Product } from '../types';

export const MOCK_PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Fresh Banana', 
    price: 45, 
    originalPrice: 60, 
    weight: '1kg', 
    image: Images.productImage1,
    categoryId: '1',
  },
  { 
    id: '2', 
    name: 'Farm Fresh Milk', 
    price: 65, 
    originalPrice: 70, 
    weight: '1L', 
    image: Images.productImage2,
    categoryId: '2',
  },
  { 
    id: '3', 
    name: 'Organic Tomato', 
    price: 40, 
    originalPrice: 50, 
    weight: '500g', 
    image: Images.productImage3,
    categoryId: '1',
  },
];

export const BESTSELLERS: Product[] = [
  {
    id: '1',
    name: 'Tomatoes',
    price: 35,
    originalPrice: 40,
    image: Images.productImage1,
    rating: 4.8,
    reviewCount: 2857,
    discountAmount: 5,
  },
  {
    id: '2',
    name: 'Paneer',
    price: 115,
    originalPrice: 157,
    image: Images.productImage2,
    rating: 4.8,
    reviewCount: 2087,
    discountAmount: 42,
  },
  {
    id: '3',
    name: 'Product 3',
    price: 55,
    image: Images.productImage3,
    rating: 4.8,
  },
];

export const SHOP_BY_OFFER: Product[] = [
  {
    id: '1',
    name: 'Purex',
    price: 85,
    originalPrice: 105,
    image: Images.productImage4,
    rating: 4.8,
    reviewCount: 287235,
    discountAmount: 20,
  },
  {
    id: '2',
    name: 'Varnish',
    price: 350,
    originalPrice: 370,
    image: Images.productImage5,
    rating: 4.8,
    reviewCount: 28877,
    discountAmount: 20,
  },
  {
    id: '3',
    name: 'Harpi',
    price: 35,
    image: Images.productImage1,
    rating: 4.8,
  },
];

export const CITY_BEST_SELLER: Product[] = [
  {
    id: '1',
    name: 'BHUJAMAL- Sweets and Snacks Combo 1',
    price: 45,
    originalPrice: 75,
    image: Images.productImage1,
    isNew: true,
  },
  {
    id: '2',
    name: 'Farmley Mix Dry Fruit Panchmeva...',
    price: 45,
    originalPrice: 75,
    image: Images.productImage2,
    discountPercentage: 25,
  },
  {
    id: '3',
    name: 'Protein Protein',
    price: 145,
    originalPrice: 175,
    image: Images.productImage3,
    discountPercentage: 25,
  },
];
