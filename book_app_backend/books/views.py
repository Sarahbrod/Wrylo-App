from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from django.core.cache import cache
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from .models import Book, BookGenre, BookMood, BookTag, UserLibrary
from .serializers import (
    BookSerializer, BookSearchSerializer, UserLibrarySerializer,
    BookTagSerializer, BookMoodSerializer
)
from .services import book_search_service

import logging

logger = logging.getLogger(__name__)


class BookSearchPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'limit'
    max_page_size = 100


@api_view(['GET'])
@permission_classes([permissions.AllowAny])  # Make search public for discovery
def search_books(request):
    """
    Search books using local database and external APIs
    """
    serializer = BookSearchSerializer(data=request.GET)
    if not serializer.is_valid():
        return Response(
            {'error': 'Invalid search parameters', 'details': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    query = serializer.validated_data['q']
    filters = {
        'genre': serializer.validated_data.get('genre', []),
        'mood': serializer.validated_data.get('mood', []),
        'rating': serializer.validated_data.get('rating'),
        'year_from': serializer.validated_data.get('year_from'),
        'year_to': serializer.validated_data.get('year_to'),
        'sort_by': serializer.validated_data.get('sort_by', 'relevance'),
        'limit': serializer.validated_data.get('limit', 20)
    }
    
    # Check cache first
    cache_key = f"book_search:{hash(str(sorted(request.GET.items())))}"
    cached_result = cache.get(cache_key)
    
    if cached_result:
        return Response(cached_result)
    
    try:
        # Perform search
        search_results = book_search_service.combined_search(
            query, 
            filters, 
            include_external=True
        )
        
        # Serialize local books
        local_books_serializer = BookSerializer(search_results['local_books'], many=True)
        
        response_data = {
            'query': query,
            'total_count': search_results['total_count'],
            'local_books': local_books_serializer.data,
            'external_books': search_results['external_books'],
            'has_more': len(search_results['local_books']) + len(search_results['external_books']) >= filters['limit']
        }
        
        # Cache for 5 minutes
        cache.set(cache_key, response_data, 300)
        
        return Response(response_data)
        
    except Exception as e:
        logger.error(f"Search error: {e}")
        return Response(
            {'error': 'Search failed', 'message': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def search_suggestions(request):
    """
    Get search suggestions based on query
    """
    query = request.GET.get('q', '').strip()
    
    if not query or len(query) < 2:
        return Response({'suggestions': []})
    
    # Check cache
    cache_key = f"suggestions:{query.lower()}"
    cached_suggestions = cache.get(cache_key)
    
    if cached_suggestions:
        return Response({'suggestions': cached_suggestions})
    
    try:
        suggestions = book_search_service.get_suggestions(query)
        
        # Cache for 10 minutes
        cache.set(cache_key, suggestions, 600)
        
        return Response({'suggestions': suggestions})
        
    except Exception as e:
        logger.error(f"Suggestions error: {e}")
        return Response({'suggestions': []})


@method_decorator(cache_page(60 * 15), name='dispatch')  # Cache for 15 minutes
class PopularBooksView(generics.ListAPIView):
    """
    Get popular books
    """
    serializer_class = BookSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = BookSearchPagination
    
    def get_queryset(self):
        return Book.objects.order_by('-popularity_score', '-average_rating')


@method_decorator(cache_page(60 * 30), name='dispatch')  # Cache for 30 minutes
class GenreBooksView(generics.ListAPIView):
    """
    Get books by genre
    """
    serializer_class = BookSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = BookSearchPagination
    
    def get_queryset(self):
        genre = self.kwargs.get('genre')
        return Book.objects.filter(genre__icontains=genre).order_by('-popularity_score')


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def available_genres(request):
    """
    Get all available genres
    """
    cache_key = "available_genres"
    genres = cache.get(cache_key)
    
    if not genres:
        # Get genres from both BookGenre model and Book model
        model_genres = list(BookGenre.objects.values_list('name', flat=True))
        book_genres = list(Book.objects.values_list('genre', flat=True).distinct())
        
        # Combine and deduplicate
        all_genres = list(set(model_genres + book_genres))
        all_genres.sort()
        
        genres = [{'name': genre} for genre in all_genres if genre]
        
        # Cache for 1 hour
        cache.set(cache_key, genres, 3600)
    
    return Response({'genres': genres})


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def available_moods(request):
    """
    Get all available moods
    """
    cache_key = "available_moods"
    moods = cache.get(cache_key)
    
    if not moods:
        moods_qs = BookMood.objects.all()
        serializer = BookMoodSerializer(moods_qs, many=True)
        moods = serializer.data
        
        # Cache for 1 hour
        cache.set(cache_key, moods, 3600)
    
    return Response({'moods': moods})


# User Library Views (require authentication)

class UserLibraryView(generics.ListCreateAPIView):
    """
    Get user's library or add a book to library
    """
    serializer_class = UserLibrarySerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = BookSearchPagination
    
    def get_queryset(self):
        status_filter = self.request.GET.get('status')
        queryset = UserLibrary.objects.filter(user=self.request.user)
        
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        return queryset.order_by('-date_added')


class UserLibraryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Get, update, or delete a specific library entry
    """
    serializer_class = UserLibrarySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserLibrary.objects.filter(user=self.request.user)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def add_external_book_to_library(request):
    """
    Add an external book (from API search) to user's library
    This creates a new Book record if it doesn't exist
    """
    try:
        book_data = request.data.get('book', {})
        library_data = request.data.get('library', {})
        
        if not book_data:
            return Response(
                {'error': 'Book data is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if book already exists (by ISBN or Google Books ID)
        existing_book = None
        
        if book_data.get('isbn'):
            existing_book = Book.objects.filter(isbn=book_data['isbn']).first()
        
        if not existing_book and book_data.get('google_books_id'):
            existing_book = Book.objects.filter(
                google_books_id=book_data['google_books_id']
            ).first()
        
        if existing_book:
            book = existing_book
        else:
            # Create new book
            book = Book.objects.create(
                title=book_data.get('title', ''),
                author=book_data.get('author', ''),
                isbn=book_data.get('isbn'),
                description=book_data.get('description', ''),
                genre=book_data.get('genre', 'Unknown'),
                published_year=book_data.get('year') or book_data.get('published_year', 2000),
                page_count=book_data.get('page_count'),
                cover_image_url=book_data.get('cover_image_url'),
                google_books_id=book_data.get('google_books_id'),
                average_rating=book_data.get('average_rating', 0.0),
                rating_count=book_data.get('ratings_count', 0),
                popularity_score=book_data.get('popularity_score', 0.0)
            )
        
        # Add to user's library
        library_entry, created = UserLibrary.objects.get_or_create(
            user=request.user,
            book=book,
            defaults={
                'status': library_data.get('status', 'want_to_read'),
                'notes': library_data.get('notes', '')
            }
        )
        
        if not created:
            return Response(
                {'error': 'Book is already in your library'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = UserLibrarySerializer(library_entry)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        logger.error(f"Add external book error: {e}")
        return Response(
            {'error': 'Failed to add book to library'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )