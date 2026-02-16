import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '../../theme';
import { Images } from '../../assets/images';
import { scale } from '../../utils/scale';

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
    basket: { width: scale(35), height: scale(35) },
    separator: { height: scale(25), marginHorizontal: scale(10), width: 1, backgroundColor: Theme.colors.separatorLight as const },
    logo: { width: scale(120), height: scale(35) },
  },
  large: {
    basket: { width: scale(48), height: scale(48) },
    separator: { height: scale(32), marginHorizontal: scale(12), width: 1, backgroundColor: Theme.colors.separatorLight as const },
    logo: { width: scale(160), height: scale(48) },
  },
  hero: {
    basket: { width: scale(55), height: scale(55) },
    separator: { height: scale(45), marginHorizontal: scale(15), width: 2, backgroundColor: Theme.colors.white as const },
    logo: { width: scale(200), height: scale(55) },
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
