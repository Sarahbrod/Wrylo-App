import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },

  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  searchInputContainerFocused: {
    borderColor: colors.primary,
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },

  searchIcon: {
    marginRight: spacing.sm,
  },

  searchInput: {
    flex: 1,
    fontSize: typography.bodyMedium.fontSize,
    fontWeight: typography.bodyMedium.fontWeight,
    color: colors.onSurface,
    paddingVertical: spacing.xs,
  },

  clearButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },

  loadingIndicator: {
    // Animation styles handled in component
  },

  filterButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    paddingLeft: spacing.md,
  },

  // Suggestions dropdown
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginTop: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
    zIndex: 1001,
  },

  suggestionsList: {
    maxHeight: 200,
  },

  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  suggestionIcon: {
    marginRight: spacing.sm,
  },

  suggestionText: {
    flex: 1,
    fontSize: typography.bodyMedium.fontSize,
    fontWeight: typography.bodyMedium.fontWeight,
    color: colors.onSurface,
  },

  recentLabel: {
    fontSize: typography.bodySmall.fontSize,
    color: colors.onSurfaceVariant,
    marginLeft: spacing.sm,
  },

  // Search results section (if needed)
  searchResultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  searchResultsTitle: {
    fontSize: typography.headlineSmall.fontSize,
    fontWeight: typography.headlineSmall.fontWeight,
    color: colors.onSurface,
  },

  searchResultsCount: {
    fontSize: typography.bodySmall.fontSize,
    color: colors.onSurfaceVariant,
  },

  // Filter pills (if implemented)
  filterPillsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexWrap: 'wrap',
  },

  filterPill: {
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },

  filterPillText: {
    fontSize: typography.bodySmall.fontSize,
    color: colors.primary,
    marginRight: spacing.xs,
  },

  filterPillRemove: {
    padding: 2,
  },

  // Empty state
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },

  emptyStateText: {
    fontSize: typography.bodyMedium.fontSize,
    fontWeight: typography.bodyMedium.fontWeight,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});

export default styles;