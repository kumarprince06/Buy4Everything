/**
 * colors.ts
 *
 * App-wide color palette. Use Theme.colors in components instead of hex codes.
 * Semantic names (primary, text, border) and Figma-specific tokens.
 */

export const Colors = {
    primary: '#0CA201',
    secondary: '#FFB800',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#1C1C1C',
    textSecondary: '#666666',
    tabInactive: '#5E5F60',
    border: '#E0E0E0',
    white: '#FFFFFF',
    black: '#000000',
    error: '#FF3B30',
    success: '#34C759',

    /** Shadows and overlays */
    shadow: '#000000',
    shadowLight: '#0000001A',
    overlayDark: 'rgba(0,0,0,0.5)',
    overlayLight: 'rgba(0,0,0,0.25)',
    separatorLight: 'rgba(255,255,255,0.4)',

    categoryBg: {
        green: '#E8F5E9',
        orange: '#FFF3E0',
        blue: '#E3F2FD',
        pink: '#FCE4EC',
    },
    categoriesSection: '#FFF8C7',
    trendingSection: '#FFFBDD',
    /** Yellow: quantity selector border/buttons, selector active (Figma #FFD500) */
    selectorActive: '#FFD500',
    cardBackgroundMint: '#F4FFF3',
    cardBorderColor: '#CEFFCA',
    lightGreen: '#F1F8E9',
    lightOrange: '#FFE0B2',
    lightBlue: '#BBDEFB',
    lightPink: '#F8BBD0',
    allCategoriesCard: {
        green: '#E8F5E9',
        peach: '#FFF3E0',
        cream: '#FFFDE7',
        purple: '#EDE7F6',
        blue: '#E3F2FD',
    },
    link: '#2DD4BF',
    deliveryTime: '#24B5D4',
    badgeTextColor: '#BC0202',
    badgeBackgroundColor: '#ED2A2A61',

    /** Product detail & tabs */
    tabBarBackground: '#D7FFD4',
    tabDivider: '#8EFF86',
    tabInactiveText: '#636262',
    imagePlaceholder: '#F6F6F6',
    carouselDotInactive: 'rgba(255,255,255,0.7)',

    /** Product list & cards */
    chipBackground: '#EDF2F7',
    productCardBorder: '#EBFFE9',
    headerBorder: '#ECECEC',
    searchFilterCircle: '#D7FFD4',

    /** Auth & OTP */
    authYellow: '#FFCC00',
    otpFilled: '#FFF4CC',
    otpBorder: 'rgba(255,255,255,0.4)',

    /** Badges (e.g. percent off) */
    percentOffBadge: '#D32F2F',
    surfaceLight: '#F5F5F5',
};
