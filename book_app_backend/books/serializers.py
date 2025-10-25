from rest_framework import serializers
from .models import Book, BookTag, BookMood, BookGenre, UserLibrary, UserRecommendation


class BookTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookTag
        fields = ['id', 'name']


class BookMoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookMood
        fields = ['id', 'name']


class BookSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    moods = serializers.SerializerMethodField()
    year = serializers.IntegerField(source='published_year', read_only=True)

    class Meta:
        model = Book
        fields = [
            'id', 'title', 'author', 'isbn', 'description', 'genre',
            'published_year', 'year', 'page_count', 'cover_image_url',
            'average_rating', 'rating_count', 'popularity_score',
            'tags', 'moods', 'google_books_id', 'openlibrary_id',
            # Mood-based fields
            'energy_level', 'reading_depth', 'reading_pace', 'theme_tags'
        ]

    def get_tags(self, obj):
        tags = obj.tag_associations.select_related('tag').all()
        return [tag_assoc.tag.name for tag_assoc in tags]

    def get_moods(self, obj):
        moods = obj.mood_associations.select_related('mood').all()
        return [mood_assoc.mood.name for mood_assoc in moods]


class UserLibrarySerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    book_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = UserLibrary
        fields = [
            'id', 'book', 'book_id', 'status', 'user_rating',
            'progress_percentage', 'notes', 'date_added',
            'date_started', 'date_completed'
        ]

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class BookSearchSerializer(serializers.Serializer):
    q = serializers.CharField(required=True, min_length=2, max_length=200)
    genre = serializers.ListField(
        child=serializers.CharField(max_length=100),
        required=False,
        allow_empty=True
    )
    mood = serializers.ListField(
        child=serializers.CharField(max_length=50),
        required=False,
        allow_empty=True
    )
    rating = serializers.FloatField(min_value=0, max_value=5, required=False)
    year_from = serializers.IntegerField(min_value=1000, max_value=2030, required=False)
    year_to = serializers.IntegerField(min_value=1000, max_value=2030, required=False)
    sort_by = serializers.ChoiceField(
        choices=['relevance', 'popularity', 'rating', 'newest', 'oldest', 'title'],
        default='relevance',
        required=False
    )
    limit = serializers.IntegerField(min_value=1, max_value=100, default=20, required=False)


class ExternalBookSerializer(serializers.Serializer):
    """Serializer for external book APIs (Google Books, Open Library)"""
    title = serializers.CharField()
    authors = serializers.ListField(child=serializers.CharField(), required=False)
    author = serializers.SerializerMethodField()
    description = serializers.CharField(required=False, allow_blank=True)
    published_date = serializers.CharField(required=False)
    year = serializers.SerializerMethodField()
    categories = serializers.ListField(child=serializers.CharField(), required=False)
    genre = serializers.SerializerMethodField()
    page_count = serializers.IntegerField(required=False)
    average_rating = serializers.FloatField(required=False)
    ratings_count = serializers.IntegerField(required=False)
    image_links = serializers.DictField(required=False)
    cover_image_url = serializers.SerializerMethodField()
    industry_identifiers = serializers.ListField(required=False)
    isbn = serializers.SerializerMethodField()
    google_books_id = serializers.CharField(required=False)

    def get_author(self, obj):
        authors = obj.get('authors', [])
        return authors[0] if authors else 'Unknown Author'

    def get_year(self, obj):
        published_date = obj.get('published_date', '')
        if published_date:
            try:
                return int(published_date[:4])
            except (ValueError, IndexError):
                pass
        return None

    def get_genre(self, obj):
        categories = obj.get('categories', [])
        return categories[0] if categories else 'Unknown'

    def get_cover_image_url(self, obj):
        image_links = obj.get('image_links', {})
        return (
            image_links.get('large') or
            image_links.get('medium') or
            image_links.get('small') or
            image_links.get('thumbnail')
        )

    def get_isbn(self, obj):
        identifiers = obj.get('industry_identifiers', [])
        for identifier in identifiers:
            if identifier.get('type') in ['ISBN_13', 'ISBN_10']:
                return identifier.get('identifier')
        return None


class MoodQuizDataSerializer(serializers.Serializer):
    """Serializer for mood quiz input data"""
    energy = serializers.ChoiceField(choices=['high', 'medium', 'low'])
    genre = serializers.CharField(max_length=50)
    depth = serializers.ChoiceField(choices=['light', 'medium', 'deep'])


class BookRecommendationSerializer(BookSerializer):
    """Extended book serializer with recommendation metadata"""
    match_score = serializers.FloatField(read_only=True)
    match_percentage = serializers.IntegerField(read_only=True)
    match_reasons = serializers.ListField(child=serializers.CharField(), read_only=True)
    mood_tags = serializers.ListField(child=serializers.CharField(), read_only=True)

    class Meta(BookSerializer.Meta):
        fields = BookSerializer.Meta.fields + [
            'match_score', 'match_percentage', 'match_reasons', 'mood_tags'
        ]


class UserRecommendationSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    book_id = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = UserRecommendation
        fields = [
            'id', 'book', 'book_id', 'mood_energy', 'mood_genre', 'mood_depth',
            'match_score', 'match_percentage', 'match_reasons',
            'dismissed', 'saved', 'viewed', 'created_at'
        ]
        read_only_fields = ['match_score', 'match_percentage', 'match_reasons']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class MoodSummarySerializer(serializers.Serializer):
    """Serializer for mood summary display"""
    title = serializers.CharField()
    description = serializers.CharField()
    emoji = serializers.CharField()
    tags = serializers.ListField(child=serializers.DictField())