# Mood Recommendation System - Quick Start Guide

## 🚀 Quick Start

### How to Use the System

1. **Navigate to Mood Curator**
   - From Home screen, tap the "Mood Curator" card
   - OR from any screen, navigate to MoodFlow

2. **Complete the 3-Step Quiz**
   - **Step 1**: Choose your energy level (High/Balanced/Calm)
   - **Step 2**: Select a genre (Fiction/Mystery/Romance/Sci-Fi/etc.)
   - **Step 3**: Pick reading depth (Light/Moderate/Deep)

3. **View Recommendations**
   - See your personalized mood summary
   - Browse 5-10 book recommendations
   - Each book shows match percentage and reasons

4. **Take Action**
   - **Add to Library**: Tap button to add book (pre-filled form)
   - **View Details**: Tap book card for more info
   - **Dismiss**: Tap X to remove unwanted recommendations
   - **Refresh**: Get new books matching same mood
   - **Retake Quiz**: Start over with different preferences

---

## 📁 File Locations

### Core Files
- **Quiz Screen**: `src/screens/MoodFlowScreen.js`
- **Results Screen**: `src/screens/MoodResultsScreen.js`
- **Recommendation Engine**: `src/services/recommendationService.js`
- **Book API**: `src/services/bookService.js`

### Integration Points
- **Library Screen**: `src/screens/LibraryScreen.js` (receives prefilled books)
- **Add Book Sheet**: `src/components/AddBookSheet.js` (handles prefill)

---

## 🔧 Key Functions

### Get Recommendations
```javascript
import { getRecommendations } from '../services/recommendationService';

const results = await getRecommendations(moodData);
// Returns: { recommendations: [...], moodSummary: {...}, totalFound: 50 }
```

### Refresh Recommendations
```javascript
import { refreshRecommendations } from '../services/recommendationService';

const results = await refreshRecommendations(moodData, excludedBookIds);
// Gets new books, excluding dismissed ones
```

### Search Books (Google Books API)
```javascript
import { searchBooks, searchBooksByField } from '../services/bookService';

const books = await searchBooks('mystery thriller');
const mysteries = await searchBooksByField('mystery', 'subject');
```

---

## 🎨 Customization

### Change Number of Recommendations
**File**: `src/services/recommendationService.js`
```javascript
// Line ~145
const topRecommendations = scoredBooks
  .sort((a, b) => b.matchScore - a.matchScore)
  .slice(0, 10); // Change from 10 to desired number
```

### Adjust Match Scoring Weights
**File**: `src/services/recommendationService.js`
```javascript
// Lines ~165-175
score += genreScore * 30;   // Genre importance (0-30 points)
score += energyScore * 20;  // Energy importance (0-20 points)
score += depthScore * 15;   // Depth importance (0-15 points)
```

### Add New Genre
**File**: `src/screens/MoodFlowScreen.js`
```javascript
// Add to genreOptions array (line ~28)
{
  id: 'horror',
  title: 'Horror',
  subtitle: 'Thrills & chills',
  emoji: '😱',
  color: '#8B0000'
}
```

**File**: `src/services/recommendationService.js`
```javascript
// Add to MOOD_MAPPINGS.genre (line ~31)
horror: {
  searchTerms: ['horror', 'supernatural', 'scary'],
  categories: ['Horror', 'Supernatural', 'Gothic'],
  description: 'spine-chilling horror'
}
```

### Modify Page Count Ranges
**File**: `src/services/recommendationService.js`
```javascript
// Lines ~52-62
depth: {
  light: {
    pageRange: { min: 0, max: 350 },  // Adjust these values
  },
  medium: {
    pageRange: { min: 200, max: 500 },
  },
  deep: {
    pageRange: { min: 300, max: 1000 },
  }
}
```

---

## 🐛 Debugging

### Enable Detailed Logging
Add console logs in `recommendationService.js`:

```javascript
// After scoring books
console.log('Scored Books:', scoredBooks.map(b => ({
  title: b.title,
  score: b.matchScore,
  percentage: b.matchPercentage
})));
```

### Test Specific Mood Combination
```javascript
// In MoodResultsScreen.js or a test file
const testMoodData = {
  energy: { id: 'high', title: 'High Energy', ... },
  genre: { id: 'mystery', title: 'Mystery', ... },
  depth: { id: 'medium', title: 'Moderate', ... }
};

const results = await getRecommendations(testMoodData);
console.log('Test Results:', results);
```

