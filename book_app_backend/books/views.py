from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from django.core.cache import cache
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from .models import Book, BookGenre, BookMood, BookTag, UserLibrary, UserRecommendation
from .serializers import (
    BookSerializer, BookSearchSerializer, UserLibrarySerializer,
    BookTagSerializer, BookMoodSerializer, MoodQuizDataSerializer,
    BookRecommendationSerializer, UserRecommendationSerializer,
    MoodSummarySerializer
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


# Mood-Based Recommendation Views

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def get_mood_recommendations(request):
    """
    Get book recommendations based on mood quiz results

    Expected payload:
    {
        "energy": "high" | "medium" | "low",
        "genre": "fiction" | "mystery" | "romance" | "scifi" | "nonfiction" | "fantasy",
        "depth": "light" | "medium" | "deep"
    }
    """
    serializer = MoodQuizDataSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(
            {'error': 'Invalid mood data', 'details': serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    mood_data = serializer.validated_data

    try:
        # Build recommendation query
        recommendations = _build_recommendations(
            energy=mood_data['energy'],
            genre=mood_data['genre'],
            depth=mood_data['depth'],
            user=request.user,
            limit=15
        )

        # Generate mood summary
        mood_summary = _generate_mood_summary(mood_data)

        # Save recommendations to database
        for rec in recommendations:
            UserRecommendation.objects.update_or_create(
                user=request.user,
                book=rec['book'],
                mood_energy=mood_data['energy'],
                mood_genre=mood_data['genre'],
                mood_depth=mood_data['depth'],
                defaults={
                    'match_score': rec['match_score'],
                    'match_percentage': rec['match_percentage'],
                    'match_reasons': rec['match_reasons']
                }
            )

        return Response({
            'recommendations': recommendations,
            'mood_summary': mood_summary,
            'total_found': len(recommendations)
        })

    except Exception as e:
        logger.error(f"Mood recommendations error: {e}")
        return Response(
            {'error': 'Failed to generate recommendations', 'message': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


def _build_recommendations(energy, genre, depth, user, limit=15):
    """
    Build recommendations based on mood criteria
    """
    # Start with base query
    queryset = Book.objects.all()

    # Apply filters based on mood data
    filters = Q()

    # Genre filtering
    genre_map = {
        'fiction': ['Fiction', 'Literary Fiction', 'Contemporary'],
        'mystery': ['Mystery', 'Crime', 'Detective', 'Thriller'],
        'romance': ['Romance', 'Contemporary Romance'],
        'scifi': ['Science Fiction', 'Dystopian', 'Space Opera'],
        'nonfiction': ['Nonfiction', 'Biography', 'Self-Help', 'History'],
        'fantasy': ['Fantasy', 'Epic Fantasy', 'Urban Fantasy', 'Magic']
    }

    if genre in genre_map:
        for genre_term in genre_map[genre]:
            filters |= Q(genre__icontains=genre_term)

    # Energy level filtering
    if energy == 'high':
        filters &= (Q(energy_level='high') | Q(reading_pace='fast'))
    elif energy == 'low':
        filters &= (Q(energy_level='low') | Q(reading_pace='slow'))

    # Depth filtering
    if depth == 'light':
        filters &= (Q(reading_depth='light') | Q(page_count__lt=300))
    elif depth == 'deep':
        filters &= (Q(reading_depth='deep') | Q(page_count__gt=400))

    # Apply filters and order by rating
    books = queryset.filter(filters).order_by('-average_rating', '-rating_count')[:limit * 2]

    # If not enough books, fall back to genre-only filtering
    if len(books) < limit:
        fallback_filters = Q()
        if genre in genre_map:
            for genre_term in genre_map[genre]:
                fallback_filters |= Q(genre__icontains=genre_term)
        books = queryset.filter(fallback_filters).order_by('-average_rating', '-rating_count')[:limit * 2]

    # Score and rank books
    scored_books = []
    for book in books:
        score = _calculate_match_score(book, energy, genre, depth)
        match_percentage = min(95, max(60, int(score['total_score'])))

        scored_books.append({
            'book': book,
            'match_score': score['total_score'],
            'match_percentage': match_percentage,
            'match_reasons': score['reasons'],
            'mood_tags': _extract_mood_tags(book, energy, genre, depth)
        })

    # Sort by score and return top results
    scored_books.sort(key=lambda x: x['match_score'], reverse=True)

    # Serialize books with recommendation metadata
    recommendations = []
    for item in scored_books[:limit]:
        book_data = BookSerializer(item['book']).data
        book_data.update({
            'match_score': item['match_score'],
            'match_percentage': item['match_percentage'],
            'match_reasons': item['match_reasons'],
            'mood_tags': item['mood_tags']
        })
        recommendations.append(book_data)

    return recommendations


def _calculate_match_score(book, energy, genre, depth):
    """
    Calculate match score for a book based on mood criteria
    """
    score = 0
    reasons = []

    # Base rating score
    if book.average_rating >= 4.0:
        score += 15
        reasons.append('Highly rated')
    elif book.average_rating >= 3.5:
        score += 10

    # Energy match
    if energy == 'high' and (book.energy_level == 'high' or book.reading_pace == 'fast'):
        score += 20
        reasons.append('High-energy adventure')
    elif energy == 'low' and (book.energy_level == 'low' or book.reading_pace == 'slow'):
        score += 20
        reasons.append('Calm and relaxing')
    elif energy == 'medium':
        score += 15

    # Depth match
    if depth == 'light' and (book.reading_depth == 'light' or (book.page_count and book.page_count < 300)):
        score += 15
        reasons.append('Quick, easy read')
    elif depth == 'deep' and (book.reading_depth == 'deep' or (book.page_count and book.page_count > 400)):
        score += 15
        reasons.append('Deep and complex')
    elif depth == 'medium':
        score += 10

    # Popularity bonus
    if book.rating_count > 1000:
        score += 10
        reasons.append('Popular choice')
    elif book.rating_count > 100:
        score += 5

    # Page count preference
    if book.page_count:
        if depth == 'light' and book.page_count < 300:
            score += 5
        elif depth == 'deep' and book.page_count > 400:
            score += 5

    # Description quality
    if book.description and len(book.description) > 200:
        score += 5

    return {
        'total_score': score,
        'reasons': reasons[:2]  # Top 2 reasons
    }


def _extract_mood_tags(book, energy, genre, depth):
    """
    Extract mood tags for display
    """
    tags = []

    # Genre tag
    genre_labels = {
        'fiction': 'Fiction',
        'mystery': 'Mystery',
        'romance': 'Romance',
        'scifi': 'Sci-Fi',
        'nonfiction': 'Non-Fiction',
        'fantasy': 'Fantasy'
    }
    tags.append(genre_labels.get(genre, genre.title()))

    # Energy tag
    if energy == 'high':
        tags.append('Fast-paced')
    elif energy == 'low':
        tags.append('Relaxing')

    # Depth tag
    if depth == 'light':
        tags.append('Easy Read')
    elif depth == 'deep':
        tags.append('Complex')

    # Page count tag
    if book.page_count:
        if book.page_count < 250:
            tags.append('Quick Read')
        elif book.page_count > 500:
            tags.append('Epic')

    return tags[:3]


def _generate_mood_summary(mood_data):
    """
    Generate mood summary for display
    """
    energy = mood_data['energy']
    genre = mood_data['genre']
    depth = mood_data['depth']

    energy_descriptions = {
        'high': {'emoji': '⚡', 'title': 'High Energy', 'desc': 'energetic and action-packed', 'color': '#FF6B6B'},
        'medium': {'emoji': '🌟', 'title': 'Balanced', 'desc': 'balanced and engaging', 'color': '#4ECDC4'},
        'low': {'emoji': '🌙', 'title': 'Calm & Relaxed', 'desc': 'calm and comforting', 'color': '#45B7D1'}
    }

    genre_descriptions = {
        'fiction': {'emoji': '📚', 'title': 'Fiction', 'desc': 'imaginative fiction', 'color': '#9B59B6'},
        'mystery': {'emoji': '🔍', 'title': 'Mystery', 'desc': 'mysterious and suspenseful', 'color': '#2C3E50'},
        'romance': {'emoji': '💕', 'title': 'Romance', 'desc': 'heartwarming romance', 'color': '#E91E63'},
        'scifi': {'emoji': '🚀', 'title': 'Sci-Fi', 'desc': 'futuristic sci-fi', 'color': '#3F51B5'},
        'nonfiction': {'emoji': '🧠', 'title': 'Non-Fiction', 'desc': 'insightful nonfiction', 'color': '#FF9800'},
        'fantasy': {'emoji': '🧙\u200d♂\ufe0f', 'title': 'Fantasy', 'desc': 'magical fantasy', 'color': '#8BC34A'}
    }

    depth_descriptions = {
        'light': {'emoji': '🍃', 'title': 'Light Read', 'desc': 'light and entertaining', 'color': '#FDD835'},
        'medium': {'emoji': '📖', 'title': 'Moderate', 'desc': 'moderately engaging', 'color': '#26A69A'},
        'deep': {'emoji': '🏔️', 'title': 'Deep Dive', 'desc': 'complex and thought-provoking', 'color': '#5E35B1'}
    }

    energy_info = energy_descriptions.get(energy, energy_descriptions['medium'])
    genre_info = genre_descriptions.get(genre, {'emoji': '📚', 'title': genre.title(), 'desc': genre, 'color': '#9B59B6'})
    depth_info = depth_descriptions.get(depth, depth_descriptions['medium'])

    return {
        'title': f"Books for your {energy_info['title'].lower()} mood",
        'description': f"Based on your preferences, we've curated a selection of {depth_info['desc']}, {energy_info['desc']} {genre_info['desc']} books perfect for your current reading vibe.",
        'emoji': f"{energy_info['emoji']} {genre_info['emoji']} {depth_info['emoji']}",
        'tags': [
            {'label': energy_info['title'], 'color': energy_info['color']},
            {'label': genre_info['title'], 'color': genre_info['color']},
            {'label': depth_info['title'], 'color': depth_info['color']}
        ]
    }


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_saved_recommendations(request):
    """
    Get user's saved recommendations
    """
    recommendations = UserRecommendation.objects.filter(
        user=request.user,
        saved=True
    ).select_related('book')

    serializer = UserRecommendationSerializer(recommendations, many=True)
    return Response({'recommendations': serializer.data})


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def dismiss_recommendation(request, recommendation_id):
    """
    Dismiss a recommendation
    """
    try:
        recommendation = UserRecommendation.objects.get(
            id=recommendation_id,
            user=request.user
        )
        recommendation.dismissed = True
        recommendation.save()
        return Response({'success': True})
    except UserRecommendation.DoesNotExist:
        return Response(
            {'error': 'Recommendation not found'},
            status=status.HTTP_404_NOT_FOUND
        )


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def save_recommendation(request, recommendation_id):
    """
    Save a recommendation
    """
    try:
        recommendation = UserRecommendation.objects.get(
            id=recommendation_id,
            user=request.user
        )
        recommendation.saved = True
        recommendation.save()
        return Response({'success': True})
    except UserRecommendation.DoesNotExist:
        return Response(
            {'error': 'Recommendation not found'},
            status=status.HTTP_404_NOT_FOUND
        )