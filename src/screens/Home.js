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
              <View style={styles.addBooksGradient}>
                <View style={styles.addBooksContent}>
                  <View style={styles.addBooksIconLarge}>
                    <Text style={styles.addBooksEmojiLarge}>📚</Text>
                  </View>
                  <View style={styles.addBooksText}>
                    <Text style={styles.addBooksTitle}>Ready to Get Started?</Text>
                    <Text style={styles.addBooksDesc}>Tap here to add your first book</Text>
                    <View style={styles.addBookCTA}>
                      <Text style={styles.ctaText}>+ Add a Book</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionWithExtraPadding}>
            <View style={styles.moodMatcherContainer}>
              <TouchableOpacity style={styles.moodMatcherCard} onPress={onMoodMatcher}>
                <View style={styles.moodMatcherBackground}>
                  <View style={styles.moodMatcherContent}>
                    <View style={styles.moodMatcherText}>
                      <Text style={styles.moodMatcherTitle}>Mood Curator</Text>
                      <Text style={styles.moodMatcherDesc}>Discover personalized book recommendations that match your current mood and mindset</Text>
                    </View>
                    <View style={styles.moodMatcherIcon}>
                      <Text style={styles.moodMatcherEmoji}>🎭</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionWithExtraPadding}>
            <View style={styles.communityContainer}>
              <TouchableOpacity style={styles.communityCard} onPress={onJoinCommunity}>
                <LinearGradient
                  colors={['#7CA2E0', '#5B8DD6', '#3A78CC']}
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

          <View style={styles.statsSection}>
            <Text style={styles.statsSectionTitle}>Your Reading Stats</Text>
            <View style={styles.statsCard}>
              <View style={styles.disabledGraph}>
                <View style={styles.graphBar} style={[styles.graphBar, { height: 60, opacity: 0.3 }]} />
                <View style={styles.graphBar} style={[styles.graphBar, { height: 80, opacity: 0.3 }]} />
                <View style={styles.graphBar} style={[styles.graphBar, { height: 45, opacity: 0.3 }]} />
                <View style={styles.graphBar} style={[styles.graphBar, { height: 70, opacity: 0.3 }]} />
                <View style={styles.graphBar} style={[styles.graphBar, { height: 50, opacity: 0.3 }]} />
                <View style={styles.graphBar} style={[styles.graphBar, { height: 90, opacity: 0.3 }]} />
              </View>
              <View style={styles.statsEmptyState}>
                <View style={styles.statsEmptyIcon}>
                  <Text style={styles.statsEmptyEmoji}>📊</Text>
                </View>
                <Text style={styles.statsEmptyTitle}>No stats yet</Text>
                <Text style={styles.statsEmptyDesc}>Start reading to track your progress and build your reading journey</Text>
              </View>
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
    fontSize: 32,
    fontWeight: '700',
    color: '#481825',
    marginBottom: 8,
    letterSpacing: -0.5,
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
    marginTop: 0,
  },
  addBooksCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    minHeight: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  addBooksGradient: {
    width: '100%',
    minHeight: 280,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  addBooksContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingVertical: 32,
    flex: 1,
  },
  addBooksText: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 12,
    width: '100%',
  },
  addBooksTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#481825',
    marginBottom: 4,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  addBooksDesc: {
    fontSize: 14,
    color: '#71727A',
    lineHeight: 20,
    letterSpacing: 0.2,
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.95,
  },
  addBookCTA: {
    backgroundColor: '#481825',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 24,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  addBooksIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#E8E6E3',
    borderStyle: 'solid',
  },
  addBooksEmojiLarge: {
    fontSize: 36,
  },
  sectionWithExtraPadding: {
    marginBottom: 16,
    marginTop: 8,
  },
  moodMatcherContainer: {
    paddingHorizontal: 20,
  },
  moodMatcherCard: {
    backgroundColor: '#DF6A49',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#C65D1E',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  moodMatcherBackground: {
    width: '100%',
    minHeight: 100,
    borderRadius: 16,
    backgroundColor: '#DF6A49',
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
    color: '#FFFFFF',
    lineHeight: 20,
    opacity: 0.95,
    letterSpacing: 0.2,
  },
  moodMatcherIcon: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
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
    backgroundColor: '#7CA2E0',
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
    color: '#FFFFFF',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  communityDescNew: {
    fontSize: 14,
    color: '#F6F4F1',
    lineHeight: 20,
    opacity: 0.95,
    letterSpacing: 0.2,
  },
  communityIcon: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  communityEmoji: {
    fontSize: 20,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 24,
  },
  statsSectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#481825',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  disabledGraph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 100,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  graphBar: {
    width: 30,
    backgroundColor: '#E8E6E3',
    borderRadius: 4,
  },
  statsEmptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  statsEmptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsEmptyEmoji: {
    fontSize: 32,
  },
  statsEmptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#481825',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  statsEmptyDesc: {
    fontSize: 14,
    color: '#71727A',
    textAlign: 'center',
    lineHeight: 20,
    letterSpacing: 0.2,
    maxWidth: 280,
  },
  bottomSpacer: {
    height: 108,
  },
});

export default Home;