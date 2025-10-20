import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddBookSheet from '../components/AddBookSheet';

const RecommendationsScreen = ({ navigation }) => {
  const [showAddBookSheet, setShowAddBookSheet] = useState(false);

  const handleAddBook = (bookData) => {
    console.log('Adding book:', bookData);
    // Handle book addition logic here
    // Navigate to library after adding
    navigation.navigate('Library');
  };

  const recommendationSections = [
    {
      title: 'Trending This Week',
      subtitle: 'Books everyone is talking about',
      icon: 'trending-up',
      color: '#FF6B6B',
    },
    {
      title: 'Based on Your Reading',
      subtitle: 'Personalized picks just for you',
      icon: 'heart',
      color: '#4ECDC4',
    },
    {
      title: 'New & Noteworthy',
      subtitle: 'Fresh releases worth reading',
      icon: 'flash',
      color: '#96CEB4',
    },
    {
      title: 'Award Winners',
      subtitle: 'Critically acclaimed books',
      icon: 'trophy',
      color: '#FECA57',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Discover</Text>
      </View>

      <View style={styles.sectionsContainer}>
        {recommendationSections.map((section, index) => (
          <TouchableOpacity key={index} style={styles.sectionCard}>
            <View style={[styles.sectionIcon, { backgroundColor: section.color }]}>
              <Ionicons name={section.icon} size={24} color="#FFFFFF" />
            </View>
            <View style={styles.sectionContent}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#71727A" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.comingSoonSection}>
        <View style={styles.comingSoonCard}>
          <Ionicons name="sparkles-outline" size={48} color="#71727A" />
          <Text style={styles.comingSoonTitle}>Smart Recommendations Coming Soon!</Text>
          <Text style={styles.comingSoonText}>
            We're building an AI-powered recommendation engine that will learn your preferences
            and suggest books you'll love based on your reading history and ratings.
          </Text>
          <TouchableOpacity
            style={styles.wishlistButton}
            onPress={() => setShowAddBookSheet(true)}
          >
            <Ionicons name="add" size={16} color="#FFFFFF" />
            <Text style={styles.wishlistButtonText}>Add Book</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    paddingTop: 80,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E0A09',
    fontFamily: 'Playfair Display',
    letterSpacing: 0.3,
  },
  sectionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  sectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
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
  },
  sectionContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E0A09',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#71727A',
    lineHeight: 18,
  },
  comingSoonSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  comingSoonCard: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 16,
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
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E0A09',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  comingSoonText: {
    fontSize: 14,
    color: '#71727A',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  wishlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E0A09',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  wishlistButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default RecommendationsScreen;