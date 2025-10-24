// Design System Theme Configuration
// This file contains all design tokens for consistent styling across the app

export const colors = {
  // Primary brand colors - Updated for color-blind accessibility
  primary: '#2563EB', // Bright blue - distinguishable for most color-blind users
  primaryDark: '#1D4ED8',
  primaryLight: '#3B82F6',
  secondary: '#7C3AED', // Purple - good contrast with blue
  secondaryDark: '#6D28D9',
  secondaryLight: '#8B5CF6',

  // Background colors
  background: '#F6F4F1',
  backgroundAlt: '#F9F8F3',
  surface: '#FFFFFF',
  surfaceVariant: '#F8F9FA',
  surfaceElevated: '#FFFFFF',

  // Text colors
  onBackground: '#1D1D1D',
  onSurface: '#1D1D1D',
  onSurfaceVariant: '#71727A',
  onSurfaceLight: '#999999',
  onPrimary: '#FFFFFF',
  onSecondary: '#FFFFFF',

  // Status colors
  success: '#4CAF50',
  successLight: '#E8F5E8',
  warning: '#FF9800',
  warningLight: '#FFF3E0',
  error: '#F37272',
  errorLight: '#FFE5E5',
  info: '#2196F3',
  infoLight: '#E3F2FD',

  // Mood colors
  happyMood: '#FFE066',
  contemplativeMood: '#A78BFA',
  adventurousMood: '#4ECDC4',
  nostalgicMood: '#FF6B9D',

  // Neutral colors
  neutral100: '#F5F5F5',
  neutral200: '#EEEEEE',
  neutral300: '#E0E0E0',
  neutral400: '#BDBDBD',
  neutral500: '#9E9E9E',
  neutral600: '#757575',
  neutral700: '#616161',
  neutral800: '#424242',
  neutral900: '#212121',

  // Overlay colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',

  // Border and shadow colors
  border: '#E0E0E0',
  shadow: '#000000',
};

export const typography = {
  // Display styles (largest headings)
  displayLarge: {
    fontSize: 36,
    fontWeight: '200',
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  displayMedium: {
    fontSize: 32,
    fontWeight: '300',
    lineHeight: 40,
    letterSpacing: -0.3,
  },
  displaySmall: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
    letterSpacing: 0,
  },

  // Headline styles (section headings)
  headlineLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    letterSpacing: 0.1,
  },
  headlineSmall: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.1,
  },

  // Title styles (card headings, subsections)
  titleLarge: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    letterSpacing: 0.1,
  },
  titleMedium: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  titleSmall: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 16,
    letterSpacing: 0.1,
  },

  // Body text styles
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.3,
  },

  // Label styles (buttons, form labels)
  labelLarge: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  labelMedium: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 0.3,
  },
  labelSmall: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 14,
    letterSpacing: 0.3,
  },

  // Stat/number styles
  statLarge: {
    fontSize: 36,
    fontWeight: 'bold',
    lineHeight: 44,
    letterSpacing: -0.5,
  },
  statMedium: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  statSmall: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
    letterSpacing: 0,
  },
};

export const spacing = {
  // Base spacing unit: 4px
  xs: 4,   // 4px
  sm: 8,   // 8px
  md: 12,  // 12px
  lg: 16,  // 16px
  xl: 20,  // 20px
  xxl: 24, // 24px
  xxxl: 32, // 32px
  xxxxl: 40, // 40px
  
  // Semantic spacing
  componentGap: 8,
  sectionGap: 20,
  screenPadding: 20,
  cardPadding: 16,
  cardPaddingLarge: 20,
  buttonPadding: 16,
  inputPadding: 12,
};

export const borderRadius = {
  none: 0,
  small: 8,
  medium: 12,
  large: 16,
  xlarge: 20,
  xxlarge: 24,
  round: 999,
  
  // Semantic border radius
  card: 12,
  cardLarge: 16,
  button: 12,
  buttonLarge: 20,
  input: 8,
  modal: 16,
};

export const shadows = {
  none: {
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  small: {
    shadowColor: colors.neutral900,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.neutral900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: colors.neutral900,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  xlarge: {
    shadowColor: colors.neutral900,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
};

export const animations = {
  timing: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeInOut: 'ease-in-out',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
  },
};

// Component-specific styling presets
export const componentStyles = {
  // Card presets
  card: {
    base: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.card,
      padding: spacing.cardPadding,
      ...shadows.medium,
    },
    elevated: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.card,
      padding: spacing.cardPadding,
      ...shadows.large,
    },
    large: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.cardLarge,
      padding: spacing.cardPaddingLarge,
      ...shadows.medium,
    },
    flat: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.card,
      padding: spacing.cardPadding,
      ...shadows.none,
    },
  },

  // Button presets
  button: {
    primary: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.button,
      paddingVertical: spacing.buttonPadding,
      paddingHorizontal: spacing.xl,
      ...shadows.small,
    },
    secondary: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.button,
      paddingVertical: spacing.buttonPadding,
      paddingHorizontal: spacing.xl,
      borderWidth: 1,
      borderColor: colors.primary,
      ...shadows.small,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderRadius: borderRadius.button,
      paddingVertical: spacing.buttonPadding,
      paddingHorizontal: spacing.xl,
    },
  },

  // Input presets
  input: {
    base: {
      backgroundColor: colors.surface,
      borderRadius: borderRadius.input,
      paddingVertical: spacing.inputPadding,
      paddingHorizontal: spacing.lg,
      borderWidth: 1,
      borderColor: colors.neutral300,
    },
  },

  // Container presets
  container: {
    screen: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: spacing.screenPadding,
    },
    section: {
      marginBottom: spacing.sectionGap,
    },
  },
};

// Helper functions for consistent styling
export const createTextStyle = (variant, color = colors.onSurface) => ({
  ...typography[variant],
  color,
});

export const createCardStyle = (variant = 'base', customStyles = {}) => ({
  ...componentStyles.card[variant],
  ...customStyles,
});

export const createButtonStyle = (variant = 'primary', customStyles = {}) => ({
  ...componentStyles.button[variant],
  ...customStyles,
});

// Responsive helpers
export const getResponsivePadding = (screenWidth) => {
  if (screenWidth < 375) return spacing.lg;
  if (screenWidth < 768) return spacing.xl;
  return spacing.xxl;
};

export const getResponsiveFontSize = (baseSize, screenWidth) => {
  if (screenWidth < 375) return baseSize * 0.9;
  if (screenWidth > 768) return baseSize * 1.1;
  return baseSize;
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animations,
  componentStyles,
  createTextStyle,
  createCardStyle,
  createButtonStyle,
  getResponsivePadding,
  getResponsiveFontSize,
};