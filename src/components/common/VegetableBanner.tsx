import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Theme } from '../../theme';
import { scale } from '../../utils/scale';

interface VegetableBannerProps {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
}

export const VegetableBanner: React.FC<VegetableBannerProps> = ({
  title,
  subtitle,
  image,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.activeDot]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.l,
    marginBottom: Theme.spacing.m,
    height: scale(120),
    borderRadius: scale(16),
    backgroundColor: Theme.colors.white,
    flexDirection: 'row',
    padding: Theme.spacing.l,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  imageContainer: {
    width: scale(100),
    height: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: Theme.spacing.m,
  },
  title: {
    ...Theme.typography.h2,
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    ...Theme.typography.bodyMedium,
    color: Theme.colors.primary,
    fontWeight: '600',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: scale(12),
    left: '50%',
    transform: [{ translateX: scale(-20) }],
    flexDirection: 'row',
    gap: scale(6),
  },
  dot: {
    width: scale(6),
    height: scale(6),
    borderRadius: scale(3),
    backgroundColor: Theme.colors.border,
  },
  activeDot: {
    backgroundColor: Theme.colors.textSecondary,
  },
});
