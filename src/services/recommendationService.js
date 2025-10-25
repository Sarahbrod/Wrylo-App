/**
 * Book Recommendation Service
 * Generates personalized book recommendations based on mood quiz results
 */

import { searchBooksByField, searchBooks } from './bookService';

/**
 * Mood-to-Search Query Mapping
 * Maps mood quiz results to Google Books API search queries
 */
const MOOD_MAPPINGS = {
  energy: {
    high: {
      keywords: ['action', 'adventure', 'thriller', 'fast-paced', 'exciting'],
      themes: ['adventure', 'action', 'suspense'],
      paceWeight: 1.5, // Prefer faster-paced books
      description: 'energetic and action-packed'
    },
    medium: {
      keywords: ['engaging', 'compelling', 'contemporary', 'drama'],
      themes: ['drama', 'contemporary', 'literary'],
      paceWeight: 1.0,
      description: 'balanced and engaging'
    },
    low: {
      keywords: ['peaceful', 'contemplative', 'gentle', 'cozy', 'comfort'],
      themes: ['slice of life', 'cozy', 'gentle'],
      paceWeight: 0.5, // Prefer slower, more reflective books
      description: 'calm and comforting'
    }
  },

  genre: {
    fiction: {
      searchTerms: ['fiction', 'literary fiction', 'contemporary fiction'],
      categories: ['Fiction', 'Literary Fiction', 'Contemporary'],
      description: 'imaginative fiction'
    },
    mystery: {
      searchTerms: ['mystery', 'detective', 'crime', 'thriller'],
      categories: ['Mystery', 'Crime', 'Detective', 'Thriller'],
      description: 'mysterious and suspenseful'
    },
    romance: {
      searchTerms: ['romance', 'love story', 'contemporary romance'],
      categories: ['Romance', 'Contemporary Romance', 'Love'],
      description: 'heartwarming romance'
    },
    scifi: {
      searchTerms: ['science fiction', 'sci-fi', 'dystopian', 'space'],
      categories: ['Science Fiction', 'Dystopian', 'Space Opera'],
      description: 'futuristic sci-fi'
    },
    nonfiction: {
      searchTerms: ['nonfiction', 'biography', 'memoir', 'self-help'],
      categories: ['Nonfiction', 'Biography', 'Self-Help', 'History'],
      description: 'insightful nonfiction'
    },
    fantasy: {
      searchTerms: ['fantasy', 'magic', 'epic fantasy', 'urban fantasy'],
      categories: ['Fantasy', 'Epic Fantasy', 'Urban Fantasy', 'Magic'],
      description: 'magical fantasy'
    }
  },

  depth: {
    light: {
      keywords: ['light', 'fun', 'easy read', 'entertaining', 'beach read'],
      pageRange: { min: 0, max: 350 },
      complexityWeight: 0.3,
      description: 'light and entertaining'
    },
    medium: {
      keywords: ['engaging', 'thought-provoking', 'well-written'],
      pageRange: { min: 200, max: 500 },
      complexityWeight: 1.0,
      description: 'moderately engaging'
    },
    deep: {
      keywords: ['complex', 'profound', 'literary', 'philosophical', 'deep'],
      pageRange: { min: 300, max: 1000 },
      complexityWeight: 1.5,
      description: 'complex and thought-provoking'
    }
  }
};

/**
 * Generate personalized book recommendations based on mood quiz results
 *
 * @param {Object} moodData - Quiz results with energy, genre, and depth
 * @returns {Promise<Object>} - Recommendations with books and metadata
 */
