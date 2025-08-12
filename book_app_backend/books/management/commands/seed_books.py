from django.core.management.base import BaseCommand
from books.models import Book, BookTag, BookMood, BookGenre, BookTagAssociation, BookMoodAssociation


class Command(BaseCommand):
    help = 'Seed the database with sample books data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database with sample books...')

        # Create genres
        genres = [
            'Fiction', 'Classic Literature', 'Dystopian Fiction', 'Romance',
            'Coming of Age', 'Science Fiction', 'Fantasy', 'Mystery', 'Thriller',
            'Non-Fiction', 'Biography', 'History', 'Young Adult', 'Children\'s',
            'Poetry', 'Drama', 'Horror', 'Adventure', 'Crime', 'Philosophy',
            'Self-Help', 'Business', 'Health', 'Travel', 'Cooking'
        ]

        for genre_name in genres:
            BookGenre.objects.get_or_create(name=genre_name)

        # Create moods
        moods = [
            'adventurous', 'contemplative', 'romantic', 'dark', 'lighthearted',
            'thought-provoking', 'emotional', 'whimsical', 'epic', 'magical',
            'rebellious', 'introspective', 'heroic', 'unsettling', 'melancholic',
            'inspiring', 'mysterious', 'humorous', 'nostalgic', 'uplifting'
        ]

        for mood_name in moods:
            BookMood.objects.get_or_create(name=mood_name)

        # Create tags
        tags = [
            'classic', 'bestseller', 'award-winning', 'page-turner', 'literary',
            'dystopian', 'space opera', 'urban fantasy', 'historical fiction',
            'psychological thriller', 'coming of age', 'family saga', 'war',
            'love story', 'friendship', 'social justice', 'technology', 'magic',
            'dragons', 'vampires', 'detective', 'murder mystery', 'heist',
            'espionage', 'politics', 'religion', 'philosophy', 'science',
            'memoir', 'true crime', 'self-improvement', 'productivity'
        ]

        for tag_name in tags:
            BookTag.objects.get_or_create(name=tag_name)

        # Sample books data
        books_data = [
            {
                'title': 'The Great Gatsby',
                'author': 'F. Scott Fitzgerald',
                'genre': 'Classic Literature',
                'description': 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
                'published_year': 1925,
                'isbn': '9780743273565',
                'average_rating': 4.2,
                'rating_count': 1500000,
                'popularity_score': 95.0,
                'tags': ['classic', 'american literature', 'love story'],
                'moods': ['contemplative', 'melancholic']
            },
            {
                'title': 'To Kill a Mockingbird',
                'author': 'Harper Lee',
                'genre': 'Fiction',
                'description': 'A gripping tale of racial injustice and childhood innocence in the American South.',
                'published_year': 1960,
                'isbn': '9780061120084',
                'average_rating': 4.5,
                'rating_count': 2000000,
                'popularity_score': 92.0,
                'tags': ['classic', 'social justice', 'coming of age'],
                'moods': ['thought-provoking', 'emotional']
            },
            {
                'title': '1984',
                'author': 'George Orwell',
                'genre': 'Dystopian Fiction',
                'description': 'A dystopian social science fiction novel about totalitarian control and surveillance.',
                'published_year': 1949,
                'isbn': '9780451524935',
                'average_rating': 4.4,
                'rating_count': 1800000,
                'popularity_score': 89.0,
                'tags': ['dystopian', 'politics', 'surveillance'],
                'moods': ['dark', 'thought-provoking']
            },
            {
                'title': 'Pride and Prejudice',
                'author': 'Jane Austen',
                'genre': 'Romance',
                'description': 'A romantic novel that charts the emotional development of Elizabeth Bennet.',
                'published_year': 1813,
                'isbn': '9780141439518',
                'average_rating': 4.3,
                'rating_count': 1200000,
                'popularity_score': 88.0,
                'tags': ['romance', 'classic', 'british literature'],
                'moods': ['lighthearted', 'romantic']
            },
            {
                'title': 'The Catcher in the Rye',
                'author': 'J.D. Salinger',
                'genre': 'Coming of Age',
                'description': 'A controversial novel about teenage rebellion and alienation.',
                'published_year': 1951,
                'isbn': '9780316769174',
                'average_rating': 3.8,
                'rating_count': 800000,
                'popularity_score': 85.0,
                'tags': ['coming of age', 'teenage', 'rebellion'],
                'moods': ['rebellious', 'introspective']
            },
            {
                'title': 'Dune',
                'author': 'Frank Herbert',
                'genre': 'Science Fiction',
                'description': 'An epic science fiction novel set in a distant future amidst a feudal interstellar society.',
                'published_year': 1965,
                'isbn': '9780441172719',
                'average_rating': 4.6,
                'rating_count': 900000,
                'popularity_score': 87.0,
                'tags': ['sci-fi', 'space opera', 'epic'],
                'moods': ['adventurous', 'epic']
            },
            {
                'title': 'The Hobbit',
                'author': 'J.R.R. Tolkien',
                'genre': 'Fantasy',
                'description': 'A fantasy novel about the adventures of Bilbo Baggins.',
                'published_year': 1937,
                'isbn': '9780547928227',
                'average_rating': 4.7,
                'rating_count': 1300000,
                'popularity_score': 94.0,
                'tags': ['fantasy', 'adventure', 'dragons'],
                'moods': ['adventurous', 'whimsical']
            },
            {
                'title': 'Brave New World',
                'author': 'Aldous Huxley',
                'genre': 'Dystopian Fiction',
                'description': 'A dystopian novel about a futuristic society driven by technology and conditioning.',
                'published_year': 1932,
                'isbn': '9780060850524',
                'average_rating': 4.1,
                'rating_count': 700000,
                'popularity_score': 83.0,
                'tags': ['dystopian', 'technology', 'society'],
                'moods': ['thought-provoking', 'unsettling']
            },
            {
                'title': 'The Lord of the Rings',
                'author': 'J.R.R. Tolkien',
                'genre': 'Fantasy',
                'description': 'An epic high fantasy novel about the journey to destroy the One Ring.',
                'published_year': 1954,
                'isbn': '9780544003415',
                'average_rating': 4.8,
                'rating_count': 1600000,
                'popularity_score': 96.0,
                'tags': ['fantasy', 'epic', 'adventure'],
                'moods': ['epic', 'heroic']
            },
            {
                'title': 'Harry Potter and the Philosopher\'s Stone',
                'author': 'J.K. Rowling',
                'genre': 'Fantasy',
                'description': 'A young wizard discovers his magical heritage and attends Hogwarts School.',
                'published_year': 1997,
                'isbn': '9780747532699',
                'average_rating': 4.6,
                'rating_count': 2500000,
                'popularity_score': 98.0,
                'tags': ['fantasy', 'magic', 'young adult'],
                'moods': ['magical', 'adventurous']
            },
            {
                'title': 'The Seven Husbands of Evelyn Hugo',
                'author': 'Taylor Jenkins Reid',
                'genre': 'Fiction',
                'description': 'A captivating novel about a reclusive Hollywood icon who finally decides to tell her story.',
                'published_year': 2017,
                'isbn': '9781501139239',
                'average_rating': 4.7,
                'rating_count': 800000,
                'popularity_score': 91.0,
                'tags': ['contemporary', 'lgbtq', 'hollywood'],
                'moods': ['emotional', 'inspiring']
            },
            {
                'title': 'Atomic Habits',
                'author': 'James Clear',
                'genre': 'Self-Help',
                'description': 'An easy and proven way to build good habits and break bad ones.',
                'published_year': 2018,
                'isbn': '9780735211292',
                'average_rating': 4.6,
                'rating_count': 500000,
                'popularity_score': 88.0,
                'tags': ['self-improvement', 'productivity', 'habits'],
                'moods': ['inspiring', 'uplifting']
            }
        ]

        created_count = 0
        for book_data in books_data:
            tags = book_data.pop('tags', [])
            moods = book_data.pop('moods', [])

            book, created = Book.objects.get_or_create(
                isbn=book_data['isbn'],
                defaults=book_data
            )

            if created:
                created_count += 1
                self.stdout.write(f'Created book: {book.title}')

                # Add tags
                for tag_name in tags:
                    tag, _ = BookTag.objects.get_or_create(name=tag_name)
                    BookTagAssociation.objects.get_or_create(book=book, tag=tag)

                # Add moods
                for mood_name in moods:
                    mood, _ = BookMood.objects.get_or_create(name=mood_name)
                    BookMoodAssociation.objects.get_or_create(book=book, mood=mood)

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully seeded database with {created_count} books, '
                f'{len(genres)} genres, {len(moods)} moods, and {len(tags)} tags!'
            )
        )