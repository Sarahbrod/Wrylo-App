from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'books'

urlpatterns = [
    # Search endpoints
    path('search/', views.search_books, name='search_books'),
    path('suggestions/', views.search_suggestions, name='search_suggestions'),
    
    # Browse endpoints
    path('popular/', views.PopularBooksView.as_view(), name='popular_books'),
    path('genre/<str:genre>/', views.GenreBooksView.as_view(), name='books_by_genre'),
    
    # Metadata endpoints
    path('genres/', views.available_genres, name='available_genres'),
    path('moods/', views.available_moods, name='available_moods'),
    
    # User library endpoints
    path('library/', views.UserLibraryView.as_view(), name='user_library'),
    path('library/<int:pk>/', views.UserLibraryDetailView.as_view(), name='user_library_detail'),
    path('library/add-external/', views.add_external_book_to_library, name='add_external_book'),

    # Mood-based recommendation endpoints
    path('recommendations/mood/', views.get_mood_recommendations, name='mood_recommendations'),
    path('recommendations/saved/', views.get_saved_recommendations, name='saved_recommendations'),
    path('recommendations/<int:recommendation_id>/dismiss/', views.dismiss_recommendation, name='dismiss_recommendation'),
    path('recommendations/<int:recommendation_id>/save/', views.save_recommendation, name='save_recommendation'),
]