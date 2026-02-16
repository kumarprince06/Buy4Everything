/**
 * SplashScreen
 *
 * First screen shown on app launch. Displays branding (Buy4 Everything logo),
 * a delivery person on scooter with city skyline background, and welcome text.
 * Auto-navigates to Login after 3 seconds.
 *
 * Layout (top to bottom):
 * - Status bar, decorative blob
 * - Logo (basket + Buy4 EveryThing)
 * - Ellipse shape (SVG) with optional city clip
 * - Delivery scooter illustration
 * - Welcome message + CTA
 */

import React, { useEffect, useMemo } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, StatusBar, Platform } from 'react-native';
import Svg, { Defs, ClipPath, Ellipse, G, Rect, Path, Image as SvgImage } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { Theme } from '../../theme';
import { Routes } from '../../navigation/routes';
import { Images } from '../../assets/images';
import { AppLogo } from '../../components/common/AppLogo';
import { scale, moderateScale } from '../../utils/scale';

const { width, height } = Dimensions.get('window');

// -----------------------------------------------------------------------------
// Ellipse / SVG layout constants (used for curved green shape at bottom)
// -----------------------------------------------------------------------------
const ELLIPSE_W = width * 2;
const ELLIPSE_H = height * 0.5;
const ELLIPSE_CLIP_ID = 'splash-ellipse-clip';

/** Combined SVG area: ellipse + city band; city base follows ellipse arc */
const COMBINED_TOP = 0; // top of this SVG = city band top
const ELLIPSE_TOP_Y = height * 0.18; // ellipse tip in this SVG (from top)
const ELLIPSE_CY = height * 0.33; // ellipse center y in this SVG
const COMBINED_H = height * 0.66; // total height (city band + down to ellipse)
const CAP_CLIP_ID = 'city-cap-clip';

/** Status bar height for Android (used to offset logo from top) */
const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0;

export const SplashScreen = () => {
  const navigation = useNavigation<any>();

  // Auto-redirect to Login screen after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(Routes.LOGIN);
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  // Resolve city skyline asset to URI for use inside SVG (SvgImage)
  const cityUri = useMemo(() => {
    const r = Image.resolveAssetSource(Images.citySkyline);
    return r?.uri ? { uri: r.uri } : undefined;
  }, []);

  // SVG path for "cap" shape: rect with bottom edge = ellipse arc (city sits on curve)
  const capPath = useMemo(
    () =>
      `M 0,0 L ${ELLIPSE_W},0 L ${ELLIPSE_W},${ELLIPSE_CY} A ${ELLIPSE_W / 2},${ELLIPSE_H / 2} 0 0 0 ${ELLIPSE_W / 2},${ELLIPSE_TOP_Y} A ${ELLIPSE_W / 2},${ELLIPSE_H / 2} 0 0 0 0,${ELLIPSE_CY} Z`,
    []
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Decorative blob at top (Figma asset) */}
      <Image
        source={Images.blob1}
        style={styles.blobTop}
        resizeMode="cover"
      />

      {/* -------- Header: Logo (basket + Buy4 EveryThing) -------- */}
      <View style={styles.header}>
        <AppLogo size="hero" />
      </View>

      {/* -------- Ellipse + city in one SVG (city base = ellipse curve) -------- */}
      <View style={styles.combinedWrapper} pointerEvents="none">
        <Svg
          width={ELLIPSE_W}
          height={COMBINED_H}
          viewBox={`0 0 ${ELLIPSE_W} ${COMBINED_H}`}
          style={styles.combinedSvg}
        >
          <Defs>
            <ClipPath id={ELLIPSE_CLIP_ID}>
              <Ellipse cx={ELLIPSE_W / 2} cy={ELLIPSE_CY} rx={ELLIPSE_W / 2} ry={ELLIPSE_H / 2} />
            </ClipPath>
            <ClipPath id={CAP_CLIP_ID}>
              <Path d={capPath} />
            </ClipPath>
          </Defs>
          {/* Dark green ellipse shape (curved “ground” at bottom) */}
          <G clipPath={`url(#${ELLIPSE_CLIP_ID})`}>
            <Rect x={0} y={0} width={ELLIPSE_W} height={COMBINED_H} fill={Theme.colors.primary} />
            <Rect x={0} y={0} width={ELLIPSE_W} height={COMBINED_H} fill={Theme.colors.primary} opacity={0.45} />
          </G>
          {/* City skyline clipped to cap: bottom edge follows ellipse arc */}
          <G clipPath={`url(#${CAP_CLIP_ID})`}>
            {cityUri ? (
              <SvgImage
                href={cityUri}
                x={0}
                y={0}
                width={ELLIPSE_W}
                height={ELLIPSE_CY}
                preserveAspectRatio="xMidYMax slice"
              />
            ) : null}
            <Rect x={0} y={0} width={ELLIPSE_W} height={ELLIPSE_CY} fill={Theme.colors.primary} opacity={0.4} />
          </G>
        </Svg>

      </View>

      {/* -------- Hero: Delivery person on scooter (above city/ellipse) -------- */}
      <View style={styles.deliveryBoyWrapper} pointerEvents="none">
        <Image
          source={Images.deliveryBoy}
          style={styles.scooterBoy}
          resizeMode="contain"
        />
      </View>

      {/* -------- Footer: Welcome message + delivery CTA -------- */}
      <View style={styles.footer}>
        <Text style={styles.welcomeTitle}>Welcome To Our Store</Text>
        <Text style={styles.welcomeSub}>
          Get your delivery in <Text style={styles.highlight}>30</Text> minutes
        </Text>
      </View>
    </View>
  );
};

