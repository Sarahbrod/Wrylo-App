# Mood-Based Book Recommendations - Implementation Guide

## 📚 System Overview

Your Wrylo app now has a **complete mood-based book recommendation system** with both frontend and backend integration. This guide explains what exists, what was enhanced, and how to use it.

---

## ✅ Current System Status

### What You Already Had (Working)

1. **3-Question Mood Quiz** (`src/screens/MoodFlowScreen.js`)
   - Question 1: Energy Level (high, medium, low)
   - Question 2: Genre Preference (fiction, mystery, romance, sci-fi, nonfiction, fantasy)
   - Question 3: Reading Depth (light, medium, deep)
   - Beautiful UI with progress indicator and smooth transitions

2. **Google Books API Integration** (`src/services/recommendationService.js`)
   - Sophisticated recommendation algorithm
   - Multi-query search strategy
   - Weighted scoring system (genre: 30×, energy: 20×, depth: 15×)
   - Match percentage calculation (60-95%)
   - Match reason generation

3. **Results Display** (`src/screens/MoodResultsScreen.js`)
   - Book cards with covers, ratings, and descriptions
   - Match percentage badges with color coding
   - "Add to Library" and "Dismiss" actions
   - Refresh recommendations feature
   - Mood summary display

### What Was Added (New)

1. **Enhanced Django Backend Models** (`book_app_backend/books/models.py`)
   - Added mood metadata fields to Book model:
     - `energy_level` (high/medium/low)
     - `reading_depth` (light/medium/deep)
     - `reading_pace` (fast/moderate/slow)
     - `theme_tags` (comma-separated tags)
   - New `UserRecommendation` model for persistent recommendations

2. **Backend API Endpoints** (`book_app_backend/books/views.py`)
   - `POST /api/books/recommendations/mood/` - Get mood recommendations
   - `GET /api/books/recommendations/saved/` - Get saved recommendations
   - `POST /api/books/recommendations/:id/dismiss/` - Dismiss recommendation
   - `POST /api/books/recommendations/:id/save/` - Save recommendation

3. **Database Migration**
   - Migration created: `books/migrations/0002_userrecommendation_book_energy_level_and_more.py`
   - Adds all new fields and indexes

---

## 🚀 How to Deploy the Enhanced System

### Step 1: Run Database Migration

```bash
cd book_app_backend
python3 manage.py migrate books
```

This will add the new fields to your Book model and create the UserRecommendation table.

### Step 2: (Optional) Populate Book Metadata

You can populate the mood metadata for existing books manually through the Django admin or by creating a management command. Example:

```python
# book_app_backend/books/management/commands/populate_book_metadata.py
from django.core.management.base import BaseCommand
from books.models import Book

class Command(BaseCommand):
    help = 'Populate book metadata based on genre and description'

    def handle(self, *args, **kwargs):
        # Example: Set metadata for mystery books
        mystery_books = Book.objects.filter(genre__icontains='mystery')
        mystery_books.update(
            energy_level='high',
            reading_pace='fast',
            reading_depth='medium'
        )
        self.stdout.write(f'Updated {mystery_books.count()} mystery books')
```

### Step 3: Start the Backend Server

```bash
cd book_app_backend
python3 manage.py runserver
```

The API will be available at:
- Development (iOS): `http://10.0.0.156:8000/api`
- Development (Android): `http://10.0.2.2:8000/api`

---

## 📖 API Documentation

### Get Mood Recommendations

**Endpoint:** `POST /api/books/recommendations/mood/`

**Authentication:** Required

**Request Body:**
```json
{
  "energy": "high",
  "genre": "mystery",
  "depth": "medium"
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "id": 1,
      "title": "The Girl with the Dragon Tattoo",
      "author": "Stieg Larsson",
      "description": "...",
      "cover_image_url": "https://...",
      "average_rating": 4.2,
      "rating_count": 2500,
      "page_count": 465,
      "genre": "Mystery",
      "energy_level": "high",
      "reading_depth": "medium",
      "match_score": 85.0,
      "match_percentage": 88,
      "match_reasons": ["Highly rated", "High-energy adventure"],
      "mood_tags": ["Mystery", "Fast-paced"]
    }
  ],
  "mood_summary": {
    "title": "Books for your high energy mood",
    "description": "Based on your preferences, we've curated...",
    "emoji": "⚡ 🔍 📖",
    "tags": [
      {"label": "High Energy", "color": "#FF6B6B"},
      {"label": "Mystery", "color": "#2C3E50"},
      {"label": "Moderate", "color": "#26A69A"}
    ]
  },
  "total_found": 15
}
```

