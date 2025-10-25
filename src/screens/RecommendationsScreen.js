import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AddBookSheet from '../components/AddBookSheet';
import ReadingGoalsCard from '../components/ReadingGoalsCard';
import BookCoverCard from '../components/BookCoverCard';
import BookSearchResults from '../components/BookSearchResults';
import { searchBooks } from '../services/bookService';
import { useDebounce } from '../utils/useDebounce';

const RecommendationsScreen = ({ navigation }) => {
  const [showAddBookSheet, setShowAddBookSheet] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Debounce the search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const handleAddBook = (bookData) => {
    console.log('Adding book:', bookData);
    // Handle book addition logic here
    // Navigate to library after adding
    navigation.navigate('Library');
  };

  // Effect to perform search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchQuery || debouncedSearchQuery.trim().length < 2) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      setShowResults(true);

      try {
        const results = await searchBooks(debouncedSearchQuery, 15);
        setSearchResults(results);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedSearchQuery]);

  // Handle search input change
  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (text.trim().length > 0) {
      setShowResults(true);
    }
  };

  // Handle book selection from search results
  const handleSelectBook = (book) => {
    console.log('Selected book:', book);
    setShowResults(false);
    setSearchQuery('');
    Keyboard.dismiss();
    // Navigate to book detail page
    navigation.navigate('BookDetail', { book });
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
    Keyboard.dismiss();
  };

  const trendingBooks = [
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      emoji: '📚',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg'
    },
    {
      id: 2,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      emoji: '🚀',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1597695864i/54493401.jpg'
    },
    {
      id: 3,
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      emoji: '✨',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1663805647i/32620332.jpg'
    },
    {
      id: 4,
      title: 'Fourth Wing',
      author: 'Rebecca Yarros',
      emoji: '🐉',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1701980900i/61431922.jpg'
    },
    {
      id: 5,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      emoji: '🎨',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1668782119i/40097951.jpg'
    },
    {
      id: 6,
      title: 'Atomic Habits',
      author: 'James Clear',
      emoji: '⚡',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg'
    },
  ];

  const personalizedBooks = [
    {
      id: 1,
      title: 'Tomorrow, and Tomorrow, and Tomorrow',
      author: 'Gabrielle Zevin',
      emoji: '🎮',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1636978687i/58784475.jpg'
    },
    {
      id: 2,
      title: 'Lessons in Chemistry',
      author: 'Bonnie Garmus',
      emoji: '🧪',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1634748496i/58065033.jpg'
    },
    {
      id: 3,
      title: 'The House in the Cerulean Sea',
      author: 'TJ Klune',
      emoji: '🏠',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1595335588i/45047384.jpg'
    },
    {
      id: 4,
      title: 'The Thursday Murder Club',
      author: 'Richard Osman',
      emoji: '🔍',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1583524047i/46000520.jpg'
    },
    {
      id: 5,
      title: 'Circe',
      author: 'Madeline Miller',
      emoji: '⚔️',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1565909496i/35959740.jpg'
    },
    {
      id: 6,
      title: 'The Song of Achilles',
      author: 'Madeline Miller',
      emoji: '🏺',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1620659080i/13623848.jpg'
    },
  ];

  const recommendationSections = [
    {
      title: 'New & Noteworthy',
      subtitle: 'Fresh releases worth reading',
      icon: 'flash',
      gradient: ['#7CA2E0', '#5B8DD6'],
    },
    {
      title: 'Award Winners',
      subtitle: 'Critically acclaimed books',
      icon: 'trophy',
      gradient: ['#EB5E3A', '#D94826'],
    },
  ];

  const renderBookPreview = (book) => (
    <BookCoverCard key={book.id} book={book} />
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Discover</Text>

        {/* Search Input */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#71727A" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search books, authors, genres..."
              placeholderTextColor="#71727A"
              value={searchQuery}
              onChangeText={handleSearchChange}
              onFocus={() => searchQuery.length > 0 && setShowResults(true)}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={handleClearSearch}>
                <Ionicons name="close-circle" size={20} color="#71727A" />
              </TouchableOpacity>
            )}
          </View>

          {/* Search Results Dropdown */}
          <BookSearchResults
            visible={showResults}
            results={searchResults}
            loading={isSearching}
            searchQuery={searchQuery}
            onSelectBook={handleSelectBook}
            maxHeight={450}
          />
        </View>
      </View>

      {/* Mood-Based Recommendations Card */}
      <View style={styles.moodSection}>
        <TouchableOpacity
          style={styles.moodCard}
          onPress={() => navigation.navigate('MoodFlow', { sourceTab: 'Discover' })}
        >
          <View style={styles.moodContent}>
            <View style={styles.moodIconContainer}>
              <Text style={styles.moodEmoji}>🎭</Text>
            </View>
            <View style={styles.moodTextContainer}>
              <Text style={styles.moodTitle}>Mood-Based Recommendations</Text>
              <Text style={styles.moodDescription}>Find books that match your current vibe</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#71727A" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Trending This Week Section */}
      <View style={styles.previewSection}>
        <View style={styles.previewHeader}>
          <View style={styles.previewHeaderLeft}>
            <View>
              <Text style={styles.previewTitle}>Trending This Week</Text>
              <Text style={styles.previewSubtitle}>Books everyone is talking about</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('CategoryDetail', {
              title: 'Trending This Week',
              subtitle: 'Books everyone is talking about',
              books: trendingBooks
            })}
          >
            <Ionicons name="chevron-forward" size={20} color="#71727A" />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.booksScrollContainer}
        >
          {trendingBooks.map(renderBookPreview)}
        </ScrollView>
      </View>

      {/* Based on Your Reading Section */}
      <View style={styles.previewSection}>
        <View style={styles.previewHeader}>
          <View style={styles.previewHeaderLeft}>
            <View>
              <Text style={styles.previewTitle}>Based on Your Reading</Text>
              <Text style={styles.previewSubtitle}>Personalized picks just for you</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('CategoryDetail', {
              title: 'Based on Your Reading',
              subtitle: 'Personalized picks just for you',
              books: personalizedBooks
            })}
          >
            <Ionicons name="chevron-forward" size={20} color="#71727A" />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.booksScrollContainer}
        >
          {personalizedBooks.map(renderBookPreview)}
        </ScrollView>
      </View>

      {/* Other Sections */}
      <View style={styles.sectionsContainer}>
        {recommendationSections.map((section, index) => (
          <TouchableOpacity
            key={index}
            style={styles.sectionCard}
            onPress={() => navigation.navigate('CategoryDetail', {
              title: section.title,
              subtitle: section.subtitle,
              books: trendingBooks // Using trending books as placeholder
            })}
          >
            <LinearGradient
              colors={section.gradient}
              style={styles.sectionIcon}
            >
              <Ionicons name={section.icon} size={24} color="#FFFFFF" />
            </LinearGradient>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#71727A" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Reading Goals Section */}
      <ReadingGoalsCard />

      <AddBookSheet
        visible={showAddBookSheet}
        onClose={() => setShowAddBookSheet(false)}
        onAddBook={handleAddBook}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F4F1',
  },
  contentContainer: {
    paddingBottom: 110,
  },
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#481825',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  searchWrapper: {
    position: 'relative',
    zIndex: 1000,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E8E6E3',
  },
  searchIcon: {
    marginRight: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#481825',
    paddingVertical: 0,
  },
  previewSection: {
    marginBottom: 32,
  },
  previewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  previewHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  previewIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#481825',
    marginBottom: 2,
  },
  previewSubtitle: {
    fontSize: 12,
    color: '#71727A',
  },
  booksScrollContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  sectionsContainer: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 32,
  },
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#481825',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#71727A',
    lineHeight: 18,
  },
  moodSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  moodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  moodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  moodIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F6F4F1',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodEmoji: {
    fontSize: 24,
  },
  moodTextContainer: {
    flex: 1,
  },
  moodTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#481825',
    marginBottom: 4,
  },
  moodDescription: {
    fontSize: 13,
    color: '#71727A',
    lineHeight: 18,
  },
});

export default RecommendationsScreen;