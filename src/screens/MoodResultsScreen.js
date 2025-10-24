import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';
import { getRecommendations, refreshRecommendations } from '../services/recommendationService';

const { width } = Dimensions.get('window');

const MoodResultsScreen = ({ route, navigation }) => {
  const { moodData } = route.params || {};
  const [recommendations, setRecommendations] = useState([]);
  const [moodSummary, setMoodSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [dismissedBooks, setDismissedBooks] = useState([]);

  const [fontsLoaded] = useFonts({
    LibreBaskerville_400Regular,
    LibreBaskerville_700Bold,
  });

  useEffect(() => {
    if (moodData) {
      loadRecommendations();
    } else {
      setLoading(false);
    }
  }, []);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const results = await getRecommendations(moodData);
      setRecommendations(results.recommendations);
      setMoodSummary(results.moodSummary);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
      Alert.alert('Error', 'Failed to load recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const results = await refreshRecommendations(moodData, dismissedBooks);
      setRecommendations(results.recommendations);
    } catch (error) {
      console.error('Failed to refresh recommendations:', error);
      Alert.alert('Error', 'Failed to refresh recommendations. Please try again.');
    } finally {
      setRefreshing(false);
    }
  };

  const handleRetakeQuiz = () => {
    navigation.navigate('MoodFlow');
  };

  const handleAddToLibrary = (book) => {
    // Navigate to library with the book pre-filled
    navigation.navigate('Library', {
      openAddBook: true,
      prefilledBook: book
    });
  };

  const handleBookDetails = (book) => {
    navigation.navigate('BookDetail', { book });
  };

  const handleDismiss = (bookId) => {
    setDismissedBooks([...dismissedBooks, bookId]);
    setRecommendations(recommendations.filter(book => book.googleBooksId !== bookId));
  };

  const renderMoodSummary = () => {
    if (!moodSummary) return null;

    return (
      <View style={styles.moodSummaryContainer}>
        <View style={styles.moodHeader}>
          <Text style={styles.moodEmojis}>{moodSummary.emoji}</Text>
          <Text style={styles.moodTitle}>{moodSummary.title}</Text>
          <Text style={styles.moodDescription}>{moodSummary.description}</Text>
        </View>

        <View style={styles.moodTags}>
          {moodSummary.tags.map((tag, index) => (
            <View
              key={index}
              style={[styles.moodTag, { backgroundColor: tag.color + '20', borderColor: tag.color }]}
            >
              <Text style={[styles.moodTagText, { color: tag.color }]}>{tag.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetakeQuiz}>
            <Ionicons name="refresh" size={18} color="#481825" />
            <Text style={styles.retakeButtonText}>Retake Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={handleRefresh}
            disabled={refreshing}
          >
            <Ionicons
              name="shuffle"
              size={18}
              color="#FFFFFF"
              style={refreshing && styles.spinning}
            />
            <Text style={styles.refreshButtonText}>
              {refreshing ? 'Loading...' : 'More Books'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderBookCard = (book, index) => {
    const matchColor = book.matchPercentage >= 80 ? '#10B981' : book.matchPercentage >= 70 ? '#7CA2E0' : '#F59E0B';

    return (
      <View key={book.googleBooksId || index} style={styles.bookCard}>
        <TouchableOpacity
          style={styles.bookContent}
          onPress={() => handleBookDetails(book)}
          activeOpacity={0.9}
        >
          {/* Book Cover */}
          <View style={styles.bookCoverContainer}>
            <Image
              source={{
                uri: book.coverUrl || 'https://via.placeholder.com/300x400/f0f0f0/999999?text=Book'
              }}
              style={styles.bookCover}
              resizeMode="cover"
            />
            {/* Match Badge */}
            <View style={[styles.matchBadge, { backgroundColor: matchColor }]}>
              <Text style={styles.matchBadgeText}>{book.matchPercentage}%</Text>
            </View>
          </View>

          {/* Book Info */}
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle} numberOfLines={2}>
              {book.title}
            </Text>
            <Text style={styles.bookAuthor} numberOfLines={1}>
              {book.author}
            </Text>

            {/* Rating */}
            {book.averageRating > 0 && (
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>
                  {book.averageRating.toFixed(1)}
                </Text>
                {book.ratingsCount > 0 && (
                  <Text style={styles.ratingCount}>
                    ({book.ratingsCount > 1000 ? `${(book.ratingsCount / 1000).toFixed(1)}k` : book.ratingsCount})
                  </Text>
                )}
              </View>
            )}

            {/* Description */}
            <Text style={styles.bookDescription} numberOfLines={3}>
              {book.description || 'No description available.'}
            </Text>

            {/* Match Reasons */}
            {book.matchReasons && book.matchReasons.length > 0 && (
              <View style={styles.reasonsContainer}>
                <Ionicons name="checkmark-circle" size={14} color="#7CA2E0" />
                <Text style={styles.reasonText} numberOfLines={1}>
                  {book.matchReasons.join(' • ')}
                </Text>
              </View>
            )}

            {/* Mood Tags */}
            {book.moodTags && book.moodTags.length > 0 && (
              <View style={styles.tagsContainer}>
                {book.moodTags.slice(0, 3).map((tag, tagIndex) => (
                  <View key={tagIndex} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Page Count */}
            {book.pageCount > 0 && (
              <Text style={styles.pageCount}>
                <Ionicons name="book-outline" size={12} color="#71727A" /> {book.pageCount} pages
              </Text>
            )}
          </View>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.bookActions}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToLibrary(book)}
          >
            <Ionicons name="add-circle" size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add to Library</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dismissButton}
            onPress={() => handleDismiss(book.googleBooksId)}
          >
            <Ionicons name="close-circle-outline" size={20} color="#71727A" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyEmoji}>📚</Text>
      </View>
      <Text style={styles.emptyTitle}>No Quiz Data</Text>
      <Text style={styles.emptyDescription}>
        Take the mood quiz to get personalized book recommendations
      </Text>
      <TouchableOpacity style={styles.emptyButton} onPress={handleRetakeQuiz}>
        <Text style={styles.emptyButtonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );

  const renderNoResults = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyEmoji}>🔍</Text>
      </View>
      <Text style={styles.emptyTitle}>No Matches Found</Text>
      <Text style={styles.emptyDescription}>
        We couldn't find books matching your preferences. Try refreshing or retaking the quiz.
      </Text>
      <View style={styles.emptyActions}>
        <TouchableOpacity style={styles.emptyButton} onPress={handleRefresh}>
          <Text style={styles.emptyButtonText}>Refresh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.emptyButtonOutline} onPress={handleRetakeQuiz}>
          <Text style={styles.emptyButtonOutlineText}>Retake Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7CA2E0" />
      </View>
    );
  }

  if (!moodData) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2E0A09" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recommendations</Text>
          <View style={styles.placeholder} />
        </View>
        {renderEmptyState()}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2E0A09" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Recommendations</Text>
        <View style={styles.placeholder} />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7CA2E0" />
          <Text style={styles.loadingText}>Finding perfect books for you...</Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderMoodSummary()}

          {recommendations.length === 0 ? (
            renderNoResults()
          ) : (
            <>
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsTitle}>
                  {recommendations.length} Books Found
                </Text>
                <Text style={styles.resultsSubtitle}>
                  Curated just for your mood
                </Text>
              </View>

              <View style={styles.booksContainer}>
                {recommendations.map((book, index) => renderBookCard(book, index))}
              </View>
            </>
          )}

          <View style={styles.bottomSpacer} />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F4F1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#F6F4F1',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E0A09',
    fontFamily: 'LibreBaskerville_700Bold',
  },
  placeholder: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#71727A',
    fontFamily: 'LibreBaskerville_400Regular',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  moodSummaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  moodHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  moodEmojis: {
    fontSize: 48,
    marginBottom: 12,
  },
  moodTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#481825',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'LibreBaskerville_700Bold',
  },
  moodDescription: {
    fontSize: 15,
    color: '#71727A',
    textAlign: 'center',
    lineHeight: 22,
    fontFamily: 'LibreBaskerville_400Regular',
  },
  moodTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
  },
  moodTag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  moodTagText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  retakeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F4F1',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1.5,
    borderColor: '#E8E6E3',
  },
  retakeButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#481825',
  },
  refreshButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7CA2E0',
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  refreshButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  resultsHeader: {
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#481825',
    marginBottom: 4,
    fontFamily: 'LibreBaskerville_700Bold',
  },
  resultsSubtitle: {
    fontSize: 14,
    color: '#71727A',
    fontFamily: 'LibreBaskerville_400Regular',
  },
  booksContainer: {
    gap: 20,
  },
  bookCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  bookContent: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
  },
  bookCoverContainer: {
    position: 'relative',
  },
  bookCover: {
    width: 100,
    height: 150,
    borderRadius: 8,
    backgroundColor: '#F6F4F1',
  },
  matchBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  matchBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bookInfo: {
    flex: 1,
    gap: 6,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#481825',
    lineHeight: 22,
  },
  bookAuthor: {
    fontSize: 13,
    color: '#71727A',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#481825',
  },
  ratingCount: {
    fontSize: 11,
    color: '#71727A',
  },
  bookDescription: {
    fontSize: 13,
    color: '#71727A',
    lineHeight: 18,
  },
  reasonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EBF5FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  reasonText: {
    fontSize: 11,
    color: '#7CA2E0',
    fontWeight: '600',
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: '#F6F4F1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 11,
    color: '#481825',
    fontWeight: '600',
  },
  pageCount: {
    fontSize: 11,
    color: '#71727A',
  },
  bookActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F6F4F1',
    padding: 12,
    gap: 12,
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#481825',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  dismissButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F4F1',
    borderRadius: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyEmoji: {
    fontSize: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#481825',
    marginBottom: 10,
    fontFamily: 'LibreBaskerville_700Bold',
  },
  emptyDescription: {
    fontSize: 15,
    color: '#71727A',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    fontFamily: 'LibreBaskerville_400Regular',
  },
  emptyActions: {
    flexDirection: 'row',
    gap: 12,
  },
  emptyButton: {
    backgroundColor: '#481825',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyButtonOutline: {
    backgroundColor: 'transparent',
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#481825',
  },
  emptyButtonOutlineText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#481825',
  },
  bottomSpacer: {
    height: 40,
  },
});

export default MoodResultsScreen;
