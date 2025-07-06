import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';

const BookForumScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('discussions');

    const discussions = [
        {
            id: 1,
            title: "What's your favorite fantasy series?",
            author: "BookLover23",
            replies: 47,
            timeAgo: "2 hours ago",
            category: "Fantasy"
        },
        {
            id: 2,
            title: "Best self-help books for productivity?",
            author: "ReadingGuru",
            replies: 23,
            timeAgo: "5 hours ago",
            category: "Self-Help"
        },
        {
            id: 3,
            title: "Just finished 'The Seven Husbands of Evelyn Hugo' - thoughts?",
            author: "BookwormSarah",
            replies: 89,
            timeAgo: "1 day ago",
            category: "Fiction"
        },
        {
            id: 4,
            title: "Sci-fi recommendations for beginners?",
            author: "NewReader",
            replies: 15,
            timeAgo: "2 days ago",
            category: "Sci-Fi"
        }
    ];

    const topRatedBooks = [
        {
            title: "Project Hail Mary",
            author: "Andy Weir",
            rating: 4.9,
            reviews: 1247,
            genre: "Sci-Fi"
        },
        {
            title: "The Seven Husbands of Evelyn Hugo",
            author: "Taylor Jenkins Reid",
            rating: 4.8,
            reviews: 2156,
            genre: "Fiction"
        },
        {
            title: "Atomic Habits",
            author: "James Clear",
            rating: 4.7,
            reviews: 1893,
            genre: "Self-Help"
        },
        {
            title: "Where the Crawdads Sing",
            author: "Delia Owens",
            rating: 4.6,
            reviews: 3241,
            genre: "Fiction"
        }
    ];

    const onDiscussionPress = (discussionId) => {
        console.warn(`Open discussion: ${discussionId}`);
    };

    const onBookPress = (bookTitle) => {
        console.warn(`View book: ${bookTitle}`);
    };

    const onCreatePostPress = () => {
        console.warn('Create new post');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Book Forum</Text>
                <TouchableOpacity onPress={onCreatePostPress} style={styles.createButton}>
                    <Text style={styles.createButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'discussions' && styles.activeTab]}
                    onPress={() => setActiveTab('discussions')}
                >
                    <Text style={[styles.tabText, activeTab === 'discussions' && styles.activeTabText]}>
                        Discussions
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'ratings' && styles.activeTab]}
                    onPress={() => setActiveTab('ratings')}
                >
                    <Text style={[styles.tabText, activeTab === 'ratings' && styles.activeTabText]}>
                        Top Rated
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {activeTab === 'discussions' && (
                    <View>
                        <Text style={styles.sectionTitle}>Recent Discussions</Text>
                        {discussions.map((discussion) => (
                            <TouchableOpacity 
                                key={discussion.id} 
                                style={styles.discussionCard}
                                onPress={() => onDiscussionPress(discussion.id)}
                            >
                                <View style={styles.discussionHeader}>
                                    <Text style={styles.discussionCategory}>{discussion.category}</Text>
                                    <Text style={styles.discussionTime}>{discussion.timeAgo}</Text>
                                </View>
                                <Text style={styles.discussionTitle}>{discussion.title}</Text>
                                <View style={styles.discussionFooter}>
                                    <Text style={styles.discussionAuthor}>by {discussion.author}</Text>
                                    <Text style={styles.discussionReplies}>💬 {discussion.replies} replies</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {activeTab === 'ratings' && (
                    <View>
                        <Text style={styles.sectionTitle}>Top Rated Books</Text>
                        {topRatedBooks.map((book, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={styles.bookCard}
                                onPress={() => onBookPress(book.title)}
                            >
                                <View style={styles.bookRank}>
                                    <Text style={styles.rankNumber}>{index + 1}</Text>
                                </View>
                                <View style={styles.bookInfo}>
                                    <Text style={styles.bookTitle}>{book.title}</Text>
                                    <Text style={styles.bookAuthor}>by {book.author}</Text>
                                    <View style={styles.bookMeta}>
                                        <Text style={styles.bookGenre}>{book.genre}</Text>
                                        <View style={styles.ratingContainer}>
                                            <Text style={styles.bookRating}>⭐ {book.rating}</Text>
                                            <Text style={styles.reviewCount}>({book.reviews} reviews)</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 16,
    },
    backButton: {
        padding: 8,
    },
    backArrow: {
        fontSize: 24,
        color: '#1D1D1D',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1D1D1D',
    },
    createButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 4,
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: '#4CAF50',
    },
    tabText: {
        fontSize: 16,
        color: '#71727A',
        fontWeight: '600',
    },
    activeTabText: {
        color: 'white',
    },
    content: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1D1D1D',
        marginBottom: 16,
    },
    discussionCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    discussionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    discussionCategory: {
        fontSize: 12,
        color: '#7F9BEB',
        backgroundColor: '#F0F4FF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    discussionTime: {
        fontSize: 12,
        color: '#71727A',
    },
    discussionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1D1D',
        marginBottom: 12,
        lineHeight: 22,
    },
    discussionFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    discussionAuthor: {
        fontSize: 14,
        color: '#71727A',
    },
    discussionReplies: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '600',
    },
    bookCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    bookRank: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    rankNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    bookInfo: {
        flex: 1,
    },
    bookTitle: {
        fontSize: 16,
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
        alignItems: 'center',
    },
    bookGenre: {
        fontSize: 12,
        color: '#7F9BEB',
        backgroundColor: '#F0F4FF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookRating: {
        fontSize: 14,
        color: '#FF9800',
        fontWeight: '600',
        marginRight: 8,
    },
    reviewCount: {
        fontSize: 12,
        color: '#71727A',
    },
    bottomSpacer: {
        height: 108,
    },
});

export default BookForumScreen;