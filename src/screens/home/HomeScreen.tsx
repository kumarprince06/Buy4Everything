import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { ScreenContainer } from '../../components/common/ScreenContainer';
import { SearchBar } from '../../components/common/SearchBar';
import { AppTypeSelector } from '../../components/common/AppTypeSelector';
import { SectionHeader } from '../../components/common/SectionHeader';
import { BannerCarousel } from '../../components/common/BannerCarousel';
import { VegetableBanner } from '../../components/common/VegetableBanner';
import { BestsellerCard } from '../../components/product/BestsellerCard';
import { CityBestSellerCard } from '../../components/product/CityBestSellerCard';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../navigation/routes';
import { Theme } from '../../theme';
import { LocationSelectionModal } from '../../components/location/LocationSelectionModal';
import { Icons } from '../../assets/icons';
import { CATEGORIES } from '../../constants/categories';
import { BESTSELLERS, SHOP_BY_OFFER, CITY_BEST_SELLER } from '../../constants/products';
import { MAIN_BANNERS } from '../../constants/banners';
import { Images } from '../../assets/images';
import { useLocation } from '../../hooks/useLocation';

const TABS = [
  { id: 'grocery', label: 'Grocery' },
  { id: 'ecommerce', label: 'Ecommerce' },
];

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState('grocery');
  const {
    currentLocation,
    locationModalVisible,
    openLocationModal,
    closeLocationModal,
    updateLocation,
  } = useLocation();

  return (
    <ScreenContainer scrollable>
      {/* App Type Selector */}
      <AppTypeSelector
        tabs={TABS}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
      />

      {/* User Greeting and Location */}
      <View style={styles.userSection}>
        <Text style={styles.greeting}>Hi, Jhon</Text>
        <TouchableOpacity 
          style={styles.locationRow} 
          onPress={openLocationModal}
        >
          <Image source={Icons.location} style={styles.locationIcon} />
          <Text style={styles.locationText} numberOfLines={1}>
            {currentLocation}
          </Text>
          <Text style={styles.dropdown}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <SearchBar placeholder="Search anything" />

      {/* Main Promotional Banner Carousel */}
      <BannerCarousel
        banners={MAIN_BANNERS}
        onBannerPress={(banner) => {
          // Handle banner press
          console.log('Banner pressed:', banner);
        }}
      />

      {/* Categories */}
      <View style={styles.categorySection}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.categoryItem}
              onPress={() => navigation.navigate(Routes.CATEGORY_LIST, { categoryName: item.name })}
            >
              <View style={[styles.categoryCircle, { backgroundColor: item.color }]}>
                {item.icon && (
                  <Image 
                    source={item.icon} 
                    style={styles.categoryImage} 
                    resizeMode="cover"
                  />
                )}
              </View>
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Bestsellers */}
      <SectionHeader title="Bestsellers" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      >
        {BESTSELLERS.map((item) => (
          <BestsellerCard
            key={item.id}
            product={item}
            onPress={() => navigation.navigate(Routes.PRODUCT_DETAILS, { product: item })}
            onAdd={() => {}}
          />
        ))}
      </ScrollView>

      {/* Vegetable Banner */}
      <VegetableBanner
        title="Fresh Vegetables"
        subtitle="Get Up To 40% OFF"
        image={Images.productImage3}
      />

      {/* Shop by Offer */}
      <SectionHeader title="Shop by Offer" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      >
        {SHOP_BY_OFFER.map((item) => (
          <BestsellerCard
            key={item.id}
            product={item}
            onPress={() => navigation.navigate(Routes.PRODUCT_DETAILS, { product: item })}
            onAdd={() => {}}
          />
        ))}
      </ScrollView>

      {/* City Best Seller */}
      <SectionHeader title="City Best Seller" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      >
        {CITY_BEST_SELLER.map((item) => (
          <CityBestSellerCard
            key={item.id}
            product={item}
            onPress={() => navigation.navigate(Routes.PRODUCT_DETAILS, { product: item })}
            onAdd={() => {}}
          />
        ))}
      </ScrollView>

      <View style={{ height: 100 }} />

      <LocationSelectionModal
        visible={locationModalVisible}
        onClose={closeLocationModal}
        onConfirm={updateLocation}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  userSection: {
    paddingHorizontal: Theme.spacing.l,
    paddingTop: Theme.spacing.s,
    paddingBottom: Theme.spacing.xs,
  },
  greeting: {
    ...Theme.typography.h2,
    fontSize: 22,
    fontWeight: '700',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    tintColor: Theme.colors.textSecondary,
  },
  locationText: {
    ...Theme.typography.bodyMedium,
    color: Theme.colors.textSecondary,
    flex: 1,
  },
  dropdown: {
    marginLeft: 4,
    color: Theme.colors.textSecondary,
    fontSize: 12,
  },
  categorySection: {
    backgroundColor: Theme.colors.secondary,
    paddingVertical: Theme.spacing.m,
    marginBottom: Theme.spacing.m,
  },
  categoryList: {
    paddingHorizontal: Theme.spacing.l,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: Theme.spacing.m,
  },
  categoryCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: Theme.spacing.xs,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    ...Theme.typography.caption,
    fontWeight: '600',
    textAlign: 'center',
    width: 70,
    fontSize: 11,
  },
  productList: {
    paddingHorizontal: Theme.spacing.l,
    paddingBottom: Theme.spacing.m,
  },
});
