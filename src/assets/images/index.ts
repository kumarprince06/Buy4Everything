/**
 * images/index.ts
 *
 * Single source of image assets for the app. All image paths are required here so that
 * Metro bundler can resolve them. Use Images.<key> in components (e.g. Images.logo,
 * Images.bestsellerTomato).
 *
 * Naming: keys are camelCase; files with spaces or special chars are required with exact filename.
 * Add new images in the appropriate section and export via this object.
 */

export const Images = {
    logo: require('./logo.png'),
    citySkyline: require('./city_skyline.png'),
    shoppingBasket: require('./shopping_basket.png'),
    deliveryBoy: require('./delivery_boy.png'),
    backgroundVector: require('./Vector.png'),
    blob1: require('./blob_1.png'),
    /** Vector group below form area (Figma) */
    group6809: require('./Group 6809.png'),
    googleIcon: require('./google_icon.png'),
    productPlaceholder: require('./product_placeholder.png'),
    // Additional product/category images
    productImage1: require('./product_image_1.png'),
    productImage2: require('./product_image_2.png'),
    productImage3: require('./product_image_3.png'),
    productImage4: require('./product_image_4.png'),
    productImage5: require('./product_image_5.png'),
    // Category icons (Laundry, Beverages, Vegetables)
    beverages: require('./beverages.png'),
    laundary: require('./laundary.png'),
    vegetables: require('./vegetables.png'),
    /** App type selector (header toggles) */
    grocery: require('./Grocery.png'),
    ecommerce: require('./Ecomerce.png'),
    /** Middle banner (below Bestsellers) */
    middleBanner: require('./middle-banner.png'),
    /** Fresh Vegetables banner (Figma) */
    // freshVegetablesBanner: require('./c9221ac66b8a133fd57d9bfcf3c041f6a4bc39ec.png'),
    /** NEW badge/tag for product cards */
    newTag: require('./new-tag.png'),
    /** Bestsellers (Figma) */
    bestsellerTomato: require('./tomato.png'),
    bestsellerPaneer: require('./paneer.png'),
    bestsellerCookies: require('./cookies.png'),
    /** Shop by Offer (Figma) */
    shopByOfferPurex: require('./purex.png'),
    shopByOfferVarnish: require('./varnish.png'),
    shopByOfferHarpic: require('./Harpic.png'),
    /** City Best Seller (Figma) */
    cityBestSellerBhujamal: require('./BHUJAMAL- Sweets and Snacks Combo 1.png'),
    cityBestSellerFarmley: require('./Farmley Mix Dry Fruit Panchmeva.png'),
    cityBestSellerProtein: require('./Protein Chef High Protein Mixture.jpg'),
    /** Explore Trending Products (Figma) */
    trendingDeconstruct: require('./Deconstruct Face Serum.png'),
    trendingCosrx: require('./COSRX Advanced Sn.png'),
    trendingPilgrim: require('./Pilgrim Korean Beauty less.png'),
    trendingGlamveda: require('./Glamveda Korean ass S.png'),
    trendingLotusPro: require('./Lotus Professional.png'),
    trendingCetaphil: require('./cetaphil-moistrizing.png'),
    trendingPlum: require('./Plum Niacinamide.jpg'),
    trendingLotusHerbals: require('./Lotus Herbals Radiant Gold.png'),
    trendingBiotique: require('./Biotique Daily Skin Care.png'),
    trendingHotBeauty: require('./Hot Beauty combo Pers....png'),
    trendingSotrue: require('./Sotrue Epifine Derma Roller.png'),
    trendingDeconstruct1: require('./Deconstruct Face Serum1.png'),
};
