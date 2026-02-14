import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Theme } from '../../theme';
import { Images } from '../../assets/images';
import { Product } from '../../types';
import { formatPrice } from '../../utils/price';
import Icon from 'react-native-vector-icons/Ionicons';

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
          <Icon name="cart" size={18} color={Theme.colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        {product.rating && (
          <View style={styles.ratingContainer}>
            <Icon name="star" size={14} color={Theme.colors.secondary} />
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
  container: {
    width: 140,
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    marginRight: Theme.spacing.m,
    overflow: 'hidden',
  },
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
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: Theme.spacing.s,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 4,
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
});
