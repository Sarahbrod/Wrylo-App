import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AddBookSheet from '../components/AddBookSheet';
import ReadingGoalsCard from '../components/ReadingGoalsCard';
import BookCoverCard from '../components/BookCoverCard';

const RecommendationsScreen = ({ navigation }) => {
  const [showAddBookSheet, setShowAddBookSheet] = useState(false);

  const handleAddBook = (bookData) => {
    console.log('Adding book:', bookData);
    // Handle book addition logic here
    // Navigate to library after adding
    navigation.navigate('Library');
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
      </View>

      {/* Mood-Based Recommendations Card */}
      <View style={styles.moodSection}>
        <TouchableOpacity
          style={styles.moodCard}
          onPress={() => navigation.navigate('MoodFlow')}
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
    marginBottom: 8,
    letterSpacing: -0.5,
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