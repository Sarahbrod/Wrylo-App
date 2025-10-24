# Mood-Based Book Recommendation System

## Overview

This document explains the complete implementation of the mood-based book recommendation system for the Wrylo book tracking app. The system uses a 3-question mood quiz to generate personalized book recommendations from the Google Books API.

---

## System Architecture

### Components

1. **MoodFlowScreen** (`src/screens/MoodFlowScreen.js`)
   - 3-step mood quiz interface
   - Collects user preferences for energy, genre, and reading depth

2. **MoodResultsScreen** (`src/screens/MoodResultsScreen.js`)
   - Displays personalized book recommendations
   - Shows match scores and reasons
   - Provides actions to add books or refresh results

3. **recommendationService** (`src/services/recommendationService.js`)
   - Core recommendation algorithm
   - Matches mood data to books
   - Calculates match scores

4. **bookService** (`src/services/bookService.js`)
   - Fetches books from Google Books API
   - Transforms API data to app format

---

## How the Quiz Works

### Step 1: Energy Level
Users select their current energy/mood state:
- **High Energy**: Ready for adventure, action-packed reads
- **Balanced**: Steady and focused, moderate engagement
- **Calm & Relaxed**: Seeking comfort, peaceful reads

### Step 2: Genre Preference
Users choose their preferred genre:
- Fiction
- Mystery
- Romance
- Sci-Fi
- Non-Fiction
- Fantasy

### Step 3: Reading Depth
Users indicate desired reading intensity:
- **Light Read**: Easy and entertaining (under 350 pages)
- **Moderate**: Engaging but not heavy (200-500 pages)
- **Deep Dive**: Complex and thought-provoking (300+ pages)

### Quiz Data Output

```javascript
{
  energy: {
    id: 'high',
    title: 'High Energy',
    subtitle: 'Ready for adventure',
    emoji: '⚡',
    color: '#FF6B6B'
  },
  genre: {
    id: 'mystery',
    title: 'Mystery',
    subtitle: 'Puzzles & suspense',
    emoji: '🔍',
    color: '#2C3E50'
  },
  depth: {
    id: 'medium',
    title: 'Moderate',
    subtitle: 'Engaging but not heavy',
    emoji: '📖',
    color: '#26A69A'
  }
}
```

---

## Recommendation Algorithm

### How It Works

The recommendation engine uses a multi-faceted scoring system that combines:

1. **Genre Matching** (30 points max)
   - Compares book categories with user's genre preference
   - Uses fuzzy matching for better results
   - Higher weight because genre is most important

2. **Energy/Pace Matching** (20 points max)
   - Analyzes book description for energy-related keywords
   - Matches themes (adventure, action, peaceful, etc.)
   - Considers pacing indicators

3. **Depth/Complexity Matching** (15 points max)
   - Evaluates page count against preference range
   - Checks for complexity keywords in description
   - Balances reading intensity

4. **Quality Indicators** (25 points max)
   - Average rating (4.0+ gets bonus)
   - Number of ratings (popularity bonus)
   - Description quality

### Scoring Breakdown

```javascript
// Example scoring calculation
Base score: 0

Genre match (Mystery -> Mystery categories): +30 points
Energy match (high energy keywords found): +18 points
Depth match (350 pages, medium range): +12 points
High rating (4.2 stars): +15 points
Popular (2000+ ratings): +10 points

Total: 85 points
Match percentage: 85%
```

### Search Strategy

The system uses multiple search queries to get diverse results:

1. **Primary genre searches**: 2x weight
   - "mystery", "detective", "crime"

2. **Combined genre + energy**: 1.5x weight
   - "mystery action", "mystery thriller"

3. **Genre + depth**: 1.2x weight
   - "mystery thought-provoking"

This multi-query approach ensures:
- Better variety in recommendations
- Higher quality matches
- Coverage of different book types within preferences

---

## Book Data Structure

### Transformed Book Object

```javascript
{
  // Core identifiers
  id: 'google_books_id_123',
  googleBooksId: 'google_books_id_123',

  // Basic info
  title: 'The Silent Patient',
  subtitle: 'A Novel',
  author: 'Alex Michaelides',
  authors: ['Alex Michaelides'],

  // Content
  description: 'A shocking psychological thriller...',
  pageCount: 336,

  // Classification
  categories: ['Fiction', 'Mystery', 'Thriller'],
  genres: ['Fiction', 'Mystery', 'Thriller'],

  // Ratings
  averageRating: 4.1,
  ratingsCount: 125000,

  // Images
  coverUrl: 'https://...',
  coverImage: 'https://...',
  coverUrlLarge: 'https://...',

  // Metadata
  publisher: 'Celadon Books',
  publishedDate: '2019-02-05',
  language: 'en',
  isbn: '9781250301697',

  // Recommendation-specific (added by algorithm)
  matchScore: 85.5,
  matchPercentage: 85,
  matchReasons: ['Highly rated', 'Perfect for mystery'],
  moodTags: ['Mystery', 'Fast-paced', 'Complex']
}
```

