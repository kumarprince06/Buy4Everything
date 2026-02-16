import { TextStyle } from 'react-native';
import { moderateScale } from '../utils/scale';

export const Typography: Record<string, TextStyle> = {
    h1: {
        fontSize: moderateScale(24),
        fontWeight: '700',
        lineHeight: moderateScale(32),
    },
    h2: {
        fontSize: moderateScale(20),
        fontWeight: '700',
        lineHeight: moderateScale(28),
    },
    h3: {
        fontSize: moderateScale(18),
        fontWeight: '600',
        lineHeight: moderateScale(24),
    },
    bodyLarge: {
        fontSize: moderateScale(16),
        fontWeight: '400',
        lineHeight: moderateScale(24),
    },
    bodyMedium: {
        fontSize: moderateScale(14),
        fontWeight: '400',
        lineHeight: moderateScale(20),
    },
    bodySmall: {
        fontSize: moderateScale(12),
        fontWeight: '400',
        lineHeight: moderateScale(16),
    },
    button: {
        fontSize: moderateScale(16),
        fontWeight: '600',
        lineHeight: moderateScale(24),
    },
    caption: {
        fontSize: moderateScale(10),
        fontWeight: '400',
        lineHeight: moderateScale(12),
    },
};
