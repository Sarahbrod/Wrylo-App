import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * BookSearchResults Component
 * Displays search results in a dropdown/overlay with loading and empty states
 *
 * @param {boolean} visible - Whether to show the results
 * @param {Array} results - Array of book search results
 * @param {boolean} loading - Loading state
 * @param {string} searchQuery - Current search query
 * @param {Function} onSelectBook - Callback when a book is selected
 * @param {Function} onSeeAll - Callback for "see all" action (optional)
 * @param {number} maxHeight - Maximum height of results container
 */
const BookSearchResults = React.memo(({
  visible,
  results = [],
  loading = false,
  searchQuery = '',
  onSelectBook,
  onSeeAll,
  maxHeight = 400,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          speed: 14,
          bounciness: 6,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -10,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <Animated.View
        style={[
          styles.container,
          { maxHeight },
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#481825" />
          <Text style={styles.loadingText}>Searching for books...</Text>
        </View>
      </Animated.View>
    );
  }

  // Empty state - no query
  if (!searchQuery || searchQuery.trim().length === 0) {
    return (
      <Animated.View
        style={[
          styles.container,
          { maxHeight },
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="search" size={32} color="#71727A" />
          </View>
          <Text style={styles.emptyStateTitle}>Start Searching</Text>
          <Text style={styles.emptyStateText}>
            Type a book title, author, or genre to begin
          </Text>
        </View>
      </Animated.View>
    );
  }

  // No results state
  if (results.length === 0) {
    return (
      <Animated.View
        style={[
          styles.container,
          { maxHeight },
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="book-outline" size={32} color="#71727A" />
          </View>
          <Text style={styles.emptyStateTitle}>No Books Found</Text>
          <Text style={styles.emptyStateText}>
            Try a different search term or check your spelling
          </Text>
        </View>
      </Animated.View>
    );
  }

  // Render book item
  const renderBookItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.bookItem,
        index === 0 && styles.firstBookItem,
        index === results.length - 1 && styles.lastBookItem,
      ]}
      onPress={() => onSelectBook(item)}
      activeOpacity={0.7}
    >
      <View style={styles.bookCoverContainer}>
        {item.coverUrl ? (
          <Image
            source={{ uri: item.coverUrl }}
            style={styles.bookCover}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.bookCoverPlaceholder}>
            <Ionicons name="book" size={24} color="#71727A" />
          </View>
        )}
      </View>

      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.bookAuthor} numberOfLines={1}>
          {item.author}
        </Text>

        {/* Rating Display */}
        {item.averageRating > 0 && (
          <View style={styles.ratingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(item.averageRating)}
            </View>
            <Text style={styles.ratingText}>
              {item.averageRating.toFixed(1)}
            </Text>
            {item.ratingsCount > 0 && (
              <Text style={styles.ratingsCount}>
                ({item.ratingsCount})
              </Text>
            )}
          </View>
        )}

        {/* Genres/Categories */}
        {item.categories && item.categories.length > 0 && (
          <View style={styles.genresContainer}>
            <Text style={styles.genreText} numberOfLines={1}>
              {item.categories.slice(0, 2).join(', ')}
            </Text>
          </View>
        )}
      </View>

      <Ionicons name="chevron-forward" size={20} color="#71727A" />
    </TouchableOpacity>
  );

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Ionicons key={i} name="star" size={12} color="#FFD700" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Ionicons key={i} name="star-half" size={12} color="#FFD700" />
        );
      } else {
        stars.push(
          <Ionicons key={i} name="star-outline" size={12} color="#D1D5DB" />
        );
      }
    }

    return stars;
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { maxHeight },
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {results.length} {results.length === 1 ? 'result' : 'results'} found
        </Text>
        <View style={styles.resultsBadge}>
          <Text style={styles.resultsBadgeText}>{results.length}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={styles.listContent}
        nestedScrollEnabled={true}
        bounces={true}
        scrollEventThrottle={16}
      >
        {results.map((item, index) => (
          <React.Fragment key={item.id}>
            {renderBookItem({ item, index })}
          </React.Fragment>
        ))}
      </ScrollView>

      {onSeeAll && results.length >= 10 && (
        <TouchableOpacity style={styles.seeAllButton} onPress={onSeeAll}>
          <Text style={styles.seeAllText}>See All Results</Text>
          <Ionicons name="arrow-forward" size={16} color="#481825" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#481825',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    marginTop: 60,
    overflow: 'hidden',
    zIndex: 1000,
    borderWidth: 1,
    borderColor: 'rgba(72, 24, 37, 0.08)',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F4F1',
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#71727A',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  resultsBadge: {
    backgroundColor: '#481825',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 32,
    alignItems: 'center',
  },
  resultsBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  listContent: {
    paddingVertical: 8,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F4F1',
    backgroundColor: '#FFFFFF',
  },
  firstBookItem: {
    paddingTop: 18,
  },
  lastBookItem: {
    borderBottomWidth: 0,
    paddingBottom: 18,
  },
  bookCoverContainer: {
    width: 56,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F6F4F1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookCover: {
    width: '100%',
    height: '100%',
  },
  bookCoverPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F4F1',
  },
  bookInfo: {
    flex: 1,
    gap: 6,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#481825',
    lineHeight: 21,
    letterSpacing: 0.2,
  },
  bookAuthor: {
    fontSize: 13,
    color: '#71727A',
    lineHeight: 18,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#481825',
  },
  ratingsCount: {
    fontSize: 12,
    color: '#71727A',
    fontWeight: '500',
  },
  genresContainer: {
    marginTop: 6,
  },
  genreText: {
    fontSize: 12,
    color: '#71727A',
    fontStyle: 'italic',
  },
  loadingContainer: {
    paddingVertical: 80,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  loadingText: {
    fontSize: 15,
    color: '#71727A',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  emptyStateContainer: {
    paddingVertical: 80,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F6F4F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#481825',
    letterSpacing: 0.2,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#71727A',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F6F4F1',
    gap: 8,
    backgroundColor: '#FAFAFA',
  },
  seeAllText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#481825',
    letterSpacing: 0.2,
  },
});

export default BookSearchResults;
