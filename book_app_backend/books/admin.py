from django.contrib import admin
from .models import (
    Book, BookTag, BookMood, BookGenre, 
    BookTagAssociation, BookMoodAssociation, UserLibrary
)


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'genre', 'published_year', 'average_rating', 'popularity_score']
    list_filter = ['genre', 'published_year', 'average_rating']
    search_fields = ['title', 'author', 'isbn']
    readonly_fields = ['created_at', 'updated_at']
    ordering = ['-popularity_score', '-average_rating']


@admin.register(BookTag)
class BookTagAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']


@admin.register(BookMood)
class BookMoodAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']


@admin.register(BookGenre)
class BookGenreAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']


@admin.register(UserLibrary)
class UserLibraryAdmin(admin.ModelAdmin):
    list_display = ['user', 'book', 'status', 'user_rating', 'date_added']
    list_filter = ['status', 'user_rating', 'date_added']
    search_fields = ['user__username', 'book__title', 'book__author']
    readonly_fields = ['date_added']