### Check API Calls
```javascript
// In bookService.js, add logging
export const searchBooks = async (query, maxResults = 15) => {
  console.log('Searching for:', query);
  const response = await fetch(url);
  const data = await response.json();
  console.log('Found books:', data.items?.length || 0);
  // ...
};
```

---

## ⚡ Performance Tips

### Reduce Loading Time
1. Decrease `maxBooksPerQuery` from 15 to 10
2. Reduce number of search queries in `buildSearchQueries()`
3. Implement caching (see main documentation)

### Improve Match Quality
1. Increase scoring weight for most important factors
2. Add more specific search terms to MOOD_MAPPINGS
3. Refine keyword matching in description analysis

---

## 📊 Match Score Breakdown

| Component | Max Points | Weight |
|-----------|-----------|--------|
| Genre Match | 30 | High |
| Energy/Pace Match | 20 | Medium |
| Depth/Complexity | 15 | Medium |
| Average Rating | 15 | Low |
| Popularity | 10 | Low |
| Description Quality | 5 | Low |
| Page Count Match | 10 | Low |

**Total Possible**: ~105 points → Normalized to 60-95% match

---

## 🎯 Common Use Cases

### Adding a Book from Recommendations
```javascript
// MoodResultsScreen.js handles this automatically
handleAddToLibrary(book) {
  navigation.navigate('Library', {
    openAddBook: true,
    prefilledBook: book
  });
}
```

### Retaking the Quiz
```javascript
// From MoodResultsScreen
handleRetakeQuiz() {
  navigation.navigate('MoodFlow');
}
```

### Dismissing a Book
```javascript
// Track dismissed books to exclude from refresh
handleDismiss(bookId) {
  setDismissedBooks([...dismissedBooks, bookId]);
  setRecommendations(
    recommendations.filter(book => book.googleBooksId !== bookId)
  );
}
```

---

## 🔗 Navigation Routes

```javascript
// Home → Mood Quiz
navigation.navigate('MoodFlow');

// Quiz → Results
navigation.navigate('MoodResults', { moodData });

// Results → Library (with book)
navigation.navigate('Library', {
  openAddBook: true,
  prefilledBook: book
});

// Results → Book Details
navigation.navigate('BookDetail', { book });
```

---

## 📱 UI Components

### Mood Summary Card
- Shows selected mood preferences
- Displays mood emoji combination
- Contains action buttons (Retake/Refresh)

### Book Recommendation Card
- Book cover with match badge
- Title, author, rating
- 3-line description
- Match reasons
- Mood tags
- Action buttons

### Empty States
- No quiz data
- No results found
- Loading state

---

## ✅ Testing Checklist

- [ ] Complete quiz with different mood combinations
- [ ] Verify recommendations appear
- [ ] Check match percentages display correctly
- [ ] Test "Add to Library" functionality
- [ ] Verify book data prefills in AddBookSheet
- [ ] Test "Refresh" button
- [ ] Test "Retake Quiz" button
- [ ] Dismiss books and verify they don't reappear
- [ ] Test with poor network connection
- [ ] Verify error messages display properly
- [ ] Check loading states
- [ ] Test navigation back button
- [ ] Verify all mood tag combinations work

---

## 🆘 Quick Fixes

### "No recommendations found"
- Check internet connection
- Try different mood combination
- Verify Google Books API is accessible
- Check console for API errors

### "Books don't match my mood"
- Adjust scoring weights in recommendationService.js
- Refine search terms in MOOD_MAPPINGS
- Increase matchPercentage threshold

### "Prefilled book doesn't appear in AddBookSheet"
- Verify navigation params are passed correctly
- Check AddBookSheet useEffect for prefilledBook
- Console.log the prefilledBook value

### "Slow loading"
- Reduce number of API queries
- Decrease maxBooksPerQuery
- Check network speed
- Consider adding loading skeleton UI

---

## 📚 Related Documentation

- **Full System Documentation**: `MOOD_RECOMMENDATION_SYSTEM.md`
- **API Service**: `src/services/bookService.js`
- **Recommendation Logic**: `src/services/recommendationService.js`

---

**Need Help?** Check the full documentation in `MOOD_RECOMMENDATION_SYSTEM.md`
