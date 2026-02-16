import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Theme } from '../../theme';
import { Icons } from '../../assets/icons';
import { scale, moderateScale } from '../../utils/scale';
import { Routes } from '../../navigation/routes';

const TAB_ACTIVE = Theme.colors.primary;
const TAB_INACTIVE = Theme.colors.tabInactive;
const ICON_SIZE = scale(24);
const CENTER_BUTTON_SIZE = scale(56);
const CENTER_ICON_SIZE = scale(28);

const TAB_ICONS: ImageSourcePropType[] = [
  Icons.tabHome,
  Icons.tabCart,
  Icons.tabExplore,
  Icons.tabMyOrder,
  Icons.tabProfile,
];

const TAB_LABELS = ['Home', 'Cart', '', 'My Order', 'Profile'];

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const activeRoute = state.routes[state.index];
  const focusedRouteName = getFocusedRouteNameFromRoute(activeRoute);
  if (focusedRouteName === Routes.PRODUCT_DETAILS) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const isCenter = index === 2;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          if (isCenter) {
            return (
              <View key={route.key} style={styles.centerWrap}>
                <TouchableOpacity
                  onPress={onPress}
                  style={styles.centerButton}
                  activeOpacity={0.85}
                >
                  <Image
                    source={TAB_ICONS[index]}
                    style={[
                      styles.centerIcon,
                      {
                        width: CENTER_ICON_SIZE,
                        height: CENTER_ICON_SIZE,
                        tintColor: Theme.colors.white,
                      },
                    ]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.centerLabel,
                    { color: isFocused ? TAB_ACTIVE : TAB_INACTIVE },
                  ]}
                >
                  {TAB_LABELS[index]}
                </Text>
              </View>
            );
          }

          const color = isFocused ? TAB_ACTIVE : TAB_INACTIVE;
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <Image
                source={TAB_ICONS[index]}
                style={[styles.icon, { width: ICON_SIZE, height: ICON_SIZE, tintColor: color }]}
                resizeMode="contain"
              />
              <Text style={[styles.label, { color }]} numberOfLines={1}>
                {TAB_LABELS[index]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const TAB_BAR_SHADOW = {
  shadowColor: Theme.colors.shadow,
  shadowOffset: { width: 0, height: -6   },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 8,
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: scale(16),
    paddingHorizontal: scale(8),
    backgroundColor: Theme.colors.white,
    paddingTop: scale(8),
    overflow: 'visible',
    ...TAB_BAR_SHADOW,
  },
  bar: {
    overflow: 'visible',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: scale(56),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: scale(4),
  },
  icon: {},
  label: {
    fontSize: moderateScale(11),
    marginTop: scale(4),
    fontWeight: '500',
  },
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: scale(-4),
    overflow: 'visible',
  },
  centerButton: {
    width: CENTER_BUTTON_SIZE,
    height: CENTER_BUTTON_SIZE,
    borderRadius: CENTER_BUTTON_SIZE / 2,
    backgroundColor: Theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 12,
  },
  centerIcon: {},
  centerLabel: {
    fontSize: moderateScale(11),
    marginTop: scale(6),
    fontWeight: '500',
  },
});
