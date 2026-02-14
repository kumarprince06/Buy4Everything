import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, ImageSourcePropType } from 'react-native';
import { Theme } from '../../theme';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  image: ImageSourcePropType;
  backgroundColor?: string;
}

interface BannerCarouselProps {
  banners: Banner[];
  onBannerPress?: (banner: Banner) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - (Theme.spacing.l * 2);

export const BannerCarousel: React.FC<BannerCarouselProps> = ({
  banners,
  onBannerPress,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / BANNER_WIDTH);
    setActiveIndex(index);
  };

  const renderBanner = (banner: Banner, index: number) => (
    <View key={banner.id} style={[styles.bannerContainer, { width: BANNER_WIDTH }]}>
      <View style={[styles.banner, { backgroundColor: banner.backgroundColor || '#E8F5E9' }]}>
        <View style={styles.content}>
          <Text style={styles.title}>{banner.title}</Text>
          <Text style={styles.subtitle}>{banner.subtitle}</Text>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => onBannerPress?.(banner)}
          >
            <Text style={styles.buttonText}>{banner.buttonText}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image source={banner.image} style={styles.image} resizeMode="contain" />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {banners.map((banner, index) => renderBanner(banner, index))}
      </ScrollView>
      {banners.length > 1 && (
        <View style={styles.dotsContainer}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.m,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.l,
  },
  bannerContainer: {
    marginRight: Theme.spacing.m,
  },
  banner: {
    height: 180,
    borderRadius: 16,
    flexDirection: 'row',
    padding: Theme.spacing.l,
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 1,
  },
  title: {
    ...Theme.typography.h1,
    fontSize: 28,
    fontWeight: '700',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    ...Theme.typography.bodyLarge,
    fontSize: 16,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.m,
  },
  button: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.l,
    paddingVertical: Theme.spacing.s,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    ...Theme.typography.bodyMedium,
    fontWeight: '600',
    color: Theme.colors.white,
  },
  imageContainer: {
    position: 'absolute',
    right: -30,
    bottom: -20,
    width: 200,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Theme.spacing.s,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.border,
  },
  activeDot: {
    backgroundColor: Theme.colors.primary,
    width: 24,
  },
});
