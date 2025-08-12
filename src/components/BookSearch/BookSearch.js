import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { searchService } from '../../services/searchService';

const BookSearch = ({ 
    onBookSelect, 
    placeholder = "Search books, authors, genres...", 
    showResults = true,
    containerStyle,
    searchAPI
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const mockBookData = [
        {
            id: '1',
            title: 'The Seven Husbands of Evelyn Hugo',
            author: 'Taylor Jenkins Reid',
            genre: 'Fiction',
            year: '2017',
            cover: 'https://example.com/book1.jpg'
        },
        {
            id: '2',
            title: 'Atomic Habits',
            author: 'James Clear',
            genre: 'Self-Help',
            year: '2018',
            cover: 'https://example.com/book2.jpg'
        },
        {
            id: '3',
            title: 'Project Hail Mary',
            author: 'Andy Weir',
            genre: 'Science Fiction',
            year: '2021',
            cover: 'https://example.com/book3.jpg'
        },
        {
            id: '4',
            title: 'Educated',
            author: 'Tara Westover',
            genre: 'Biography',
            year: '2018',
            cover: 'https://example.com/book4.jpg'
        },
        {
            id: '5',
            title: 'The Midnight Library',
            author: 'Matt Haig',
            genre: 'Fiction',
            year: '2020',
            cover: 'https://example.com/book5.jpg'
        },
        {
            id: '6',
            title: 'Klara and the Sun',
            author: 'Kazuo Ishiguro',
            genre: 'Science Fiction',
            year: '2021',
            cover: 'https://example.com/book6.jpg'
        },
        {
            id: '7',
            title: 'The Psychology of Money',
            author: 'Morgan Housel',
            genre: 'Finance',
            year: '2020',
            cover: 'https://example.com/book7.jpg'
        },
        {
            id: '8',
            title: 'Circe',
            author: 'Madeline Miller',
            genre: 'Fantasy',
            year: '2018',
            cover: 'https://example.com/book8.jpg'
        },
        {
            id: '9',
            title: 'Becoming',
            author: 'Michelle Obama',
            genre: 'Biography',
            year: '2018',
            cover: 'https://example.com/book9.jpg'
        },
        {
            id: '10',
            title: 'The Silent Patient',
            author: 'Alex Michaelides',
            genre: 'Mystery',
            year: '2019',
            cover: 'https://example.com/book10.jpg'
        }
    ];

    const performSearch = async (query) => {
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);

        try {
            if (searchAPI) {
                const results = await searchAPI(query);
                setSearchResults(results);
            } else {
                // Use the real search service
                const results = await searchService.searchBooks(query, {
                    limit: 20,
                    sort_by: 'relevance'
                });
                setSearchResults(results);
            }
        } catch (error) {
            console.error('Search error:', error);
            // Fallback to mock data on error
            const filtered = mockBookData.filter(book => 
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                book.author.toLowerCase().includes(query.toLowerCase()) ||
                book.genre.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filtered);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearchChange = (text) => {
        setSearchQuery(text);

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        const timeout = setTimeout(() => {
            performSearch(text);
        }, 300);

        setSearchTimeout(timeout);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
    };

    const handleBookSelect = (book) => {
        if (onBookSelect) {
            onBookSelect(book);
        }
        clearSearch();
    };

    const generateBookCover = (title) => {
        const titleInitials = title.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
        const colors = ['#2E0A09', '#8D6E63', '#5D4037', '#3E2723', '#4E342E'];
        const colorIndex = title.length % colors.length;
        return {
            initials: titleInitials,
            backgroundColor: colors[colorIndex]
        };
    };

    useEffect(() => {
        return () => {
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        };
    }, [searchTimeout]);

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.searchInputContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder={placeholder}
                    value={searchQuery}
                    onChangeText={handleSearchChange}
                    placeholderTextColor="#71727A"
                />
                <View style={styles.searchInputIcons}>
                    {isSearching ? (
                        <ActivityIndicator size="small" color="#71727A" style={styles.searchIcon} />
                    ) : (
                        <Ionicons 
                            name="search" 
                            size={18} 
                            color="#71727A" 
                            style={styles.searchIcon}
                        />
                    )}
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                            <Ionicons 
                                name="close-circle" 
                                size={18} 
                                color="#71727A" 
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {showResults && searchResults.length > 0 && (
                <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
                    {searchResults.map((book) => {
                        const cover = generateBookCover(book.title);
                        return (
                            <TouchableOpacity
                                key={book.id}
                                style={styles.resultItem}
                                onPress={() => handleBookSelect(book)}
                            >
                                <View style={styles.resultContent}>
                                    <View style={[styles.bookCover, { backgroundColor: cover.backgroundColor }]}>
                                        <Text style={styles.bookCoverText}>{cover.initials}</Text>
                                    </View>
                                    <View style={styles.bookInfo}>
                                        <Text style={styles.bookTitle}>{book.title}</Text>
                                        <Text style={styles.bookAuthor}>by {book.author}</Text>
                                        <View style={styles.bookMeta}>
                                            <Text style={styles.bookGenre}>{book.genre}</Text>
                                            <Text style={styles.bookYear}>{book.year}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            )}

            {showResults && searchQuery.length >= 2 && searchResults.length === 0 && !isSearching && (
                <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>No books found</Text>
                    <Text style={styles.noResultsSubtext}>Try adjusting your search terms</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchInputContainer: {
        position: 'relative',
        width: '100%',
        marginBottom: 16,
    },
    searchInput: {
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#1D1D1D',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        paddingRight: 50,
    },
    searchInputIcons: {
        position: 'absolute',
        right: 16,
        top: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        marginRight: 8,
    },
    clearButton: {
        padding: 2,
    },
    resultsContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        maxHeight: 300,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    resultItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    resultContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    bookCover: {
        width: 40,
        height: 56,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    bookCoverText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
    bookInfo: {
        flex: 1,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1D1D',
        marginBottom: 4,
        lineHeight: 20,
    },
    bookAuthor: {
        fontSize: 14,
        color: '#71727A',
        marginBottom: 6,
    },
    bookMeta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookGenre: {
        fontSize: 12,
        color: '#7F9BEB',
        backgroundColor: '#F0F4FF',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        marginRight: 8,
    },
    bookYear: {
        fontSize: 12,
        color: '#71727A',
        fontWeight: '500',
    },
    noResultsContainer: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 32,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    noResultsText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#71727A',
        marginBottom: 4,
    },
    noResultsSubtext: {
        fontSize: 14,
        color: '#71727A',
        opacity: 0.7,
    },
});

export default BookSearch;