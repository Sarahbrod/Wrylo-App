from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()


class Book(models.Model):
    ENERGY_LEVEL_CHOICES = [
        ('high', 'High Energy'),
        ('medium', 'Medium Energy'),
        ('low', 'Low Energy'),
    ]

    DEPTH_CHOICES = [
        ('light', 'Light Read'),
        ('medium', 'Medium Depth'),
        ('deep', 'Deep Dive'),
    ]

    PACE_CHOICES = [
        ('fast', 'Fast-Paced'),
        ('moderate', 'Moderate Pace'),
        ('slow', 'Slow-Paced'),
    ]

    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13, unique=True, null=True, blank=True)
    description = models.TextField(blank=True)
    genre = models.CharField(max_length=100)
    published_year = models.IntegerField()
    page_count = models.IntegerField(null=True, blank=True)
    cover_image_url = models.URLField(null=True, blank=True)
    google_books_id = models.CharField(max_length=100, null=True, blank=True)
    openlibrary_id = models.CharField(max_length=100, null=True, blank=True)

    # Metadata
    average_rating = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)]
    )
    rating_count = models.IntegerField(default=0)
    popularity_score = models.FloatField(default=0.0)

    # Mood-based metadata
    energy_level = models.CharField(
        max_length=10,
        choices=ENERGY_LEVEL_CHOICES,
        null=True,
        blank=True,
        help_text="Energy level/pace of the book"
    )
    reading_depth = models.CharField(
        max_length=10,
        choices=DEPTH_CHOICES,
        null=True,
        blank=True,
        help_text="Complexity and depth of the book"
    )
    reading_pace = models.CharField(
        max_length=10,
        choices=PACE_CHOICES,
        null=True,
        blank=True,
        help_text="Overall pacing of the narrative"
    )

    # Theme tags (comma-separated for quick filtering)
    theme_tags = models.TextField(
        blank=True,
        help_text="Comma-separated theme tags (e.g., 'adventure, romance, coming-of-age')"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-popularity_score', '-average_rating']
        indexes = [
            models.Index(fields=['title']),
            models.Index(fields=['author']),
            models.Index(fields=['genre']),
            models.Index(fields=['isbn']),
            models.Index(fields=['google_books_id']),
            models.Index(fields=['energy_level']),
            models.Index(fields=['reading_depth']),
            models.Index(fields=['reading_pace']),
        ]

    def __str__(self):
        return f"{self.title} by {self.author}"


class BookTag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class BookMood(models.Model):
    name = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class BookGenre(models.Model):
    name = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class BookTagAssociation(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='tag_associations')
    tag = models.ForeignKey(BookTag, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['book', 'tag']


class BookMoodAssociation(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='mood_associations')
    mood = models.ForeignKey(BookMood, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['book', 'mood']


class UserLibrary(models.Model):
    STATUS_CHOICES = [
        ('want_to_read', 'Want to Read'),
        ('reading', 'Currently Reading'),
        ('completed', 'Completed'),
        ('paused', 'Paused'),
        ('abandoned', 'Abandoned'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='library_books')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='want_to_read')
    user_rating = models.FloatField(
        null=True, blank=True,
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)]
    )
    progress_percentage = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    notes = models.TextField(blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    date_started = models.DateTimeField(null=True, blank=True)
    date_completed = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ['user', 'book']
        ordering = ['-date_added']

    def __str__(self):
        return f"{self.user.username} - {self.book.title} ({self.status})"


class UserRecommendation(models.Model):
    """
    Stores mood-based recommendations for users
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recommendations')
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    # Quiz data that generated this recommendation
    mood_energy = models.CharField(max_length=10)  # high, medium, low
    mood_genre = models.CharField(max_length=50)   # fiction, mystery, etc.
    mood_depth = models.CharField(max_length=10)   # light, medium, deep

    # Recommendation metadata
    match_score = models.FloatField(default=0.0)
    match_percentage = models.IntegerField(default=0)
    match_reasons = models.JSONField(default=list, blank=True)

    # User interaction
    dismissed = models.BooleanField(default=False)
    saved = models.BooleanField(default=False)
    viewed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at', '-match_score']
        indexes = [
            models.Index(fields=['user', 'mood_energy', 'mood_genre', 'mood_depth']),
            models.Index(fields=['user', 'dismissed']),
            models.Index(fields=['user', 'saved']),
        ]
        # Prevent duplicate recommendations
        unique_together = ['user', 'book', 'mood_energy', 'mood_genre', 'mood_depth']

    def __str__(self):
        return f"{self.user.username} - {self.book.title} ({self.match_percentage}%)"