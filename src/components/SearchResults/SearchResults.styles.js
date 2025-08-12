import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  listContent: {
    paddingBottom: spacing.xl,
  },

  // Header styles
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },

  resultsTitle: {
    fontSize: typography.headlineMedium.fontSize,
    fontWeight: typography.headlineMedium.fontWeight,
    color: colors.onSurface,
  },

  resultsCount: {
    fontSize: typography.bodySmall.fontSize,
    color: colors.onSurfaceVariant,
  },

  searchQuery: {
    fontSize: typography.bodyMedium.fontSize,
    fontWeight: typography.bodyMedium.fontWeight,
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },

  // Filters
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },

  filterPill: {
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },

  filterPillText: {
    fontSize: typography.bodySmall.fontSize,
    color: colors.primary,
  },

  // Book item styles
  bookItem: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    borderRadius: 12,
    padding: spacing.md,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  bookItemGrid: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: spacing.xs,
    width: '45%',
  },

  bookCoverContainer: {
    marginRight: spacing.md,
  },

  bookCover: {
    width: 60,
    height: 90,
    borderRadius: 8,
  },

  bookCoverPlaceholder: {
    width: 60,
    height: 90,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bookCoverInitials: {
    fontSize: typography.headlineSmall.fontSize,
    fontWeight: typography.headlineSmall.fontWeight,
    color: colors.surface,
  },

  bookDetails: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  bookTitle: {
    fontSize: typography.titleLarge.fontSize,
    fontWeight: typography.titleLarge.fontWeight,
    color: colors.onSurface,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },

  bookAuthor: {
    fontSize: typography.bodyMedium.fontSize,
    fontWeight: typography.bodyMedium.fontWeight,
    color: colors.onSurfaceVariant,
    marginBottom: spacing.xs,
  },

  bookMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },

  bookGenre: {
    fontSize: typography.bodySmall.fontSize,
    color: colors.primary,
    flex: 1,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    fontSize: typography.bodySmall.fontSize,
    color: colors.onSurfaceVariant,
    marginLeft: spacing.xs / 2,
  },

  bookDescription: {
    fontSize: typography.bodySmall.fontSize,
    color: colors.onSurfaceVariant,
    lineHeight: 16,
    marginBottom: spacing.sm,
  },

  // Tags
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },

  tag: {
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    marginRight: spacing.xs,
    marginBottom: spacing.xs / 2,
    borderWidth: 1,
    borderColor: colors.border,
  },

  tagText: {
    fontSize: typography.labelSmall.fontSize,
    fontWeight: typography.labelSmall.fontWeight,
    color: colors.onSurfaceVariant,
  },

  // Empty state
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl * 2,
  },

  emptyStateIcon: {
    marginBottom: spacing.lg,
  },

  emptyStateTitle: {
    fontSize: typography.headlineMedium.fontSize,
    fontWeight: typography.headlineMedium.fontWeight,
    color: colors.onSurface,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },

  emptyStateSubtitle: {
    fontSize: typography.bodyMedium.fontSize,
    fontWeight: typography.bodyMedium.fontWeight,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Loading state
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },

  loadingText: {
    fontSize: typography.bodyMedium.fontSize,
    fontWeight: typography.bodyMedium.fontWeight,
    color: colors.onSurfaceVariant,
    marginTop: spacing.md,
  },
});

export default styles;