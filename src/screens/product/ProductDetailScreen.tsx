/**
 * ProductDetailScreen.tsx
 * Single Product screen: full-width image, overlay back/search, white card with
 * name, rating, delivery, price, tabs (About / Product Details / Seller Details),
 * description, Similar Products, and fixed bottom bar (quantity + Add To Cart).
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '../../theme';
import { Icons } from '../../assets/icons';
import { Product } from '../../types';
import { formatPrice } from '../../utils/price';
import { scale, moderateScale } from '../../utils/scale';
import { Images } from '../../assets/images';
import {
  FRUITS_VEGETABLES_PRODUCTS,
  CITY_BEST_SELLER,
} from '../../constants/products';
import { ProductCard } from '../../components/product/ProductCard';
import { CityBestSellerCard } from '../../components/product/CityBestSellerCard';
import { Routes } from '../../navigation/routes';

const DEFAULT_DESCRIPTION =
  'Hybrid tomatoes are a modern agricultural marvel, blending traditional farming wisdom with innovative techniques. These tomatoes, meticulously bred for resilience and yield, offer a perfect balance of flavour and nutrition.';

function formatReviewCount(count?: number): string {
  if (count == null || count < 1000) return count ? `${count}` : '0';
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}m`;
  return `${(count / 1000).toFixed(0)}k`;
}

type TabKey = 'about' | 'details' | 'seller';

export const ProductDetailScreen = ({ route, navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const product: Product = route.params?.product ?? {
    id: 'fv3',
    name: 'fresho! Tomato - Green (Loose), 1 kg',
    price: 218.08,
    originalPrice: 288.08,
    weight: '500gm',
    image: Images.productTomato,
    categoryId: '1',
    rating: 4.8,
    reviewCount: 2845000,
    discountAmount: 70,
    description: DEFAULT_DESCRIPTION,
  };

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>('about');
  const [quantity, setQuantity] = useState(1);
  const [expandedDescription, setExpandedDescription] = useState(false);

  const similarProducts = FRUITS_VEGETABLES_PRODUCTS.filter(
    p => p.id !== product.id,
  ).slice(0, 6);
  const cardWidth = scale(140);
  const imageHeight = width * 0.75;

  const descriptionText = product.description ?? DEFAULT_DESCRIPTION;
  const shortDescription = descriptionText.slice(0, 120);
  const showReadMore = descriptionText.length > 120 && !expandedDescription;

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product image with overlay buttons */}
        <View
          style={[
            styles.imageWrap,
            { paddingTop: insets.top, height: imageHeight + insets.top },
          ]}
        >
          <Image
            source={product.image}
            style={[styles.productImage, { height: imageHeight }]}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={[styles.overlayButton, styles.backButton]}
            onPress={() => navigation.goBack()}
            activeOpacity={0.9}
          >
            <Image
              source={Icons.arrowBack}
              style={styles.overlayIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.overlayButton, styles.searchButton]}
            activeOpacity={0.9}
          >
            <Image
              source={Icons.search}
              style={styles.overlayIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View style={styles.carouselDots}>
            {[0, 1, 2].map(i => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === carouselIndex ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* White card */}
        <View style={styles.card}>
          <Text style={styles.productName}>{product.name}</Text>
          {product.weight ? (
            <Text style={styles.weight}>{product.weight}</Text>
          ) : null}

          {/* Rating & delivery row */}
          <View style={styles.ratingDeliveryRow}>
            {product.rating != null && (
              <>
                <View style={styles.starRow}>
                  <Image
                    source={Icons.star}
                    style={styles.starIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.ratingText}>
                    {product.rating} ({formatReviewCount(product.reviewCount)})
                  </Text>
                </View>
                <View style={styles.verticalDivider} />
              </>
            )}
            <View style={styles.deliveryItem}>
              <Image
                source={Icons.time}
                style={[
                  styles.deliveryIcon,
                  { tintColor: Theme.colors.deliveryTime },
                ]}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.deliveryText,
                  { color: Theme.colors.deliveryTime },
                ]}
              >
                30 minutes Delivery
              </Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.deliveryItem}>
              <View style={styles.truckDot} />
              <Text
                style={[styles.deliveryText, { color: Theme.colors.primary }]}
              >
                Free Delivery
              </Text>
            </View>
          </View>

          {/* Price row: current price, original (strikethrough) when discounted, OFF badge */}
          {(() => {
            const hasDiscount =
              (product.originalPrice != null &&
                product.originalPrice > product.price) ||
              (product.discountAmount != null && product.discountAmount > 0);
            const originalPrice =
              product.originalPrice ??
              (product.discountAmount != null
                ? product.price + product.discountAmount
                : null);
            const offAmount =
              product.discountAmount ??
              (originalPrice != null
                ? Math.round(originalPrice - product.price)
                : 0);
            return (
              <View style={styles.priceRow}>
                <View style={styles.priceBlock}>
                  <Text style={styles.currentPrice}>
                    {formatPrice(product.price)}
                  </Text>
                  {hasDiscount && originalPrice != null && (
                    <Text style={styles.originalPrice}>
                      {formatPrice(originalPrice)}
                    </Text>
                  )}
                  {hasDiscount && offAmount > 0 && (
                    <View style={styles.offBadge}>
                      <Text style={styles.offBadgeText}>OFF ₹{offAmount}</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })()}

          {/* Tabs – underline only as wide as the label text */}
          <View style={styles.tabBar}>
            {(['about', 'details', 'seller'] as const).map((key, index) => (
              <TouchableOpacity
                key={key}
                style={[styles.tab, index > 0 && styles.tabDivider]}
                onPress={() => setActiveTab(key)}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.tabLabelWrap,
                    activeTab === key && styles.tabLabelWrapActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === key && styles.tabTextActive,
                    ]}
                  >
                    {key === 'about'
                      ? 'About'
                      : key === 'details'
                      ? 'Product Details'
                      : 'Seller Details'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab content: About */}
          {activeTab === 'about' && (
            <Text style={styles.description}>
              {showReadMore ? `${shortDescription}... ` : descriptionText}
              {showReadMore ? (
                <Text
                  style={styles.readMore}
                  onPress={() => setExpandedDescription(true)}
                >
                  Read More...
                </Text>
              ) : null}
            </Text>
          )}
          {activeTab === 'details' && (
            <Text style={styles.description}>
              Product specifications and details will appear here.
            </Text>
          )}
          {activeTab === 'seller' && (
            <Text style={styles.description}>
              Seller information will appear here.
            </Text>
          )}

          {/* Similar Products */}
          <View style={styles.similarSection}>
            <Text style={styles.similarTitle}>Similar Products</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.seeAll}>See all &gt;</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.similarList}
          >
            {similarProducts.map(p => (
              <View
                key={p.id}
                style={{ width: cardWidth, marginRight: scale(12) }}
              >
                <ProductCard
                  product={{ ...p, discountAmount: p.discountAmount ?? 20 }}
                  variant="grid"
                  cardWidth={cardWidth}
                  onPress={() =>
                    navigation.push(Routes.PRODUCT_DETAILS, { product: p })
                  }
                  onAdd={() => {}}
                />
              </View>
            ))}
          </ScrollView>

          {/* City Best Seller */}
          <View style={styles.similarSection}>
            <Text style={styles.similarTitle}>City Best Seller</Text>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.seeAll}>See all &gt;</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.similarList}
          >
            {CITY_BEST_SELLER.map(p => (
              <CityBestSellerCard
                key={p.id}
                product={p}
                onPress={() =>
                  navigation.push(Routes.PRODUCT_DETAILS, { product: p })
                }
                onAdd={() => {}}
              />
            ))}
          </ScrollView>
        </View>

        <View style={{ height: scale(80) }} />
      </ScrollView>

      {/* Bottom action bar */}
      <View
        style={[styles.bottomBar, { paddingBottom: insets.bottom + scale(12) }]}
      >
        <View style={styles.quantityWrap}>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => setQuantity(q => Math.max(1, q - 1))}
            activeOpacity={0.8}
          >
            <Text style={styles.quantityBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => setQuantity(q => q + 1)}
            activeOpacity={0.8}
          >
            <Text style={styles.quantityBtnText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addToCartButton} activeOpacity={0.85}>
          <Image
            source={Icons.tabCart}
            style={styles.addToCartIcon}
            resizeMode="contain"
          />
          <Text style={styles.addToCartText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 0,
  },
  imageWrap: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#F6F6F6',
    paddingBottom: scale(20),
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  overlayButton: {
    position: 'absolute',
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  backButton: {
    top: scale(56),
    left: scale(16),
  },
  searchButton: {
    top: scale(56),
    right: scale(16),
  },
  overlayIcon: {
    width: scale(22),
    height: scale(22),
    tintColor: Theme.colors.black,
  },
  carouselDots: {
    position: 'absolute',
    bottom: scale(12),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: scale(6),
  },
  dot: {
    width: scale(6),
    height: scale(6),
    borderRadius: 3,
    marginBottom: scale(10),
  },
  dotActive: {
    backgroundColor: Theme.colors.primary,
    width: scale(16),
  },
  dotInactive: {
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  card: {
    backgroundColor: Theme.colors.white,
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    marginTop: -scale(10),
    paddingHorizontal: Theme.spacing.l,
    paddingTop: Theme.spacing.l,
    paddingBottom: Theme.spacing.xl,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  productName: {
    ...Theme.typography.h1,
    color: Theme.colors.text,
    marginBottom: scale(4),
  },
  weight: {
    ...Theme.typography.bodyMedium,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.m,
  },
  ratingDeliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: Theme.spacing.m,
    gap: scale(4),
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: scale(16),
    height: scale(16),
    marginRight: scale(4),
    tintColor: Theme.colors.secondary,
  },
  ratingText: {
    ...Theme.typography.bodySmall,
    color: Theme.colors.text,
  },
  verticalDivider: {
    width: 1,
    height: scale(14),
    backgroundColor: Theme.colors.border,
    marginHorizontal: scale(8),
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryIcon: {
    width: scale(16),
    height: scale(16),
    marginRight: scale(4),
  },
  deliveryText: {
    ...Theme.typography.bodySmall,
  },
  truckDot: {
    width: scale(10),
    height: scale(10),
    borderRadius: 5,
    backgroundColor: Theme.colors.primary,
    marginRight: scale(6),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.l,
  },
  priceBlock: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: scale(8),
  },
  currentPrice: {
    ...Theme.typography.h2,
    color: Theme.colors.text,
  },
  originalPrice: {
    ...Theme.typography.bodyMedium,
    color: Theme.colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  offBadge: {
    backgroundColor: Theme.colors.badgeBackgroundColor,
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(12),
  },
  offBadgeText: {
    ...Theme.typography.bodySmall,
    color: Theme.colors.badgeTextColor,
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#D7FFD4',
    borderRadius: 0,
    paddingTop: scale(4),
    paddingBottom: 0,
    paddingHorizontal: 0,
    marginHorizontal: -Theme.spacing.l,
    marginBottom: Theme.spacing.m,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingTop: scale(12),
    paddingBottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tabLabelWrap: {
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    paddingBottom: scale(8),
  },
  tabLabelWrapActive: {
    borderBottomColor: Theme.colors.primary,
  },
  tabDivider: {
    borderLeftWidth: 1,
    borderLeftColor: '#8EFF86',
  },
  tabText: {
    ...Theme.typography.bodySmall,
    color: '#636262',
    fontWeight: '500',
    fontSize: moderateScale(14),
  },
  tabTextActive: {
    color: Theme.colors.primary,
    fontWeight: '600',
  },
  description: {
    ...Theme.typography.bodyMedium,
    color: Theme.colors.textSecondary,
    lineHeight: 22,
    marginBottom: Theme.spacing.l,
  },
  readMore: {
    color: Theme.colors.text,
    fontWeight: '600',
  },
  similarSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.m,
  },
  similarTitle: {
    ...Theme.typography.h3,
    color: Theme.colors.text,
  },
  seeAll: {
    ...Theme.typography.bodyMedium,
    color: Theme.colors.primary,
    fontWeight: '600',
  },
  similarList: {
    paddingRight: Theme.spacing.l,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.l,
    paddingTop: scale(12),
    backgroundColor: Theme.colors.white,
    shadowColor: '#0000001A',
    borderTopWidth: 1,
    borderTopColor: '#0000001A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 16,
  },
  quantityWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFD500',
    borderRadius: scale(12),
    backgroundColor: Theme.colors.white,
    padding: scale(6),
  },
  quantityBtn: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(22),
    backgroundColor: '#FFD500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityBtnText: {
    fontSize: moderateScale(22),
    fontWeight: '700',
    color: Theme.colors.black,
  },
  quantityValue: {
    ...Theme.typography.h3,
    minWidth: scale(36),
    textAlign: 'center',
    color: Theme.colors.black,
  },
  addToCartButton: {
    flex: 1,
    marginLeft: Theme.spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.colors.primary,
    borderRadius: scale(26),
    height: scale(52),
    gap: scale(8),
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  addToCartIcon: {
    width: scale(22),
    height: scale(22),
    tintColor: Theme.colors.white,
  },
  addToCartText: {
    ...Theme.typography.button,
    color: Theme.colors.white,
  },
});
