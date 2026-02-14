import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Routes } from '../../navigation/routes';
import { ProductCard } from '../../components/product/ProductCard';
import { Theme } from '../../theme';
import { MOCK_PRODUCTS } from '../../constants/products';
import { Product } from '../../types';

export const CategoryListScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const categoryName = route.params?.categoryName || 'Category';
  
  // Filter products by category if needed
  const products: Product[] = MOCK_PRODUCTS;

  return (
    <ScreenContainer>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Filter and Sort */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
      </View>

      {/* Products Grid */}
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productGrid}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.l,
    paddingTop: Theme.spacing.m,
    paddingBottom: Theme.spacing.s,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 24,
    color: Theme.colors.text,
  },
  headerTitle: {
    ...Theme.typography.h2,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.l,
    marginBottom: Theme.spacing.m,
    gap: Theme.spacing.s,
  },
  filterButton: {
    flex: 1,
    height: 40,
    backgroundColor: Theme.colors.surface,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  filterText: {
    ...Theme.typography.bodyMedium,
    fontWeight: '600',
    color: Theme.colors.text,
  },
  sortButton: {
    flex: 1,
    height: 40,
    backgroundColor: Theme.colors.surface,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  sortText: {
    ...Theme.typography.bodyMedium,
    fontWeight: '600',
    color: Theme.colors.text,
  },
  productGrid: {
    paddingHorizontal: Theme.spacing.l,
    paddingBottom: Theme.spacing.xl,
  },
});