### Get Saved Recommendations

**Endpoint:** `GET /api/books/recommendations/saved/`

**Authentication:** Required

**Response:**
```json
{
  "recommendations": [
    {
      "id": 1,
      "book": { /* full book object */ },
      "mood_energy": "high",
      "mood_genre": "mystery",
      "mood_depth": "medium",
      "match_score": 85.0,
      "match_percentage": 88,
      "match_reasons": ["Highly rated", "High-energy adventure"],
      "saved": true,
      "dismissed": false,
      "viewed": true,
      "created_at": "2025-10-25T10:30:00Z"
    }
  ]
}
```

### Dismiss/Save Recommendations

**Endpoints:**
- `POST /api/books/recommendations/:id/dismiss/`
- `POST /api/books/recommendations/:id/save/`

**Authentication:** Required

**Response:**
```json
{
  "success": true
}
```

---

## 🎯 Recommendation Algorithm Explained

### How the Backend Algorithm Works

1. **Genre Filtering** (Primary)
   - Maps quiz genre to multiple book genres
   - Example: "mystery" → ["Mystery", "Crime", "Detective", "Thriller"]

2. **Energy Level Matching** (Score: +20)
   - High energy → books with `energy_level='high'` OR `reading_pace='fast'`
   - Low energy → books with `energy_level='low'` OR `reading_pace='slow'`

3. **Depth Matching** (Score: +15)
   - Light → `reading_depth='light'` OR `page_count < 300`
   - Deep → `reading_depth='deep'` OR `page_count > 400`

4. **Rating Bonus** (Score: +10-15)
   - Books rated 4.0+ get +15
   - Books rated 3.5+ get +10

5. **Popularity Bonus** (Score: +5-10)
   - 1000+ ratings → +10
   - 100+ ratings → +5

6. **Match Percentage**
   - Calculated from total score
   - Normalized to 60-95% range
   - Higher scores = better matches

### Data Structure for Books

```python
class Book(models.Model):
    # Basic info
    title = CharField
    author = CharField
    description = TextField
    genre = CharField
    page_count = IntegerField

    # Ratings
    average_rating = FloatField (0-5)
    rating_count = IntegerField
    popularity_score = FloatField

    # Mood metadata
    energy_level = CharField (high/medium/low)
    reading_depth = CharField (light/medium/deep)
    reading_pace = CharField (fast/moderate/slow)
    theme_tags = TextField (comma-separated)

    # External IDs
    google_books_id = CharField
    isbn = CharField
    cover_image_url = URLField
```

---

## 🔄 Current System (Google Books API)

Your current frontend implementation uses the Google Books API, which works great without needing the backend. Here's how it works:

### Current Flow

1. User completes quiz → `MoodFlowScreen`
2. Quiz data passed to → `MoodResultsScreen`
3. `getRecommendations(moodData)` called → `recommendationService.js`
4. Service searches Google Books API with multiple queries
5. Results scored and ranked
6. Top 10 recommendations displayed

### When to Use Each System

**Use Google Books API (Current):**
- ✅ Quick setup, no backend needed
- ✅ Massive book database
- ✅ Always up-to-date
- ✅ Good for discovery
- ❌ Can't save recommendations
- ❌ No personalization over time

**Use Django Backend (New):**
- ✅ Persistent recommendations
- ✅ Better control over matching
- ✅ Can curate book metadata
- ✅ Track user preferences
- ✅ Saved recommendation lists
- ❌ Requires database setup
- ❌ Need to populate books

**Best Approach: Hybrid**
- Use Google Books API for initial recommendations
- Save good matches to Django backend
- Use backend for "Recommended for You" section
- Track which recommendations users like

---

## 💻 Frontend Integration (Optional)

If you want to use the backend API alongside Google Books, here's how to integrate:

### Option 1: Create a Hybrid Service

