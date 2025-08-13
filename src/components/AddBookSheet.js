import React, { useState } from 'react';
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
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [progress, setProgress] = useState('want_to_read');

  const progressOptions = [
    { id: 'want_to_read', label: 'Want to Read', icon: 'bookmark-outline' },
    { id: 'reading', label: 'Currently Reading', icon: 'book-outline' },
    { id: 'finished', label: 'Finished', icon: 'checkmark-circle-outline' },
    { id: 'did_not_finish', label: 'Did Not Finish', icon: 'close-circle-outline' },
  ];

  const handleSubmit = () => {
    const bookData = {
      searchQuery,
      rating,
      comment,
      progress,
    };
    onAddBook(bookData);
    // Reset form
    setSearchQuery('');
    setRating(0);
    setComment('');
    setProgress('want_to_read');
    onClose();
  };

  const renderStars = () => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            style={styles.starButton}
          >
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={32}
              color={star <= rating ? '#FFD700' : '#71727A'}
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
            </View>

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

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
    maxHeight: screenHeight * 0.9,
    minHeight: screenHeight * 0.6,
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
  },
  section: {
    marginBottom: 24,
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
  progressOptions: {
    gap: 8,
  },
  progressOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  selectedProgressOption: {
    backgroundColor: '#2E0A09',
  },
  progressOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#71727A',
  },
  selectedProgressOptionText: {
    color: '#FFFFFF',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  commentInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2E0A09',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E0A09',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default AddBookSheet;