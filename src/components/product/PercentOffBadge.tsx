/**
 * PercentOffBadge.tsx
 *
 * Simple circular badge per Figma: red circle, white outline, "25%" large, "OFF" small below.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { scale, moderateScale } from '../../utils/scale';

interface PercentOffBadgeProps {
  percentage: number;
}

const SIZE = scale(46);

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    top: scale(8),
    left: scale(8),
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: '#D32F2F',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percent: {
    fontSize: moderateScale(15),
    fontWeight: '800',
    color: '#FFFFFF',
  },
  off: {
    fontSize: moderateScale(8),
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 0,
  },
});

export const PercentOffBadge: React.FC<PercentOffBadgeProps> = ({ percentage }) => {
  return (
    <View style={styles.circle}>
      <Text style={styles.percent}>{percentage}%</Text>
      <Text style={styles.off}>OFF</Text>
    </View>
  );
};
