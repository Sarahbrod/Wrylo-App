import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CommunityScreen = ({ navigation }) => {
  const communityFeatures = [
    {
      icon: 'chatbubbles',
      title: 'Book Discussions',
      subtitle: 'Join conversations about your favorite books',
      color: '#FF6B6B',
    },
    {
      icon: 'people',
      title: 'Reading Groups',
      subtitle: 'Find local and online book clubs',
      color: '#4ECDC4',
    },
    {
      icon: 'star',
      title: 'Reviews & Ratings',
      subtitle: 'Share your thoughts and discover new books',
      color: '#45B7D1',
    },
    {
      icon: 'trophy',
      title: 'Reading Challenges',
      subtitle: 'Compete with friends and track progress',
      color: '#96CEB4',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.featuresContainer}>
        {communityFeatures.map((feature, index) => (
          <TouchableOpacity key={index} style={styles.featureCard}>
            <View style={[styles.iconContainer, { backgroundColor: feature.color }]}>
              <Ionicons name={feature.icon} size={24} color="#FFFFFF" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#71727A" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.comingSoonSection}>
        <View style={styles.comingSoonCard}>
          <Ionicons name="rocket-outline" size={48} color="#71727A" />
          <Text style={styles.comingSoonTitle}>Community Features Coming Soon!</Text>
          <Text style={styles.comingSoonText}>
            We're building an amazing community experience where you can connect with other readers,
            share recommendations, and discover your next favorite book together.
          </Text>
          <TouchableOpacity style={styles.notifyButton}>
            <Ionicons name="notifications" size={16} color="#FFFFFF" />
            <Text style={styles.notifyButtonText}>Notify Me When Ready</Text>
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
  featuresContainer: {
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 20,
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E0A09',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 14,
    color: '#71727A',
    lineHeight: 18,
  },
  comingSoonSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  comingSoonCard: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  comingSoonTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E0A09',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'Playfair Display',
    letterSpacing: 0.3,
  },
  comingSoonText: {
    fontSize: 14,
    color: '#71727A',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  notifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E0A09',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    shadowColor: '#2E0A09',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  notifyButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});

export default CommunityScreen;