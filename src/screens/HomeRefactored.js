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
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <StyledText variant="displayLarge" color={theme.colors.onBackground} style={styles.welcomeText}>
                        Wrylo
                    </StyledText>
                    <StyledText variant="bodyLarge" color={theme.colors.onSurfaceVariant} style={styles.subtitle}>
                        Curated reading experiences for the discerning reader
                    </StyledText>
                </View>

                <View style={styles.content}>
                    <View style={styles.section}>
                        <SectionHeader 
                            title="Reading Journey"
                            subtitle="Begin your literary exploration"
                        />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardContainer}>
                            <ActionCard
                                icon="📚"
                                title="Add Books"
                                description="Start building your library"
                                onPress={onTrackReading}
                                variant="elevated"
                            />
                            <ActionCard
                                icon="🎯"
                                title="Set Goals"
                                description="Create reading targets"
                                onPress={onViewLibrary}
                                variant="elevated"
                            />
                            <ActionCard
                                icon="⭐"
                                title="Rate Books"
                                description="Share your thoughts"
                                onPress={onViewLibrary}
                                variant="elevated"
                            />
                        </ScrollView>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeaderWithAction}>
                            <StyledText variant="titleLarge" color={theme.colors.onSurface}>
                                Recommendations for You
                            </StyledText>
                            <TouchableOpacity onPress={onGetRecommendations}>
                                <StyledText variant="labelMedium" color={theme.colors.primary} style={styles.seeAllText}>
                                    See All
                                </StyledText>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardContainer}>
                            <BookCard
                                title="The Seven Husbands of Evelyn Hugo"
                                author="Taylor Jenkins Reid"
                                coverIcon="📖"
                                rating="4.5"
                                onPress={onGetRecommendations}
                                variant="elevated"
                            />
                            <BookCard
                                title="Where the Crawdads Sing"
                                author="Delia Owens"
                                coverIcon="📚"
                                rating="4.3"
                                onPress={onGetRecommendations}
                                variant="elevated"
                            />
                            <BookCard
                                title="Atomic Habits"
                                author="James Clear"
                                coverIcon="📝"
                                rating="4.7"
                                onPress={onGetRecommendations}
                                variant="elevated"
                            />
                        </ScrollView>
                    </View>

                    <View style={styles.section}>
                        <SectionHeader title="Your Reading Stats" />
                        <View style={styles.statsContainer}>
                            <StatCard
                                number="5"
                                label="Books This Month"
                                numberColor={theme.colors.primary}
                                variant="elevated"
                                style={styles.statCardItem}
                            />
                            <StatCard
                                number="23"
                                label="Pages Today"
                                numberColor={theme.colors.primary}
                                variant="elevated"
                                style={styles.statCardItem}
                            />
                            <StatCard
                                number="8"
                                label="Day Streak"
                                numberColor={theme.colors.primary}
                                variant="elevated"
                                style={styles.statCardItem}
                            />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <SectionHeader title="Mood Curator" />
                        <TouchableOpacity onPress={onMoodMatcher}>
                            <StyledCard variant="large" style={styles.moodMatcherCard}>
                                <View style={styles.moodMatcherContent}>
                                    <View style={styles.moodMatcherEmojis}>
                                        <Text style={styles.moodEmoji}>😊</Text>
                                        <Text style={styles.moodEmoji}>📚</Text>
                                        <Text style={styles.moodEmoji}>💕</Text>
                                    </View>
                                    <View style={styles.moodMatcherText}>
                                        <StyledText variant="headlineSmall" color={theme.colors.onSurface} style={styles.moodMatcherTitle}>
                                            Personalized Recommendations
                                        </StyledText>
                                        <StyledText variant="bodyMedium" color={theme.colors.onSurfaceVariant} style={styles.moodMatcherDesc}>
                                            Discover books that resonate with your current state of mind
                                        </StyledText>
                                    </View>
                                    <View style={styles.moodMatcherArrow}>
                                        <Text style={styles.arrowText}>✨</Text>
                                    </View>
                                </View>
                            </StyledCard>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <SectionHeader title="Quick Actions" />
                        <View style={styles.quickActions}>
                            <CustomButton 
                                text="📖 Continue Reading" 
                                onPress={onViewLibrary}
                                bgColor={theme.colors.successLight} 
                                fgColor={theme.colors.success}
                                style={styles.actionButton}
                            />
                            <CustomButton 
                                text="🔍 Discover Books" 
                                onPress={onGetRecommendations}
                                bgColor={theme.colors.warningLight} 
                                fgColor={theme.colors.warning}
                                style={styles.actionButton}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    container: {
        flex: 1,
        paddingBottom: 120,
    },
    header: {
        alignItems: 'center',
        paddingTop: theme.spacing.xxxxl,
        paddingHorizontal: theme.spacing.screenPadding,
        paddingBottom: theme.spacing.xxxl,
    },
    welcomeText: {
        marginBottom: theme.spacing.sm,
        textAlign: 'center',
        letterSpacing: 1,
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
        opacity: 0.7,
        letterSpacing: 0.3,
    },
    content: {
        paddingHorizontal: theme.spacing.screenPadding,
    },
    section: {
        marginBottom: theme.spacing.xxxl,
    },
    sectionHeaderWithAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    seeAllText: {
        fontWeight: '600',
    },
    cardContainer: {
        paddingVertical: theme.spacing.sm,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statCardItem: {
        flex: 1,
        marginHorizontal: theme.spacing.xs,
    },
    quickActions: {
        gap: theme.spacing.md,
    },
    actionButton: {
        marginBottom: theme.spacing.sm,
    },
    moodMatcherCard: {
        borderWidth: 2,
        borderColor: theme.colors.contemplativeMood,
    },
    moodMatcherContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    moodMatcherEmojis: {
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: theme.spacing.lg,
    },
    moodEmoji: {
        fontSize: 20,
        marginBottom: theme.spacing.xs,
    },
    moodMatcherText: {
        flex: 1,
    },
    moodMatcherTitle: {
        marginBottom: theme.spacing.sm,
        letterSpacing: 0.3,
    },
    moodMatcherDesc: {
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
});

export default Home;