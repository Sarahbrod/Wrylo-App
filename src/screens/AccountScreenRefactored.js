import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import CustomButton from '../components/CustomButton';
import theme from '../styles/theme';
import {
  StyledText,
  StyledCard,
  StyledContainer,
  SectionHeader,
  StatCard,
  GoalItem,
  AchievementItem,
} from '../components/StyledComponents';

const AccountScreen = ({ navigation }) => {
    const onLogOut = () => {
        navigation.navigate('Auth');
    };

    const onEditProfile = () => {
        console.warn('Edit Profile pressed');
    };

    const onReadingPreferences = () => {
        console.warn('Reading Preferences pressed');
    };

    const onNotifications = () => {
        console.warn('Notifications pressed');
    };

    const onPrivacy = () => {
        console.warn('Privacy pressed');
    };

    const onHelp = () => {
        console.warn('Help pressed');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <StyledText variant="headlineLarge" color={theme.colors.onPrimary}>
                            JD
                        </StyledText>
                    </View>
                    <StyledText variant="headlineLarge" color={theme.colors.onBackground} style={styles.userName}>
                        Jane Doe
                    </StyledText>
                    <StyledText variant="bodyLarge" color={theme.colors.onSurfaceVariant} style={styles.userEmail}>
                        jane.doe@email.com
                    </StyledText>
                    <StyledText variant="bodySmall" color={theme.colors.onSurfaceVariant}>
                        Member since March 2024
                    </StyledText>
                </View>

                <View style={styles.content}>
                    <View style={styles.quickStats}>
                        <StatCard
                            number="12"
                            label="Books Read"
                            numberColor={theme.colors.secondary}
                            variant="flat"
                            style={styles.quickStatItem}
                        />
                        <StatCard
                            number="3"
                            label="Currently Reading"
                            numberColor={theme.colors.secondary}
                            variant="flat"
                            style={styles.quickStatItem}
                        />
                        <StatCard
                            number="47"
                            label="Want to Read"
                            numberColor={theme.colors.secondary}
                            variant="flat"
                            style={styles.quickStatItem}
                        />
                    </View>

                    <View style={styles.section}>
                        <SectionHeader title="Reading Stats" />
                        <View style={styles.statsRow}>
                            <StatCard
                                number="245"
                                label="Pages This Week"
                                numberColor={theme.colors.primary}
                                variant="base"
                                style={styles.statCard}
                            />
                            <StatCard
                                number="18"
                                label="Min/Day Avg"
                                numberColor={theme.colors.primary}
                                variant="base"
                                style={styles.statCard}
                            />
                        </View>
                        
                        <View style={styles.subsection}>
                            <StyledText variant="titleMedium" color={theme.colors.onSurface} style={styles.subsectionTitle}>
                                Reading Goals
                            </StyledText>
                            <GoalItem
                                icon="📚"
                                text="Read 25 books this year"
                                progress="12/25 (48%)"
                                backgroundColor={theme.colors.surface}
                            />
                            <GoalItem
                                icon="⏰"
                                text="Read 30 minutes daily"
                                progress="18/30 min avg"
                                backgroundColor={theme.colors.surface}
                            />
                        </View>
                        
                        <View style={styles.subsection}>
                            <StyledText variant="titleMedium" color={theme.colors.onSurface} style={styles.subsectionTitle}>
                                Favorite Genres
                            </StyledText>
                            <GoalItem
                                text="Fiction"
                                progress="5 books"
                                backgroundColor={theme.colors.surface}
                            />
                            <GoalItem
                                text="Science Fiction"
                                progress="3 books"
                                backgroundColor={theme.colors.surface}
                            />
                            <GoalItem
                                text="Biography"
                                progress="2 books"
                                backgroundColor={theme.colors.surface}
                            />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <SectionHeader title="Account Settings" />
                        
                        <CustomButton 
                            text="Edit Profile" 
                            onPress={onEditProfile}
                            type="SECONDARY"
                            style={styles.menuButton}
                        />
                        
                        <CustomButton 
                            text="Reading Preferences" 
                            onPress={onReadingPreferences}
                            type="SECONDARY"
                            style={styles.menuButton}
                        />
                        
                        <CustomButton 
                            text="Notifications" 
                            onPress={onNotifications}
                            type="SECONDARY"
                            style={styles.menuButton}
                        />
                        
                        <CustomButton 
                            text="Privacy Settings" 
                            onPress={onPrivacy}
                            type="SECONDARY"
                            style={styles.menuButton}
                        />
                    </View>

                    <View style={styles.section}>
                        <SectionHeader title="Support" />
                        
                        <CustomButton 
                            text="Help & Support" 
                            onPress={onHelp}
                            type="SECONDARY"
                            style={styles.menuButton}
                        />
                    </View>

                    <View style={styles.section}>
                        <SectionHeader title="Reading Achievements" />
                        <AchievementItem
                            icon="🏆"
                            title="Bookworm"
                            description="Read 10 books this year"
                            backgroundColor={theme.colors.surface}
                        />
                        <AchievementItem
                            icon="⭐"
                            title="Reviewer"
                            description="Rated 5 books"
                            backgroundColor={theme.colors.surface}
                        />
                        <AchievementItem
                            icon="🎯"
                            title="Goal Setter"
                            description="Set your first reading goal"
                            backgroundColor={theme.colors.surface}
                        />
                    </View>
                </View>
                
                <CustomButton 
                    text="Log Out" 
                    onPress={onLogOut}
                    bgColor={theme.colors.errorLight}
                    fgColor={theme.colors.error}
                    style={styles.logoutButtonFixed}
                />
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
        paddingBottom: theme.spacing.xl,
    },
    header: {
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingHorizontal: theme.spacing.screenPadding,
        paddingBottom: theme.spacing.xxxl,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    userName: {
        marginBottom: theme.spacing.xs,
    },
    userEmail: {
        marginBottom: theme.spacing.sm,
    },
    content: {
        paddingHorizontal: theme.spacing.screenPadding,
    },
    quickStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.medium,
        paddingVertical: theme.spacing.xl,
        marginBottom: theme.spacing.xxl,
        ...theme.shadows.medium,
    },
    quickStatItem: {
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
    },
    section: {
        marginBottom: theme.spacing.xxl,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.xl,
    },
    statCard: {
        flex: 1,
        marginHorizontal: theme.spacing.xs,
    },
    subsection: {
        marginBottom: theme.spacing.xl,
    },
    subsectionTitle: {
        marginBottom: theme.spacing.md,
    },
    menuButton: {
        marginBottom: theme.spacing.sm,
    },
    logoutButtonFixed: {
        position: 'absolute',
        bottom: 90,
        left: theme.spacing.screenPadding,
        right: theme.spacing.screenPadding,
        marginTop: 0,
        marginBottom: 0,
    },
});

export default AccountScreen;