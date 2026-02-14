import { Theme } from '../theme';
import { Category } from '../types';
import { Images } from '../assets/images';

export const CATEGORIES: Category[] = [
  { 
    id: '1', 
    name: 'Fruits', 
    color: Theme.colors.categoryBg.green,
    icon: Images.productImage2,
  },
  { 
    id: '2', 
    name: 'Milk & egg', 
    color: Theme.colors.categoryBg.orange,
    icon: Images.productImage1,
  },
  { 
    id: '3', 
    name: 'Beverages', 
    color: Theme.colors.categoryBg.blue,
    icon: Images.beverages,
  },
  { 
    id: '4', 
    name: 'Laundry', 
    color: Theme.colors.categoryBg.pink,
    icon: Images.laundary,
  },
  { 
    id: '5', 
    name: 'Vegetables', 
    color: Theme.colors.categoryBg.green,
    icon: Images.vegetables,
  },
];
