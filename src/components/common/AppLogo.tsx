import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { Images } from '../../assets/images';

interface AppLogoProps {
  /** Optional style for the logo row container */
  style?: ViewStyle;
  /** Size variant: 'small' (default, as-is), 'large', 'hero' for splash */
  size?: 'small' | 'large' | 'hero';
  /** Override basket width and height (square). When set, overrides preset. */
  basketSize?: number;
  /** Override logo width. When set, overrides preset. */
  logoWidth?: number;
  /** Override logo height. When set, overrides preset. */
  logoHeight?: number;
  /** Override separator height. When set, overrides preset. */
  separatorHeight?: number;
  /** Override separator width. When set, overrides preset. */
  separatorWidth?: number;
  /** Override horizontal margin between basket/separator/logo. When set, overrides preset. */
  separatorMarginHorizontal?: number;
}

const SIZES = {
  small: {
    basket: { width: 35, height: 35 },
    separator: { height: 25, marginHorizontal: 10, width: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)' as const },
    logo: { width: 120, height: 35 },
  },
  large: {
    basket: { width: 48, height: 48 },
    separator: { height: 32, marginHorizontal: 12, width: 1, backgroundColor: 'rgba(255, 255, 255, 0.4)' as const },
    logo: { width: 160, height: 48 },
  },
  hero: {
    basket: { width: 55, height: 55 },
    separator: { height: 45, marginHorizontal: 15, width: 2, backgroundColor: '#FFFFFF' as const },
    logo: { width: 200, height: 55 },
  },
};

export const AppLogo: React.FC<AppLogoProps> = ({
  style,
  size = 'small',
  basketSize,
  logoWidth,
  logoHeight,
  separatorHeight,
  separatorWidth,
  separatorMarginHorizontal,
}) => {
  const s = SIZES[size];
  const basketW = basketSize ?? s.basket.width;
  const basketH = basketSize ?? s.basket.height;
  const logoW = logoWidth ?? s.logo.width;
  const logoH = logoHeight ?? s.logo.height;
  const sepH = separatorHeight ?? s.separator.height;
  const sepW = separatorWidth ?? s.separator.width;
  const sepMargin = separatorMarginHorizontal ?? s.separator.marginHorizontal;

  const separatorStyle = [
    styles.separator,
    { height: sepH, marginHorizontal: sepMargin, width: sepW, backgroundColor: s.separator.backgroundColor },
  ];

  return (
    <View style={[styles.row, style]}>
      <Image
        source={Images.shoppingBasket}
        style={{ width: basketW, height: basketH }}
        resizeMode="contain"
      />
      <View style={separatorStyle} />
      <Image
        source={Images.logo}
        style={{ width: logoW, height: logoH }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  separator: {},
});