// -----------------------------------------------------------------------------
// Styles – layout and visuals for splash (z-order: blob/ellipse 0 → header 1 → scooter 2 → footer 3)
// -----------------------------------------------------------------------------
const styles = StyleSheet.create({
  /** Root container; primary green background */
  container: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 60,
  },
  /** Decorative blob image at top of screen */
  blobTop: {
    position: 'absolute',
    top: 0,
    left: -width * 0.00,
    width: width * 0.84,
    height: height * 0.16,
    opacity: 0.7,
    zIndex: 0,
  },
  /** Logo section container (below blob) */
  header: {
    marginTop: height * 0.2 + STATUS_BAR_HEIGHT,
    alignItems: 'center',
    zIndex: 1,
  },
  /** Wrapper for ellipse SVG; centered (left offset), extends below screen */
  combinedWrapper: {
    position: 'absolute',
    left: -width / 2,
    bottom: -height * 0.15,
    width: ELLIPSE_W * 0.98,
    height: COMBINED_H,
    zIndex: 0,
  },
  /** SVG fill for ellipse + city clip */
  combinedSvg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    tintColor: Theme.colors.primary,
    opacity: 0.6,
  },
  /** Centered wrapper for scooter image; paddingTop pushes it down */
  deliveryBoyWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: height * 0.20,
    zIndex: 2,
  },
  /** Delivery person + scooter illustration size */
  scooterBoy: {
    width: width * 0.85,
    height: width * 0.9,
    maxHeight: 500,
  },
  /** Footer container for welcome text */
  footer: {
    alignItems: 'center',
    paddingHorizontal: scale(25),
    zIndex: 3,
  },
  /** "Welcome To Our Store" heading */
  welcomeTitle: {
    ...Theme.typography.h1,
    color: Theme.colors.white,
    fontSize: moderateScale(32),
    fontWeight: '800',
    marginBottom: scale(10),
    textAlign: 'center',
  },
  /** "Get your delivery in ..." subtitle */
  welcomeSub: {
    ...Theme.typography.bodyLarge,
    color: Theme.colors.white,
    fontSize: moderateScale(16),
    opacity: 0.9,
    textAlign: 'center',
  },
  /** Yellow highlight for "30" in delivery CTA */
  highlight: {
    color: Theme.colors.authYellow,
    fontWeight: 'bold',
  },
});
