import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import theme from '../../styles/theme';
import { StyledText } from '../StyledComponents';

const CustomButton = ({ 
  onPress, 
  text, 
  type = "PRIMARY", 
  bgColor, 
  fgColor,
  style,
  disabled = false,
  size = 'medium',
  ...props 
}) => {
  
  const getButtonStyle = () => {
    let baseStyle = {
      ...styles.container,
      ...theme.shadows.small,
    };

    // Size variants
    if (size === 'large') {
      baseStyle = { ...baseStyle, ...styles.containerLarge };
    } else if (size === 'small') {
      baseStyle = { ...baseStyle, ...styles.containerSmall };
    }

    // Type variants
    switch (type) {
      case "PRIMARY":
        return {
          ...baseStyle,
          backgroundColor: bgColor || theme.colors.primary,
        };
      case "SECONDARY":
        return {
          ...baseStyle,
          backgroundColor: bgColor || theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.primary,
        };
      case "TERTIARY":
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          shadowOpacity: 0,
          elevation: 0,
        };
      case "LINK":
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          shadowOpacity: 0,
          elevation: 0,
          paddingVertical: theme.spacing.sm,
        };
      default:
        return {
          ...baseStyle,
          backgroundColor: bgColor || theme.colors.primary,
        };
    }
  };

  const getTextColor = () => {
    if (fgColor) return fgColor;
    
    switch (type) {
      case "PRIMARY":
        return theme.colors.onPrimary;
      case "SECONDARY":
        return theme.colors.primary;
      case "TERTIARY":
        return theme.colors.primary;
      case "LINK":
        return theme.colors.primary;
      default:
        return theme.colors.onPrimary;
    }
  };

  const getTextVariant = () => {
    if (size === 'large') return 'labelLarge';
    if (size === 'small') return 'labelMedium';
    return 'labelLarge';
  };

  const finalStyle = disabled 
    ? { ...getButtonStyle(), opacity: 0.6 }
    : getButtonStyle();

  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }) => [
        finalStyle,
        pressed && !disabled && styles.pressed,
        style
      ]}
      disabled={disabled}
      {...props}
    >
      <StyledText 
        variant={getTextVariant()}
        color={getTextColor()}
        style={styles.text}
      >
        {text}
      </StyledText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.button,
    minHeight: 48,
  },
  containerLarge: {
    paddingVertical: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xxl,
    minHeight: 56,
  },
  containerSmall: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    minHeight: 40,
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});

export default CustomButton;