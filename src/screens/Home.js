import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Home = ({ navigation }) => {

  const onAddBooks = () => {
    navigation.navigate('Library', { openAddBook: true });
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
          <Text style={styles.subtitle}>Begin your reading journey today</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.addBooksSection}>
            <TouchableOpacity style={styles.addBooksCard} onPress={onAddBooks}>
              <View style={styles.addBooksContent}>
                <View style={styles.addBooksIconLarge}>
                  <Text style={styles.addBooksEmojiLarge}>📚</Text>
                </View>
                <View style={styles.addBooksText}>
                  <Text style={styles.addBooksTitle}>Start Your Library</Text>
                  <Text style={styles.addBooksDesc}>Add your first book and begin tracking your reading journey. Discover new stories, track your progress, and build your personal collection.</Text>
                  <View style={styles.addBooksFeatures}>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureBullet}>•</Text>
                      <Text style={styles.featureText}>Track reading progress</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureBullet}>•</Text>
                      <Text style={styles.featureText}>Rate and review books</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureBullet}>•</Text>
                      <Text style={styles.featureText}>Discover new reads</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionWithExtraPadding}>
            <View style={styles.moodMatcherContainer}>
              <TouchableOpacity style={styles.moodMatcherCard} onPress={onMoodMatcher}>
                <LinearGradient
                  colors={['#2E0A09', '#4A1A18', '#2E0A09']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.moodMatcherBackground}
                >
                  <View style={styles.moodMatcherContent}>
                    <View style={styles.moodMatcherText}>
                      <Text style={styles.moodMatcherTitle}>Mood Curator</Text>
                      <Text style={styles.moodMatcherDesc}>Discover personalized book recommendations that match your current mood and mindset</Text>
                    </View>
                    <View style={styles.moodMatcherIcon}>
                      <Text style={styles.moodMatcherEmoji}>🎭</Text>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionWithExtraPadding}>
            <View style={styles.communityContainer}>
              <TouchableOpacity style={styles.communityCard} onPress={onJoinCommunity}>
                <LinearGradient
                  colors={['#DBEAFE', '#BFDBFE', '#2563EB']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.communityGradient}
                >
                  <View style={styles.communityContent}>
                    <View style={styles.communityText}>
                      <Text style={styles.communityTitleNew}>Book Community</Text>
                      <Text style={styles.communityDescNew}>Connect with fellow readers, share insights, and discover new literary adventures together</Text>
                    </View>
                    <View style={styles.communityIcon}>
                      <Text style={styles.communityEmoji}>🎤</Text>
                    </View>
                  </View>
                </LinearGradient>
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
    marginBottom: 8,
  },
  content: {
  },
  section: {
    marginBottom: 28,
  },
  addBooksSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 8,
  },
  addBooksCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#2E0A09',
    borderStyle: 'dashed',
    minHeight: 180,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  addBooksContent: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 24,
    paddingVertical: 28,
  },
  addBooksText: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 16,
  },
  addBooksTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2E0A09',
    marginBottom: 8,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  addBooksDesc: {
    fontSize: 15,
    color: '#71727A',
    lineHeight: 22,
    letterSpacing: 0.2,
    textAlign: 'center',
    marginBottom: 16,
    maxWidth: '90%',
  },
  addBooksIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#2E0A09',
    borderStyle: 'solid',
  },
  addBooksEmojiLarge: {
    fontSize: 36,
  },
  addBooksFeatures: {
    alignItems: 'flex-start',
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureBullet: {
    fontSize: 16,
    color: '#2E0A09',
    fontWeight: '700',
  },
  featureText: {
    fontSize: 14,
    color: '#71727A',
    fontWeight: '500',
  },
  sectionWithExtraPadding: {
    marginBottom: 16,
    marginTop: 8,
  },
  moodMatcherContainer: {
    paddingHorizontal: 20,
  },
  moodMatcherCard: {
    backgroundColor: '#2E0A09',
    borderRadius: 16,
    overflow: 'hidden',
  },
  moodMatcherBackground: {
    width: '100%',
    minHeight: 100,
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
    backgroundColor: '#2E0A09',
    borderRadius: 16,
    overflow: 'hidden',
  },
  communityGradient: {
    width: '100%',
    minHeight: 100,
    borderRadius: 16,
  },
  communityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
  communityTitleNew: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A8A',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  communityDescNew: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    opacity: 0.9,
    letterSpacing: 0.2,
  },
  communityIcon: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(30, 58, 138, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  communityEmoji: {
    fontSize: 20,
  },
  bottomSpacer: {
    height: 108,
  },
});

export default Home;