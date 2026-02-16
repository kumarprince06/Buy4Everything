/**
 * scale.ts
 *
 * Screen-size–dependent scaling so layout and typography work across devices.
 * Base design: 375×812 (typical mobile). Use scale() for widths/horizontal spacing,
 * verticalScale() for heights, moderateScale() for font sizes (so text doesn’t scale 1:1).
 */

import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/** Design base (e.g. Figma artboard) */
export const DESIGN_WIDTH = 430;
export const DESIGN_HEIGHT = 932;

/** Scale horizontal dimensions by screen width */
export function scale(size: number): number {
  return (size * SCREEN_WIDTH) / DESIGN_WIDTH;
}

/** Scale vertical dimensions by screen height */
export function verticalScale(size: number): number {
  return (size * SCREEN_HEIGHT) / DESIGN_HEIGHT;
}

/** Scale font sizes with a factor so they don’t grow/shrink as much as layout (default 0.5) */
export function moderateScale(size: number, factor: number = 0.5): number {
  return size + (scale(size) - size) * factor;
}
