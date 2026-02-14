import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Theme } from '../../theme';
import { Images } from '../../assets/images';
import { Product } from '../../types';
import { formatPrice } from '../../utils/price';

interface CityBestSellerCardProps {
  product: Product;
  onPress: () => void;
  onAdd: () => void;
}

export const CityBestSellerCard: React.FC<CityBestSellerCardProps> = ({ product, onPress, onAdd }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        {product.image ? (
          <Image source={product.image} style={styles.productImage} resizeMode="cover" />
        ) : (
          <Image source={Images.productPlaceholder} style={styles.productImage} resizeMode="cover" />
        )}
        {product.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
        {product.discountPercentage && !product.isNew && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discountPercentage}% OFF</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>{formatPrice(product.originalPrice)}</Text>
          )}
        </View>
        <TouchableOpacity style={styles.addButton} onPress={onAdd}>
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginRight: Theme.spacing.m,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 120,
    backgroundColor: '#F5F5F5',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newBadgeText: {
    ...Theme.typography.caption,
    color: Theme.colors.white,
    fontWeight: '700',
    fontSize: 10,
  },
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
  infoContainer: {
    padding: Theme.spacing.s,
  },
  name: {
    ...Theme.typography.bodySmall,
    fontWeight: '500',
    marginBottom: Theme.spacing.xs,
    minHeight: 32,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
    marginBottom: Theme.spacing.xs,
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
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    ...Theme.typography.caption,
    color: Theme.colors.white,
    fontWeight: '700',
  },
});
