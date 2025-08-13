import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RecommendationsScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('trending');

  const categories = [
    { id: 'trending', label: 'Trending', icon: 'trending-up' },
    { id: 'popular', label: 'Popular', icon: 'star' },
    { id: 'new', label: 'New Releases', icon: 'flash' },
    { id: 'genres', label: 'By Genre', icon: 'library' },
  ];

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
      title: 'Staff Picks',
      subtitle: 'Curated by our book experts',
      icon: 'star',
      color: '#45B7D1',
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
      <View style={styles.header}>
        <Text style={styles.title}>For You</Text>
        <Text style={styles.subtitle}>Discover your next great read</Text>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryChip, activeCategory === category.id && styles.activeCategoryChip]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Ionicons 
                name={category.icon} 
                size={18} 
                color={activeCategory === category.id ? '#FFFFFF' : '#71727A'} 
              />
              <Text style={[styles.categoryText, activeCategory === category.id && styles.activeCategoryText]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
          <TouchableOpacity style={styles.wishlistButton}>
            <Ionicons name="heart-outline" size={16} color="#FFFFFF" />
            <Text style={styles.wishlistButtonText}>Build Your Wishlist</Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
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