---

## User Flow

### Complete Journey

1. **User starts quiz**
   ```
   Home Screen → Mood Curator Card → MoodFlowScreen
   ```

2. **User completes quiz**
   ```
   Step 1 (Energy) → Step 2 (Genre) → Step 3 (Depth) → MoodResultsScreen
   ```

3. **User views recommendations**
   ```
   - Mood summary displayed
   - 5-10 book recommendations shown
   - Each book has match percentage and reasons
   ```

4. **User interacts with results**
   ```
   Options:
   - Add book to library
   - View book details
   - Dismiss recommendation
   - Refresh for more books
   - Retake quiz
   ```

5. **User adds book**
   ```
   Add to Library button → LibraryScreen → AddBookSheet (prefilled)
   ```

---

## Implementation Details

### Navigation Flow

```javascript
// From MoodFlowScreen to Results
navigation.navigate('MoodResults', {
  moodData: {
    energy: {...},
    genre: {...},
    depth: {...}
  }
});

// From Results to Library with prefilled book
navigation.navigate('Library', {
  openAddBook: true,
  prefilledBook: book
});
```

### State Management

**MoodResultsScreen State:**
```javascript
const [recommendations, setRecommendations] = useState([]);
const [moodSummary, setMoodSummary] = useState(null);
const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);
const [dismissedBooks, setDismissedBooks] = useState([]);
```

**LibraryScreen Integration:**
```javascript
const [prefilledBook, setPrefilledBook] = useState(null);

useEffect(() => {
  if (route?.params?.openAddBook) {
    setShowAddBookSheet(true);
    if (route?.params?.prefilledBook) {
      setPrefilledBook(route.params.prefilledBook);
    }
  }
}, [route?.params]);
```

**AddBookSheet Prefill:**
```javascript
useEffect(() => {
  if (prefilledBook && visible) {
    setSelectedBook(prefilledBook);
    setBookTitle(prefilledBook.title || '');
    setBookAuthor(prefilledBook.author || '');
    setShowManualForm(true);
  }
}, [prefilledBook, visible]);
```

---

## Key Features

### 1. Match Transparency
Each recommendation shows why it was selected:
- Match percentage (60-95%)
- Up to 2 match reasons
- Relevant mood tags

### 2. Smart Filtering
- Removes duplicate books across multiple searches
- Filters out books without sufficient data
- Prioritizes highly-rated and popular books

### 3. Refresh Capability
- Get new recommendations without retaking quiz
- Excludes previously dismissed books
- Maintains mood preferences

### 4. Seamless Integration
- Pre-fills book data when adding to library
- Maintains book cover and metadata
- One-tap add to library

### 5. Empty State Handling
- Helpful message when no results found
- Options to refresh or retake quiz
- Graceful error handling

---

## Customization Options

### Adjusting Match Weights

In `recommendationService.js`, modify scoring weights:

```javascript
// Current weights
genreScore * 30    // Genre is most important
energyScore * 20   // Energy/pace is moderately important
depthScore * 15    // Depth is somewhat important
```

### Adding New Mood Options

To add a new energy level, genre, or depth option:

1. **Update MoodFlowScreen.js** options array
2. **Add mapping** in recommendationService.js:

```javascript
MOOD_MAPPINGS.genre.newGenre = {
  searchTerms: ['keyword1', 'keyword2'],
  categories: ['Category1', 'Category2'],
  description: 'descriptive text'
}
```

### Changing Result Count

Modify in `recommendationService.js`:

```javascript
// Current: Top 10 recommendations
const topRecommendations = scoredBooks
  .sort((a, b) => b.matchScore - a.matchScore)
  .slice(0, 10); // Change this number
```

---

## Performance Considerations

### API Calls
- Multiple parallel searches executed using `Promise.all()`
- Typical load time: 2-4 seconds
- Maximum 15 books per query to balance quality and speed

### Caching Strategy
Currently, the system:
- Does NOT cache results (fetches fresh each time)
- Stores dismissed books in component state only
- Clears state when navigating away

**Potential improvement**: Add AsyncStorage caching:
```javascript
// Save recommendations
await AsyncStorage.setItem('cached_recommendations', JSON.stringify(results));

// Load cached data first, then update
const cached = await AsyncStorage.getItem('cached_recommendations');
if (cached) {
  setRecommendations(JSON.parse(cached));
  setLoading(false);
}
// Then fetch fresh data in background
```