export const getRecommendations = async (moodData) => {
  try {
    const { energy, genre, depth } = moodData;

    if (!energy || !genre || !depth) {
      throw new Error('Invalid mood data');
    }

    // Get mood mappings
    const energyMap = MOOD_MAPPINGS.energy[energy.id];
    const genreMap = MOOD_MAPPINGS.genre[genre.id];
    const depthMap = MOOD_MAPPINGS.depth[depth.id];

    // Build search queries with different strategies
    const searchQueries = buildSearchQueries(genreMap, energyMap, depthMap);

    // Fetch books from multiple queries
    const allBooks = await fetchBooksFromQueries(searchQueries);

    // Remove duplicates
    const uniqueBooks = removeDuplicateBooks(allBooks);

    // Score and rank books based on mood match
    const scoredBooks = scoreBooks(uniqueBooks, moodData, energyMap, genreMap, depthMap);

    // Sort by score and get top recommendations
    const topRecommendations = scoredBooks
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10);

    // Generate mood summary
    const moodSummary = generateMoodSummary(energy, genre, depth, energyMap, genreMap, depthMap);

    return {
      recommendations: topRecommendations,
      moodSummary,
      totalFound: scoredBooks.length,
      moodData
    };
  } catch (error) {
    console.error('Recommendation error:', error);
    throw error;
  }
};

/**
 * Build multiple search queries to get diverse results
 */
const buildSearchQueries = (genreMap, energyMap, depthMap) => {
  const queries = [];

  // Primary genre-based searches
  genreMap.searchTerms.forEach(term => {
    queries.push({
      type: 'subject',
      query: term,
      weight: 2.0 // High priority
    });
  });

  // Combined genre + energy searches
  genreMap.searchTerms.slice(0, 2).forEach(genreTerm => {
    energyMap.keywords.slice(0, 2).forEach(energyKeyword => {
      queries.push({
        type: 'general',
        query: `${genreTerm} ${energyKeyword}`,
        weight: 1.5
      });
    });
  });

  // Depth-influenced searches
  genreMap.searchTerms.slice(0, 1).forEach(genreTerm => {
    depthMap.keywords.slice(0, 1).forEach(depthKeyword => {
      queries.push({
        type: 'general',
        query: `${genreTerm} ${depthKeyword}`,
        weight: 1.2
      });
    });
  });

  return queries;
};

/**
 * Fetch books from multiple search queries
 */
const fetchBooksFromQueries = async (queries) => {
  const maxBooksPerQuery = 15;
  const bookPromises = queries.map(async ({ type, query }) => {
    try {
      if (type === 'subject') {
        return await searchBooksByField(query, 'subject', maxBooksPerQuery);
      } else {
        return await searchBooks(query, maxBooksPerQuery);
      }
    } catch (error) {
      console.error(`Query failed for "${query}":`, error);
      return [];
    }
  });

  const results = await Promise.all(bookPromises);
  return results.flat();
};

/**
 * Remove duplicate books based on Google Books ID
 */
const removeDuplicateBooks = (books) => {
  const seen = new Set();
  return books.filter(book => {
    if (seen.has(book.googleBooksId)) {
      return false;
    }
    seen.add(book.googleBooksId);
    return true;
  });
};

/**
 * Score books based on how well they match the mood criteria
 */
const scoreBooks = (books, moodData, energyMap, genreMap, depthMap) => {
  return books.map(book => {
    let score = 0;
    const reasons = [];

    // Base score for having a rating
    if (book.averageRating && book.averageRating >= 3.5) {
      score += 10;
      if (book.averageRating >= 4.0) {
        score += 5;
        reasons.push('Highly rated');
      }
    }

    // Genre match (highest weight)
    const genreScore = calculateGenreMatch(book, genreMap);
    score += genreScore * 30;
    if (genreScore > 0.5) {
      reasons.push(`Perfect for ${moodData.genre.title.toLowerCase()}`);
    }

    // Energy/pace match
    const energyScore = calculateEnergyMatch(book, energyMap);
    score += energyScore * 20;
    if (energyScore > 0.6) {
      reasons.push(`Matches your ${energyMap.description} mood`);
    }

    // Depth/complexity match
    const depthScore = calculateDepthMatch(book, depthMap);
    score += depthScore * 15;
    if (depthScore > 0.5) {
      reasons.push(`${depthMap.description} read`);
    }

    // Description quality bonus
    if (book.description && book.description.length > 200) {
      score += 5;
    }

    // Page count preference
    if (book.pageCount > 0) {
      const { min, max } = depthMap.pageRange;
      if (book.pageCount >= min && book.pageCount <= max) {
        score += 10;
      }
    }

    // Popularity bonus (more ratings = more popular)
    if (book.ratingsCount > 100) {
      score += 5;
    }
    if (book.ratingsCount > 1000) {
      score += 5;
      reasons.push('Popular choice');
    }

    // Generate match percentage based on normalized score
    // Maximum theoretical score is ~105, normalize to 0-98 range
    const normalizedScore = Math.min(100, (score / 105) * 100);
    const matchPercentage = Math.round(Math.min(98, normalizedScore));

    return {
      ...book,
      matchScore: score,
      matchPercentage,
      matchReasons: reasons.slice(0, 2), // Top 2 reasons
      moodTags: extractMoodTags(book, moodData)
    };
  });
};

