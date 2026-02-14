import { Images } from '../assets/images';
import { Theme } from '../theme';

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  image: any;
  backgroundColor?: string;
}

export const MAIN_BANNERS: Banner[] = [
  {
    id: '1',
    title: 'Up to 30% offer',
    subtitle: 'Enjoy our big offer',
    buttonText: 'Shop Now',
    image: Images.shoppingBasket, // Shopping basket with fruits
    backgroundColor: '#E8F5E9', // Light green background
  },
  {
    id: '2',
    title: 'Special Offer',
    subtitle: 'On Fresh Products',
    buttonText: 'Shop Now',
    image: Images.productImage1,
    backgroundColor: '#E8F5E9',
  },
  {
    id: '3',
    title: 'Get Same Day Delivery',
    subtitle: 'On order above $50',
    buttonText: 'Shop Now',
    image: Images.productImage2,
    backgroundColor: '#E8F5E9',
  },
];
