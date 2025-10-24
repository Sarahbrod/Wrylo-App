import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
  Keyboard,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BookSearchResults from './BookSearchResults';
import { searchBooks } from '../services/bookService';
import { useDebounce } from '../utils/useDebounce';

const { height: screenHeight } = Dimensions.get('window');

const AddBookSheet = ({ visible, onClose, onAddBook, existingBooks = [], prefilledBook = null }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [progress, setProgress] = useState('want_to_read');
  const [showManualForm, setShowManualForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [duplicateMessage, setDuplicateMessage] = useState('');

  // Debounce the search query
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Handle prefilled book from recommendations
  useEffect(() => {
    if (prefilledBook && visible) {
      setSelectedBook(prefilledBook);
      setBookTitle(prefilledBook.title || '');
      setBookAuthor(prefilledBook.author || '');
      setShowManualForm(true);
      setShowResults(false);
      setSearchQuery('');
    }
  }, [prefilledBook, visible]);

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
        const results = await searchBooks(debouncedSearchQuery, 12);
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

  const progressOptions = [
    { id: 'want_to_read', label: 'Want to Read', icon: 'bookmark-outline' },
    { id: 'reading', label: 'Currently Reading', icon: 'book-outline' },
    { id: 'finished', label: 'Finished', icon: 'checkmark-circle-outline' },
    { id: 'did_not_finish', label: 'Did Not Finish', icon: 'close-circle-outline' },
  ];

  // Handle search input change
  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (text.trim().length > 0) {
      setShowResults(true);
      setShowManualForm(false);
    }
  };

  // Handle book selection from search results
  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setBookTitle(book.title);
    setBookAuthor(book.author);
    setSearchQuery('');
    setShowResults(false);
    setShowManualForm(true);
    Keyboard.dismiss();
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    // Clear previous messages
    setSuccessMessage('');
    setDuplicateMessage('');

    // Check for duplicate book
    const isDuplicate = existingBooks.some(book => {
      // Check by Google Books ID if available
      if (selectedBook?.googleBooksId && book.googleBooksId) {
        return book.googleBooksId === selectedBook.googleBooksId;
      }
      // Otherwise check by title and author
      return (
        book.title.toLowerCase().trim() === bookTitle.toLowerCase().trim() &&
        book.author.toLowerCase().trim() === bookAuthor.toLowerCase().trim()
      );
    });

    if (isDuplicate) {
      setDuplicateMessage('You have already added this book to your library!');
      // Auto-hide duplicate message after 5 seconds
      setTimeout(() => setDuplicateMessage(''), 5000);
      return;
    }

    const bookData = {
      id: Date.now(),
      googleBooksId: selectedBook?.googleBooksId || null,
      title: bookTitle.trim() || 'Unknown Title',
      author: bookAuthor.trim() || 'Unknown Author',
      status: progress === 'want_to_read' ? 'wishlist' : progress === 'did_not_finish' ? 'dnf' : progress,
      rating,
      comment: comment.trim(),
      progress: progress === 'finished' ? 100 : progress === 'reading' ? 0 : 0,
      coverImage: selectedBook?.coverUrl || 'https://via.placeholder.com/300x400/f0f0f0/999999?text=Book',
      coverUrl: selectedBook?.coverUrl || '',
      description: selectedBook?.description || '',
      pageCount: selectedBook?.pageCount || 0,
      categories: selectedBook?.categories || [],
      publishedDate: selectedBook?.publishedDate || '',
    };
    onAddBook(bookData);

    // Show success message
    setSuccessMessage('Book added successfully! Add more books below.');

    // Reset form but keep the modal open
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
    setBookTitle('');
    setBookAuthor('');
    setRating(0);
    setComment('');
    setProgress('want_to_read');
    setShowManualForm(false);
    setSelectedBook(null);

    // Auto-hide success message after 5 seconds
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const resetForm = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
    setBookTitle('');
    setBookAuthor('');
    setRating(0);
    setComment('');
    setProgress('want_to_read');
    setShowManualForm(false);
    setSelectedBook(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const getStarIcon = (starPosition) => {
    if (rating >= starPosition) {
      return 'star';
    } else if (rating >= starPosition - 0.5) {
      return 'star-half';
    } else {
      return 'star-outline';
    }
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => {
              if (rating === star) {
                setRating(star - 0.5);
              } else if (rating === star - 0.5) {
                setRating(0);
              } else {
                setRating(star);
              }
            }}
            style={styles.starTouchable}
            activeOpacity={0.7}
          >
            <Ionicons
              name={getStarIcon(star)}
              size={32}
              color={rating >= star - 0.5 ? '#FFD700' : '#71727A'}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          <View style={styles.header}>
            <View style={styles.dragHandle} />
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Add Book</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#71727A" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Success Message */}
          {successMessage ? (
            <View style={styles.successMessageContainer}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.successMessageText}>{successMessage}</Text>
            </View>
          ) : null}

          {/* Duplicate Message */}
          {duplicateMessage ? (
            <View style={styles.duplicateMessageContainer}>
              <Ionicons name="alert-circle" size={20} color="#F59E0B" />
              <Text style={styles.duplicateMessageText}>{duplicateMessage}</Text>
            </View>
          ) : null}

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Search for Book</Text>
              <View style={styles.searchWrapper}>
                <View style={styles.searchContainer}>
                  <Ionicons name="search" size={20} color="#71727A" style={styles.searchIcon} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Enter book title or author"
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                    placeholderTextColor="#71727A"
                    onFocus={() => searchQuery.length > 0 && setShowResults(true)}
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={handleClearSearch}>
                      <Ionicons name="close-circle" size={20} color="#71727A" />
                    </TouchableOpacity>
                  )}
                </View>

                {/* Search Results */}
                <BookSearchResults
                  visible={showResults}
                  results={searchResults}
                  loading={isSearching}
                  searchQuery={searchQuery}
                  onSelectBook={handleSelectBook}
                  maxHeight={300}
                />
              </View>

              <TouchableOpacity
                style={styles.manualButton}
                onPress={() => {
                  setShowManualForm(!showManualForm);
                  setShowResults(false);
                  setSearchQuery('');
                }}
              >
                <Ionicons name="book" size={16} color="#2E0A09" />
                <Text style={styles.manualButtonText}>
                  {showManualForm ? 'Hide Manual Entry' : 'Add Manually'}
                </Text>
                <Ionicons
                  name={showManualForm ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#2E0A09"
                />
              </TouchableOpacity>
            </View>

            {showManualForm && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Book Details</Text>

                {/* Horizontal Book Card with Image Left */}
                {selectedBook && selectedBook.coverUrl ? (
                  <View style={styles.bookCardHorizontalLayout}>
                    <View style={styles.bookCoverContainerLeft}>
                      <Image
                        source={{ uri: selectedBook.coverUrl }}
                        style={styles.bookCoverImageLeft}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={styles.bookInfoRight}>
                      <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Title</Text>
                        <TextInput
                          style={styles.textInputWhite}
                          placeholder="Enter book title"
                          value={bookTitle}
                          onChangeText={setBookTitle}
                          placeholderTextColor="#71727A"
                        />
                      </View>
                      <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Author</Text>
                        <TextInput
                          style={styles.textInputWhite}
                          placeholder="Enter author name"
                          value={bookAuthor}
                          onChangeText={setBookAuthor}
                          placeholderTextColor="#71727A"
                        />
                      </View>
                    </View>
                  </View>
                ) : (
                  <View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Title</Text>
                      <TextInput
                        style={styles.textInputWhite}
                        placeholder="Enter book title"
                        value={bookTitle}
                        onChangeText={setBookTitle}
                        placeholderTextColor="#71727A"
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>Author</Text>
                      <TextInput
                        style={styles.textInputWhite}
                        placeholder="Enter author name"
                        value={bookAuthor}
                        onChangeText={setBookAuthor}
                        placeholderTextColor="#71727A"
                      />
                    </View>
                  </View>
                )}
              </View>
            )}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Reading Status</Text>
              <View style={styles.progressOptions}>
                {progressOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.progressOption,
                      progress === option.id && styles.selectedProgressOption,
                    ]}
                    onPress={() => setProgress(option.id)}
                  >
                    <Ionicons
                      name={option.icon}
                      size={20}
                      color={progress === option.id ? '#FFFFFF' : '#71727A'}
                    />
                    <Text
                      style={[
                        styles.progressOptionText,
                        progress === option.id && styles.selectedProgressOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rating</Text>
              {renderStars()}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Comment (Optional)</Text>
              <TextInput
                style={styles.commentInput}
                placeholder="Share your thoughts about this book..."
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={4}
                placeholderTextColor="#71727A"
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Ionicons name="add" size={20} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Add Book</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: screenHeight * 0.85,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E0A09',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E0A09',
    marginBottom: 12,
  },
  searchWrapper: {
    position: 'relative',
    zIndex: 1000,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2E0A09',
  },
  manualButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  manualButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E0A09',
  },
  inputContainer: {
    marginBottom: 0,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E0A09',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2E0A09',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textInputWhite: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2E0A09',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  progressOptions: {
    gap: 12,
  },
  progressOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    gap: 14,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedProgressOption: {
    backgroundColor: '#B4A5D6',
    borderColor: '#B4A5D6',
    shadowColor: '#B4A5D6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    transform: [{ scale: 1.02 }],
  },
  progressOptionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
  },
  selectedProgressOptionText: {
    color: '#FFFFFF',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  starTouchable: {
    padding: 4,
  },
  commentInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2E0A09',
    textAlignVertical: 'top',
    minHeight: 80,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E0A09',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 12,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  submitButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  bookCardHorizontal: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    gap: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  bookCoverContainerSmall: {
    width: 60,
    height: 90,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookCoverImageSmall: {
    width: '100%',
    height: '100%',
  },
  bookInfoHorizontal: {
    flex: 1,
    gap: 8,
  },
  bookCardVertical: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  bookCoverContainerCentered: {
    width: 120,
    height: 180,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
  },
  bookCoverImageCentered: {
    width: '100%',
    height: '100%',
  },
  bookInfoVertical: {
    width: '100%',
    gap: 12,
  },
  bookCardHorizontalLayout: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    gap: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  bookCoverContainerLeft: {
    width: 100,
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  bookCoverImageLeft: {
    width: '100%',
    height: '100%',
  },
  bookInfoRight: {
    flex: 1,
    gap: 12,
  },
  successMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  successMessageText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#065F46',
  },
  duplicateMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 8,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  duplicateMessageText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  },
});

export default AddBookSheet;