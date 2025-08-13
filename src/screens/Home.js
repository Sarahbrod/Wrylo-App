import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning</Text>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Continue your reading journey</Text>
      </View>
      
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => navigation.navigate('Library')}
        >
          <Ionicons name="library" size={24} color="#2E0A09" />
          <Text style={styles.actionText}>My Library</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => navigation.navigate('Forum')}
        >
          <Ionicons name="chatbubbles" size={24} color="#2E0A09" />
          <Text style={styles.actionText}>Forum</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionCard}
          onPress={() => navigation.navigate('Discover')}
        >
          <Ionicons name="compass" size={24} color="#2E0A09" />
          <Text style={styles.actionText}>Discover</Text>
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

      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Continue Reading</Text>
        <View style={styles.placeholder}>
          <Ionicons name="book-outline" size={48} color="#71727A" />
          <Text style={styles.placeholderText}>No books in progress</Text>
          <Text style={styles.placeholderSubtext}>Start reading to see your progress here</Text>
          <TouchableOpacity 
            style={styles.addBookButton}
            onPress={() => navigation.navigate('Library')}
          >
            <Ionicons name="add" size={20} color="#FFFFFF" />
            <Text style={styles.addBookButtonText}>Add Book</Text>
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
    paddingBottom: 110, // Space for floating navigation
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#71727A',
    marginBottom: 4,
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
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
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
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E0A09',
    marginTop: 8,
  },
  recentSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E0A09',
    marginBottom: 16,
  },
  placeholder: {
    backgroundColor: '#FFFFFF',
    padding: 40,
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
  placeholderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#71727A',
    marginTop: 12,
    textAlign: 'center',
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
    marginBottom: 20,
    textAlign: 'center',
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
  addBookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E0A09',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  addBookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Home;