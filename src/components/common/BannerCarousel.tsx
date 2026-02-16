import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, ImageSourcePropType } from 'react-native';
import { Theme } from '../../theme';
import { scale, moderateScale } from '../../utils/scale';

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
const PEEK = Theme.spacing.m;
const CARD_WIDTH = SCREEN_WIDTH - PEEK * 2;
const ITEM_WIDTH = CARD_WIDTH;
const PADDING_HORIZONTAL = PEEK;
const AUTO_PLAY_INTERVAL_MS = 4000;

export const BannerCarousel: React.FC<BannerCarouselProps> = ({
  banners,
  onBannerPress,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const activeIndexRef = useRef(0);

  activeIndexRef.current = activeIndex;

  useEffect(() => {
    if (banners.length <= 1) return undefined;
    const interval = setInterval(() => {
      const next = (activeIndexRef.current + 1) % banners.length;
      activeIndexRef.current = next;
      setActiveIndex(next);
      scrollViewRef.current?.scrollTo({
        x: next * ITEM_WIDTH,
        animated: true,
      });
    }, AUTO_PLAY_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round((scrollPosition - PADDING_HORIZONTAL) / ITEM_WIDTH);
    const clamped = Math.max(0, Math.min(index, banners.length - 1));
    activeIndexRef.current = clamped;
    setActiveIndex(clamped);
  };

  const ACTIVE_SCALE = 1;
  const INACTIVE_SCALE = 0.88;

  const renderBanner = (banner: Banner, index: number) => {
    const isActive = index === activeIndex;
    const scale = isActive ? ACTIVE_SCALE : INACTIVE_SCALE;
    return (
      <View
        key={banner.id}
        style={[
          styles.bannerWrapper,
          { width: ITEM_WIDTH },
        ]}
      >
        <View
          style={[
            styles.bannerContainer,
            { width: CARD_WIDTH },
            { transform: [{ scale }] },
          ]}
        >
          <View style={[styles.banner, { backgroundColor: banner.backgroundColor || Theme.colors.categoryBg.green }]}>
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
      </View>
    );
  };

  const snapOffsets = banners.map((_, i) => i * ITEM_WIDTH);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToOffsets={snapOffsets}
        decelerationRate="fast"
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingLeft: PADDING_HORIZONTAL,
            paddingRight: PADDING_HORIZONTAL,
          },
        ]}
      >
        {banners.map((banner, index) => renderBanner(banner, index))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    marginBottom: Theme.spacing.m,
  },
  scrollContent: {
    flexGrow: 0,
  },
  bannerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerContainer: {},
  banner: {
    height: scale(180),
    borderRadius: scale(16),
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
    fontSize: moderateScale(28),
    fontWeight: '700',
    width: '80%',
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    ...Theme.typography.bodyLarge,
    fontSize: moderateScale(16),
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.m,
  },
  button: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.l,
    paddingVertical: Theme.spacing.s,
    borderRadius: scale(8),
    alignSelf: 'flex-start',
  },
  buttonText: {
    ...Theme.typography.bodyMedium,
    fontWeight: '600',
    color: Theme.colors.white,
  },
  imageContainer: {
    position: 'absolute',
    right: scale(-30),
    bottom: scale(-20),
    width: scale(200),
    height: scale(200),
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
