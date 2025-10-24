import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddBookSheet from '../components/AddBookSheet';

const HomeRefactored = ({ navigation }) => {
  const [showAddBookSheet, setShowAddBookSheet] = useState(false);
  const [books, setBooks] = useState([]);

  const handleAddBook = (bookData) => {
    setBooks([...books, bookData]);
    setShowAddBookSheet(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.content}>
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeHeader}>
            <View style={styles.iconCircle}>
              <Ionicons name="book" size={32} color="#2E0A09" />
            </View>
            <Text style={styles.welcomeTitle}>Welcome to Your Reading Space</Text>
            <Text style={styles.welcomeSubtext}>
              Track your reading journey and discover new literary adventures
            </Text>
          </View>

          <View style={styles.stepsContainer}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Add Your First Book</Text>
                <Text style={styles.stepDescription}>Start building your personal library collection</Text>
              </View>
            </View>

            <View style={styles.stepDivider} />

            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Track Your Progress</Text>
                <Text style={styles.stepDescription}>Monitor reading goals and celebrate milestones</Text>
              </View>
            </View>

            <View style={styles.stepDivider} />

            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Join the Community</Text>
                <Text style={styles.stepDescription}>Connect with readers and share recommendations</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => setShowAddBookSheet(true)}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.featuresGrid}>
          <TouchableOpacity style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="library" size={28} color="#8B4513" />
            </View>
            <Text style={styles.featureTitle}>My Library</Text>
            <Text style={styles.featureDescription}>Organize your books</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="stats-chart" size={28} color="#4A5568" />
            </View>
            <Text style={styles.featureTitle}>Reading Stats</Text>
            <Text style={styles.featureDescription}>Track your progress</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="compass" size={28} color="#2C5282" />
            </View>
            <Text style={styles.featureTitle}>Discover</Text>
            <Text style={styles.featureDescription}>Find new books</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="people" size={28} color="#2F855A" />
            </View>
            <Text style={styles.featureTitle}>Community</Text>
            <Text style={styles.featureDescription}>Connect with readers</Text>
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
    backgroundColor: '#F8F9FA',
  },
  contentContainer: {
    paddingBottom: 110,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  welcomeCard: {
    backgroundColor: '#FFFFFF',
    padding: 32,
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  welcomeHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F8F4F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E8DFD7',
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E0A09',
    marginBottom: 10,
    fontFamily: 'Playfair Display',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  welcomeSubtext: {
    fontSize: 15,
    color: '#71727A',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  stepsContainer: {
    marginBottom: 32,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2E0A09',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    marginTop: 2,
    shadowColor: '#2E0A09',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
    paddingTop: 4,
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2E0A09',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#71727A',
    lineHeight: 20,
  },
  stepDivider: {
    width: 2,
    height: 20,
    backgroundColor: '#E8E8E8',
    marginLeft: 17,
    marginVertical: 8,
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E0A09',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#2E0A09',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  getStartedButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  featureCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  featureIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2E0A09',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#71727A',
    textAlign: 'center',
  },
});

export default HomeRefactored;