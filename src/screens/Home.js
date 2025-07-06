import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import theme from '../styles/theme';
import {
    StyledText,
    StyledCard,
    StyledContainer,
    SectionHeader,
    StatCard,
    BookCard,
    ActionCard,
} from '../components/StyledComponents';

const Home = ({ navigation }) => {
    const onViewLibrary = () => {
        navigation.navigate('Library');
    };

    const onTrackReading = () => {
        navigation.navigate('Library');
    };

    const onGetRecommendations = () => {
        navigation.navigate('Discover');
    };

    const onMoodMatcher = () => {
        navigation.navigate('MoodFlow');
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                style={styles.container}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Home</Text>
                    <Text style={styles.subtitle}>Welcome back to your reading journey</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Get Started</Text>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.cardContainer}
                            contentContainerStyle={styles.cardContentContainer}
                        >
                            <View style={styles.getStartedCard}>
                                <Text style={styles.cardIcon}>📚</Text>
                                <Text style={styles.cardTitle}>Add Books</Text>
                                <Text style={styles.cardDesc}>Start building your library</Text>
                                <TouchableOpacity style={styles.plusButton} onPress={onTrackReading}>
                                    <Text style={styles.plusButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.getStartedCard}>
                                <Text style={styles.cardIcon}>🎯</Text>
                                <Text style={styles.cardTitle}>Set Goals</Text>
                                <Text style={styles.cardDesc}>Create reading targets</Text>
                                <TouchableOpacity style={styles.plusButton} onPress={onViewLibrary}>
                                    <Text style={styles.plusButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.getStartedCard}>
                                <Text style={styles.cardIcon}>⭐</Text>
                                <Text style={styles.cardTitle}>Rate Books</Text>
                                <Text style={styles.cardDesc}>Share your thoughts</Text>
                                <TouchableOpacity style={styles.plusButton} onPress={onViewLibrary}>
                                    <Text style={styles.plusButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeaderSimple}>
                            <Text style={styles.sectionTitle}>Mood Curator</Text>
                        </View>

                        <View style={styles.moodMatcherContainer}>
                            <TouchableOpacity style={styles.moodMatcherCard} onPress={onMoodMatcher}>
                                <View style={styles.moodMatcherContent}>
                                    <View style={styles.moodMatcherEmojis}>
                                        <Text style={styles.moodEmoji}>😊</Text>
                                        <Text style={styles.moodEmoji}>📚</Text>
                                        <Text style={styles.moodEmoji}>💕</Text>
                                    </View>
                                    <View style={styles.moodMatcherText}>
                                        <Text style={styles.moodMatcherTitle}>Personalized Recommendations</Text>
                                        <Text style={styles.moodMatcherDesc}>Discover books that resonate with your current state of mind</Text>
                                    </View>
                                    <View style={styles.moodMatcherArrow}>
                                        <Text style={styles.arrowText}>✨</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.section, styles.recommendationsSection]}>
                        <View style={styles.sectionHeaderCentered}>
                            <Text style={styles.sectionTitle}>Recommendations for You</Text>
                            <TouchableOpacity onPress={onGetRecommendations}>
                                <Text style={styles.seeAllText}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.cardContainer}
                            contentContainerStyle={styles.cardContentContainer}
                        >
                            <TouchableOpacity style={styles.recommendationCard} onPress={onGetRecommendations}>
                                <View style={styles.bookCover}>
                                    <Text style={styles.bookCoverText}>📖</Text>
                                </View>
                                <Text style={styles.bookTitle}>The Seven Husbands of Evelyn Hugo</Text>
                                <Text style={styles.bookAuthor}>Taylor Jenkins Reid</Text>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
                                    <Text style={styles.ratingText}>4.5</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.recommendationCard} onPress={onGetRecommendations}>
                                <View style={styles.bookCover}>
                                    <Text style={styles.bookCoverText}>📚</Text>
                                </View>
                                <Text style={styles.bookTitle}>Where the Crawdads Sing</Text>
                                <Text style={styles.bookAuthor}>Delia Owens</Text>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
                                    <Text style={styles.ratingText}>4.3</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.recommendationCard} onPress={onGetRecommendations}>
                                <View style={styles.bookCover}>
                                    <Text style={styles.bookCoverText}>📝</Text>
                                </View>
                                <Text style={styles.bookTitle}>Atomic Habits</Text>
                                <Text style={styles.bookAuthor}>James Clear</Text>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingStars}>⭐⭐⭐⭐⭐</Text>
                                    <Text style={styles.ratingText}>4.7</Text>
                                </View>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeaderSimple}>
                            <Text style={styles.sectionTitle}>Your Reading Stats</Text>
                        </View>
                        <View style={styles.statsContainer}>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>5</Text>
                                <Text style={styles.statLabel}>Books This Month</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>23</Text>
                                <Text style={styles.statLabel}>Pages Today</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>8</Text>
                                <Text style={styles.statLabel}>Day Streak</Text>
                            </View>
                        </View>
                    </View>
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
        //alignItems: 'left',
        paddingTop: 40,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1D1D1D',
        marginBottom: 8,
        //textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#71727A',
        //textAlign: 'center',
        marginBottom: 20,
    },
    content: {
        // Removed horizontal padding - now handled by individual sections
    },
    section: {
        marginBottom: 32,
    },
    recommendationsSection: {
        marginTop: 36,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 8,
        paddingHorizontal: 20,
    },
    sectionHeaderCentered: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        gap: 16,
    },
    sectionHeaderSimple: {
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1D1D1D',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    //sectionSubtitle: {
    //fontSize: 14,
    //color: '#1D1D1D',
    //marginTop: 2,
    //},

    seeAllText: {
        fontSize: 14,
        color: '#2E0A09',
        fontWeight: '600',
    },
    cardContainer: {
        paddingVertical: 12,
    },
    cardContentContainer: {
        paddingHorizontal: 20,
        paddingVertical: 6,
    },
    getStartedCard: {
        backgroundColor: '#F6F4F1',
        borderRadius: 16,
        padding: 20,
        marginRight: 16,
        width: 180,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    cardIcon: {
        fontSize: 32,
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1D1D',
        marginBottom: 6,
        textAlign: 'center',
    },
    cardDesc: {
        fontSize: 12,
        color: '#1D1D1D',
        textAlign: 'center',
        marginBottom: 16,
    },
    plusButton: {
        backgroundColor: '#2E0A09',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    recommendationCard: {
        backgroundColor: '#F6F4F1',
        borderRadius: 12,
        padding: 16,
        marginRight: 16,
        width: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    bookCover: {
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    bookCoverText: {
        fontSize: 32,
    },
    bookTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1D1D1D',
        marginBottom: 4,
        numberOfLines: 2,
    },
    bookAuthor: {
        fontSize: 12,
        color: '#1D1D1D',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ratingStars: {
        fontSize: 10,
    },
    ratingText: {
        fontSize: 12,
        color: '#1D1D1D',
        fontWeight: '600',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    statCard: {
        backgroundColor: '#F6F4F1',
        borderRadius: 12,
        padding: 16,
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E0A09',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#1D1D1D',
        textAlign: 'center',
    },
    quickActionsContainer: {
        paddingHorizontal: 20,
    },
    quickActions: {
        gap: 12,
    },
    moodMatcherContainer: {
        paddingHorizontal: 20,
    },
    actionButton: {
        marginBottom: 8,
    },
    moodMatcherCard: {
        backgroundColor: '#EFEBEB',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 2,
        borderColor: '#2E0A09',
    },
    moodMatcherContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moodMatcherEmojis: {
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: 16,
    },
    moodEmoji: {
        fontSize: 20,
        marginBottom: 4,
    },
    moodMatcherText: {
        flex: 1,
    },
    moodMatcherTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#1D1D1D',
        marginBottom: 6,
        letterSpacing: 0.3,
    },
    moodMatcherDesc: {
        fontSize: 14,
        fontWeight: '400',
        color: '#1D1D1D',
        lineHeight: 20,
        opacity: 0.8,
        letterSpacing: 0.2,
    },
    moodMatcherArrow: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowText: {
        fontSize: 24,
    },
    bottomSpacer: {
        height: 108, // Navigation height (70) + bottom margin (30) + extra padding (8)
    },
});

export default Home;