import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
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

const TRENDING_PRODUCTS = BESTSELLERS;
import { MAIN_BANNERS } from '../../constants/banners';
import { Images } from '../../assets/images';
import { useLocation } from '../../hooks/useLocation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TABS = [
  { id: 'grocery', label: 'Grocery' },
  { id: 'ecommerce', label: 'Ecommerce' },
];

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('grocery');
  const {
    currentLocation,
    locationModalVisible,
    openLocationModal,
    closeLocationModal,
    updateLocation,
  } = useLocation();

  return (
    <ScreenContainer
      scrollable
      safeAreaEdges={['left', 'right', 'bottom']}
      statusBarColor={Theme.colors.primary}
      barStyle="light-content"
    >
      <StatusBar barStyle="light-content" backgroundColor={Theme.colors.primary} />
      {/* Green header – toggles, greeting, location, search (per Figma). No logo. */}
      <View style={[styles.greenHeader, { paddingTop: insets.top }]}>
        <AppTypeSelector
          tabs={TABS}
          activeTabId={activeTab}
          onTabChange={setActiveTab}
        />
        <View style={styles.userSection}>
          <Text style={styles.greeting}>Hi, <Text style={styles.greetingName}>Prince</Text></Text>
          <TouchableOpacity
            style={styles.locationRow}
            onPress={openLocationModal}
          >
            <Image
              source={Icons.locationPin}
              style={styles.locationPin}
              resizeMode="contain"
            />
            <View style={styles.locationTextAndIcon}>
              <Text style={styles.locationText} numberOfLines={1}>
                {currentLocation}
              </Text>
              <Image source={Icons.expandDown} style={styles.expandDownIcon} />
            </View>
          </TouchableOpacity>
        </View>
        <SearchBar placeholder="Search anything" variant="onDark" />
      </View>

      {/* Carousel overlaps green header (sits on top of curved bottom) */}
      <View style={styles.carouselOverlap}>
        <BannerCarousel
          banners={MAIN_BANNERS}
          onBannerPress={(banner) => {
            console.log('Banner pressed:', banner);
          }}
        />
      </View>

      {/* Categories – Figma: white circle with yellow inner + icon */}
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
              <View style={styles.categoryCircleOuter}>
                <View style={styles.categoryCircleInner}>
                  {item.icon && (
                    <Image 
                      source={item.icon} 
                      style={styles.categoryImage} 
                      resizeMode="contain"
                    />
                  )}
                </View>
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

      {/* Explore Trending Products */}
      <SectionHeader title="Explore Trending Products" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      >
        {TRENDING_PRODUCTS.map((item) => (
          <BestsellerCard
            key={item.id}
            product={item}
            onPress={() => navigation.navigate(Routes.PRODUCT_DETAILS, { product: item })}
            onAdd={() => {}}
          />
        ))}
      </ScrollView>

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
  greenHeader: {
    backgroundColor: Theme.colors.primary,
    paddingBottom: Theme.spacing.xl,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  userSection: {
    paddingHorizontal: Theme.spacing.l,
    paddingTop: Theme.spacing.s,
    paddingBottom: Theme.spacing.xs,
  },
  greeting: {
    ...Theme.typography.h2,
    fontSize: 22,
    fontWeight: '700',
    color: Theme.colors.white,
    marginBottom: Theme.spacing.xs,
  },
  greetingName: {
    fontWeight: '800',
    color: Theme.colors.secondary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
    tintColor: Theme.colors.primary,
  },
  locationTextAndIcon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minWidth: 0,
  },
  locationText: {
    ...Theme.typography.bodyMedium,
    color: Theme.colors.white,
    flexShrink: 1,
    flexGrow: 0,
    maxWidth: '100%',
    opacity: 0.95,
    minWidth: 0,
  },
  expandDownIcon: {
    width: 12,
    height: 12,
    tintColor: Theme.colors.white,
  },
  carouselOverlap: {
    marginTop: -Theme.spacing.xl,
    zIndex: 1,
  },
  categorySection: {
    backgroundColor: Theme.colors.categoriesSection,
    paddingVertical: Theme.spacing.l,
    marginBottom: Theme.spacing.s,
  },
  categoryList: {
    paddingHorizontal: Theme.spacing.l,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: Theme.spacing.l,
  },
  categoryCircleOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  categoryCircleInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    // backgroundColor: Theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  categoryImage: {
    width: 60,
    height: 60,
    opacity: 1,
    // No tintColor so category icons display in full color (Figma)
  },
  categoryName: {
    ...Theme.typography.caption,
    fontWeight: '600',
    textAlign: 'center',
    width: 72,
    fontSize: 11,
    color: Theme.colors.text,
  },
  productList: {
    paddingHorizontal: Theme.spacing.l,
    paddingBottom: Theme.spacing.m,
  },
  locationPin: {
    width: 18,
    height: 18,
    marginRight: 6,
    tintColor: Theme.colors.white,
  },
});