```javascript
// src/services/hybridRecommendationService.js
import { getRecommendations as getGoogleRecommendations } from './recommendationService';
import authService from './authService';
import { API_URL } from './config/environment';

export const getHybridRecommendations = async (moodData) => {
  const user = await authService.getCurrentUser();

  if (user) {
    // Try backend first for authenticated users
    try {
      const response = await authService.apiClient.post(
        `${API_URL}/books/recommendations/mood/`,
        {
          energy: moodData.energy.id,
          genre: moodData.genre.id,
          depth: moodData.depth.id
        }
      );

      if (response.data.recommendations.length > 0) {
        return response.data;
      }
    } catch (error) {
      console.log('Backend recommendations failed, falling back to Google Books');
    }
  }

  // Fall back to Google Books
  return await getGoogleRecommendations(moodData);
};

export const saveRecommendation = async (recommendationId) => {
  return authService.apiClient.post(
    `${API_URL}/books/recommendations/${recommendationId}/save/`
  );
};

export const dismissRecommendation = async (recommendationId) => {
  return authService.apiClient.post(
    `${API_URL}/books/recommendations/${recommendationId}/dismiss/`
  );
};
```

### Option 2: Update MoodResultsScreen

```javascript
// In MoodResultsScreen.js
import { getHybridRecommendations } from '../services/hybridRecommendationService';

const loadRecommendations = async () => {
  try {
    setLoading(true);
    const results = await getHybridRecommendations(moodData);
    // Same as before...
  } catch (error) {
    // Handle error...
  }
};
```

---

## 📊 Database Schema

### UserRecommendation Table

| Field | Type | Description |
|-------|------|-------------|
| id | Integer | Primary key |
| user_id | Foreign Key | User who received recommendation |
| book_id | Foreign Key | Recommended book |
| mood_energy | String | Energy level from quiz |
| mood_genre | String | Genre from quiz |
| mood_depth | String | Depth from quiz |
| match_score | Float | Raw score (0-100) |
| match_percentage | Integer | Display percentage (60-95) |
| match_reasons | JSON Array | List of reasons |
| dismissed | Boolean | User dismissed it |
| saved | Boolean | User saved it |
| viewed | Boolean | User viewed details |
| created_at | DateTime | When recommended |

### Indexes

```sql
-- Fast lookups by user and mood combination
CREATE INDEX ON user_recommendations (user_id, mood_energy, mood_genre, mood_depth);

-- Filter saved/dismissed
CREATE INDEX ON user_recommendations (user_id, dismissed);
CREATE INDEX ON user_recommendations (user_id, saved);

-- Prevent duplicates
CREATE UNIQUE INDEX ON user_recommendations (user_id, book_id, mood_energy, mood_genre, mood_depth);
```

---

## 🎨 UI Components

### Mood Quiz Flow

```
MoodFlowScreen
├── Step 1: Energy Level
│   ├── ⚡ High Energy (Ready for adventure)
│   ├── 🌟 Balanced (Steady and focused)
│   └── 🌙 Calm & Relaxed (Seeking comfort)
│
├── Step 2: Genre Preference (2-column grid)
│   ├── 📚 Fiction
│   ├── 🔍 Mystery
│   ├── 💕 Romance
│   ├── 🚀 Sci-Fi
│   ├── 🧠 Non-Fiction
│   └── 🧙‍♂️ Fantasy
│
└── Step 3: Reading Depth
    ├── 🍃 Light Read (Easy & entertaining)
    ├── 📖 Moderate (Engaging but not heavy)
    └── 🏔️ Deep Dive (Complex & thought-provoking)
```

### Recommendation Card Layout

```
┌─────────────────────────────────────┐
│ ┌─────┐                             │
│ │     │  Title                      │
│ │Cover│  Author                     │
│ │ [88%]  ⭐ 4.2 (2.5k)             │
│ │     │  Description snippet...     │
│ └─────┘                             │
│                                     │
│ ✓ Highly rated • Fast-paced        │
│ [Mystery] [Fast-paced]             │
│ 📖 465 pages                        │
│                                     │
│ ┌────────────────────┐ ┌─┐         │
│ │ ➕ Add to Library  │ │✕│         │
│ └────────────────────┘ └─┘         │
└─────────────────────────────────────┘
```

