import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Theme } from '../../theme';
import { Images } from '../../assets/images';
import { Product } from '../../types';
import { calculateDiscountPercentage, formatPrice } from '../../utils/price';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
  onAdd: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, onAdd }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        {product.image ? (
          <Image source={product.image} style={styles.productImage} resizeMode="cover" />
        ) : (
          <Image source={Images.productPlaceholder} style={styles.productImage} resizeMode="cover" />
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
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    ...Theme.typography.caption,
    color: Theme.colors.white,
    fontWeight: '700',
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
    marginVertical: 4,
    height: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    ...Theme.typography.caption,
    color: Theme.colors.white,
    fontWeight: '700',
  },
});
