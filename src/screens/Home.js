import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    title: 'Atomic Habits',
    author: 'James Clear',
    coverUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg',
  });

  const hasBooks = userBooks.length > 0;
  const currentlyReading = userBooks.find(book => book.status === 'reading');

  const onAddBooks = () => {
    navigation.navigate('Library', { openAddBook: true });
  };

  const onMoodMatcher = () => {
    navigation.navigate('MoodFlow', { sourceTab: 'Home' });
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
                  <Text style={styles.currentlyReadingLabel}>CURRENTLY READING</Text>
                  <View style={styles.currentlyReadingBadge}>
                    <View style={styles.pulseIndicator} />
                    <Text style={styles.badgeText}>In Progress</Text>
                  </View>
                </View>
                {currentlyReading && (
                  <View style={styles.currentlyReadingContent}>
                    <View style={styles.bookCoverFrame}>
                      <Image
                        source={{ uri: currentlyReading.coverUrl }}
                        style={styles.bookCover}
                        resizeMode="cover"
                      />
                      <View style={styles.coverOverlay}>
                        <View style={styles.countryBadge}>
                          <Text style={styles.countryBadgeText}>{currentlyReading.country}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.bookDetails}>
                      <Text style={styles.bookTitle} numberOfLines={2}>
                        {currentlyReading.title}
                      </Text>
                      <Text style={styles.bookAuthor} numberOfLines={1}>
                        by {currentlyReading.author}
                      </Text>
                      {currentlyReading.progress && (
                        <View style={styles.progressSection}>
                          <View style={styles.progressHeader}>
                            <Text style={styles.progressLabel}>Reading Progress</Text>
                            <Text style={styles.progressPercentage}>{currentlyReading.progress}%</Text>
                          </View>
                          <View style={styles.progressBar}>
                            <View
                              style={[
                                styles.progressFill,
                                { width: `${currentlyReading.progress}%` }
                              ]}
                            />
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.cardSection}>
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

          {/* Just Finished Reading Card */}
          {recentlyFinished && (
            <View style={styles.finishedSection}>
              <View style={styles.cardSection}>
                <TouchableOpacity
                  style={styles.finishedBookCard}
                  onPress={() => navigation.navigate('Forum', { bookId: recentlyFinished.id })}
                >
                  <View style={styles.finishedCardHeader}>
                    <Text style={styles.finishedCardTitle}>Just Finished</Text>
                    <Text style={styles.finishedCardSubtitle}>Share your thoughts with the community</Text>
                  </View>

                  <View style={styles.finishedBookPreview}>
                    <View style={styles.finishedBookCoverFrame}>
                      <Image
                        source={{ uri: recentlyFinished.coverUrl }}
                        style={styles.finishedBookCover}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={styles.finishedBookDetails}>
                      <Text style={styles.finishedBookTitle} numberOfLines={2}>
                        {recentlyFinished.title}
                      </Text>
                      <Text style={styles.finishedBookAuthor} numberOfLines={1}>
                        by {recentlyFinished.author}
                      </Text>
                      <View style={styles.finishedBadge}>
                        <Text style={styles.finishedBadgeText}>Finished Reading</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.discussionCTA}>
                    <Text style={styles.discussionCTAText}>Join the Discussion</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={styles.statsSection}>
            <Text style={styles.statsSectionTitle}>Your Reading Journey</Text>
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
                  {/* Visual Graph Section */}
                  <View style={styles.statsGraphSection}>
                    <View style={styles.graphHeader}>
                      <Text style={styles.graphTitle}>Books Read This Year</Text>
                      <Text style={styles.graphSubtitle}>Monthly breakdown</Text>
                    </View>
                    <View style={styles.activeGraph}>
                      <View style={styles.graphBarContainer}>
                        <View style={[styles.activeGraphBar, { height: '40%' }]}>
                          <View style={styles.graphBarFill} />
                        </View>
                        <Text style={styles.graphBarCount}>2</Text>
                      </View>
                      <View style={styles.graphBarContainer}>
                        <View style={[styles.activeGraphBar, { height: '65%' }]}>
                          <View style={styles.graphBarFill} />
                        </View>
                        <Text style={styles.graphBarCount}>3</Text>
                      </View>
                      <View style={styles.graphBarContainer}>
                        <View style={[styles.activeGraphBar, { height: '30%' }]}>
                          <View style={styles.graphBarFill} />
                        </View>
                        <Text style={styles.graphBarCount}>1</Text>
                      </View>
                      <View style={styles.graphBarContainer}>
                        <View style={[styles.activeGraphBar, { height: '80%' }]}>
                          <View style={styles.graphBarFill} />
                        </View>
                        <Text style={styles.graphBarCount}>4</Text>
                      </View>
                      <View style={styles.graphBarContainer}>
                        <View style={[styles.activeGraphBar, { height: '45%' }]}>
                          <View style={styles.graphBarFill} />
                        </View>
                        <Text style={styles.graphBarCount}>2</Text>
                      </View>
                      <View style={styles.graphBarContainer}>
                        <View style={[styles.activeGraphBar, { height: '90%' }]}>
                          <View style={styles.graphBarFill} />
                        </View>
                        <Text style={styles.graphBarCount}>5</Text>
                      </View>
                    </View>
                    <View style={styles.graphLabels}>
                      <Text style={styles.graphLabel}>Jan</Text>
                      <Text style={styles.graphLabel}>Feb</Text>
                      <Text style={styles.graphLabel}>Mar</Text>
                      <Text style={styles.graphLabel}>Apr</Text>
                      <Text style={styles.graphLabel}>May</Text>
                      <Text style={styles.graphLabel}>Jun</Text>
                    </View>
                  </View>

                  {/* Stats Grid */}
                  <View style={styles.statsGrid}>
                    <View style={styles.statGridItem}>
                      <View style={styles.statGridIconContainer}>
                        <Text style={styles.statGridIcon}>📚</Text>
                      </View>
                      <Text style={styles.statGridNumber}>{readingStats.booksThisYear}</Text>
                      <Text style={styles.statGridLabel}>Books This Year</Text>
                    </View>

                    <View style={styles.statGridDivider} />

                    <View style={styles.statGridItem}>
                      <View style={styles.statGridIconContainer}>
                        <Text style={styles.statGridIcon}>🌍</Text>
                      </View>
                      <Text style={styles.statGridNumber}>{readingStats.countriesRepresented.length}</Text>
                      <Text style={styles.statGridLabel}>Countries Explored</Text>
                    </View>
                  </View>

                  {readingStats.countriesRepresented.length > 0 && (
                    <View style={styles.countriesSection}>
                      <Text style={styles.countriesLabel}>EXPLORING THE WORLD</Text>
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
  cardSection: {
    marginBottom: 20,
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
  // Finished Book Card Styles
  finishedSection: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  finishedSectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#481825',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  finishedBookCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    padding: 20,
    gap: 16,
  },
  finishedCardHeader: {
    gap: 6,
    marginBottom: 4,
  },
  finishedCardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#481825',
    letterSpacing: 0.2,
  },
  finishedCardSubtitle: {
    fontSize: 14,
    color: '#71727A',
    letterSpacing: 0.1,
  },
  finishedBookHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  finishedIconLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#7CA2E0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7CA2E0',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  finishedEmojiLarge: {
    fontSize: 32,
  },
  finishedTextSection: {
    flex: 1,
    gap: 6,
  },
  finishedMainTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#481825',
    letterSpacing: 0.2,
  },
  finishedMainDesc: {
    fontSize: 14,
    color: '#71727A',
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  finishedBookPreview: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: '#F6F4F1',
    padding: 16,
    borderRadius: 12,
  },
  finishedBookCoverFrame: {
    width: 90,
    height: 135,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#E8E6E3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  finishedBookCover: {
    width: '100%',
    height: '100%',
  },
  finishedBookDetails: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  finishedBookTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#481825',
    lineHeight: 22,
  },
  finishedBookAuthor: {
    fontSize: 13,
    color: '#71727A',
    fontWeight: '500',
  },
  finishedBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 4,
    borderWidth: 1.5,
    borderColor: '#7CA2E0',
  },
  finishedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#7CA2E0',
    letterSpacing: 0.5,
  },
  discussionCTA: {
    backgroundColor: '#7CA2E0',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7CA2E0',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  discussionCTAText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 24,
  },
  statsSectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#481825',
    marginBottom: 20,
    letterSpacing: -0.5,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentlyReadingLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#71727A',
    letterSpacing: 1.2,
  },
  currentlyReadingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F4F1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  pulseIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DF6A49',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#481825',
    letterSpacing: 0.3,
  },
  currentlyReadingContent: {
    flexDirection: 'row',
    gap: 18,
  },
  bookCoverFrame: {
    width: 110,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F6F4F1',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  bookCover: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  countryBadge: {
    backgroundColor: 'rgba(72, 24, 37, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  countryBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
  bookTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#481825',
    letterSpacing: 0.2,
    lineHeight: 26,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#71727A',
    letterSpacing: 0.1,
    fontWeight: '500',
  },
  progressSection: {
    marginTop: 20,
    gap: 10,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: 11,
    color: '#71727A',
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  progressPercentage: {
    fontSize: 16,
    color: '#481825',
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#F6F4F1',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#DF6A49',
    borderRadius: 6,
  },
  // Active Stats Styles
  activeStatsContainer: {
    gap: 28,
  },
  statsGraphSection: {
    gap: 16,
  },
  graphHeader: {
    gap: 4,
    marginBottom: 4,
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#481825',
    letterSpacing: 0.2,
  },
  graphSubtitle: {
    fontSize: 12,
    color: '#71727A',
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  activeGraph: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 140,
    paddingHorizontal: 10,
    backgroundColor: '#F6F4F1',
    borderRadius: 12,
    paddingVertical: 16,
    paddingTop: 24,
    gap: 8,
  },
  graphBarContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  activeGraphBar: {
    width: '100%',
    backgroundColor: '#E8E6E3',
    borderRadius: 6,
    minHeight: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  graphBarCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#481825',
    letterSpacing: 0.2,
  },
  graphBarFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: '#DF6A49',
    borderRadius: 6,
  },
  graphLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  graphLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#71727A',
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F4F1',
    borderRadius: 16,
    padding: 20,
  },
  statGridItem: {
    flex: 1,
    alignItems: 'center',
    gap: 12,
  },
  statGridIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statGridIcon: {
    fontSize: 28,
  },
  statGridNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#481825',
    letterSpacing: -0.5,
  },
  statGridLabel: {
    fontSize: 13,
    color: '#71727A',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  statGridTimeframe: {
    fontSize: 11,
    color: '#DF6A49',
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  statGridDivider: {
    width: 1,
    height: 80,
    backgroundColor: '#E8E6E3',
    marginHorizontal: 20,
  },
  countriesSection: {
    marginTop: 4,
    gap: 16,
  },
  countriesLabel: {
    fontSize: 10,
    color: '#71727A',
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  countriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  countryTag: {
    backgroundColor: '#F6F4F1',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8E6E3',
  },
  countryText: {
    fontSize: 12,
    color: '#481825',
    fontWeight: '600',
    letterSpacing: 0.2,
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