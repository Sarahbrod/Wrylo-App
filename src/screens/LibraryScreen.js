import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LibraryScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('all');

  // Sample book data - in a real app this would come from a database/API
  const sampleBooks = [
    {
      id: 1,
      title: 'The Seven Husbands of Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      status: 'finished',
      rating: 5,
      progress: 100,
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      status: 'reading',
      rating: 0,
      progress: 65,
    },
    {
      id: 3,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      status: 'wishlist',
      rating: 0,
      progress: 0,
    },
  ];

  const getFilteredBooks = () => {
    if (activeTab === 'all') return sampleBooks;
    return sampleBooks.filter(book => book.status === activeTab);
  };

  const renderStars = (rating) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={12}
            color={star <= rating ? '#FFD700' : '#E0E0E0'}
          />
        ))}
      </View>
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'reading': return 'book';
      case 'finished': return 'checkmark-circle';
      case 'wishlist': return 'heart';
      default: return 'library';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'reading': return '#4ECDC4';
      case 'finished': return '#96CEB4';
      case 'wishlist': return '#FF6B6B';
      default: return '#71727A';
    }
  };

  const tabs = [
    { id: 'all', label: 'All Books', icon: 'library' },
    { id: 'reading', label: 'Reading', icon: 'book' },
    { id: 'finished', label: 'Finished', icon: 'checkmark-circle' },
    { id: 'wishlist', label: 'Wishlist', icon: 'heart' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>My Library</Text>
        <Text style={styles.subtitle}>Organize and track your reading journey</Text>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.categoryChip, activeTab === tab.id && styles.activeCategoryChip]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Ionicons
                name={tab.icon}
                size={18}
                color={activeTab === tab.id ? '#FFFFFF' : '#71727A'}
              />
              <Text style={[styles.categoryText, activeTab === tab.id && styles.activeCategoryText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.content}>
        {getFilteredBooks().length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={48} color="#71727A" />
            <Text style={styles.emptyTitle}>No books found</Text>
            <Text style={styles.emptySubtext}>
              No books in this category yet. Add some books to get started!
            </Text>
          </View>
        ) : (
          getFilteredBooks().map((book) => (
            <View key={book.id} style={styles.bookCard}>
              <View style={styles.bookHeader}>
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookAuthor}>by {book.author}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(book.status) }]}>
                  <Ionicons name={getStatusIcon(book.status)} size={16} color="#FFFFFF" />
                </View>
              </View>
              
              {book.rating > 0 && (
                <View style={styles.ratingSection}>
                  <Text style={styles.ratingLabel}>Your Rating:</Text>
                  {renderStars(book.rating)}
                </View>
              )}
              
              {book.status === 'reading' && (
                <View style={styles.progressSection}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>Progress</Text>
                    <Text style={styles.progressText}>{book.progress}%</Text>
                  </View>
                  <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${book.progress}%` }]} />
                  </View>
                </View>
              )}
              
              <TouchableOpacity style={styles.viewBookButton}>
                <Text style={styles.viewBookButtonText}>View Details</Text>
                <Ionicons name="chevron-forward" size={16} color="#2E0A09" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    paddingBottom: 110,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: '#F8F9FA',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#130504ff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#71727A',
  },
  categoriesContainer: {
    paddingVertical: 20,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activeCategoryChip: {
    backgroundColor: '#2E0A09',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#71727A',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    borderRadius: 16,
    marginBottom: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E0A09',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#71727A',
    textAlign: 'center',
    lineHeight: 20,
  },
  bookCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookInfo: {
    flex: 1,
    marginRight: 12,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E0A09',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#71727A',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#71727A',
    fontWeight: '500',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  progressSection: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#71727A',
    fontWeight: '500',
  },
  progressText: {
    fontSize: 14,
    color: '#2E0A09',
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 3,
  },
  viewBookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F9FA',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 4,
  },
  viewBookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E0A09',
  },
});

export default LibraryScreen;