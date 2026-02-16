import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Theme } from '../../theme';
import { AppLoader } from './AppLoader';
import { scale } from '../../utils/scale';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
  textStyle,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return Theme.colors.border;
    switch (variant) {
      case 'primary':
        return Theme.colors.primary;
      case 'secondary':
        return Theme.colors.secondary;
      case 'outline':
        return 'transparent';
      default:
        return Theme.colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return Theme.colors.textSecondary;
    switch (variant) {
      case 'outline':
        return Theme.colors.primary;
      case 'secondary':
        return Theme.colors.black;
      default:
        return Theme.colors.white;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: variant === 'outline' ? Theme.colors.primary : 'transparent',
        },
        style,
      ]}
      activeOpacity={0.8}
    >
      {loading ? (
        <AppLoader size={24} color={getTextColor()} />
      ) : (
        <Text
          style={[
            styles.text,
            { color: getTextColor() },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: scale(52),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.m,
  },
  text: {
    ...Theme.typography.button,
  },
});