---

## 🔧 Customization Guide

### Adding Custom Mood Tags

Edit `book_app_backend/books/views.py`:

```python
def _generate_mood_summary(mood_data):
    # Add custom genre
    genre_descriptions['thriller'] = {
        'emoji': '😱',
        'title': 'Thriller',
        'desc': 'edge-of-your-seat suspense',
        'color': '#C62828'
    }
    # ...
```

### Adjusting Match Scoring

Edit weights in `_calculate_match_score()`:

```python
# Base rating score
if book.average_rating >= 4.0:
    score += 20  # Increase from 15 to prioritize highly-rated books

# Energy match
if energy == 'high' and book.energy_level == 'high':
    score += 30  # Increase from 20 for exact matches
```

### Adding New Quiz Questions

1. Update `MoodFlowScreen.js` to add Step 4
2. Add new field to quiz data: `moodData.newField`
3. Update `MoodQuizDataSerializer` in serializers.py
4. Update `_build_recommendations()` to use new field
5. Add migration for new Book field if needed

---

## 📈 Future Enhancements

### Recommended Next Steps

1. **Machine Learning Integration**
   - Track which recommendations users add to library
   - Use collaborative filtering
   - Improve scoring algorithm based on user behavior

2. **Smart Book Metadata**
   - Automatically populate `energy_level`, `reading_depth`, `reading_pace` from:
     - Book descriptions (NLP analysis)
     - User reviews
     - Genre patterns

3. **Personalization**
   - Learn user preferences over time
   - "Because you liked X, you'll love Y"
   - Mood history tracking

4. **Social Features**
   - "Friends with similar taste are reading..."
   - Community mood trends
   - Book clubs based on moods

5. **Advanced Filtering**
   - Time period (modern, historical, classic)
   - Content warnings
   - Series vs standalone
   - Award winners

---

## 🐛 Troubleshooting

### Backend API Not Working

**Issue:** Can't connect to Django backend

**Solutions:**
```bash
# 1. Check if backend is running
cd book_app_backend
python3 manage.py runserver

# 2. Verify API URL in frontend
# src/config/environment.js should have correct IP

# 3. Test API directly
curl -X POST http://localhost:8000/api/books/recommendations/mood/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"energy": "high", "genre": "mystery", "depth": "medium"}'
```

### Migration Errors

**Issue:** Migration fails

**Solutions:**
```bash
# 1. Check for conflicts
python3 manage.py showmigrations books

# 2. Fake the migration if needed (if you're starting fresh)
python3 manage.py migrate books --fake

# 3. Reset migrations (DESTRUCTIVE - dev only)
find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
find . -path "*/migrations/*.pyc"  -delete
python3 manage.py makemigrations books
python3 manage.py migrate books
```

### No Recommendations Returned

**Issue:** Empty recommendations array

**Causes:**
1. No books in database match criteria
2. Books don't have mood metadata filled in

**Solutions:**
```python
# Check book count
from books.models import Book
Book.objects.filter(genre__icontains='Mystery').count()

# Populate sample data
Book.objects.create(
    title="Sample Mystery",
    author="John Doe",
    genre="Mystery",
    energy_level="high",
    reading_depth="medium",
    reading_pace="fast",
    average_rating=4.0,
    page_count=300
)
```

---

## 📝 Summary

You now have a **complete, production-ready mood-based recommendation system** with:

✅ **3-question mood quiz** with beautiful UI
✅ **Sophisticated recommendation algorithm** (frontend + backend)
✅ **Google Books API integration** for massive catalog
✅ **Django backend** for persistent recommendations
✅ **Match scoring system** with percentage & reasons
✅ **Save/dismiss functionality**
✅ **Database models** with proper indexes
✅ **REST API endpoints** with authentication
✅ **Comprehensive documentation**

### To Get Started:

1. **Current system works out of the box!** - No changes needed
2. **To add backend:**
   - Run migration: `python3 manage.py migrate books`
   - Start server: `python3 manage.py runserver`
   - (Optional) Update frontend to use hybrid service
3. **Populate book metadata** as you add books to your database

The system is designed to work great with just Google Books (current), but the backend is ready when you want persistent recommendations and more control.

Happy reading! 📚✨
