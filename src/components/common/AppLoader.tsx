import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  ViewStyle,
  Image,
} from 'react-native';
import { Theme } from '../../theme';
import { Images } from '../../assets/images';

interface AppLoaderProps {
  /** Size of the loader (width/height). Default 24 for buttons. */
  size?: number;
  /** Color of the spinner when using 'spinner' variant. Defaults to theme primary. */
  color?: string;
  /** Optional style for the container. */
  style?: ViewStyle;
  /**
   * 'dots' = 3 bouncing dots (grocery / items loading) - default, works at any size.
   * 'basket' = shopping basket with pulse (for larger loaders, e.g. full screen).
   * 'spinner' = classic ring spinner.
   */
  variant?: 'dots' | 'basket' | 'spinner';
}

const DOT_COLORS = [Theme.colors.primary, Theme.colors.secondary, Theme.colors.primary];

/**
 * Animated loader for Buy4Everything – grocery, eatery, everything.
 * Dots = "loading your items" (3 bouncing dots in brand colors).
 * Basket = basket icon with pulse for full-screen / larger use.
 */
export const AppLoader: React.FC<AppLoaderProps> = ({
  size = 30,
  color,
  style,
  variant = 'dots',
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const bounce1 = useRef(new Animated.Value(0)).current;
  const bounce2 = useRef(new Animated.Value(0)).current;
  const bounce3 = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (variant === 'spinner') {
      const spinAnimation = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 800,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      spinAnimation.start();
      return () => spinAnimation.stop();
    }

    if (variant === 'basket') {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseValue, {
            toValue: 1,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseValue, {
            toValue: 0,
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    }

    // variant === 'dots' – 3 dots bounce in sequence (grocery / items loading)
    const bounceUp = (anim: Animated.Value, delay: number) =>
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration: 280,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]);
    const bounceDown = (anim: Animated.Value) =>
      Animated.timing(anim, {
        toValue: 0,
        duration: 280,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      });

    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          bounceUp(bounce1, 0),
          bounceUp(bounce2, 80),
          bounceUp(bounce3, 160),
        ]),
        Animated.parallel([
          bounceDown(bounce1),
          bounceDown(bounce2),
          bounceDown(bounce3),
        ]),
        Animated.delay(80),
      ])
    );
    bounceAnimation.start();
    return () => bounceAnimation.stop();
  }, [variant, spinValue, bounce1, bounce2, bounce3, pulseValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const bounceOffset = (anim: Animated.Value) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -size * 0.35],
    });

  const pulseScale = pulseValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.92, 1.08],
  });

  const strokeWidth = Math.max(2, Math.floor(size / 8));
  const loaderColor = color ?? Theme.colors.primary;
  const secondaryColor = color ? loaderColor : Theme.colors.secondary;
  const dotSize = Math.max(6, size / 4);

  if (variant === 'dots') {
    return (
      <View style={[styles.wrapper, styles.row, { height: size }, style]}>
        {[bounce1, bounce2, bounce3].map((anim, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              {
                width: dotSize,
                height: dotSize,
                borderRadius: dotSize / 2,
                backgroundColor: DOT_COLORS[i],
                marginHorizontal: dotSize * 0.4,
                transform: [{ translateY: bounceOffset(anim) }],
              },
            ]}
          />
        ))}
      </View>
    );
  }

  if (variant === 'basket') {
    const basketSize = Math.max(32, size * 1.2);
    return (
      <View style={[styles.wrapper, { width: size, height: size }, style]}>
        <Animated.View style={{ transform: [{ scale: pulseScale }] }}>
          <Image
            source={Images.shoppingBasket}
            style={{ width: basketSize, height: basketSize }}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    );
  }

  // spinner
  return (
    <View style={[styles.wrapper, { width: size, height: size }, style]}>
      <Animated.View
        style={[
          styles.ring,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderTopColor: loaderColor,
            borderRightColor: secondaryColor,
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            transform: [{ rotate }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {},
  ring: {
    position: 'absolute',
  },
});