---

## Styling

### Color Scheme

**Match Badges:**
- Green (#10B981): 80%+ match
- Blue (#7CA2E0): 70-79% match
- Orange (#F59E0B): 60-69% match

**Brand Colors:**
- Primary: #481825
- Secondary: #7CA2E0
- Background: #F6F4F1
- Text: #71727A

### Typography

Uses **Libre Baskerville** font family:
- Regular (400) for body text
- Bold (700) for titles and emphasis

---

## Testing Scenarios

### 1. High Energy + Mystery + Light
Expected: Fast-paced mystery thrillers, page-turners, detective novels under 350 pages

### 2. Low Energy + Romance + Deep
Expected: Emotional, literary romance novels, character-driven, 300+ pages

### 3. Medium Energy + Sci-Fi + Medium
Expected: Engaging science fiction, moderate complexity, 200-500 pages

### 4. Retake Quiz
- Verify new recommendations appear
- Confirm mood summary updates
- Check that dismissed books persist

### 5. Add to Library
- Book data pre-fills correctly
- Cover image loads
- All metadata transfers

---

## Error Handling

### Network Errors
```javascript
try {
  const results = await getRecommendations(moodData);
} catch (error) {
  Alert.alert('Error', 'Failed to load recommendations. Please try again.');
}
```

### No Results
- Shows friendly empty state
- Provides options to refresh or retake
- Explains what happened

### Invalid Data
- Validates moodData before processing
- Defaults to safe values if data missing
- Logs errors for debugging

---

## Future Enhancements

### Potential Improvements

1. **User Preferences Learning**
   - Track which recommendations users add
   - Improve algorithm based on user behavior
   - Personalize over time

2. **Advanced Filters**
   - Publication date range
   - Specific author preferences
   - Language selection
   - Content warnings/triggers

3. **Social Features**
   - See what mood-matched books friends are reading
   - Share recommendations
   - Community ratings for mood accuracy

4. **Offline Support**
   - Cache recent recommendations
   - Save mood history
   - Allow browsing while offline

5. **More Quiz Questions**
   - Reading time available
   - Series vs. standalone preference
   - Emotional tone (light, dark, hopeful, etc.)

6. **Enhanced Matching**
   - Machine learning integration
   - Natural language processing for better description analysis
   - Collaborative filtering

---

## API Dependencies

### Google Books API
- **Endpoint**: `https://www.googleapis.com/books/v1/volumes`
- **Rate Limits**: 1000 queries/day (free tier)
- **No API key required** for basic searches
- **Documentation**: https://developers.google.com/books

### Required Data Fields
The algorithm requires these fields from Google Books:
- `volumeInfo.title`
- `volumeInfo.authors`
- `volumeInfo.description`
- `volumeInfo.categories`
- `volumeInfo.pageCount`
- `volumeInfo.averageRating`
- `volumeInfo.ratingsCount`
- `volumeInfo.imageLinks.thumbnail`

---

## Troubleshooting

### Common Issues

**Issue**: No recommendations appear
- Check internet connection
- Verify Google Books API is accessible
- Check console for errors
- Try different mood combinations

**Issue**: Poor match quality
- Adjust scoring weights in recommendationService
- Increase number of search queries
- Refine keyword mappings

**Issue**: Slow loading
- Reduce maxBooksPerQuery (currently 15)
- Reduce number of search queries
- Implement caching

**Issue**: Duplicate books
- Verify `removeDuplicateBooks()` is working
- Check that googleBooksId is unique
- Review search query overlap

---

## Code Structure

```
src/
├── screens/
│   ├── MoodFlowScreen.js      # Quiz interface
│   └── MoodResultsScreen.js   # Results display
├── services/
│   ├── recommendationService.js  # Core algorithm
│   └── bookService.js            # API integration
└── components/
    └── AddBookSheet.js         # Book adding (with prefill support)
```

---

## Summary

The mood-based recommendation system provides a personalized book discovery experience by:

1. **Collecting user preferences** through an intuitive 3-step quiz
2. **Intelligently matching** books using a weighted scoring algorithm
3. **Displaying recommendations** with transparency and context
4. **Seamlessly integrating** with the library system

The system is built to be:
- **Extensible**: Easy to add new mood options or criteria
- **Performant**: Parallel API calls and efficient filtering
- **User-friendly**: Clear UI with helpful feedback
- **Maintainable**: Well-documented and modular code

---

**Last Updated**: 2025-10-24
**Version**: 1.0
**Author**: Claude Code + Wrylo Team
