import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Theme } from '../../theme';

interface BannerCardProps {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  backgroundColor?: string;
}

export const BannerCard: React.FC<BannerCardProps> = ({
  title,
  subtitle,
  image,
  backgroundColor = Theme.colors.secondary,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 150,
    borderRadius: 16,
    marginRight: Theme.spacing.m,
    padding: Theme.spacing.l,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 1,
  },
  title: {
    ...Theme.typography.h1,
    color: Theme.colors.white,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    ...Theme.typography.bodyLarge,
    fontWeight: '600',
    color: Theme.colors.white,
  },
  imageContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
