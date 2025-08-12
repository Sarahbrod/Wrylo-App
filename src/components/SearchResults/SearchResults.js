import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSearch } from '../../context/SearchContext';
import { colors, typography, spacing } from '../../styles/theme';
import { styles } from './SearchResults.styles';

const SearchResults = ({ 
  onBookPress,
  onLoadMore,
  showHeader = true,
  numColumns = 1,
  style,
}) => {
  const {
    searchResults,
    searchQuery,
    isSearching,
    selectedFilters,
  } = useSearch();

  const generateBookCover = (title, author) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    const colorIndex = (title.length + author.length) % colors.length;
    const initials = title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
    
    return {
      backgroundColor: colors[colorIndex],
      initials,
    };
  };

  const renderBookItem = ({ item, index }) => {
    const coverData = generateBookCover(item.title, item.author);
    
    return (
      <TouchableOpacity
        style={[
          styles.bookItem,
          numColumns > 1 && styles.bookItemGrid,
        ]}
        onPress={() => onBookPress && onBookPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.bookCoverContainer}>
          {item.coverImageUrl ? (
            <Image
              source={{ uri: item.coverImageUrl }}
              style={styles.bookCover}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.bookCoverPlaceholder, { backgroundColor: coverData.backgroundColor }]}>
              <Text style={styles.bookCoverInitials}>{coverData.initials}</Text>
            </View>
          )}
        </View>

        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle} numberOfLines={2}>
            {item.title}
          </Text>
          
          <Text style={styles.bookAuthor} numberOfLines={1}>
            {item.author}
          </Text>

          <View style={styles.bookMetadata}>
            <Text style={styles.bookGenre} numberOfLines={1}>
              {item.genre}
            </Text>
            
            {item.rating && (
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={12} color={colors.warning} />
                <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
              </View>
            )}
          </View>

          {item.description && (
            <Text style={styles.bookDescription} numberOfLines={2}>
              {item.description}
            </Text>
          )}

          {item.tags && item.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {item.tags.slice(0, 3).map((tag, tagIndex) => (
                <View key={tagIndex} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    if (!showHeader) return null;

    const hasActiveFilters = Object.values(selectedFilters).some(filter => 
      Array.isArray(filter) ? filter.length > 0 : filter !== null
    );

    return (
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.resultsTitle}>
            Search Results
          </Text>
          
          <Text style={styles.resultsCount}>
            {searchResults.length} book{searchResults.length !== 1 ? 's' : ''}
          </Text>
        </View>
        
        {searchQuery && (
          <Text style={styles.searchQuery}>
            for "{searchQuery}"
          </Text>
        )}

        {hasActiveFilters && (
          <View style={styles.filtersContainer}>
            {selectedFilters.genre?.map((genre, index) => (
              <View key={`genre-${index}`} style={styles.filterPill}>
                <Text style={styles.filterPillText}>{genre}</Text>
              </View>
            ))}
            
            {selectedFilters.mood?.map((mood, index) => (
              <View key={`mood-${index}`} style={styles.filterPill}>
                <Text style={styles.filterPillText}>{mood}</Text>
              </View>
            ))}
            
            {selectedFilters.rating && (
              <View style={styles.filterPill}>
                <Text style={styles.filterPillText}>
                  {selectedFilters.rating}+ stars
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Ionicons 
        name="search-outline" 
        size={64} 
        color={colors.onSurfaceVariant} 
        style={styles.emptyStateIcon}
      />
      
      <Text style={styles.emptyStateTitle}>
        {searchQuery ? 'No books found' : 'Start searching'}
      </Text>
      
      <Text style={styles.emptyStateSubtitle}>
        {searchQuery 
          ? `Try adjusting your search terms or filters`
          : 'Search for books, authors, or genres to discover your next great read'
        }
      </Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.loadingText}>Searching books...</Text>
    </View>
  );

  if (isSearching) {
    return renderLoadingState();
  }

  if (searchResults.length === 0) {
    return renderEmptyState();
  }

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={searchResults}
        renderItem={renderBookItem}
        keyExtractor={(item) => `search-result-${item.id}`}
        ListHeaderComponent={renderHeader}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.1}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default SearchResults;