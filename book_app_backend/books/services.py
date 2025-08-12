import requests
import logging
from django.db.models import Q, F
from django.db.models.functions import Lower
from django.conf import settings
from .models import Book, BookTag, BookMood, BookGenre
from .serializers import ExternalBookSerializer

logger = logging.getLogger(__name__)


class GoogleBooksService:
    """Service for interacting with Google Books API"""
    
    BASE_URL = "https://www.googleapis.com/books/v1/volumes"
    
    def __init__(self):
        self.api_key = getattr(settings, 'GOOGLE_BOOKS_API_KEY', None)
    
    def search_books(self, query, max_results=20):
        """Search books using Google Books API"""
        try:
            params = {
                'q': query,
                'maxResults': min(max_results, 40),
                'printType': 'books',
                'orderBy': 'relevance'
            }
            
            if self.api_key:
                params['key'] = self.api_key
            
            response = requests.get(self.BASE_URL, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            books = []
            
            for item in data.get('items', []):
                volume_info = item.get('volumeInfo', {})
                book_data = {
                    'google_books_id': item.get('id'),
                    'title': volume_info.get('title', ''),
                    'authors': volume_info.get('authors', []),
                    'description': volume_info.get('description', ''),
                    'published_date': volume_info.get('publishedDate', ''),
                    'categories': volume_info.get('categories', []),
                    'page_count': volume_info.get('pageCount'),
                    'average_rating': volume_info.get('averageRating'),
                    'ratings_count': volume_info.get('ratingsCount'),
                    'image_links': volume_info.get('imageLinks', {}),
                    'industry_identifiers': volume_info.get('industryIdentifiers', [])
                }
                
                serializer = ExternalBookSerializer(data=book_data)
                if serializer.is_valid():
                    books.append(serializer.validated_data)
                else:
                    logger.warning(f"Invalid book data from Google Books: {serializer.errors}")
            
            return books
            
        except requests.RequestException as e:
            logger.error(f"Google Books API error: {e}")
            return []
        except Exception as e:
            logger.error(f"Unexpected error in Google Books search: {e}")
            return []


class OpenLibraryService:
    """Service for interacting with Open Library API"""
    
    SEARCH_URL = "https://openlibrary.org/search.json"
    
    def search_books(self, query, limit=20):
        """Search books using Open Library API"""
        try:
            params = {
                'q': query,
                'limit': limit,
                'fields': 'key,title,author_name,first_publish_year,subject,isbn,cover_i'
            }
            
            response = requests.get(self.SEARCH_URL, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            books = []
            
            for doc in data.get('docs', []):
                book_data = {
                    'openlibrary_id': doc.get('key', '').replace('/works/', ''),
                    'title': doc.get('title', ''),
                    'authors': doc.get('author_name', []),
                    'published_date': str(doc.get('first_publish_year', '')),
                    'categories': doc.get('subject', [])[:3],  # Limit subjects
                    'industry_identifiers': [
                        {'type': 'ISBN_13', 'identifier': isbn}
                        for isbn in doc.get('isbn', [])[:1]  # Take first ISBN
                    ],
                    'image_links': {
                        'thumbnail': f"https://covers.openlibrary.org/b/id/{doc.get('cover_i', '')}-M.jpg"
                    } if doc.get('cover_i') else {}
                }
                
                serializer = ExternalBookSerializer(data=book_data)
                if serializer.is_valid():
                    books.append(serializer.validated_data)
                else:
                    logger.warning(f"Invalid book data from Open Library: {serializer.errors}")
            
            return books
            
        except requests.RequestException as e:
            logger.error(f"Open Library API error: {e}")
            return []
        except Exception as e:
            logger.error(f"Unexpected error in Open Library search: {e}")
            return []


class BookSearchService:
    """Main service for book searching functionality"""
    
    def __init__(self):
        self.google_books = GoogleBooksService()
        self.open_library = OpenLibraryService()
    
    def search_local_books(self, query, filters=None):
        """Search books in local database"""
        if not query or len(query.strip()) < 2:
            return Book.objects.none()
        
        filters = filters or {}
        query = query.strip()
        
        # Build search query
        search_query = (
            Q(title__icontains=query) |
            Q(author__icontains=query) |
            Q(description__icontains=query) |
            Q(genre__icontains=query)
        )
        
        # Apply filters
        queryset = Book.objects.filter(search_query)
        
        if filters.get('genre'):
            genre_filter = Q()
            for genre in filters['genre']:
                genre_filter |= Q(genre__icontains=genre)
            queryset = queryset.filter(genre_filter)
        
        if filters.get('mood'):
            mood_filter = Q()
            for mood in filters['mood']:
                mood_filter |= Q(mood_associations__mood__name__icontains=mood)
            queryset = queryset.filter(mood_filter)
        
        if filters.get('rating'):
            queryset = queryset.filter(average_rating__gte=filters['rating'])
        
        if filters.get('year_from'):
            queryset = queryset.filter(published_year__gte=filters['year_from'])
        
        if filters.get('year_to'):
            queryset = queryset.filter(published_year__lte=filters['year_to'])
        
        # Apply sorting
        sort_by = filters.get('sort_by', 'relevance')
        if sort_by == 'popularity':
            queryset = queryset.order_by('-popularity_score', '-average_rating')
        elif sort_by == 'rating':
            queryset = queryset.order_by('-average_rating', '-rating_count')
        elif sort_by == 'newest':
            queryset = queryset.order_by('-published_year')
        elif sort_by == 'oldest':
            queryset = queryset.order_by('published_year')
        elif sort_by == 'title':
            queryset = queryset.order_by(Lower('title'))
        else:  # relevance (default)
            # Calculate relevance score
            queryset = queryset.extra(
                select={
                    'relevance_score': """
                        CASE 
                            WHEN LOWER(title) = LOWER(%s) THEN 100
                            WHEN LOWER(title) LIKE LOWER(%s) THEN 80
                            WHEN LOWER(author) LIKE LOWER(%s) THEN 60
                            WHEN LOWER(genre) LIKE LOWER(%s) THEN 40
                            ELSE 20
                        END + popularity_score * 0.1 + average_rating * 2
                    """
                },
                select_params=[query, f'%{query}%', f'%{query}%', f'%{query}%']
            ).order_by('-relevance_score')
        
        return queryset.distinct()
    
    def search_external_books(self, query, max_results=20):
        """Search books from external APIs"""
        all_books = []
        
        # Search Google Books
        google_books = self.google_books.search_books(query, max_results // 2)
        all_books.extend(google_books)
        
        # Search Open Library
        open_library_books = self.open_library.search_books(query, max_results // 2)
        all_books.extend(open_library_books)
        
        # Remove duplicates based on title and author
        seen = set()
        unique_books = []
        
        for book in all_books:
            key = (book.get('title', '').lower(), book.get('author', '').lower())
            if key not in seen:
                seen.add(key)
                unique_books.append(book)
        
        return unique_books[:max_results]
    
    def combined_search(self, query, filters=None, include_external=True):
        """Search both local and external books"""
        results = {
            'local_books': [],
            'external_books': [],
            'total_count': 0
        }
        
        # Search local books
        local_books = self.search_local_books(query, filters)
        limit = filters.get('limit', 20) if filters else 20
        
        results['local_books'] = local_books[:limit]
        results['total_count'] = len(results['local_books'])
        
        # Search external books if we have room and it's enabled
        if include_external and results['total_count'] < limit:
            remaining_slots = limit - results['total_count']
            external_books = self.search_external_books(query, remaining_slots)
            results['external_books'] = external_books
            results['total_count'] += len(external_books)
        
        return results
    
    def get_suggestions(self, query):
        """Get search suggestions based on query"""
        if not query or len(query.strip()) < 2:
            return []
        
        query = query.strip()
        suggestions = []
        
        # Title suggestions
        title_suggestions = Book.objects.filter(
            title__icontains=query
        ).values_list('title', flat=True)[:3]
        suggestions.extend(title_suggestions)
        
        # Author suggestions
        author_suggestions = Book.objects.filter(
            author__icontains=query
        ).values_list('author', flat=True).distinct()[:3]
        suggestions.extend(author_suggestions)
        
        # Genre suggestions
        genre_suggestions = BookGenre.objects.filter(
            name__icontains=query
        ).values_list('name', flat=True)[:2]
        suggestions.extend(genre_suggestions)
        
        # Remove duplicates and limit
        return list(dict.fromkeys(suggestions))[:8]


# Global instance
book_search_service = BookSearchService()