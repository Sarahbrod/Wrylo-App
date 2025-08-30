import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Home = ({ navigation }) => {

  const onTrackReading = () => {
    navigation.navigate('Library');
  };

  const onViewLibrary = () => {
    navigation.navigate('Library');
  };

  const onMoodMatcher = () => {
    navigation.navigate('MoodFlow');
  };

  const onJoinCommunity = () => {
    navigation.navigate('Forum');
  };


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Home</Text>
          <Text style={styles.subtitle}>Welcome back to your reading journey</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.getStartedSection}>
            <View style={styles.sectionHeaderSimple}>
              <Text style={styles.sectionTitle}>Get started</Text>
            </View>
            <View style={styles.verticalCardContainer}>
              <TouchableOpacity style={styles.getStartedCard} onPress={onTrackReading}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Add Books</Text>
                  <Text style={styles.cardDesc}>Start building your library</Text>
                </View>
                <View style={styles.arrowButton}>
                  <Text style={styles.arrowButtonText}>→</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.getStartedCard} onPress={onViewLibrary}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Set Goals</Text>
                  <Text style={styles.cardDesc}>Create reading targets</Text>
                </View>
                <View style={styles.arrowButton}>
                  <Text style={styles.arrowButtonText}>→</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.getStartedCard} onPress={onViewLibrary}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>Rate Books</Text>
                  <Text style={styles.cardDesc}>Share your thoughts</Text>
                </View>
                <View style={styles.arrowButton}>
                  <Text style={styles.arrowButtonText}>→</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionWithExtraPadding}>
            <View style={styles.sectionHeaderReduced}>
              <Text style={styles.sectionTitle}>Mood curator</Text>
            </View>

            <View style={styles.moodMatcherContainer}>
              <TouchableOpacity style={styles.moodMatcherCard} onPress={onMoodMatcher}>
                <ImageBackground
                  source={{
                    uri: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMwMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzJFMEEwOTtzdG9wLW9wYWNpdHk6MC4xIiAvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM3MTcyN0E7c3RvcC1vcGFjaXR5OjAuMDUiIC8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxODAiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+CjxjaXJjbGUgY3g9IjI0MCIgY3k9IjQwIiByPSI4MCIgZmlsbD0iIzJFMEEwOSIgZmlsbC1vcGFjaXR5PSIwLjA4Ii8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iMTQwIiByPSI2MCIgZmlsbD0iIzcxNzI3QSIgZmlsbC1vcGFjaXR5PSIwLjA2Ii8+Cjxwb2x5Z29uIHBvaW50cz0iMjAwLDEwMCAyMjAsMTIwIDI0MCwxMDAgMjYwLDEyMCAyODAsMTAwIDMwMCwxMjAgMzAwLDE4MCAwLDE4MCIgZmlsbD0iIzJFMEEwOSIgZmlsbC1vcGFjaXR5PSIwLjA0Ii8+Cjwvc3ZnPgo='
                  }}
                  style={styles.moodMatcherBackground}
                  imageStyle={styles.moodMatcherBackgroundImage}
                >
                  <View style={styles.moodMatcherContent}>
                    <View style={styles.moodMatcherText}>
                      <Text style={styles.moodMatcherTitle}>Personalized Recommendations</Text>
                      <Text style={styles.moodMatcherDesc}>Discover books that resonate with your current state of mind</Text>
                    </View>
                    <View style={styles.moodMatcherIcon}>
                      <Text style={styles.moodMatcherEmoji}>📚</Text>
                    </View>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionWithExtraPadding}>
            <View style={styles.sectionHeaderReduced}>
              <Text style={styles.sectionTitle}>Community</Text>
            </View>

            <View style={styles.communityContainer}>
              <TouchableOpacity style={styles.communityCard} onPress={onJoinCommunity}>
                <View style={styles.communityContent}>
                  <View style={styles.communityText}>
                    <Text style={styles.communityTitle}>Join the Book Community</Text>
                    <Text style={styles.communityDesc}>Connect with fellow readers, share thoughts, and discover new perspectives</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F4F1',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1D1D1D',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#71727A',
    marginBottom: 20,
  },
  content: {
  },
  section: {
    marginBottom: 28,
  },
  getStartedSection: {
    backgroundColor: '#F6F4F1',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 32,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionWithExtraPadding: {
    marginBottom: 28,
    marginTop: 16,
  },
  sectionHeaderSimple: {
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  sectionHeaderReduced: {
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1D1D1D',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  verticalCardContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  getStartedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 18,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E0A09',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D1D1D',
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 12,
    color: '#71727A',
  },
  arrowButton: {
    backgroundColor: '#F6F4F1',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowButtonText: {
    color: '#2E0A09',
    fontSize: 16,
    fontWeight: 'bold',
  },
  moodMatcherContainer: {
    paddingHorizontal: 20,
  },
  moodMatcherCard: {
    backgroundColor: '#2E0A09',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  moodMatcherBackground: {
    width: '100%',
    minHeight: 100,
  },
  moodMatcherBackgroundImage: {
    borderRadius: 16,
  },
  moodMatcherContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  moodMatcherText: {
    flex: 1,
  },
  moodMatcherTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  moodMatcherDesc: {
    fontSize: 14,
    color: '#F6F4F1',
    lineHeight: 20,
    opacity: 0.9,
    letterSpacing: 0.2,
  },
  moodMatcherIcon: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(246, 244, 241, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moodMatcherEmoji: {
    fontSize: 20,
  },
  communityContainer: {
    paddingHorizontal: 20,
  },
  communityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  communityContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityText: {
    flex: 1,
  },
  communityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1D1D1D',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  communityDesc: {
    fontSize: 14,
    color: '#1D1D1D',
    lineHeight: 20,
    opacity: 0.8,
    letterSpacing: 0.2,
  },
  bottomSpacer: {
    height: 108,
  },
});

export default Home;