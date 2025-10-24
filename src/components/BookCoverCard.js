import { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const BookCoverCard = ({ book }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Validate image URL
  const hasValidImageUrl = book.coverUrl &&
    typeof book.coverUrl === 'string' &&
    (book.coverUrl.startsWith('http://') || book.coverUrl.startsWith('https://'));

  const renderCoverImage = () => {
    if (!hasValidImageUrl || imageError) {
      // Show placeholder with emoji or first letter
      return (
        <View style={styles.placeholderContainer}>
          {book.emoji ? (
            <Text style={styles.placeholderEmoji}>{book.emoji}</Text>
          ) : (
            <Text style={styles.placeholderText}>
              {book.title?.substring(0, 1) || '?'}
            </Text>
          )}
        </View>
      );
    }

    return (
      <Image
        source={{ uri: book.coverUrl }}
        style={styles.coverImage}
        onLoad={() => {
          setImageLoading(false);
          setImageError(false);
        }}
        onError={(error) => {
          console.warn(`Failed to load image for "${book.title}":`, error.nativeEvent?.error || 'Unknown error');
          setImageError(true);
          setImageLoading(false);
        }}
        resizeMode="cover"
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.coverContainer}>
        {renderCoverImage()}
      </View>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {book.title || 'Untitled'}
        </Text>
        <Text style={styles.bookAuthor} numberOfLines={1}>
          {book.author || 'Unknown Author'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  coverContainer: {
    width: 116,
    height: 174, // 2:3 aspect ratio
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#F6F4F1',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 48,
  },
  placeholderText: {
    fontSize: 48,
    fontWeight: '700',
    color: '#71727A',
  },
  bookInfo: {
    gap: 4,
  },
  bookTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E0A09',
    lineHeight: 16,
  },
  bookAuthor: {
    fontSize: 11,
    color: '#71727A',
  },
});

export default BookCoverCard;