/**
 * Calculate genre match score (0-1)
 */
const calculateGenreMatch = (book, genreMap) => {
  if (!book.categories || book.categories.length === 0) {
    return 0.3; // Default score for books without categories
  }

  const bookCategories = book.categories.map(cat => cat.toLowerCase());
  const targetCategories = genreMap.categories.map(cat => cat.toLowerCase());

  let matches = 0;
  for (const targetCat of targetCategories) {
    for (const bookCat of bookCategories) {
      if (bookCat.includes(targetCat) || targetCat.includes(bookCat)) {
        matches++;
        break;
      }
    }
  }

  return Math.min(1, matches / targetCategories.length);
};

/**
 * Calculate energy/pace match score (0-1)
 */
const calculateEnergyMatch = (book, energyMap) => {
  const description = (book.description || '').toLowerCase();
  const title = (book.title || '').toLowerCase();
  const combinedText = `${title} ${description}`;

  let matches = 0;
  for (const keyword of energyMap.keywords) {
    if (combinedText.includes(keyword.toLowerCase())) {
      matches++;
    }
  }

  // Also check categories/themes
  if (book.categories) {
    const categoriesText = book.categories.join(' ').toLowerCase();
    for (const theme of energyMap.themes) {
      if (categoriesText.includes(theme.toLowerCase())) {
        matches++;
      }
    }
  }

  return Math.min(1, matches / energyMap.keywords.length);
};

/**
 * Calculate depth/complexity match score (0-1)
 */
const calculateDepthMatch = (book, depthMap) => {
  let score = 0.5; // Base score

  // Check page count
  if (book.pageCount > 0) {
    const { min, max } = depthMap.pageRange;
    if (book.pageCount >= min && book.pageCount <= max) {
      score += 0.3;
    }
  }

  // Check keywords in description
  const description = (book.description || '').toLowerCase();
  let keywordMatches = 0;
  for (const keyword of depthMap.keywords) {
    if (description.includes(keyword.toLowerCase())) {
      keywordMatches++;
    }
  }
  score += Math.min(0.2, keywordMatches * 0.05);

  return Math.min(1, score);
};

/**
 * Extract mood tags for display
 */
const extractMoodTags = (book, moodData) => {
  const tags = [];

  // Add genre tag
  tags.push(moodData.genre.title);

  // Add energy-based tag
  if (moodData.energy.id === 'high') {
    tags.push('Fast-paced');
  } else if (moodData.energy.id === 'low') {
    tags.push('Relaxing');
  }

  // Add depth tag
  if (moodData.depth.id === 'light') {
    tags.push('Easy Read');
  } else if (moodData.depth.id === 'deep') {
    tags.push('Complex');
  }

  // Add page count tag if available
  if (book.pageCount > 0) {
    if (book.pageCount < 250) {
      tags.push('Quick Read');
    } else if (book.pageCount > 500) {
      tags.push('Epic');
    }
  }

  return tags.slice(0, 3); // Return top 3 tags
};

