import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: screenWidth } = Dimensions.get('window');

const BookDetailScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const [isSaved, setIsSaved] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [readingStatus, setReadingStatus] = useState(null); // null, 'reading', 'want-to-read', 'read'

  // Sample reading groups (replace with actual data from backend)
  const [readingGroups] = useState([
    { id: 1, name: 'Mystery Lovers', members: 12, color: '#7CA2E0' },
    { id: 2, name: 'Book Club Elite', members: 8, color: '#DF6A49' },
    { id: 3, name: 'Weekend Readers', members: 15, color: '#481825' },
  ]);

  const handleSave = () => {
    setIsSaved(!isSaved);
    // TODO: Implement save to library logic
    console.log('Book saved:', book.title);
  };

  const handleReadingStatus = (status) => {
    setReadingStatus(status);
    // TODO: Implement save to library with status logic
    console.log('Reading status set:', status, 'for book:', book.title);
  };

  const handleAddToReadingGroup = (group) => {
    // TODO: Implement add to reading group logic
    console.log('Adding to group:', group.name, 'Book:', book.title);
  };

  const handleRating = (rating) => {
    setUserRating(rating);
    // TODO: Implement rating submission logic
    console.log('Rating submitted:', rating);
  };

  const renderStars = (rating, interactive = false, size = 24, keyPrefix = '') => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={`${keyPrefix}-star-${i}`}
          onPress={() => interactive && handleRating(i)}
          disabled={!interactive}
        >
          <Ionicons
            name={i <= rating ? 'star' : 'star-outline'}
            size={size}
            color={i <= rating ? '#FFD700' : '#D1D5DB'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#481825" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color="#481825"
            />
          </TouchableOpacity>
        </View>

        {/* Book Cover and Basic Info */}
        <View style={styles.bookHeader}>
          <View style={styles.coverContainer}>
            {book.coverUrl ? (
              <Image
                source={{ uri: book.coverUrl }}
                style={styles.bookCover}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.bookCoverPlaceholder}>
                <Ionicons name="book" size={80} color="#71727A" />
              </View>
            )}
          </View>

          <View style={styles.basicInfo}>
            <Text style={styles.title}>{book.title}</Text>
            {book.subtitle && (
              <Text style={styles.subtitle}>{book.subtitle}</Text>
            )}
            <Text style={styles.author}>by {book.author}</Text>

            {/* Average Rating */}
            {book.averageRating > 0 && (
              <View style={styles.ratingSection}>
                <View style={styles.starsContainer}>
                  {renderStars(Math.round(book.averageRating), false, 20, 'average')}
                </View>
                <Text style={styles.ratingText}>
                  {book.averageRating.toFixed(1)}
                </Text>
                {book.ratingsCount > 0 && (
                  <Text style={styles.ratingsCount}>
                    ({book.ratingsCount.toLocaleString()} ratings)
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>

        {/* Reading Status Options */}
        <View style={styles.actionsContainer}>
          <Text style={styles.actionsTitle}>Add to Library</Text>
          <View style={styles.statusOptionsContainer}>
            <TouchableOpacity
              style={[
                styles.statusButton,
                readingStatus === 'want-to-read' && styles.statusButtonActive
              ]}
              onPress={() => handleReadingStatus(readingStatus === 'want-to-read' ? null : 'want-to-read')}
            >
              <Ionicons
                name="bookmark-outline"
                size={18}
                color={readingStatus === 'want-to-read' ? '#FFFFFF' : '#481825'}
              />
              <Text style={[
                styles.statusButtonText,
                readingStatus === 'want-to-read' && styles.statusButtonTextActive
              ]}>
                Want to Read
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.statusButton,
                readingStatus === 'reading' && styles.statusButtonActive
              ]}
              onPress={() => handleReadingStatus(readingStatus === 'reading' ? null : 'reading')}
            >
              <Ionicons
                name="book-outline"
                size={18}
                color={readingStatus === 'reading' ? '#FFFFFF' : '#481825'}
              />
              <Text style={[
                styles.statusButtonText,
                readingStatus === 'reading' && styles.statusButtonTextActive
              ]}>
                Reading
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.statusButton,
                readingStatus === 'read' && styles.statusButtonActive
              ]}
              onPress={() => handleReadingStatus(readingStatus === 'read' ? null : 'read')}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={18}
                color={readingStatus === 'read' ? '#FFFFFF' : '#481825'}
              />
              <Text style={[
                styles.statusButtonText,
                readingStatus === 'read' && styles.statusButtonTextActive
              ]}>
                Read
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Book Details */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>About This Book</Text>
          <View style={styles.metaInfo}>
            {book.publisher && (
              <View style={styles.metaItem}>
                <Ionicons name="business-outline" size={16} color="#71727A" />
                <Text style={styles.metaText}>{book.publisher}</Text>
              </View>
            )}
            {book.publishedDate && (
              <View style={styles.metaItem}>
                <Ionicons name="calendar-outline" size={16} color="#71727A" />
                <Text style={styles.metaText}>{book.publishedDate}</Text>
              </View>
            )}
            {book.pageCount && (
              <View style={styles.metaItem}>
                <Ionicons name="document-text-outline" size={16} color="#71727A" />
                <Text style={styles.metaText}>{book.pageCount} pages</Text>
              </View>
            )}
          </View>

          {/* Genres/Categories */}
          {book.categories && book.categories.length > 0 && (
            <View style={styles.genresSection}>
              <Text style={styles.genresLabel}>Genres:</Text>
              <View style={styles.genresList}>
                {book.categories.map((category, index) => (
                  <View key={index} style={styles.genreTag}>
                    <Text style={styles.genreText}>{category}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Description */}
          {book.description && (
            <View style={styles.descriptionSection}>
              <Text style={styles.description}>
                {isDescriptionExpanded
                  ? book.description
                  : book.description.split(' ').length > 50
                    ? book.description.split(' ').slice(0, 50).join(' ') + '...'
                    : book.description
                }
              </Text>
              {book.description.split(' ').length > 50 && (
                <TouchableOpacity
                  onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  style={styles.readMoreButton}
                >
                  <Text style={styles.readMoreText}>
                    {isDescriptionExpanded ? 'Read Less' : 'Read More'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>

        {/* Your Rating */}
        <View style={styles.ratingInputSection}>
          <Text style={styles.sectionTitle}>Rate This Book</Text>
          <View style={styles.ratingStars}>
            {renderStars(userRating, true, 32, 'user')}
          </View>
          {userRating > 0 && (
            <Text style={styles.ratingFeedback}>
              You rated this book {userRating} {userRating === 1 ? 'star' : 'stars'}!
            </Text>
          )}
        </View>

        {/* Add to Reading Group */}
        <View style={styles.readingGroupsSection}>
          <Text style={styles.sectionTitle}>Add to Reading Group</Text>
          <Text style={styles.sectionSubtitle}>
            Share this book with your reading communities
          </Text>
          <View style={styles.groupsList}>
            {readingGroups.map((group) => (
              <TouchableOpacity
                key={group.id}
                style={styles.groupCard}
                onPress={() => handleAddToReadingGroup(group)}
              >
                <View
                  style={[styles.groupIcon, { backgroundColor: group.color }]}
                >
                  <Ionicons name="people" size={20} color="#FFFFFF" />
                </View>
                <View style={styles.groupInfo}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  <Text style={styles.groupMembers}>
                    {group.members} members
                  </Text>
                </View>
                <Ionicons name="add-circle-outline" size={24} color="#481825" />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.createGroupButton}>
            <Ionicons name="add" size={20} color="#481825" />
            <Text style={styles.createGroupText}>Create New Reading Group</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  bookHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  coverContainer: {
    width: 140,
    height: 210,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 20,
  },
  bookCover: {
    width: '100%',
    height: '100%',
  },
  bookCoverPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F4F1',
  },
  basicInfo: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#481825',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.3,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#71727A',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  author: {
    fontSize: 16,
    color: '#71727A',
    textAlign: 'center',
    marginBottom: 16,
  },
  ratingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#481825',
  },
  ratingsCount: {
    fontSize: 14,
    color: '#71727A',
  },
  actionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  actionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#481825',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  statusOptionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statusButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E8E6E3',
  },
  statusButtonActive: {
    backgroundColor: '#481825',
    borderColor: '#481825',
  },
  statusButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#481825',
    letterSpacing: 0.2,
  },
  statusButtonTextActive: {
    color: '#FFFFFF',
  },
  detailsSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#481825',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#71727A',
    marginBottom: 16,
    lineHeight: 20,
  },
  metaInfo: {
    gap: 12,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#71727A',
  },
  genresSection: {
    marginBottom: 16,
  },
  genresLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#71727A',
    marginBottom: 8,
  },
  genresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreTag: {
    backgroundColor: '#F6F4F1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  genreText: {
    fontSize: 12,
    color: '#481825',
    fontWeight: '600',
  },
  descriptionSection: {
    marginTop: 8,
  },
  description: {
    fontSize: 15,
    color: '#481825',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  readMoreButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7CA2E0',
    letterSpacing: 0.2,
  },
  ratingInputSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 12,
  },
  ratingFeedback: {
    fontSize: 14,
    color: '#71727A',
    marginTop: 12,
    fontStyle: 'italic',
  },
  readingGroupsSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  groupsList: {
    gap: 12,
    marginBottom: 16,
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F6F4F1',
    borderRadius: 12,
    gap: 12,
  },
  groupIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#481825',
    marginBottom: 4,
  },
  groupMembers: {
    fontSize: 13,
    color: '#71727A',
  },
  createGroupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E8E6E3',
    borderStyle: 'dashed',
    gap: 8,
  },
  createGroupText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#481825',
  },
  bottomSpacer: {
    height: 40,
  },
});

export default BookDetailScreen;
