import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius, shadows, componentStyles } from '../styles/theme';
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';
import CreateCategorySheet from '../components/CreateCategorySheet';

const LibraryScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    LibreBaskerville_400Regular,
    LibreBaskerville_700Bold,
  });

  const [activeTab, setActiveTab] = useState('all');
  const [showCreateCategorySheet, setShowCreateCategorySheet] = useState(false);
  const [customCategories, setCustomCategories] = useState([]);

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
            {[...Array(5)].map((_, i) => (
              <Ionicons
                key={i}
                name={i < book.rating ? 'star' : 'star-outline'}
                size={10}
                color={colors.happyMood}
              />
            ))}
          </View>
        )}
      </View>

      <Ionicons name="chevron-forward" size={16} color={colors.onSurfaceVariant} />
    </TouchableOpacity>
  );


  const renderProgressCard = (statusType, statusLabel, count, coverImage) => (
    <TouchableOpacity
      style={styles.topicCard}
      onPress={() => setActiveTab(statusType)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Image source={{ uri: coverImage }} style={styles.cardCoverImage} />
        <View style={styles.cardTextContent}>
          <View style={styles.topicHeader}>
            <Text style={styles.topicTitle}>{statusLabel}</Text>
          </View>
          <View style={styles.topicStats}>
            <Text style={styles.topicStat}>{count} total books</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );


  const renderContent = () => {
    if (activeTab === 'all') {
      const readingBooks = sampleBooks.filter(book => book.status === 'reading');
      const finishedBooks = sampleBooks.filter(book => book.status === 'finished');
      const wishlistBooks = sampleBooks.filter(book => book.status === 'wishlist');


      return (
        <ScrollView style={styles.topicsContainer} showsVerticalScrollIndicator={false}>
          {renderProgressCard('reading', 'Reading', readingBooks.length, 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif')}
          {renderProgressCard('finished', 'Finished', finishedBooks.length, 'https://media.giphy.com/media/26BRrSvJUa0crqw4E/giphy.gif')}
          {renderProgressCard('wishlist', 'Want to Read', wishlistBooks.length, 'https://media.giphy.com/media/l3vRlT2DWr7CqYWNa/giphy.gif')}
          {renderProgressCard('dnf', 'Did Not Finish', sampleBooks.filter(book => book.status === 'dnf').length, 'https://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif')}


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
              0,
              'https://via.placeholder.com/300x400/f0f0f0/999999?text=Custom'
            )
          ))}
        </ScrollView>
      );
    } else {
      const filteredBooks = sampleBooks.filter(book => book.status === activeTab);

      if (filteredBooks.length === 0) {
        return (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={48} color={colors.onSurfaceVariant} />
            <Text style={styles.emptyStateText}>
              No {activeTab === 'wishlist' ? 'want to read' : activeTab === 'dnf' ? 'did not finish' : activeTab} books
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Add some books to your {activeTab === 'wishlist' ? 'want to read' : activeTab === 'dnf' ? 'did not finish' : activeTab} list
            </Text>
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
            <Text style={styles.title}>My Library</Text>
            <Text style={styles.subtitle}>Organize and track your reading journey</Text>
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
  title: {
    ...typography.displaySmall,
    color: colors.onBackground,
    marginBottom: 4,
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.onSurfaceVariant,
  },
  topicsContainer: {
    flex: 1,
  },
  topicCard: {
    ...componentStyles.card.large,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  cardCoverImage: {
    width: 70,
    height: 70,
    borderRadius: borderRadius.small,
    resizeMode: 'cover',
  },
  cardTextContent: {
    flex: 1,
  },
  topicHeader: {
    marginBottom: spacing.xs,
  },
  topicTitle: {
    ...typography.headlineSmall,
    color: colors.onSurface,
    marginBottom: 2,
  },
  topicDescription: {
    ...typography.bodyMedium,
    color: colors.onSurfaceVariant,
  },
  topicStats: {
    marginBottom: spacing.sm,
  },
  topicStat: {
    ...typography.bodySmall,
    color: colors.onSurfaceLight,
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
    backgroundColor: '#2E0A09',
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
    width: 45,
    height: 65,
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

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
    gap: spacing.lg,
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