/**
 * Generate a human-readable mood summary
 */
const generateMoodSummary = (energy, genre, depth, energyMap, genreMap, depthMap) => {
  return {
    title: `Your ${energy.title} Reading Match`,
    description: `Curated ${genre.title} picks that match your current vibe`,
    emoji: `${energy.emoji} ${genre.emoji} ${depth.emoji}`,
    tags: [
      { label: energy.title, color: energy.color },
      { label: genre.title, color: genre.color },
      { label: depth.title, color: depth.color }
    ]
  };
};

/**
 * Build expanded search queries with more variety for refreshing recommendations
 */
const buildExpandedSearchQueries = (genreMap, energyMap, depthMap) => {
  const queries = [];

  // Use ALL genre search terms (not just first 2)
  genreMap.searchTerms.forEach(term => {
    queries.push({
      type: 'subject',
      query: term,
      weight: 2.0
    });
  });

  // More diverse genre + energy combinations
  genreMap.searchTerms.forEach(genreTerm => {
    energyMap.keywords.forEach(energyKeyword => {
      queries.push({
        type: 'general',
        query: `${genreTerm} ${energyKeyword}`,
        weight: 1.5
      });
    });
  });

  // More depth combinations
  genreMap.searchTerms.forEach(genreTerm => {
    depthMap.keywords.forEach(depthKeyword => {
      queries.push({
        type: 'general',
        query: `${genreTerm} ${depthKeyword}`,
        weight: 1.2
      });
    });
  });

  // Add some randomized category searches
  genreMap.categories.forEach(category => {
    queries.push({
      type: 'subject',
      query: category,
      weight: 1.8
    });
  });

  return queries;
};

/**
 * Fetch books from queries with expanded results
 */
const fetchBooksFromQueriesExpanded = async (queries, maxBooksPerQuery = 25) => {
  const bookPromises = queries.map(async ({ type, query }) => {
    try {
      if (type === 'subject') {
        return await searchBooksByField(query, 'subject', maxBooksPerQuery);
      } else {
        return await searchBooks(query, maxBooksPerQuery);
      }
    } catch (error) {
      console.error(`Query failed for "${query}":`, error);
      return [];
    }
  });

  const results = await Promise.all(bookPromises);
  return results.flat();
};

/**
 * Refresh recommendations with different results
 * (Uses same criteria but fetches more books and skips already seen ones)
 */
export const refreshRecommendations = async (moodData, excludeBookIds = []) => {
  try {
    const { energy, genre, depth } = moodData;

    if (!energy || !genre || !depth) {
      throw new Error('Invalid mood data');
    }

    // Get mood mappings
    const energyMap = MOOD_MAPPINGS.energy[energy.id];
    const genreMap = MOOD_MAPPINGS.genre[genre.id];
    const depthMap = MOOD_MAPPINGS.depth[depth.id];

    // Build expanded search queries with more variety
    const searchQueries = buildExpandedSearchQueries(genreMap, energyMap, depthMap);

    // Fetch MORE books per query to get fresh results
    const allBooks = await fetchBooksFromQueriesExpanded(searchQueries, 25);

    // Remove duplicates
    const uniqueBooks = removeDuplicateBooks(allBooks);

    // Filter out already seen books FIRST
    const unseenBooks = uniqueBooks.filter(
      book => !excludeBookIds.includes(book.googleBooksId)
    );

    // Score and rank the unseen books
    const scoredBooks = scoreBooks(unseenBooks, moodData, energyMap, genreMap, depthMap);

    // Sort by score and get top recommendations
    const topRecommendations = scoredBooks
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10);

    // Generate mood summary
    const moodSummary = generateMoodSummary(energy, genre, depth, energyMap, genreMap, depthMap);

    return {
      recommendations: topRecommendations,
      moodSummary,
      totalFound: scoredBooks.length,
      moodData
    };
  } catch (error) {
    console.error('Refresh recommendations error:', error);
    throw error;
  }
};
