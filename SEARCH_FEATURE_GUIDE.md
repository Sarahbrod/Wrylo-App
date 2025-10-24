# Real-Time Book Search Feature Guide

## Overview
A comprehensive real-time search feature has been implemented for your book tracking and recommendations app. The search functionality is integrated into two key areas:
1. **Discover Screen** - Main search for browsing and discovering books
2. **Add Book Sheet** - Search when adding new books to your library

## Features Implemented

### 1. Real-Time Search
- **Debouncing**: 300ms delay to optimize API calls and improve performance
- **Case-insensitive**: Searches work regardless of letter casing
- **Partial matching**: Returns results for incomplete queries
- **Multi-field search**: Searches across book titles, authors, and genres

### 2. Search Results Display
Each search result shows:
- Book cover image with fallback for missing images
- Book title and subtitle
- Author name(s)
- Star rating (visual display with numeric score)
- Number of ratings
- Genre/category tags

### 3. Loading & Empty States
- **Loading state**: Displays spinner with "Searching for books..." message
- **Initial state**: Shows helpful prompt before user types
- **No results state**: Friendly message when no books are found
- **Results count**: Shows number of results found

### 4. User Experience
- Click any book to select it
- Search results appear in a dropdown overlay
- Keyboard automatically dismisses on selection
- Clear button (X) to reset search
- Smooth animations and hover states
- Mobile-responsive design

## File Structure

```
src/
├── components/
│   ├── AddBookSheet.js          # Updated with search
│   └── BookSearchResults.js     # Reusable search results component (NEW)
├── screens/
│   └── RecommendationsScreen.js # Updated with search
├── services/
│   └── bookService.js           # Book search API service (NEW)
└── utils/
    ├── debounce.js              # Debounce utility function (NEW)
    └── useDebounce.js           # Debounce custom hook (NEW)
```

## Components

### BookSearchResults Component
**Location**: `src/components/BookSearchResults.js`

A reusable component that displays search results with loading and empty states.

**Props**:
- `visible` (boolean) - Show/hide results
- `results` (array) - Array of book objects
- `loading` (boolean) - Loading state
- `searchQuery` (string) - Current search query
- `onSelectBook` (function) - Callback when book is selected
- `onSeeAll` (function, optional) - Callback for "see all" action
- `maxHeight` (number) - Maximum height of results container

**Example Usage**:
```javascript
<BookSearchResults
  visible={showResults}
  results={searchResults}
  loading={isSearching}
  searchQuery={searchQuery}
  onSelectBook={handleSelectBook}
  maxHeight={400}
/>
```

### Book Service
**Location**: `src/services/bookService.js`

Handles all book search functionality using the Google Books API.

**Functions**:
- `searchBooks(query, maxResults)` - General search
- `searchBooksByField(query, field, maxResults)` - Field-specific search
- `getBookById(bookId)` - Get book details by ID
- `filterBooks(books, searchTerm)` - Local filtering

**Example**:
```javascript
import { searchBooks } from '../services/bookService';

const results = await searchBooks('Harry Potter', 15);
```

### Debounce Utilities
**Locations**:
- `src/utils/debounce.js` - Function-based debounce
- `src/utils/useDebounce.js` - React hook for debouncing

**Example**:
```javascript
import { useDebounce } from '../utils/useDebounce';

const [searchQuery, setSearchQuery] = useState('');
const debouncedQuery = useDebounce(searchQuery, 300);

useEffect(() => {
  // This will only run 300ms after user stops typing
  performSearch(debouncedQuery);
}, [debouncedQuery]);
```

## Implementation Details

### Discover Screen (RecommendationsScreen.js)

**What Changed**:
1. Added search state management
2. Integrated debounce hook
3. Added search effect to trigger API calls
4. Updated search input with handlers
5. Added BookSearchResults component

**Search Flow**:
1. User types in search input
2. Query is debounced (300ms delay)
3. API call is made to Google Books
4. Results are displayed in dropdown
5. User clicks a book to view/add it

