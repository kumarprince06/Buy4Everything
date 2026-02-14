/**
 * CityBestSellerCard.tsx
 *
 * Product card used in the "City Best Seller" section on the Home screen.
 * Design follows Figma: border only around the product image area; product details
 * (name, price, ADD button) sit outside the border on a plain background.
 *
 * Features:
 * - Image area: bordered box with full product image (contain), optional NEW tag image or % OFF badge
 * - Details area: product name (2 lines max), current price, original price (strikethrough), ADD button
 * - ADD button is on the same row as the price (right-aligned)
 *
 * Used with: CITY_BEST_SELLER product list from constants/products.ts
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Theme } from '../../theme';
import { Images } from '../../assets/images';
import { Icons } from '../../assets/icons';
import { Product } from '../../types';
import { formatPrice } from '../../utils/price';

/** Props for the City Best Seller product card */
interface CityBestSellerCardProps {
  product: Product;
  onPress: () => void;
  onAdd: () => void;
}

export const CityBestSellerCard: React.FC<CityBestSellerCardProps> = ({ product, onPress, onAdd }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity(prev => prev + 1);
    onAdd();
  };

  const handleDelete = () => setQuantity(0);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.cardInner}>
        {/* Image area: border only here; image fully visible with contain */}
        <View style={styles.imageContainer}>
          {product.image ? (
            <Image source={product.image} style={styles.productImage} resizeMode="contain" />
          ) : (
            <Image source={Images.productPlaceholder} style={styles.productImage} resizeMode="contain" />
          )}
          {product.isNew && (
            <Image source={Images.newTag} style={styles.newTagImage} resizeMode="contain" />
          )}
          {product.discountPercentage && !product.isNew && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discountPercentage}% OFF</Text>
            </View>
          )}
        </View>
        {/* Details outside border: name, price row (price + ADD or quantity control on same row) */}
        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
          <View style={styles.priceRow}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{formatPrice(product.price)}</Text>
              {product.originalPrice && (
                <Text style={styles.originalPrice}>{formatPrice(product.originalPrice)}</Text>
              )}
            </View>
            {quantity === 0 ? (
              <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                <Text style={styles.addButtonText}>ADD</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.quantityControl}>
                <TouchableOpacity style={styles.quantityControlBtn} onPress={handleDelete}>
                  <Image source={Icons.delete} style={styles.quantityControlIcon} resizeMode="contain" />
                </TouchableOpacity>
                <Text style={styles.quantityControlNumber}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityControlBtn} onPress={handleAdd}>
                  <Image source={Icons.plus} style={styles.quantityControlIcon} resizeMode="contain" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  /** Outer touchable; fixed width for horizontal list */
  container: {
    width: 160,
    marginRight: Theme.spacing.m,
  },
  /** Card content: no border; details sit below image */
  cardInner: {
    backgroundColor: Theme.colors.white,
  },
  /** Bordered area: only the image has border; image is fully visible (contain) */
  imageContainer: {
    width: '100%',
    height: 150,
    backgroundColor: Theme.colors.cardBackgroundMint,
    position: 'relative',
    borderWidth: 1,
    borderColor: Theme.colors.cardBorderColor,
    borderRadius: 20,
    overflow: 'hidden',
  },
  productImage: {
    width: '80%',
    height: '80%',
    objectFit: 'contain',
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  /** NEW badge image overlay (when product.isNew is true) */
  newTagImage: {
    position: 'absolute',
    top: 0,
    left: -10,
    width: 50,
    height: 30,
  },
  /** Red badge for discount percentage (e.g. 25% OFF) */
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    ...Theme.typography.caption,
    color: Theme.colors.white,
    fontWeight: '700',
    fontSize: 10,
  },
  /** Product name, prices, and ADD button (outside image border) */
  infoContainer: {
    padding: Theme.spacing.s,
  },
  name: {
    ...Theme.typography.bodySmall,
    fontSize: 12,
    fontWeight: '500',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
    minHeight: 32,
  },
  /** Price and ADD button on same row (Figma) */
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Theme.spacing.xs,
    flexWrap: 'nowrap',
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    minWidth: 0,
  },
  price: {
    ...Theme.typography.bodyMedium,
    fontWeight: '700',
    fontSize: 16,
    color: Theme.colors.text,
  },
  originalPrice: {
    fontSize: 13,
    color: Theme.colors.textSecondary,
    textDecorationLine: 'line-through',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 6,
    paddingHorizontal: Theme.spacing.m,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  addButtonText: {
    fontSize: 12,
    color: Theme.colors.white,
    fontWeight: '700',
  },
  /** Quantity control: delete | number | plus (replaces ADD when item in cart) */
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.primary,
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 6,
    gap: 6,
    flexShrink: 0,
  },
  quantityControlBtn: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityControlIcon: {
    width: 14,
    height: 14,
    tintColor: Theme.colors.white,
  },
  quantityControlNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: Theme.colors.white,
    minWidth: 16,
    textAlign: 'center',
  },
});
