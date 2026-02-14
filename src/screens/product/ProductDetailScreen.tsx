import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { Theme } from '../../theme';
import { PrimaryButton } from '../../components/common/PrimaryButton';

export const ProductDetailScreen = ({ route, navigation }: any) => {
  const { product } = route.params || { product: { name: 'Fresh Banana', price: 45, weight: '1kg' } };

  return (
    <ScreenContainer scrollable>
      <View style={styles.imageContainer}>
        {/* Placeholder for Product Image */}
        <View style={styles.imagePlaceholder} />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.category}>Fresh Fruits</Text>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.weight}>{product.weight}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{product.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.qtyBtn}><Text style={styles.qtyBtnText}>-</Text></TouchableOpacity>
            <Text style={styles.qtyText}>1</Text>
            <TouchableOpacity style={styles.qtyBtn}><Text style={styles.qtyBtnText}>+</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Product Details</Text>
        <Text style={styles.description}>
          High quality fresh bananas sourced directly from farms. Rich in potassium and energy. 
          Perfect for a healthy snack or breakfast.
        </Text>

        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Shelf Life</Text>
            <Text style={styles.infoValue}>5 Days</Text>
        </View>
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sourced From</Text>
            <Text style={styles.infoValue}>Local Farms</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title="Add to Cart"
          onPress={() => {}}
          style={styles.addToCartBtn}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: 350,
    backgroundColor: '#F5F5F5',
    position: 'relative',
  },
  imagePlaceholder: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  backIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: Theme.spacing.l,
    backgroundColor: Theme.colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  category: {
    ...Theme.typography.bodySmall,
    color: Theme.colors.primary,
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    ...Theme.typography.h1,
    marginBottom: 4,
  },
  weight: {
    ...Theme.typography.bodyMedium,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.m,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.l,
  },
  price: {
    ...Theme.typography.h1,
    color: Theme.colors.text,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surface,
    borderRadius: 12,
    padding: 4,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  qtyBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  qtyText: {
    ...Theme.typography.bodyLarge,
    fontWeight: '700',
    marginHorizontal: 16,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.border,
    marginVertical: Theme.spacing.l,
  },
  sectionTitle: {
    ...Theme.typography.h3,
    marginBottom: Theme.spacing.s,
  },
  description: {
    ...Theme.typography.bodyMedium,
    color: Theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: Theme.spacing.l,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.s,
  },
  infoLabel: {
    ...Theme.typography.bodyMedium,
    color: Theme.colors.textSecondary,
  },
  infoValue: {
    ...Theme.typography.bodyMedium,
    fontWeight: '600',
  },
  footer: {
    padding: Theme.spacing.l,
    backgroundColor: Theme.colors.white,
  },
  addToCartBtn: {
    width: '100%',
  },
});
