import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Theme } from '../../theme';
import { scale, moderateScale } from '../../utils/scale';

interface MainBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  image: ImageSourcePropType;
  onButtonPress?: () => void;
}

export const MainBanner: React.FC<MainBannerProps> = ({
  title,
  subtitle,
  buttonText,
  image,
  onButtonPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Theme.spacing.l,
    marginBottom: Theme.spacing.m,
    height: scale(180),
    borderRadius: scale(16),
    backgroundColor: Theme.colors.categoryBg.green,
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
