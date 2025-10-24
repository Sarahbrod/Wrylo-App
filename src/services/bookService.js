/**
 * Book Search Service
 * Handles book search functionality using Google Books API
 */

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';

/**
 * Search for books using Google Books API
 *
 * @param {string} query - Search query (title, author, or keywords)
 * @param {number} maxResults - Maximum number of results to return (default: 15)
 * @returns {Promise<Array>} - Array of book objects
 */
export const searchBooks = async (query, maxResults = 15) => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const url = `${GOOGLE_BOOKS_API}?q=${encodedQuery}&maxResults=${maxResults}&orderBy=relevance`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return [];
    }

    // Transform Google Books API response to our app's format
    return data.items.map((item) => transformBookData(item));
  } catch (error) {
    console.error('Book search error:', error);
    throw error;
  }
};

/**
 * Search books by specific field (title, author, or genre)
 *
 * @param {string} query - Search query
 * @param {string} field - Field to search ('title', 'author', or 'subject')
 * @param {number} maxResults - Maximum results
 * @returns {Promise<Array>} - Array of book objects
 */
export const searchBooksByField = async (query, field = 'intitle', maxResults = 15) => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  try {
    const encodedQuery = encodeURIComponent(query.trim());
    let searchField = 'intitle'; // Default to title search

    // Map field names to Google Books API search parameters
    if (field === 'author') {
      searchField = 'inauthor';
    } else if (field === 'genre' || field === 'subject') {
      searchField = 'subject';
    }

    const url = `${GOOGLE_BOOKS_API}?q=${searchField}:${encodedQuery}&maxResults=${maxResults}&orderBy=relevance`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return [];
    }

    return data.items.map((item) => transformBookData(item));
  } catch (error) {
    console.error('Book search by field error:', error);
    throw error;
  }
};

/**
 * Transform Google Books API data to our app's book format
 *
 * @param {Object} item - Google Books API item
 * @returns {Object} - Transformed book object
 */
const transformBookData = (item) => {
  const volumeInfo = item.volumeInfo || {};
  const imageLinks = volumeInfo.imageLinks || {};

  return {
    id: item.id,
    googleBooksId: item.id,
    title: volumeInfo.title || 'Unknown Title',
    subtitle: volumeInfo.subtitle || '',
    authors: volumeInfo.authors || ['Unknown Author'],
    author: volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author',
    description: volumeInfo.description || '',
    publisher: volumeInfo.publisher || '',
    publishedDate: volumeInfo.publishedDate || '',
    pageCount: volumeInfo.pageCount || 0,
    categories: volumeInfo.categories || [],
    genres: volumeInfo.categories || [],
    averageRating: volumeInfo.averageRating || 0,
    ratingsCount: volumeInfo.ratingsCount || 0,
    coverUrl: imageLinks.thumbnail || imageLinks.smallThumbnail || '',
    coverImage: imageLinks.thumbnail || imageLinks.smallThumbnail || '',
    // High-res cover (remove edge=curl parameter if present)
    coverUrlLarge: imageLinks.large || imageLinks.medium || (imageLinks.thumbnail || '').replace('&edge=curl', ''),
    language: volumeInfo.language || 'en',
    isbn: getISBN(volumeInfo.industryIdentifiers),
    previewLink: volumeInfo.previewLink || '',
    infoLink: volumeInfo.infoLink || '',
  };
};

/**
 * Extract ISBN from industry identifiers
 *
 * @param {Array} identifiers - Array of industry identifiers
 * @returns {string} - ISBN number
 */
const getISBN = (identifiers) => {
  if (!identifiers || identifiers.length === 0) {
    return '';
  }

  // Prefer ISBN_13 over ISBN_10
  const isbn13 = identifiers.find((id) => id.type === 'ISBN_13');
  if (isbn13) {
    return isbn13.identifier;
  }

  const isbn10 = identifiers.find((id) => id.type === 'ISBN_10');
  if (isbn10) {
    return isbn10.identifier;
  }

  return identifiers[0].identifier || '';
};

/**
 * Get book details by Google Books ID
 *
 * @param {string} bookId - Google Books ID
 * @returns {Promise<Object>} - Book object
 */
export const getBookById = async (bookId) => {
  try {
    const url = `${GOOGLE_BOOKS_API}/${bookId}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch book: ${response.status}`);
    }

    const data = await response.json();
    return transformBookData(data);
  } catch (error) {
    console.error('Get book by ID error:', error);
    throw error;
  }
};

/**
 * Filter books locally by multiple criteria
 *
 * @param {Array} books - Array of books
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered books
 */
export const filterBooks = (books, searchTerm) => {
  if (!searchTerm || searchTerm.trim().length === 0) {
    return books;
  }

  const term = searchTerm.toLowerCase().trim();

  return books.filter((book) => {
    const title = (book.title || '').toLowerCase();
    const author = (book.author || '').toLowerCase();
    const genres = (book.genres || []).join(' ').toLowerCase();
    const categories = (book.categories || []).join(' ').toLowerCase();

    return (
      title.includes(term) ||
      author.includes(term) ||
      genres.includes(term) ||
      categories.includes(term)
    );
  });
};
