/**
 * BestsellerCard.tsx
 *
 * Reusable product card used in "Bestsellers" and "Shop by Offer" horizontal lists on the Home screen.
 * Shows product image (with optional discount badge), name, star rating (if present), and price.
 * Includes a cart icon button overlay on the image for add-to-cart.
 *
 * Used with: BESTSELLERS and SHOP_BY_OFFER from constants/products.ts
 */

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Theme } from '../../theme';
import { Images } from '../../assets/images';
import { Product } from '../../types';
import { formatPrice } from '../../utils/price';
import { Icons } from '../../assets/icons';

/** Props for the Bestseller/Shop-by-Offer product card */
interface BestsellerCardProps {
  product: Product;
  onPress: () => void;
  onAdd: () => void;
}

export const BestsellerCard: React.FC<BestsellerCardProps> = ({ product, onPress, onAdd }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        {product.image ? (
          <Image source={product.image} style={styles.productImage} resizeMode="cover" />
        ) : (
          <Image source={Images.productPlaceholder} style={styles.productImage} resizeMode="cover" />
        )}
        {product.discountAmount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>OFF ₹{product.discountAmount}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.cartButton} onPress={onAdd}>
          <Image source={Icons.tabCart} style={styles.cartIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        {product.name ? (
          <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        ) : null}
        {product.rating && (
          <View style={styles.ratingContainer}>
            <Image source={Icons.star} style={styles.starIcon} resizeMode="contain" />
            <Text style={styles.ratingText}>
              {product.rating} {product.reviewCount && `(${product.reviewCount.toLocaleString()})`}
            </Text>
          </View>
        )}
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  /** Card wrapper; fixed width for horizontal scroll */
  container: {
    width: 140,
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    marginRight: Theme.spacing.m,
    overflow: 'hidden',
  },
  /** Image area; discount badge and cart button overlay here */
  imageContainer: {
    height: 140,
    backgroundColor: '#F5F5F5',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Theme.colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    ...Theme.typography.caption,
    color: Theme.colors.black,
    fontWeight: '700',
    fontSize: 10,
  },
  cartButton: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /** Name, rating, price below image */
  infoContainer: {
    padding: Theme.spacing.s,
  },
  productName: {
    ...Theme.typography.bodyMedium,
    fontSize: 16,
    fontWeight: '600',
    color: Theme.colors.text,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
  },
  starIcon: {
    width: 14,
    height: 14,
    tintColor: Theme.colors.secondary,
  },
  ratingText: {
    ...Theme.typography.caption,
    fontSize: 11,
    color: Theme.colors.textSecondary,
  },
  price: {
    ...Theme.typography.bodyMedium,
    fontWeight: '700',
    color: Theme.colors.text,
    fontSize: 16,
  },
  cartIcon: {
    width: 18,
    height: 18,
    tintColor: Theme.colors.white,
  },
});
