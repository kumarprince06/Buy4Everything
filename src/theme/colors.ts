/**
 * colors.ts
 *
 * App-wide color palette. Used via Theme.colors in components.
 * Includes semantic names (primary, text, border) and section-specific colors
 * that match Figma (e.g. categoriesSection, trendingSection, cardBackgroundMint).
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
    categoryBg: {
        green: '#E8F5E9',
        orange: '#FFF3E0',
        blue: '#E3F2FD',
        pink: '#FCE4EC',
    },
    /** Categories section background (Figma) */
    categoriesSection: '#FFF8C7',
    /** Explore Trending Products section background (Figma) */
    trendingSection: '#FFFBDD',
    /** App type selector active tab (Grocery/Ecommerce) */
    selectorActive: '#FFD500',
    /** City Best Seller (and similar) card background (Figma) */
    cardBackgroundMint: '#F4FFF3',
    cardBorderColor: '#CEFFCA',
    lightGreen: '#F1F8E9',
    lightOrange: '#FFE0B2',
    lightBlue: '#BBDEFB',
    lightPink: '#F8BBD0',
    link: '#2DD4BF',
};
