/**
 * BestsellerCard.tsx
 *
 * Reusable product card used in "Bestsellers" and "Shop by Offer" horizontal lists on the Home screen.
 * Shows product image (with optional discount badge), name, star rating (if present), and price.
 * Includes a cart icon button overlay on the image for add-to-cart.
 *
 * Used with: BESTSELLERS and SHOP_BY_OFFER from constants/products.ts
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Theme } from '../../theme';
import { Images } from '../../assets/images';
import { Product } from '../../types';
import { formatPrice } from '../../utils/price';
import { scale, moderateScale } from '../../utils/scale';
import { Icons } from '../../assets/icons';

/** Props for the Bestseller/Shop-by-Offer product card */
interface BestsellerCardProps {
  product: Product;
  onPress: () => void;
  onAdd: () => void;
}

export const BestsellerCard: React.FC<BestsellerCardProps> = ({ product, onPress, onAdd }) => {
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    setQuantity(prev => prev + 1);
    onAdd();
  };

  const handleRemove = () => {
    if (quantity > 0) setQuantity(prev => prev - 1);
  };

  const handleDelete = () => setQuantity(0);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        {product.image ? (
          <Image source={product.image} style={styles.productImage} resizeMode="contain" />
        ) : (
          <Image source={Images.productPlaceholder} style={styles.productImage} resizeMode="cover" />
        )}
        {product.discountAmount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>OFF ₹{product.discountAmount}</Text>
          </View>
        )}
        {quantity === 0 ? (
          <TouchableOpacity style={styles.cartButton} onPress={handleAdd}>
            <Image source={Icons.tabCart} style={styles.cartIcon} resizeMode="contain" />
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
  /** Card wrapper; width scales with screen for horizontal scroll */
  container: {
    width: scale(140),
    backgroundColor: Theme.colors.white,
    borderRadius: scale(12),
    marginRight: Theme.spacing.m,
    overflow: 'hidden',
  },
  /** Image area; discount badge and cart button overlay here */
  imageContainer: {
    height: scale(150),
    backgroundColor: Theme.colors.surfaceLight,
    position: 'relative',
  },
  productImage: {
    width: '75%',
    height: '75%',
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
    backgroundColor: Theme.colors.secondary,
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(6),
  },
  discountText: {
    ...Theme.typography.caption,
    color: Theme.colors.black,
    fontWeight: '700',
    fontSize: moderateScale(10),
  },
  cartButton: {
    position: 'absolute',
    bottom: scale(6),
    right: scale(6),
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  /** Quantity control pill: delete | number | plus (when item added to cart) */
  quantityControl: {
    position: 'absolute',
    bottom: scale(6),
    right: scale(6),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.primary,
    borderRadius: scale(20),
    paddingVertical: scale(4),
    paddingHorizontal: scale(6),
    gap: scale(8),
  },
  quantityControlBtn: {
    padding: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityControlIcon: {
    width: scale(16),
    height: scale(16),
    tintColor: Theme.colors.white,
  },
  quantityControlNumber: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: Theme.colors.white,
    minWidth: scale(18),
    textAlign: 'center',
  },
  /** Name, rating, price below image */
  infoContainer: {
    padding: Theme.spacing.s,
  },
  productName: {
    ...Theme.typography.bodyMedium,
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Theme.colors.text,
    marginBottom: scale(4),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(4),
    gap: scale(4),
  },
  starIcon: {
    width: scale(14),
    height: scale(14),
    tintColor: Theme.colors.secondary,
  },
  ratingText: {
    ...Theme.typography.caption,
    fontSize: moderateScale(11),
    color: Theme.colors.textSecondary,
  },
  price: {
    ...Theme.typography.bodyMedium,
    fontWeight: '700',
    color: Theme.colors.text,
    fontSize: moderateScale(16),
  },
  cartIcon: {
    width: scale(18),
    height: scale(18),
    tintColor: Theme.colors.white,
  },
});
