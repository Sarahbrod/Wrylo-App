import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import theme from '../styles/theme';
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';
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
    const [fontsLoaded] = useFonts({
        LibreBaskerville_400Regular,
        LibreBaskerville_700Bold,
    });

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

    const onJoinCommunity = () => {
        navigation.navigate('BookForum');
    };

    if (!fontsLoaded) {
        return null;
    }


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
                        <View style={styles.sectionHeaderSimple}>
                            <Text style={styles.sectionTitle}>Get Started</Text>
                        </View>
                        <View style={styles.verticalCardContainer}>
                            <TouchableOpacity style={styles.getStartedCard} onPress={onTrackReading}>
                                <Text style={styles.cardIcon}>📚</Text>
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>Add Books</Text>
                                    <Text style={styles.cardDesc}>Start building your library</Text>
                                </View>
                                <View style={styles.arrowButton}>
                                    <Text style={styles.arrowButtonText}>→</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.getStartedCard} onPress={onViewLibrary}>
                                <Text style={styles.cardIcon}>🎯</Text>
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>Set Goals</Text>
                                    <Text style={styles.cardDesc}>Create reading targets</Text>
                                </View>
                                <View style={styles.arrowButton}>
                                    <Text style={styles.arrowButtonText}>→</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.getStartedCard} onPress={onViewLibrary}>
                                <Text style={styles.cardIcon}>⭐</Text>
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>Rate Books</Text>
                                    <Text style={styles.cardDesc}>Share your thoughts</Text>
                                </View>
                                <View style={styles.arrowButton}>
                                    <Text style={styles.arrowButtonText}>→</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.sectionWithExtraPadding}>
                        <View style={styles.sectionHeaderReduced}>
                            <Text style={styles.sectionTitle}>Mood Curator</Text>
                        </View>

                        <View style={styles.moodMatcherContainer}>
                            <TouchableOpacity style={styles.moodMatcherCard} onPress={onMoodMatcher}>
                                <View style={styles.moodMatcherContent}>
                                    <View style={styles.moodMatcherImage}>
                                        <View style={styles.abstractShape1} />
                                        <View style={styles.abstractShape2} />
                                        <View style={styles.abstractShape3} />
                                    </View>
                                    <View style={styles.moodMatcherText}>
                                        <Text style={styles.moodMatcherTitle}>Personalized Recommendations</Text>
                                        <Text style={styles.moodMatcherDesc}>Discover books that resonate with your current state of mind</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.sectionWithExtraPadding}>
                        <View style={styles.sectionHeaderReduced}>
                            <Text style={styles.sectionTitle}>Community</Text>
                        </View>

                        <View style={styles.communityContainer}>
                            <TouchableOpacity style={styles.communityCard} onPress={onJoinCommunity}>
                                <View style={styles.communityContent}>
                                    <View style={styles.communityImage}>
                                        <View style={styles.communityShape1} />
                                        <View style={styles.communityShape2} />
                                        <View style={styles.communityShape3} />
                                    </View>
                                    <View style={styles.communityText}>
                                        <Text style={styles.communityTitle}>Join the Book Community</Text>
                                        <Text style={styles.communityDesc}>Connect with fellow readers, share thoughts, and discover new perspectives</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.sectionWithExtraPadding}>
                        <View style={styles.sectionHeaderReduced}>
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
        fontFamily: 'LibreBaskerville_700Bold',
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
        marginBottom: 36,
    },
    sectionWithExtraPadding: {
        marginBottom: 36,
        marginTop: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 8,
        paddingHorizontal: 20,
    },
    sectionHeaderSimple: {
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    sectionHeaderReduced: {
        marginBottom: 8,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'LibreBaskerville_700Bold',
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
    verticalCardContainer: {
        paddingHorizontal: 20,
        gap: 12,
    },
    getStartedCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1D1D1D',
        marginBottom: 2,
    },
    cardDesc: {
        fontSize: 12,
        color: '#71727A',
    },
    arrowButton: {
        backgroundColor: '#F6F4F1',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowButtonText: {
        color: '#2E0A09',
        fontSize: 16,
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    statCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
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
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    moodMatcherContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moodMatcherImage: {
        width: 50,
        height: 50,
        marginRight: 16,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    abstractShape1: {
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: '#A8A8A8',
        borderRadius: 10,
        top: 5,
        left: 5,
    },
    abstractShape2: {
        position: 'absolute',
        width: 15,
        height: 15,
        backgroundColor: '#D1D1D1',
        borderRadius: 3,
        top: 10,
        right: 8,
    },
    abstractShape3: {
        position: 'absolute',
        width: 12,
        height: 12,
        backgroundColor: '#C0C0C0',
        borderRadius: 6,
        bottom: 8,
        left: 15,
    },
    moodMatcherText: {
        flex: 1,
    },
    moodMatcherTitle: {
        fontSize: 14,
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
    communityContainer: {
        paddingHorizontal: 20,
    },
    communityCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    communityContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    communityImage: {
        width: 50,
        height: 50,
        marginRight: 16,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    communityShape1: {
        position: 'absolute',
        width: 18,
        height: 18,
        backgroundColor: '#9A9A9A',
        borderRadius: 9,
        top: 8,
        left: 8,
    },
    communityShape2: {
        position: 'absolute',
        width: 14,
        height: 14,
        backgroundColor: '#B8B8B8',
        borderRadius: 2,
        top: 15,
        right: 10,
    },
    communityShape3: {
        position: 'absolute',
        width: 16,
        height: 16,
        backgroundColor: '#CACACA',
        borderRadius: 8,
        bottom: 10,
        left: 12,
    },
    communityText: {
        flex: 1,
    },
    communityTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1D1D1D',
        marginBottom: 6,
        letterSpacing: 0.3,
    },
    communityDesc: {
        fontSize: 14,
        fontWeight: '400',
        color: '#1D1D1D',
        lineHeight: 20,
        opacity: 0.8,
        letterSpacing: 0.2,
    },
    bottomSpacer: {
        height: 108, // Navigation height (70) + bottom margin (30) + extra padding (8)
    },
});

export default Home;