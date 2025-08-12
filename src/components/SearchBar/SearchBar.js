import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Keyboard,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSearch } from '../../context/SearchContext';
import { colors, typography, spacing } from '../../styles/theme';
import { styles } from './SearchBar.styles';

const SearchBar = ({
  placeholder = 'Search books, authors, genres...',
  onSearchPress,
  showFilters = true,
  showSuggestions = true,
  autoFocus = false,
  style,
}) => {
  const {
    searchQuery,
    suggestions,
    searchHistory,
    isSearching,
    performSearch,
    getSuggestions,
    clearSearch,
    getRecentSearches,
  } = useSearch();

  const [localQuery, setLocalQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const dropdownHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (localQuery.length >= 2) {
      // Debounce suggestions
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      
      debounceRef.current = setTimeout(() => {
        getSuggestions(localQuery);
      }, 300);
    } else {
      getSuggestions('');
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [localQuery, getSuggestions]);

  useEffect(() => {
    const shouldShow = isFocused && (suggestions.length > 0 || getRecentSearches().length > 0);
    setShowDropdown(shouldShow);
    
    Animated.timing(dropdownHeight, {
      toValue: shouldShow ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, suggestions, searchHistory]);

  const handleSearch = (query = localQuery) => {
    if (query.trim()) {
      performSearch(query.trim());
      setShowDropdown(false);
      Keyboard.dismiss();
      
      if (onSearchPress) {
        onSearchPress(query.trim());
      }
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setLocalQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleClear = () => {
    setLocalQuery('');
    clearSearch();
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay hiding dropdown to allow suggestion taps
    setTimeout(() => {
      setIsFocused(false);
    }, 150);
  };

  const renderSuggestionItem = ({ item, index }) => {
    const isRecent = !suggestions.includes(item);
    
    return (
      <TouchableOpacity
        style={styles.suggestionItem}
        onPress={() => handleSuggestionPress(item)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={isRecent ? 'time-outline' : 'search-outline'}
          size={16}
          color={colors.onSurfaceVariant}
          style={styles.suggestionIcon}
        />
        <Text style={styles.suggestionText} numberOfLines={1}>
          {item}
        </Text>
        {isRecent && (
          <Text style={styles.recentLabel}>Recent</Text>
        )}
      </TouchableOpacity>
    );
  };

  const getSuggestionData = () => {
    const recentSearches = getRecentSearches();
    
    if (localQuery.length >= 2) {
      return suggestions;
    } else if (isFocused && recentSearches.length > 0) {
      return recentSearches;
    }
    
    return [];
  };

  const suggestionData = getSuggestionData();

  return (
    <View style={[styles.container, style]}>
      <View style={[
        styles.searchInputContainer,
        isFocused && styles.searchInputContainerFocused,
      ]}>
        <Ionicons
          name="search"
          size={20}
          color={colors.onSurfaceVariant}
          style={styles.searchIcon}
        />
        
        <TextInput
          ref={inputRef}
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor={colors.onSurfaceVariant}
          value={localQuery}
          onChangeText={setLocalQuery}
          onSubmitEditing={() => handleSearch()}
          onFocus={handleFocus}
          onBlur={handleBlur}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          autoFocus={autoFocus}
        />

        {(localQuery.length > 0 || isSearching) && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={isSearching ? undefined : handleClear}
            activeOpacity={0.7}
          >
            {isSearching ? (
              <Animated.View
                style={[
                  styles.loadingIndicator,
                  {
                    transform: [{
                      rotate: dropdownHeight.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    }],
                  },
                ]}
              >
                <Ionicons name="refresh" size={16} color={colors.onSurfaceVariant} />
              </Animated.View>
            ) : (
              <Ionicons name="close" size={16} color={colors.onSurfaceVariant} />
            )}
          </TouchableOpacity>
        )}

        {showFilters && (
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              // This would open a filter modal/screen
              // TODO: Implement filter modal
            }}
            activeOpacity={0.7}
          >
            <Ionicons
              name="options-outline"
              size={20}
              color={colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        )}
      </View>

      {showSuggestions && (
        <Animated.View
          style={[
            styles.suggestionsContainer,
            {
              maxHeight: dropdownHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 200],
              }),
              opacity: dropdownHeight,
            },
          ]}
        >
          {suggestionData.length > 0 && (
            <FlatList
              data={suggestionData}
              renderItem={renderSuggestionItem}
              keyExtractor={(item, index) => `suggestion-${index}-${item}`}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              style={styles.suggestionsList}
            />
          )}
        </Animated.View>
      )}
    </View>
  );
};

export default SearchBar;