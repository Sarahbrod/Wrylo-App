// Reusable Styled Components
// These components provide consistent styling across the app using the design system

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../../styles/theme';

// Base styled components
export const StyledText = ({ variant = 'bodyMedium', color, style, children, ...props }) => {
  const textStyle = theme.createTextStyle(variant, color);
  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
};

export const StyledCard = ({ variant = 'base', style, children, ...props }) => {
  const cardStyle = theme.createCardStyle(variant);
  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );
};

export const StyledButton = ({ 
  variant = 'primary', 
  textVariant = 'labelLarge',
  title, 
  onPress, 
  style, 
  textStyle, 
  disabled = false,
  ...props 
}) => {
  const buttonStyle = theme.createButtonStyle(variant);
  const buttonTextColor = variant === 'primary' ? theme.colors.onPrimary : theme.colors.primary;
  const finalButtonStyle = disabled ? { ...buttonStyle, opacity: 0.6 } : buttonStyle;
  
  return (
    <TouchableOpacity 
      style={[finalButtonStyle, style]} 
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <StyledText 
        variant={textVariant}
        color={buttonTextColor}
        style={[{ textAlign: 'center' }, textStyle]}
      >
        {title}
      </StyledText>
    </TouchableOpacity>
  );
};

export const StyledContainer = ({ variant = 'screen', style, children, ...props }) => {
  const containerStyle = theme.componentStyles.container[variant];
  return (
    <View style={[containerStyle, style]} {...props}>
      {children}
    </View>
  );
};

// Specialized components for common UI patterns
export const SectionHeader = ({ title, subtitle, style, titleStyle, subtitleStyle }) => (
  <View style={[styles.sectionHeader, style]}>
    <StyledText 
      variant="titleLarge" 
      color={theme.colors.onSurface}
      style={[{ marginBottom: subtitle ? theme.spacing.xs : 0 }, titleStyle]}
    >
      {title}
    </StyledText>
    {subtitle && (
      <StyledText 
        variant="bodySmall" 
        color={theme.colors.onSurfaceVariant}
        style={subtitleStyle}
      >
        {subtitle}
      </StyledText>
    )}
  </View>
);

export const StatCard = ({ 
  number, 
  label, 
  variant = 'base',
  numberColor = theme.colors.primary,
  style 
}) => (
  <StyledCard variant={variant} style={[styles.statCard, style]}>
    <StyledText 
      variant="statMedium" 
      color={numberColor}
      style={styles.statNumber}
    >
      {number}
    </StyledText>
    <StyledText 
      variant="bodySmall" 
      color={theme.colors.onSurface}
      style={styles.statLabel}
    >
      {label}
    </StyledText>
  </StyledCard>
);

export const BookCard = ({ 
  title, 
  author, 
  coverIcon = '📖',
  rating,
  onPress,
  style,
  variant = 'base'
}) => (
  <TouchableOpacity onPress={onPress}>
    <StyledCard variant={variant} style={[styles.bookCard, style]}>
      <View style={styles.bookCover}>
        <Text style={styles.bookCoverIcon}>{coverIcon}</Text>
      </View>
      <StyledText 
        variant="titleMedium" 
        color={theme.colors.onSurface}
        style={styles.bookTitle}
        numberOfLines={2}
      >
        {title}
      </StyledText>
      <StyledText 
        variant="bodySmall" 
        color={theme.colors.onSurfaceVariant}
        style={styles.bookAuthor}
        numberOfLines={1}
      >
        {author}
      </StyledText>
      {rating && (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
          <StyledText 
            variant="labelSmall" 
            color={theme.colors.onSurface}
            style={styles.ratingText}
          >
            {rating}
          </StyledText>
        </View>
      )}
    </StyledCard>
  </TouchableOpacity>
);

export const ActionCard = ({ 
  icon, 
  title, 
  description, 
  onPress,
  style,
  variant = 'base'
}) => (
  <TouchableOpacity onPress={onPress}>
    <StyledCard variant={variant} style={[styles.actionCard, style]}>
      <Text style={styles.actionIcon}>{icon}</Text>
      <StyledText 
        variant="titleMedium" 
        color={theme.colors.onSurface}
        style={styles.actionTitle}
      >
        {title}
      </StyledText>
      <StyledText 
        variant="bodySmall" 
        color={theme.colors.onSurfaceVariant}
        style={styles.actionDescription}
      >
        {description}
      </StyledText>
      <View style={styles.plusButton}>
        <Text style={styles.plusButtonText}>+</Text>
      </View>
    </StyledCard>
  </TouchableOpacity>
);

export const GoalItem = ({ 
  icon, 
  text, 
  progress, 
  style,
  backgroundColor = theme.colors.surface
}) => (
  <View style={[styles.goalItem, { backgroundColor }, style]}>
    <StyledText 
      variant="bodyMedium" 
      color={theme.colors.onSurface}
      style={styles.goalText}
    >
      {icon} {text}
    </StyledText>
    <StyledText 
      variant="labelMedium" 
      color={theme.colors.primary}
      style={styles.goalProgress}
    >
      {progress}
    </StyledText>
  </View>
);

export const AchievementItem = ({ 
  icon, 
  title, 
  description, 
  style,
  backgroundColor = theme.colors.surface
}) => (
  <View style={[styles.achievementItem, { backgroundColor }, style]}>
    <Text style={styles.achievementIcon}>{icon}</Text>
    <View style={styles.achievementInfo}>
      <StyledText 
        variant="titleMedium" 
        color={theme.colors.onSurface}
        style={styles.achievementTitle}
      >
        {title}
      </StyledText>
      <StyledText 
        variant="bodySmall" 
        color={theme.colors.onSurfaceVariant}
        style={styles.achievementDescription}
      >
        {description}
      </StyledText>
    </View>
  </View>
);

// Styles for the specialized components
const styles = StyleSheet.create({
  sectionHeader: {
    marginBottom: theme.spacing.xl,
  },
  
  statCard: {
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  statNumber: {
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    textAlign: 'center',
  },
  
  bookCard: {
    width: 180,
    marginRight: theme.spacing.lg,
  },
  bookCover: {
    backgroundColor: theme.colors.neutral200,
    borderRadius: theme.borderRadius.small,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  bookCoverIcon: {
    fontSize: 32,
  },
  bookTitle: {
    marginBottom: theme.spacing.xs,
    minHeight: 40,
  },
  bookAuthor: {
    marginBottom: theme.spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingStars: {
    fontSize: 10,
  },
  ratingText: {
    fontWeight: '600',
  },
  
  actionCard: {
    alignItems: 'center',
    width: 160,
    marginRight: theme.spacing.lg,
    minHeight: 180,
    justifyContent: 'space-between',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: theme.spacing.md,
  },
  actionTitle: {
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  actionDescription: {
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
    minHeight: 32,
  },
  plusButton: {
    backgroundColor: theme.colors.error,
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButtonText: {
    color: theme.colors.onPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.small,
    marginBottom: theme.spacing.sm,
    ...theme.shadows.small,
  },
  goalText: {
    flex: 1,
  },
  goalProgress: {
    fontWeight: '600',
  },
  
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.medium,
    marginBottom: theme.spacing.md,
    ...theme.shadows.small,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: theme.spacing.lg,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    marginBottom: theme.spacing.xs,
  },
  achievementDescription: {
    // No additional styles needed
  },
});

export default {
  StyledText,
  StyledCard,
  StyledButton,
  StyledContainer,
  SectionHeader,
  StatCard,
  BookCard,
  ActionCard,
  GoalItem,
  AchievementItem,
};