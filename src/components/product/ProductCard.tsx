/**
 * ProductCard.tsx
 *
 * Single product card used in lists and grids.
 * - variant="default": 2-column style (discount badge, weight on top, ADD button at bottom).
 * - variant="grid": 3-column category list style (circular add on image, name, weight, rating, price).
 */

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Theme } from '../../theme';
import { Images } from '../../assets/images';
import { Icons } from '../../assets/icons';
import { Product } from '../../types';
import { calculateDiscountPercentage, formatPrice } from '../../utils/price';
import { scale } from '../../utils/scale';

function formatReviewCount(count?: number): string {
  if (count == null || count < 1000) return count ? `${count}` : '0';
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}m`;
  return `${(count / 1000).toFixed(0)}k`;
}

export type ProductCardVariant = 'default' | 'grid';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAdd: () => void;
  /** 'default' = 2-col list card; 'grid' = 3-col category list (circular add, rating) */
  variant?: ProductCardVariant;
  /** Required when variant="grid" for 3-column layout */
  cardWidth?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAdd,
  variant = 'default',
  cardWidth,
}) => {
  if (variant === 'grid') {
    const width = cardWidth ?? 0;
    const imageHeight = width * 1.1;
    return (
      <TouchableOpacity
        style={[styles.container, styles.gridContainer, { width }]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <View style={[styles.imageContainer, { height: imageHeight }]}>
          {product.image ? (
            <Image source={product.image} style={styles.productImage} resizeMode="cover" />
          ) : (
            <Image source={Images.productPlaceholder} style={styles.productImage} resizeMode="cover" />
          )}
          <TouchableOpacity style={styles.addCircleButton} onPress={onAdd} activeOpacity={0.8}>
            <Image source={Icons.tabCart} style={styles.cartIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
          {product.weight ? <Text style={styles.weight}>{product.weight}</Text> : null}
          {product.rating != null && (
            <View style={styles.ratingRow}>
              <Image source={Icons.star} style={styles.starIcon} resizeMode="contain" />
              <Text style={styles.ratingText}>
                {product.rating}
                {product.reviewCount != null && (
                  <Text style={styles.reviewCount}> ({formatReviewCount(product.reviewCount)})</Text>
                )}
              </Text>
            </View>
          )}
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  // Default variant (2-column list)
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        {product.image ? (
          <Image source={product.image} style={styles.productImage} resizeMode="contain" />
        ) : (
          <Image source={Images.productPlaceholder} style={styles.productImage} resizeMode="contain" />
        )}
        {product.originalPrice && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {calculateDiscountPercentage(product.originalPrice, product.price)}% OFF
            </Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.weight}>{product.weight}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <View style={styles.footer}>
          <View>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>{formatPrice(product.originalPrice)}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.addButton} onPress={onAdd}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EBFFE9',
    marginRight: Theme.spacing.m,
    overflow: 'hidden',
  },
  gridContainer: {
    marginRight: 0,
    marginBottom: Theme.spacing.m,
    backgroundColor: '#FFFFFF',
    borderColor: '#EBFFE9',
  },
  imageContainer: {
    margin: Theme.spacing.xs,
    height: scale(120),
    backgroundColor: '#F6F6F6',
    position: 'relative',
    borderRadius: 12,
  },
  productImage: {
    width: '85%',
    height: '85%',
    objectFit: 'contain',
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  discountBadge: {
    position: 'absolute',
    top: scale(8),
    left: scale(8),
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
    borderRadius: scale(4),
  },
  discountText: {
    ...Theme.typography.caption,
    color: Theme.colors.white,
    fontWeight: '700',
    fontSize: scale(10),
  },
  addCircleButton: {
    position: 'absolute',
    bottom: scale(8),
    right: scale(8),
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    width: scale(20),
    height: scale(20),
    tintColor: Theme.colors.white,
  },
  infoContainer: {
    padding: Theme.spacing.s,
  },
  weight: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
  },
  name: {
    ...Theme.typography.bodyMedium,
    fontWeight: '600',
    marginVertical: scale(4),
    height: scale(40),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(4),
  },
  starIcon: {
    width: scale(14),
    height: scale(14),
    marginRight: scale(4),
    tintColor: Theme.colors.secondary,
  },
  ratingText: {
    ...Theme.typography.caption,
    color: Theme.colors.text,
  },
  reviewCount: {
    color: Theme.colors.textSecondary,
    fontWeight: '400',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(4),
  },
  price: {
    ...Theme.typography.bodyMedium,
    fontWeight: '700',
    color: Theme.colors.text,
  },
  originalPrice: {
    ...Theme.typography.caption,
    color: Theme.colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: scale(6),
  },
  addButtonText: {
    ...Theme.typography.caption,
    color: Theme.colors.white,
    fontWeight: '700',
    fontSize: scale(10),
  },
});
