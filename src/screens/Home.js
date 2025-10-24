import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';

const Home = ({ navigation }) => {
  // State to track if user has books and reading data
  // TO TEST NEW USER STATE: Change the array below to []
  // TO TEST USED STATE: Keep the example book data below
  const [userBooks] = useState([
    // Example data - replace with actual data from backend/context
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg',
      status: 'reading',
      progress: 45,
      country: 'United Kingdom'
    }
  ]);

  const [readingStats] = useState({
    booksThisYear: 12,
    countriesRepresented: ['USA', 'UK', 'Japan', 'France', 'India', 'Canada']
  });

  const [recentlyFinished] = useState({
    id: 2,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg',
  });

  const hasBooks = userBooks.length > 0;
  const currentlyReading = userBooks.find(book => book.status === 'reading');

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
          {/* Conditional rendering based on user state */}
          {!hasBooks ? (
            // New User State - Get Started Card
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
          ) : (
            // Used State - Currently Reading Card
            <View style={styles.addBooksSection}>
              <TouchableOpacity
                style={styles.currentlyReadingCard}
                onPress={() => navigation.navigate('Library')}
              >
                <View style={styles.currentlyReadingHeader}>
                  <Text style={styles.currentlyReadingLabel}>Currently Reading</Text>
                </View>
                {currentlyReading && (
                  <View style={styles.currentlyReadingContent}>
                    <View style={styles.bookCoverFrame}>
                      <Image
                        source={{ uri: currentlyReading.coverUrl }}
                        style={styles.bookCover}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={styles.bookDetails}>
                      <Text style={styles.bookTitle} numberOfLines={2}>
                        {currentlyReading.title}
                      </Text>
                      <Text style={styles.bookAuthor} numberOfLines={1}>
                        {currentlyReading.author}
                      </Text>
                      {currentlyReading.progress && (
                        <View style={styles.progressSection}>
                          <View style={styles.progressBar}>
                            <View
                              style={[
                                styles.progressFill,
                                { width: `${currentlyReading.progress}%` }
                              ]}
                            />
                          </View>
                          <Text style={styles.progressText}>{currentlyReading.progress}% complete</Text>
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </TouchableOpacity>

              {/* Finished Book Discussion Card */}
              {recentlyFinished && (
                <TouchableOpacity
                  style={styles.discussionCard}
                  onPress={() => navigation.navigate('Forum', { bookId: recentlyFinished.id })}
                >
                  <View style={styles.discussionHeader}>
                    <View style={styles.discussionIconContainer}>
                      <Text style={styles.discussionEmoji}>💬</Text>
                    </View>
                    <View style={styles.discussionTextContainer}>
                      <Text style={styles.discussionTitle}>Just finished reading?</Text>
                      <Text style={styles.discussionSubtitle}>See what people are saying about it</Text>
                    </View>
                  </View>
                  <View style={styles.discussionCTA}>
                    <Text style={styles.discussionCTAText}>Join Discussion</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          )}

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
                <View style={styles.communityGradient}>
                  <View style={styles.communityContent}>
                    <View style={styles.communityText}>
                      <Text style={styles.communityTitleNew}>Book Community</Text>
                      <Text style={styles.communityDescNew}>Connect with fellow readers, share insights, and discover new literary adventures together</Text>
                    </View>
                    <View style={styles.communityIcon}>
                      <Text style={styles.communityEmoji}>🎤</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.statsSection}>
            <Text style={styles.statsSectionTitle}>Your Reading Stats</Text>
            <View style={styles.statsCard}>
              {!hasBooks ? (
                // Empty state for new users
                <>
                  <View style={styles.disabledGraph}>
                    <View style={[styles.graphBar, { height: 60, opacity: 0.3 }]} />
                    <View style={[styles.graphBar, { height: 80, opacity: 0.3 }]} />
                    <View style={[styles.graphBar, { height: 45, opacity: 0.3 }]} />
                    <View style={[styles.graphBar, { height: 70, opacity: 0.3 }]} />
                    <View style={[styles.graphBar, { height: 50, opacity: 0.3 }]} />
                    <View style={[styles.graphBar, { height: 90, opacity: 0.3 }]} />
                  </View>
                  <View style={styles.statsEmptyState}>
                    <View style={styles.statsEmptyIcon}>
                      <Text style={styles.statsEmptyEmoji}>📊</Text>
                    </View>
                    <Text style={styles.statsEmptyTitle}>No stats yet</Text>
                    <Text style={styles.statsEmptyDesc}>Start reading to track your progress and build your reading journey</Text>
                  </View>
                </>
              ) : (
                // Active stats for users with books
                <View style={styles.activeStatsContainer}>
                  <View style={styles.statRow}>
                    <View style={styles.statItem}>
                      <View style={styles.statIconContainer}>
                        <Text style={styles.statIcon}>📚</Text>
                      </View>
                      <View style={styles.statInfo}>
                        <Text style={styles.statNumber}>{readingStats.booksThisYear}</Text>
                        <Text style={styles.statLabel}>Books This Year</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.statDivider} />

                  <View style={styles.statRow}>
                    <View style={styles.statItem}>
                      <View style={styles.statIconContainer}>
                        <Text style={styles.statIcon}>🌍</Text>
                      </View>
                      <View style={styles.statInfo}>
                        <Text style={styles.statNumber}>{readingStats.countriesRepresented.length}</Text>
                        <Text style={styles.statLabel}>Countries</Text>
                      </View>
                    </View>
                  </View>

                  {readingStats.countriesRepresented.length > 0 && (
                    <View style={styles.countriesSection}>
                      <Text style={styles.countriesLabel}>Reading from around the world:</Text>
                      <View style={styles.countriesList}>
                        {readingStats.countriesRepresented.map((country, index) => (
                          <View key={index} style={styles.countryTag}>
                            <Text style={styles.countryText}>{country}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              )}
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
    paddingBottom: 20,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  communityGradient: {
    width: '100%',
    minHeight: 100,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
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
    color: '#481825',
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  communityDescNew: {
    fontSize: 14,
    color: '#71727A',
    lineHeight: 20,
    opacity: 0.95,
    letterSpacing: 0.2,
  },
  communityIcon: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  communityEmoji: {
    fontSize: 20,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginTop: 32,
    marginBottom: 24,
  },
  statsSectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#481825',
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
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
  // Currently Reading Card Styles
  currentlyReadingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    padding: 20,
    paddingBottom: 26,
  },
  currentlyReadingHeader: {
    marginBottom: 20,
  },
  currentlyReadingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#71727A',
    letterSpacing: 0.5,
  },
  currentlyReadingContent: {
    flexDirection: 'row',
    gap: 18,
  },
  bookCoverFrame: {
    width: 100,
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F6F4F1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookCover: {
    width: '100%',
    height: '100%',
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#481825',
    letterSpacing: 0.2,
    lineHeight: 24,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#71727A',
    letterSpacing: 0.1,
  },
  progressSection: {
    marginTop: 16,
    gap: 6,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F6F4F1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#481825',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#71727A',
    fontWeight: '600',
  },
  // Active Stats Styles
  activeStatsContainer: {
    gap: 24,
  },
  statRow: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    flex: 1,
  },
  statIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 30,
  },
  statInfo: {
    gap: 6,
    flex: 1,
  },
  statNumber: {
    fontSize: 34,
    fontWeight: '700',
    color: '#481825',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 15,
    color: '#71727A',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  statDivider: {
    height: 1,
    backgroundColor: '#E8E6E3',
    marginVertical: 8,
  },
  countriesSection: {
    marginTop: 12,
    gap: 14,
  },
  countriesLabel: {
    fontSize: 13,
    color: '#71727A',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  countriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  countryTag: {
    backgroundColor: '#F6F4F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  countryText: {
    fontSize: 12,
    color: '#481825',
    fontWeight: '600',
    letterSpacing: 0.1,
  },
  // Discussion Card Styles
  discussionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E8E6E3',
  },
  discussionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  discussionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7CA2E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discussionEmoji: {
    fontSize: 24,
  },
  discussionTextContainer: {
    flex: 1,
    gap: 4,
  },
  discussionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#481825',
    letterSpacing: 0.2,
  },
  discussionSubtitle: {
    fontSize: 14,
    color: '#71727A',
    lineHeight: 18,
  },
  discussionCTA: {
    backgroundColor: '#7CA2E0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  discussionCTAText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});

export default Home;