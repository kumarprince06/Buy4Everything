/**
 * allCategories.ts
 *
 * Data for the "All categories" screen (shown when user taps Explore/Mega button in bottom nav).
 * Each item: name, product count label, image (from assets), background and border colors per Figma.
 * Order: Fruits → Dairy → Fishes → Home → Cooking → Snacks → Personal Care → Stationery →
 * Kitchen → Baby Care → Tea/Coffee → Packaged Food → Cold Drinks → Pharmacy.
 */

import { Images } from '../assets/images';

export interface AllCategoryItem {
  id: string;
  name: string;
  productCountText: string;
  image: any;
  backgroundColor: string;
  borderColor: string;
}

/** 14 categories – exact bg and border hex from Figma (order: fruits, dairy, fishes, home, cooking, …) */
export const ALL_CATEGORIES: AllCategoryItem[] = [
  { id: '1', name: 'Fruits & Vegetables', productCountText: '20+ Fruits & Vegs', image: Images.categoryFruitsVeg, backgroundColor: '#E5FFE2', borderColor: '#B1FFAB' },
  { id: '2', name: 'Dairy Products', productCountText: '75+ Dairy Products', image: Images.categoryDairy, backgroundColor: '#FFEAEA', borderColor: '#FFCECA' },
  { id: '3', name: 'Fishes & Meat', productCountText: '50+ Fishes & Meat', image: Images.categoryFishesMeat, backgroundColor: '#FFF0C3', borderColor: '#FFE082' },
  { id: '4', name: 'Home & Cleaning', productCountText: '25+ Home & Cleaning', image: Images.categoryHomeCleaning, backgroundColor: '#F5E4FF', borderColor: '#E5BAFF' },
  { id: '5', name: 'Cooking Element', productCountText: '30+ Cooking element', image: Images.categoryCooking, backgroundColor: '#009EBE2B', borderColor: '#04A4CF57' },
  { id: '6', name: 'Snacks Items', productCountText: '45+ Snacks Items', image: Images.categorySnacks, backgroundColor: '#FFEAEA', borderColor: '#FFCECA' },
  { id: '7', name: 'Personal Care', productCountText: '30+ Personal care products', image: Images.categoryPersonalCare, backgroundColor: '#E5FFE2', borderColor: '#B1FFAB' },
  { id: '8', name: 'Stationery & Office', productCountText: '45+ Stationery products', image: Images.categoryStationery, backgroundColor: '#FFF0C3', borderColor: '#FFE082' },
  { id: '9', name: 'Kitchen Appliances', productCountText: '30+ kitchen appliances', image: Images.categoryKitchen, backgroundColor: '#FEE0FF', borderColor: '#FDB2FF' },
  { id: '10', name: 'Baby     Care', productCountText: '45+ Baby care products', image: Images.categoryBabyCare, backgroundColor: '#F5E4FF', borderColor: '#E5BAFF' },
  { id: '11', name: 'Tea, Coffee & More', productCountText: '30+ Tea & Coffee', image: Images.categoryTeaCoffee, backgroundColor: '#009EBE2B', borderColor: '#04A4CF57' },
  { id: '12', name: 'Packaged Food', productCountText: '45+ Packaged Foods', image: Images.categoryPackagedFood, backgroundColor: '#E5FFE2', borderColor: '#B1FFAB' },
  { id: '13', name: 'Cold Drinks & Juices', productCountText: '30+ Cold Drinks & Juices', image: Images.categoryColdDrinks, backgroundColor: '#FFF0C3', borderColor: '#FFE082' },
  { id: '14', name: 'Pharmacy & Wellness', productCountText: '45+ Pharmacy products', image: Images.categoryPharmacy, backgroundColor: '#FEE0FF', borderColor: '#FDB2FF' },
];
