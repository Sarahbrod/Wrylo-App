import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, componentStyles } from '../styles/theme';
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';
import CreateCategorySheet from '../components/CreateCategorySheet';
import AddBookSheet from '../components/AddBookSheet';

const LibraryScreen = ({ navigation, route }) => {
  const [fontsLoaded] = useFonts({
    LibreBaskerville_400Regular,
    LibreBaskerville_700Bold,
  });

  const [activeTab, setActiveTab] = useState('all');
  const [showCreateCategorySheet, setShowCreateCategorySheet] = useState(false);
  const [showAddBookSheet, setShowAddBookSheet] = useState(false);
  const [customCategories, setCustomCategories] = useState([]);
  const [prefilledBook, setPrefilledBook] = useState(null);

  // Sample book data - in a real app this would come from a database/API
  const sampleBooks = [
    {
      id: 1,
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      status: 'finished',
      rating: 5,
      progress: 100,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/P/1501161938.01.L.jpg',
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      status: 'reading',
      rating: 0,
      progress: 65,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/P/0735211299.01.L.jpg',
    },
    {
      id: 3,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      status: 'wishlist',
      rating: 0,
      progress: 0,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/P/1250301696.01.L.jpg',
    },
    {
      id: 4,
      title: 'Educated',
      author: 'Tara Westover',
      status: 'reading',
      rating: 0,
      progress: 30,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/P/0399590501.01.L.jpg',
    },
    {
      id: 5,
      title: 'Where the Crawdads Sing',
      author: 'Delia Owens',
      status: 'finished',
      rating: 4,
      progress: 100,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/P/0735219095.01.L.jpg',
    },
    {
      id: 6,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      status: 'wishlist',
      rating: 0,
      progress: 0,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/P/0857197681.01.L.jpg',
    },
    {
      id: 7,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      status: 'dnf',
      rating: 0,
      progress: 45,
      coverImage: 'https://images-na.ssl-images-amazon.com/images/P/0743273567.01.L.jpg',
    },
  ];

  const [books, setBooks] = useState(sampleBooks);

  // Check if we should auto-open add book sheet when coming from Home or Recommendations
  useEffect(() => {
    if (route?.params?.openAddBook) {
      setShowAddBookSheet(true);
      // Handle prefilled book from recommendations
      if (route?.params?.prefilledBook) {
        setPrefilledBook(route.params.prefilledBook);
      }
      // Clear the parameters to avoid reopening on subsequent navigations
      navigation.setParams({ openAddBook: undefined, prefilledBook: undefined });
    }
  }, [route?.params?.openAddBook, route?.params?.prefilledBook]);

  const handleAddBook = (bookData) => {
    setBooks(prevBooks => [...prevBooks, bookData]);
    console.log('Book added:', bookData);
  };

  const renderTabBar = () => {
    const tabs = [
      { id: 'all', title: 'All', icon: 'library' },
      { id: 'reading', title: 'Reading', icon: 'book' },
      { id: 'finished', title: 'Finished', icon: 'checkmark-circle' },
      { id: 'dnf', title: 'Did Not Finish', icon: 'close-circle' },
      { id: 'wishlist', title: 'Want to Read', icon: 'heart' },
    ];

    return (
      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScrollContent}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Ionicons
                name={tab.icon}
                size={16}
                color={activeTab === tab.id ? colors.onPrimary : colors.onSurfaceVariant}
              />
              <Text style={[
                styles.tabText,
                activeTab === tab.id && styles.activeTabText
              ]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };


  const renderBookLine = (book) => (
    <TouchableOpacity key={book.id} style={styles.bookLine} activeOpacity={0.8}>
      <Image source={{ uri: book.coverImage }} style={styles.smallBookCover} />
      <View style={styles.bookLineInfo}>
        <Text style={styles.bookLineTitle} numberOfLines={1}>{book.title}</Text>
        <Text style={styles.bookLineAuthor} numberOfLines={1}>{book.author}</Text>

        {book.status === 'reading' && (
          <View style={styles.smallProgressContainer}>
            <View style={styles.smallProgressBar}>
              <View style={[styles.smallProgressFill, { width: `${book.progress}%` }]} />
            </View>
            <Text style={styles.smallProgressText}>{book.progress}%</Text>
          </View>
        )}

        {book.status === 'finished' && book.rating > 0 && (
          <View style={styles.smallRatingContainer}>
            {[1, 2, 3, 4, 5].map((star) => {
              let iconName = 'star-outline';
              if (book.rating >= star) {
                iconName = 'star';
              } else if (book.rating >= star - 0.5) {
                iconName = 'star-half';
              }
              return (
                <Ionicons
                  key={star}
                  name={iconName}
                  size={10}
                  color={colors.happyMood}
                />
              );
            })}
          </View>
        )}
      </View>

      <Ionicons name="chevron-forward" size={16} color={colors.onSurfaceVariant} />
    </TouchableOpacity>
  );


  const renderProgressCard = (statusType, statusLabel, count, booksForStatus) => {
    const isEmpty = count === 0;

    // Get the first 3 books for this status to show as cover images
    const displayBooks = booksForStatus?.slice(0, 3) || [];

    return (
      <TouchableOpacity
        style={[
          styles.topicCard,
          isEmpty && styles.topicCardEmpty
        ]}
        onPress={() => setActiveTab(statusType)}
        activeOpacity={0.7}
      >
        <View style={styles.cardContent}>
          {displayBooks.length > 0 && (
            <View style={styles.bookCoversContainer}>
              {displayBooks.map((book, index) => (
                <Image
                  key={book.id}
                  source={{ uri: book.coverImage }}
                  style={[styles.miniBookCover, { marginLeft: index > 0 ? -12 : 0 }]}
                  resizeMode="cover"
                />
              ))}
            </View>
          )}
          <View style={styles.cardTextContent}>
            <View style={styles.topicHeader}>
              <Text style={[
                styles.topicTitle,
                isEmpty && styles.topicTitleEmpty
              ]}>
                {statusLabel}
              </Text>
            </View>
            <View style={styles.topicStats}>
              <Text style={[
                styles.topicStat,
                isEmpty && styles.topicStatEmpty
              ]}>
                {isEmpty ? 'No books yet' : `${count} book${count !== 1 ? 's' : ''}`}
              </Text>
              {!isEmpty && (
                <Ionicons name="chevron-forward" size={16} color={colors.onSurfaceVariant} style={styles.chevronIcon} />
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  const renderEmptyLibraryState = () => (
    <View style={styles.emptyLibraryContainer}>
      <View style={styles.emptyLibraryHeader}>
        <View style={styles.emptyLibraryIconContainer}>
          <Ionicons name="library" size={48} color={colors.primary} />
        </View>
        <Text style={styles.emptyLibraryTitle}>Start Your Library</Text>
        <Text style={styles.emptyLibrarySubtitle}>
          Welcome to your personal reading space! Let's add your first book and begin your reading journey.
        </Text>
      </View>

      <View style={styles.emptyLibraryActions}>
        <TouchableOpacity
          style={styles.primaryActionButton}
          onPress={() => setShowAddBookSheet(true)}
          activeOpacity={0.8}
        >
          <Ionicons name="add-circle" size={24} color={colors.onPrimary} />
          <Text style={styles.primaryActionText}>Add Your First Book</Text>
        </TouchableOpacity>

        <View style={styles.emptyLibraryFeatures}>
          <View style={styles.featureItem}>
            <Ionicons name="trending-up" size={20} color={colors.secondary} />
            <Text style={styles.featureText}>Track your reading progress</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="star" size={20} color={colors.secondary} />
            <Text style={styles.featureText}>Rate and review books</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="heart" size={20} color={colors.secondary} />
            <Text style={styles.featureText}>Build your wishlist</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    if (activeTab === 'all') {
      const readingBooks = books.filter(book => book.status === 'reading');
      const finishedBooks = books.filter(book => book.status === 'finished');
      const wishlistBooks = books.filter(book => book.status === 'wishlist');
      const dnfBooks = books.filter(book => book.status === 'dnf');

      // Show enhanced empty state if no books at all
      if (books.length === 0) {
        return renderEmptyLibraryState();
      }

      return (
        <ScrollView style={styles.topicsContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.statusCardsContainer}>
            {renderProgressCard('reading', 'Currently Reading', readingBooks.length, readingBooks)}
            {renderProgressCard('finished', 'Finished', finishedBooks.length, finishedBooks)}
            {renderProgressCard('wishlist', 'Want to Read', wishlistBooks.length, wishlistBooks)}
            {renderProgressCard('dnf', 'Did Not Finish', dnfBooks.length, dnfBooks)}
          </View>

          <TouchableOpacity
            style={styles.addGroupCard}
            onPress={() => setShowCreateCategorySheet(true)}
          >
            <View style={styles.addGroupContent}>
              <View style={styles.addGroupIconContainer}>
                <Ionicons name="add" size={24} color={colors.primary} />
              </View>
              <View style={styles.addGroupTextContent}>
                <Text style={styles.addGroupTitle}>Add Your Own Group</Text>
                <Text style={styles.addGroupDescription}>Create a custom reading category</Text>
              </View>
            </View>
          </TouchableOpacity>

          {customCategories.map((category) => (
            renderProgressCard(
              category.id,
              category.name,
              0
            )
          ))}
        </ScrollView>
      );
    } else {
      const filteredBooks = books.filter(book => book.status === activeTab);

      if (filteredBooks.length === 0) {
        return (
          <View style={styles.emptyState}>
            <View style={styles.emptyStateIconContainer}>
              <Ionicons
                name={
                  activeTab === 'reading' ? 'book-outline' :
                  activeTab === 'finished' ? 'checkmark-circle-outline' :
                  activeTab === 'wishlist' ? 'heart-outline' :
                  'close-circle-outline'
                }
                size={48}
                color={colors.onSurfaceVariant}
              />
            </View>
            <Text style={styles.emptyStateText}>
              No {activeTab === 'wishlist' ? 'want to read' : activeTab === 'dnf' ? 'did not finish' : activeTab} books
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Add some books to your {activeTab === 'wishlist' ? 'want to read' : activeTab === 'dnf' ? 'did not finish' : activeTab} list
            </Text>
            <TouchableOpacity
              style={styles.emptyStateAction}
              onPress={() => setShowAddBookSheet(true)}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={18} color={colors.onPrimary} />
              <Text style={styles.emptyStateActionText}>Add Book</Text>
            </TouchableOpacity>
          </View>
        );
      }

      return (
        <View style={styles.booksList}>
          {filteredBooks.map(book => renderBookLine(book))}
        </View>
      );
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  const handleCreateCategory = (categoryData) => {
    setCustomCategories(prev => [...prev, categoryData]);
    console.log('Creating category:', categoryData);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.stickyHeader}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>My Library</Text>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={() => setShowAddBookSheet(true)}>
                <Ionicons name="add" size={18} color={colors.onPrimary} />
              </TouchableOpacity>
            </View>
          </View>
          {renderTabBar()}
        </View>

        <ScrollView style={styles.scrollableContent} contentContainerStyle={styles.contentContainer}>
          <View style={styles.content}>
            {renderContent()}
          </View>
        </ScrollView>
      </View>

      <CreateCategorySheet
        visible={showCreateCategorySheet}
        onClose={() => setShowCreateCategorySheet(false)}
        onCreateCategory={handleCreateCategory}
      />

      <AddBookSheet
        visible={showAddBookSheet}
        onClose={() => {
          setShowAddBookSheet(false);
          setPrefilledBook(null); // Clear prefilled data when closing
        }}
        onAddBook={handleAddBook}
        existingBooks={books}
        prefilledBook={prefilledBook}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  stickyHeader: {
    backgroundColor: colors.background,
    zIndex: 100,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scrollableContent: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 110,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: 12,
    backgroundColor: colors.background,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  title: {
    ...typography.displaySmall,
    color: '#481825',
    marginBottom: 4,
  },
  subtitle: {
    ...typography.bodyMedium,
    color: colors.onSurfaceVariant,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#481825',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  topicsContainer: {
    flex: 1,
  },
  topicCard: {
    ...componentStyles.card.large,
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    backgroundColor: colors.surface,
    ...shadows.medium,
    minHeight: 100,
  },
  topicCardEmpty: {
    backgroundColor: colors.surfaceVariant,
    opacity: 0.7,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
  bookCoversContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniBookCover: {
    width: 50,
    height: 75,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.surface,
  },
  cardTextContent: {
    flex: 1,
  },
  chevronIcon: {
    alignSelf: 'flex-start',
    marginLeft: spacing.sm,
    marginTop: 4,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  topicTitle: {
    ...typography.headlineSmall,
    color: colors.onSurface,
    fontWeight: '600',
    flex: 1,
  },
  topicTitleEmpty: {
    color: colors.onSurfaceVariant,
  },
  countBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 12,
    minWidth: 32,
    alignItems: 'center',
  },
  countBadgeEmpty: {
    backgroundColor: colors.surfaceVariant,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
  },
  countBadgeText: {
    ...typography.labelMedium,
    color: colors.onPrimary,
    fontWeight: '700',
  },
  countBadgeTextEmpty: {
    color: colors.onSurfaceVariant,
  },
  topicDescription: {
    ...typography.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  topicStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topicStat: {
    ...typography.bodyMedium,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  topicStatEmpty: {
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
  },

  // Tab Bar Styles
  tabBar: {
    backgroundColor: colors.background,
    paddingTop: spacing.xs,
    paddingBottom: spacing.lg,
  },
  tabScrollContent: {
    paddingHorizontal: spacing.screenPadding,
    gap: spacing.sm,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 100,
    backgroundColor: colors.surface,
    gap: spacing.xs,
  },
  activeTab: {
    backgroundColor: '#481825',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
  },
  activeTabText: {
    color: colors.onPrimary,
  },

  // Content Styles
  content: {
    flex: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.md,
  },

  // Books List (Individual Tabs)
  booksList: {
    gap: spacing.md,
  },
  bookLine: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.small,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...shadows.small,
    gap: spacing.md,
  },
  smallBookCover: {
    width: 50,
    height: 75,
    borderRadius: spacing.xs,
    resizeMode: 'cover',
  },
  bookLineInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  bookLineTitle: {
    ...typography.titleLarge,
    color: colors.onSurface,
  },
  bookLineAuthor: {
    ...typography.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  smallProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  smallProgressBar: {
    flex: 1,
    height: 3,
    backgroundColor: colors.neutral200,
    borderRadius: 2,
    overflow: 'hidden',
  },
  smallProgressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  smallProgressText: {
    ...typography.bodySmall,
    color: colors.onSurfaceVariant,
  },
  smallRatingContainer: {
    flexDirection: 'row',
    gap: 1,
  },

  // Enhanced Empty Library State
  emptyLibraryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: spacing.xl,
  },
  emptyLibraryHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  emptyLibraryIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadows.medium,
  },
  emptyLibraryTitle: {
    ...typography.displaySmall,
    color: colors.onBackground,
    textAlign: 'center',
    marginBottom: spacing.md,
    fontWeight: '700',
  },
  emptyLibrarySubtitle: {
    ...typography.bodyLarge,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: '90%',
  },
  emptyLibraryActions: {
    width: '100%',
    alignItems: 'center',
  },
  primaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.large,
    marginBottom: spacing.xl,
    gap: spacing.md,
    ...shadows.medium,
    minWidth: 200,
    justifyContent: 'center',
  },
  primaryActionText: {
    ...typography.titleMedium,
    color: colors.onPrimary,
    fontWeight: '600',
  },
  emptyLibraryFeatures: {
    gap: spacing.lg,
    alignItems: 'flex-start',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  featureText: {
    ...typography.bodyMedium,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },

  // Status Cards Container
  statusCardsContainer: {
    gap: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },

  // Empty State (for individual tabs)
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    gap: spacing.lg,
  },
  emptyStateIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  emptyStateText: {
    ...typography.headlineMedium,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    ...typography.bodyLarge,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: '80%',
    marginBottom: spacing.lg,
  },
  emptyStateAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.medium,
    gap: spacing.sm,
    ...shadows.small,
  },
  emptyStateActionText: {
    ...typography.titleSmall,
    color: colors.onPrimary,
    fontWeight: '600',
  },

  // Add Group Card Styles
  addGroupCard: {
    ...componentStyles.card.large,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    backgroundColor: colors.surfaceVariant,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  addGroupContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  addGroupIconContainer: {
    width: 70,
    height: 70,
    borderRadius: borderRadius.small,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  addGroupTextContent: {
    flex: 1,
  },
  addGroupTitle: {
    ...typography.headlineSmall,
    color: colors.primary,
    marginBottom: 4,
  },
  addGroupDescription: {
    ...typography.bodyMedium,
    color: colors.onSurfaceVariant,
  },

});

export default LibraryScreen;