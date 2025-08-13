import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddBookSheet from '../components/AddBookSheet';

const Home = ({ navigation }) => {
  const [showAddBookSheet, setShowAddBookSheet] = useState(false);

  const handleAddBook = (bookData) => {
    console.log('Adding book:', bookData);
    // Handle book addition logic here
    // Navigate to library after adding
    navigation.navigate('Library');
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Continue your reading journey</Text>
        </View>

        <View style={styles.featuresSection}>
          <TouchableOpacity
            style={styles.featureCard}
            onPress={() => navigation.navigate('BookForum')}
          >
            <View style={styles.featureIconContainer}>
              <Ionicons name="star" size={32} color="#FFFFFF" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Rate Books</Text>
              <Text style={styles.featureSubtitle}>Share your thoughts and rate your reads</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.discoveryCard}
            onPress={() => setShowAddBookSheet(true)}
          >
            <View style={styles.discoveryIconContainer}>
              <Ionicons name="add" size={32} color="#FFFFFF" />
            </View>
            <View style={styles.discoveryContent}>
              <Text style={styles.discoveryTitle}>Add Book</Text>
              <Text style={styles.discoverySubtitle}>Track a new book in your library</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.moodSection}>
          <TouchableOpacity
            style={styles.moodCard}
            onPress={() => navigation.navigate('MoodFlow')}
          >
            <View style={styles.moodIconContainer}>
              <Ionicons name="color-palette" size={32} color="#FFFFFF" />
            </View>
            <View style={styles.moodContent}>
              <Text style={styles.moodTitle}>Mood-Based Recommendations</Text>
              <Text style={styles.moodSubtitle}>Discover books that match your current mood</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <AddBookSheet
        visible={showAddBookSheet}
        onClose={() => setShowAddBookSheet(false)}
        onAddBook={handleAddBook}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    paddingBottom: 110, // Space for floating navigation
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
    color: '#2E0A09',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#71727A',
  },
  featuresSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },
  discoveryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ECDC4',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  discoveryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  discoveryContent: {
    flex: 1,
  },
  discoveryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  discoverySubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },
  moodSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  moodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E0A09',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },

  moodIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  moodContent: {
    flex: 1,
  },
  moodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  moodSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
  },

});

export default Home;