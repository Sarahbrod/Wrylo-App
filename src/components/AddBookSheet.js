import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height: screenHeight } = Dimensions.get('window');

const AddBookSheet = ({ visible, onClose, onAddBook }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [progress, setProgress] = useState('want_to_read');
  const [showManualForm, setShowManualForm] = useState(false);

  const progressOptions = [
    { id: 'want_to_read', label: 'Want to Read', icon: 'bookmark-outline' },
    { id: 'reading', label: 'Currently Reading', icon: 'book-outline' },
    { id: 'finished', label: 'Finished', icon: 'checkmark-circle-outline' },
    { id: 'did_not_finish', label: 'Did Not Finish', icon: 'close-circle-outline' },
  ];

  const handleSubmit = () => {
    const bookData = {
      id: Date.now(),
      title: bookTitle.trim() || 'Unknown Title',
      author: bookAuthor.trim() || 'Unknown Author',
      status: progress === 'want_to_read' ? 'wishlist' : progress === 'did_not_finish' ? 'dnf' : progress,
      rating,
      comment: comment.trim(),
      progress: progress === 'finished' ? 100 : progress === 'reading' ? 0 : 0,
      coverImage: 'https://via.placeholder.com/300x400/f0f0f0/999999?text=Book',
    };
    onAddBook(bookData);
    // Reset form
    setSearchQuery('');
    setBookTitle('');
    setBookAuthor('');
    setRating(0);
    setComment('');
    setProgress('want_to_read');
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
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheetContainer}>
          <View style={styles.header}>
            <View style={styles.dragHandle} />
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Add Book</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#71727A" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Search for Book</Text>
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#71727A" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Enter book title or author"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#71727A"
                />
              </View>
              <TouchableOpacity
                style={styles.manualButton}
                onPress={() => setShowManualForm(!showManualForm)}
              >
                <Ionicons name="book" size={16} color="#2E0A09" />
                <Text style={styles.manualButtonText}>Add Manually</Text>
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
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Title</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter book title"
                    value={bookTitle}
                    onChangeText={setBookTitle}
                    placeholderTextColor="#71727A"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Author</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter author name"
                    value={bookAuthor}
                    onChangeText={setBookAuthor}
                    placeholderTextColor="#71727A"
                  />
                </View>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    marginBottom: 12,
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
    backgroundColor: '#2E0A09',
    borderColor: '#2E0A09',
    shadowColor: '#2E0A09',
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
    flex: 1,
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
});

export default AddBookSheet;