### Add Book Sheet (AddBookSheet.js)

**What Changed**:
1. Added search functionality to the modal
2. Pre-fills book data when selected from search
3. Automatically shows manual form after selection
4. Maintains book metadata (cover, description, etc.)

**Search Flow**:
1. User opens Add Book sheet
2. Searches for a book
3. Selects from results
4. Form auto-fills with book data
5. User can add rating, status, and comments
6. Book is saved with all metadata

## Data Structure

### Book Object (from API)
```javascript
{
  id: string,
  googleBooksId: string,
  title: string,
  subtitle: string,
  authors: array,
  author: string,
  description: string,
  publisher: string,
  publishedDate: string,
  pageCount: number,
  categories: array,
  genres: array,
  averageRating: number,
  ratingsCount: number,
  coverUrl: string,
  coverUrlLarge: string,
  language: string,
  isbn: string,
  previewLink: string,
  infoLink: string
}
```

## API Integration

### Google Books API
- **Endpoint**: `https://www.googleapis.com/books/v1/volumes`
- **No API Key Required**: For basic searches (rate-limited)
- **Documentation**: https://developers.google.com/books/docs/v1/using

### Rate Limits
- Free tier: ~1000 requests per day
- Consider implementing caching for production
- Can add API key for higher limits

## Performance Optimizations

1. **Debouncing**: Reduces API calls by waiting for user to stop typing
2. **Result Limiting**: Default 15 results for Discover, 12 for Add Book
3. **Image Fallbacks**: Graceful handling of missing cover images
4. **Keyboard Management**: Auto-dismiss on selection
5. **Conditional Rendering**: Only renders results when needed

## Future Enhancements

### Recommended Improvements:
1. **Caching**: Store recent searches to reduce API calls
2. **Offline Support**: Cache popular books for offline browsing
3. **Advanced Filters**: Filter by genre, year, rating, etc.
4. **Search History**: Remember recent searches
5. **Autocomplete**: Suggest books as user types
6. **Keyboard Navigation**: Arrow keys and Enter support
7. **Pagination**: Load more results on scroll
8. **API Key**: Add Google Books API key for higher rate limits
9. **Analytics**: Track popular searches
10. **Book Details Page**: Navigate to full book details

### Potential Features:
- Search by ISBN/barcode scanning
- Voice search
- Sort options (relevance, rating, date)
- Multi-language support
- Related books suggestions
- Author pages
- Reading lists/collections

## Styling

All components use consistent styling with your app's design system:
- **Primary Color**: `#481825`
- **Secondary Colors**: `#71727A`, `#F6F4F1`
- **Accent Color**: `#FFD700` (for ratings)
- **Border Radius**: 12-16px
- **Shadows**: Consistent elevation

## Troubleshooting

### No Results Found
- Check internet connection
- Verify search query is at least 2 characters
- Try different search terms
- Check console for API errors

### Slow Search
- Check network speed
- Consider reducing maxResults
- Verify debounce is working (should be 300ms delay)

### Missing Cover Images
- Google Books API sometimes lacks images
- Fallback placeholder is shown automatically
- Consider using alternative image sources

## Testing

### Test Scenarios:
1. ✅ Search with valid book title
2. ✅ Search with author name
3. ✅ Search with genre/category
4. ✅ Empty search (< 2 characters)
5. ✅ No results search
6. ✅ Select a book from results
7. ✅ Clear search with X button
8. ✅ Keyboard dismissal
9. ✅ Loading state display
10. ✅ Mobile responsiveness

## Support

For issues or questions:
1. Check console for error messages
2. Verify API connectivity
3. Review Google Books API status
4. Check rate limiting

## Credits

- **Google Books API**: Book data and metadata
- **React Native**: Framework
- **Expo**: Development platform
- **Ionicons**: Icons

---

**Last Updated**: October 2025
**Version**: 1.0.0
