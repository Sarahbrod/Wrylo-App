import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';

const RecommendationsScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const onViewBook = (bookTitle) => {
        console.warn(`View book: ${bookTitle}`);
    };

    const onMoodMatcher = () => {
        navigation.navigate('MoodFlow');
    };

    const onSearchChange = (text) => {
        setSearchQuery(text);
    };

    const onForumPress = () => {
        navigation.navigate('BookForum');
    };

    const recommendations = [
        {
            title: "The Seven Husbands of Evelyn Hugo",
            author: "Taylor Jenkins Reid",
            genre: "Fiction",
            rating: 4.8,
            reason: "Based on your love for character-driven stories"
        },
        {
            title: "Atomic Habits",
            author: "James Clear",
            genre: "Self-Help",
            rating: 4.7,
            reason: "Perfect for your personal development reading"
        },
        {
            title: "Project Hail Mary",
            author: "Andy Weir",
            genre: "Science Fiction",
            rating: 4.9,
            reason: "Similar to other sci-fi books you've enjoyed"
        },
        {
            title: "Educated",
            author: "Tara Westover",
            genre: "Biography",
            rating: 4.6,
            reason: "Matches your interest in powerful memoirs"
        }
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Book Recommendations</Text>
                    <Text style={styles.subtitle}>Discover your next great read</Text>
                    
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search books, authors, genres..."
                            value={searchQuery}
                            onChangeText={onSearchChange}
                            placeholderTextColor="#71727A"
                        />
                        <Text style={styles.searchIcon}>🔍</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <TouchableOpacity style={styles.moodMatcherBanner} onPress={onMoodMatcher}>
                        <View style={styles.bannerContent}>
                            <View style={styles.bannerEmojis}>
                                <Text style={styles.bannerEmoji}>🎯</Text>
                                <Text style={styles.bannerEmoji}>✨</Text>
                            </View>
                            <View style={styles.bannerText}>
                                <Text style={styles.bannerTitle}>Get Personal Recommendations</Text>
                                <Text style={styles.bannerDesc}>Tell us your mood, get perfect book matches!</Text>
                            </View>
                            <Text style={styles.bannerArrow}>→</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Recommended for You</Text>
                        <Text style={styles.sectionSubtitle}>Based on your reading history and preferences</Text>
                    </View>

                    {recommendations.map((book, index) => (
                        <View key={index} style={styles.bookCard}>
                            <View style={styles.bookInfo}>
                                <Text style={styles.bookTitle}>{book.title}</Text>
                                <Text style={styles.bookAuthor}>by {book.author}</Text>
                                <View style={styles.bookMeta}>
                                    <Text style={styles.bookGenre}>{book.genre}</Text>
                                    <Text style={styles.bookRating}>⭐ {book.rating}</Text>
                                </View>
                                <Text style={styles.bookReason}>{book.reason}</Text>
                            </View>
                            <CustomButton 
                                text="View Book" 
                                onPress={() => onViewBook(book.title)}
                                bgColor='#E8F4E8' 
                                fgColor="#4CAF50"
                                style={styles.viewButton}
                            />
                        </View>
                    ))}

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Popular This Week</Text>
                        <View style={styles.popularBook}>
                            <Text style={styles.popularTitle}>🔥 Fourth Wing</Text>
                            <Text style={styles.popularAuthor}>by Rebecca Yarros</Text>
                            <Text style={styles.popularGenre}>Fantasy Romance</Text>
                        </View>
                        <View style={styles.popularBook}>
                            <Text style={styles.popularTitle}>📈 The Psychology of Money</Text>
                            <Text style={styles.popularAuthor}>by Morgan Housel</Text>
                            <Text style={styles.popularGenre}>Finance</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Popular by Genre</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.genreContainer}
                            contentContainerStyle={styles.genreContentContainer}
                        >
                            <View style={styles.genreCard}>
                                <Text style={styles.genreEmoji}>💕</Text>
                                <Text style={styles.genreTitle}>Romance</Text>
                                <Text style={styles.genreCount}>142 books</Text>
                            </View>
                            <View style={styles.genreCard}>
                                <Text style={styles.genreEmoji}>🔮</Text>
                                <Text style={styles.genreTitle}>Fantasy</Text>
                                <Text style={styles.genreCount}>98 books</Text>
                            </View>
                            <View style={styles.genreCard}>
                                <Text style={styles.genreEmoji}>🕵️</Text>
                                <Text style={styles.genreTitle}>Mystery</Text>
                                <Text style={styles.genreCount}>87 books</Text>
                            </View>
                            <View style={styles.genreCard}>
                                <Text style={styles.genreEmoji}>🚀</Text>
                                <Text style={styles.genreTitle}>Sci-Fi</Text>
                                <Text style={styles.genreCount}>56 books</Text>
                            </View>
                            <View style={styles.genreCard}>
                                <Text style={styles.genreEmoji}>📈</Text>
                                <Text style={styles.genreTitle}>Business</Text>
                                <Text style={styles.genreCount}>73 books</Text>
                            </View>
                        </ScrollView>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Reading Challenges</Text>
                        <View style={styles.challengeItem}>
                            <Text style={styles.challengeText}>🏆 Read a book from each continent</Text>
                            <Text style={styles.challengeProgress}>3/7</Text>
                        </View>
                        <View style={styles.challengeItem}>
                            <Text style={styles.challengeText}>📚 Try a new genre this month</Text>
                            <Text style={styles.challengeProgress}>Not started</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.forumBanner} onPress={onForumPress}>
                        <View style={styles.forumContent}>
                            <View style={styles.forumEmojis}>
                                <Text style={styles.forumEmoji}>💬</Text>
                                <Text style={styles.forumEmoji}>⭐</Text>
                            </View>
                            <View style={styles.forumText}>
                                <Text style={styles.forumTitle}>Join the Book Community</Text>
                                <Text style={styles.forumDesc}>Rate books, read reviews, and discuss with fellow readers!</Text>
                            </View>
                            <Text style={styles.forumArrow}>→</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
                {/* Bottom padding to clear floating navigation */}
                <View style={styles.bottomSpacer} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F6F4F1',
    },
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'flex-start',
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1D1D1D',
        marginBottom: 8,
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 16,
        color: '#71727A',
        textAlign: 'left',
        marginBottom: 16,
    },
    searchContainer: {
        position: 'relative',
        width: '100%',
        marginTop: 8,
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
        paddingRight: 45,
    },
    searchIcon: {
        position: 'absolute',
        right: 16,
        top: 12,
        fontSize: 18,
        color: '#71727A',
    },
    content: {
        paddingHorizontal: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 20,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#71727A',
        marginBottom: 16,
    },
    bookCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    bookInfo: {
        marginBottom: 12,
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1D1D1D',
        marginBottom: 4,
    },
    bookAuthor: {
        fontSize: 14,
        color: '#71727A',
        marginBottom: 8,
    },
    bookMeta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    bookGenre: {
        fontSize: 12,
        color: '#7F9BEB',
        backgroundColor: '#F0F4FF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    bookRating: {
        fontSize: 14,
        color: '#FF9800',
        fontWeight: '600',
    },
    bookReason: {
        fontSize: 14,
        color: '#555',
        fontStyle: 'italic',
    },
    viewButton: {
        marginTop: 8,
    },
    popularBook: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
    },
    popularTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1D1D',
        marginBottom: 4,
    },
    popularAuthor: {
        fontSize: 14,
        color: '#71727A',
        marginBottom: 4,
    },
    popularGenre: {
        fontSize: 12,
        color: '#7F9BEB',
    },
    challengeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 8,
    },
    challengeText: {
        fontSize: 16,
        color: '#555',
        flex: 1,
    },
    challengeProgress: {
        fontSize: 14,
        color: '#FF9800',
        fontWeight: '600',
    },
    moodMatcherBanner: {
        backgroundColor: '#7FABC7',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#7F9BEB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    bannerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bannerEmojis: {
        flexDirection: 'row',
        marginRight: 16,
    },
    bannerEmoji: {
        fontSize: 24,
        marginRight: 8,
    },
    bannerText: {
        flex: 1,
    },
    bannerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    bannerDesc: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.9,
    },
    bannerArrow: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    genreContainer: {
        paddingVertical: 8,
    },
    genreContentContainer: {
        paddingHorizontal: 0,
        gap: 12,
    },
    genreCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        width: 100,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    genreEmoji: {
        fontSize: 32,
        marginBottom: 8,
    },
    genreTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1D1D1D',
        marginBottom: 4,
        textAlign: 'center',
    },
    genreCount: {
        fontSize: 12,
        color: '#71727A',
        textAlign: 'center',
    },
    forumBanner: {
        backgroundColor: '#E8F5E8',
        borderRadius: 16,
        padding: 20,
        marginTop: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#4CAF50',
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    forumContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    forumEmojis: {
        flexDirection: 'row',
        marginRight: 16,
    },
    forumEmoji: {
        fontSize: 24,
        marginRight: 8,
    },
    forumText: {
        flex: 1,
    },
    forumTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 4,
    },
    forumDesc: {
        fontSize: 14,
        color: '#2E7D32',
        opacity: 0.8,
    },
    forumArrow: {
        fontSize: 20,
        color: '#2E7D32',
        fontWeight: 'bold',
    },
    bottomSpacer: {
        height: 108, // Navigation height (70) + bottom margin (30) + extra padding (8)
    },
});

export default RecommendationsScreen;