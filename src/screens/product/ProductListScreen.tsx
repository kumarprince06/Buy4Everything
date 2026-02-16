import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Routes } from '../../navigation/routes';
import { ProductCard } from '../../components/product/ProductCard';
import { Theme } from '../../theme';
import { MOCK_PRODUCTS, FRUITS_VEGETABLES_PRODUCTS } from '../../constants/products';
import { Product } from '../../types';
import { Images } from '../../assets/images';
import { scale } from '../../utils/scale';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const H_PADDING = 24;
const COLUMN_GAP = 8;
/** Figma: three-column product grid */
const CARD_WIDTH = (SCREEN_WIDTH - H_PADDING * 2 - COLUMN_GAP * 2) / 3;

/** Filter chips for Fruits & Vegetables (design: Banana, Apple, Pooja Flowers, etc.) */
const FILTER_CHIPS = [
  { id: 'banana', label: 'Banana', emoji: Images.productBanana },
  { id: 'apple', label: 'Apple', emoji: Images.productApple },
  { id: 'pooja', label: 'Pooja Flowers', emoji: Images.productPoojaFlowers },
  { id: 'mango', label: 'Mango', emoji: Images.productMango },
  { id: 'tomato', label: 'Tomato', emoji: Images.productTomato },
  { id: 'onion', label: 'Onion', emoji: Images.productOnion },
  { id: 'potato', label: 'Potato', emoji: Images.productRedPotato },
];

export const ProductListScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const categoryName = route.params?.categoryName || 'Category';
  const [activeChipIds, setActiveChipIds] = useState<Set<string>>(new Set());

  const allProducts: Product[] = useMemo(() => {
    if (categoryName === 'Fruits & Vegetables') {
      return FRUITS_VEGETABLES_PRODUCTS;
    }
    return MOCK_PRODUCTS;
  }, [categoryName]);

  /** Filtered data: jab filter/chip select hoga, app navigator ke niche yehi dikhega */
  const products = useMemo(() => {
    if (activeChipIds.size === 0) return allProducts;
    const chipLabels = Array.from(activeChipIds).map((id) =>
      FILTER_CHIPS.find((c) => c.id === id)?.label.toLowerCase() ?? ''
    );
    const filtered = allProducts.filter((p) =>
      chipLabels.some((label) => p.name.toLowerCase().includes(label))
    );
    return filtered.length > 0 ? filtered : allProducts;
  }, [allProducts, activeChipIds]);

  const toggleChip = (id: string) => {
    setActiveChipIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <ScreenContainer safeAreaEdges={['left', 'right']}>
      {/* No top safe area – header is in stack above, so no extra gap below header */}
      {/* Figma: Sirf ek header (App Navigator) – search/filter wahi pe. Niche filter chips + filtered data. */}
      {/* Filter chips – inpe tap karne se niche wala list filter ho jata hai */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
        style={styles.chipsScroll}
      >
        {FILTER_CHIPS.map((chip) => {
          const isActive = activeChipIds.has(chip.id);
          return (
            <TouchableOpacity
              key={chip.id}
              style={[styles.chip, isActive && styles.chipActive]}
              onPress={() => toggleChip(chip.id)}
              activeOpacity={0.8}
            >
              <View style={styles.chipIconWrap}>
                <Image source={chip.emoji} style={styles.chipIcon} resizeMode="contain" />
              </View>
              <Text style={[styles.chipLabel, isActive && styles.chipLabelActive]} numberOfLines={1}>
                {chip.label}
              </Text>
              {isActive ? (
                <View style={styles.chipRemoveWrap}>
                  <Text style={styles.chipRemove}>×</Text>
                </View>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Figma: three-column product grid */}
      <FlatList
        data={products}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productGrid}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            variant="grid"
            cardWidth={CARD_WIDTH}
            onPress={() => navigation.navigate(Routes.PRODUCT_DETAILS, { product: item })}
            onAdd={() => {}}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  chipsScroll: {
    maxHeight: scale(52),
    marginTop: scale(15),
    marginBottom: Theme.spacing.s,
  },
  chipsContainer: {
    paddingHorizontal: Theme.spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scale(5),
    paddingBottom: scale(6),
    gap: Theme.spacing.s,
  },
  /** Figma: pill-shaped filter chips – more height, icon + label + cross aligned */
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    borderRadius: scale(10),
    backgroundColor: Theme.colors.chipBackground,
    borderWidth: scale(1),
    borderColor: Theme.colors.productCardBorder,
    minHeight: scale(44),
    height: scale(44),
  },
  chipActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.productCardBorder,
  },
  chipIconWrap: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(4),
    overflow: 'hidden',
  },
  chipIcon: {
    width: scale(30),
    height: scale(30),
  },
  chipLabel: {
    ...Theme.typography.caption,
    fontSize: scale(13),
    fontWeight: '500',
    color: Theme.colors.text,
    maxWidth: scale(90),
    lineHeight: scale(18),
    includeFontPadding: false,
  },
  chipLabelActive: {
    color: Theme.colors.white,
  },
  chipRemoveWrap: {
    width: scale(20),
    height: scale(20),
    marginLeft: scale(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipRemove: {
    fontSize: scale(18),
    color: Theme.colors.white,
    fontWeight: '700',
    lineHeight: scale(20),
    includeFontPadding: false,
  },
  productGrid: {
    paddingHorizontal: Theme.spacing.l,
    paddingBottom: Theme.spacing.xl,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: scale(0),
  },
});
