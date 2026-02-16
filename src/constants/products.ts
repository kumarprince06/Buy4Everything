/**
 * products.ts
 *
 * Central list of product data used across the app (Home screen sections, product details, etc.).
 * Each export is an array of Product objects; images are required from assets/images so this file
 * depends on ../assets/images.
 *
 * Exports:
 * - MOCK_PRODUCTS: generic sample products
 * - BESTSELLERS: Bestsellers section (Tomatoes, Paneer, Cookies, etc.)
 * - SHOP_BY_OFFER: Shop by Offer section (Purex, Varnish, Harpic, etc.)
 * - EXPLORE_TRENDING_PRODUCTS: 12 items for the 4×3 trending grid
 * - CITY_BEST_SELLER: City Best Seller section (supports isNew and discountPercentage)
 */

import { Images } from '../assets/images';
import { Product } from '../types';

/** Fruits & Vegetables category list – 12 products with images from assets */
export const FRUITS_VEGETABLES_PRODUCTS: Product[] = [
  { id: 'fv1', name: 'fresho! Pomegranate, 1 kg', price: 218.08, weight: '1kg', image: Images.productPomegranate, categoryId: '1', rating: 4.8, reviewCount: 2800000 },
  { id: 'fv2', name: 'Ratnagiri Alphonso Mango - 2 Pc', price: 199, weight: '2pc', image: Images.productMango, categoryId: '1', rating: 4.8, reviewCount: 2800000 },
  { id: 'fv3', name: 'Fresh Tomato 1 kg', price: 18, weight: '1kg', image: Images.productTomato, categoryId: '1', rating: 4.8, reviewCount: 2800000 },
  { id: 'fv4', name: 'Fresho Strawberry 200 g', price: 56, weight: '200gm', image: Images.productStrawberry, categoryId: '1', rating: 4.8, reviewCount: 2800000 },
  { id: 'fv5', name: 'Onion 5 kg (Pack)', price: 220, weight: '5kg', image: Images.productOnion, categoryId: '1', rating: 4.8, reviewCount: 2800000 },
  { id: 'fv6', name: 'Carrot Red 500GM', price: 39, weight: '500gm', image: Images.productCarrot, categoryId: '1', rating: 4.8, reviewCount: 2800000 },
  { id: 'fv7', name: 'Fresho Broccoli 500 g', price: 39, weight: '500gm', image: Images.productBroccoli, categoryId: '1', rating: 4.8, reviewCount: 2800000 },
  { id: 'fv8', name: 'fresho! Cucumber (Loose), 1 kg', price: 24, weight: '1kg', image: Images.productCucumber, categoryId: '1', rating: 4.8, reviewCount: 2800000 },
  { id: 'fv9', name: 'Red Potato(1 kg)', price: 35, weight: '1kg', image: Images.productRedPotato, categoryId: '1', rating: 4.8, reviewCount: 2800000 },
  { id: 'fv10', name: 'Fresho Litchi 1 kg', price: 193, originalPrice: 233, discountAmount: 40, weight: '1kg', image: Images.productLitchi, categoryId: '1', rating: 4.8, reviewCount: 2800000 },
  { id: 'fv11', name: 'Order Healthy & Nutritious Veggie Combo', price: 116, weight: '5kg', image: Images.productVeggieCombo, categoryId: '1', rating: 4.8, reviewCount: 2800000 },
  { id: 'fv12', name: 'Fruits & Vegetables Box - Sample', price: 750, weight: '10kg', image: Images.productFruitsVegBox, categoryId: '1', rating: 4.8, reviewCount: 2800000 },
];

/** Sample products for general use (e.g. product detail, cart) */
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

/** Products for the Bestsellers horizontal list on Home */
export const BESTSELLERS: Product[] = [
  {
    id: '1',
    name: 'Tomatoes',
    price: 35,
    originalPrice: 40,
    image: Images.bestsellerTomato,
    rating: 4.8,
    reviewCount: 2857,
    discountAmount: 5,
  },
  {
    id: '2',
    name: 'Paneer',
    price: 115,
    originalPrice: 157,
    image: Images.bestsellerPaneer,
    rating: 4.8,
    reviewCount: 2087,
    discountAmount: 42,
  },
  {
    id: '3',
    name: 'Cookies',
    price: 55,
    image: Images.bestsellerCookies,
    rating: 4.8,
  },
];

/** Products for the Shop by Offer horizontal list on Home */
export const SHOP_BY_OFFER: Product[] = [
  {
    id: '1',
    name: 'Purex',
    price: 85,
    originalPrice: 105,
    image: Images.shopByOfferPurex,
    rating: 4.8,
    reviewCount: 287235,
    discountAmount: 20,
  },
  {
    id: '2',
    name: 'Varnish',
    price: 350,
    originalPrice: 370,
    image: Images.shopByOfferVarnish,
    rating: 4.8,
    reviewCount: 28877,
    discountAmount: 20,
  },
  {
    id: '3',
    name: 'Harpic',
    price: 35,
    image: Images.shopByOfferHarpic,
    rating: 4.8,
  },
];

/** Explore Trending Products: 12 items for the 4×3 grid (Figma names and images) */
export const EXPLORE_TRENDING_PRODUCTS: Product[] = [
  { id: 't1', name: 'Deconstruct Face Serum', price: 399, image: Images.trendingDeconstruct },
  { id: 't2', name: 'COSRX Advanced Sn...', price: 599, image: Images.trendingCosrx },
  { id: 't3', name: 'Pilgrim Korean Beauty less..', price: 449, image: Images.trendingPilgrim },
  { id: 't4', name: 'Glamveda Korean ass S...', price: 299, image: Images.trendingGlamveda },
  { id: 't5', name: 'Lotus Professional..', price: 199, image: Images.trendingLotusPro },
  { id: 't6', name: 'Deconstruct Face Serum', price: 399, image: Images.trendingDeconstruct1 },
  { id: 't7', name: 'Plum Niacinamide...', price: 549, image: Images.trendingPlum },
  { id: 't8', name: 'Cetaphil Moisturizing', price: 429, image: Images.trendingCetaphil },
  { id: 't9', name: 'Lotus Herbals Radiant Gold...', price: 349, image: Images.trendingLotusHerbals },
  { id: 't10', name: 'Biotique Daily Skin Care', price: 249, image: Images.trendingBiotique },
  { id: 't11', name: 'Hot Beauty combo Pers..', price: 699, image: Images.trendingHotBeauty },
  { id: 't12', name: 'Sotrue Epifine Derma Roller', price: 499, image: Images.trendingSotrue },
];

/** Products for the City Best Seller horizontal list (supports isNew and discountPercentage) */
export const CITY_BEST_SELLER: Product[] = [
  {
    id: '1',
    name: 'BHUJAMAL- Sweets and Snacks Combo 1',
    price: 45,
    originalPrice: 75,
    image: Images.cityBestSellerBhujamal,
    isNew: true,
  },
  {
    id: '2',
    name: 'Farmley Mix Dry Fruit Panchmeva...',
    price: 45,
    originalPrice: 75,
    image: Images.cityBestSellerFarmley,
    discountPercentage: 25,
  },
  {
    id: '3',
    name: 'Protein Chef High Protein Mixture',
    price: 145,
    originalPrice: 175,
    image: Images.cityBestSellerProtein,
    discountPercentage: 25,
  },
];
