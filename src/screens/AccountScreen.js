import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import CustomButton from '../components/CustomButton';

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
                        <Text style={styles.avatarText}>JD</Text>
                    </View>
                    <Text style={styles.userName}>Jane Doe</Text>
                    <Text style={styles.userEmail}>jane.doe@email.com</Text>
                    <Text style={styles.memberSince}>Member since March 2024</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.quickStats}>
                        <View style={styles.quickStatItem}>
                            <Text style={styles.quickStatNumber}>12</Text>
                            <Text style={styles.quickStatLabel}>Books Read</Text>
                        </View>
                        <View style={styles.quickStatItem}>
                            <Text style={styles.quickStatNumber}>3</Text>
                            <Text style={styles.quickStatLabel}>Currently Reading</Text>
                        </View>
                        <View style={styles.quickStatItem}>
                            <Text style={styles.quickStatNumber}>47</Text>
                            <Text style={styles.quickStatLabel}>Want to Read</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Account Settings</Text>
                        
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
                        <Text style={styles.sectionTitle}>Support</Text>
                        
                        <CustomButton 
                            text="Help & Support" 
                            onPress={onHelp}
                            type="SECONDARY"
                            style={styles.menuButton}
                        />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Reading Stats</Text>
                        <View style={styles.statsRow}>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>245</Text>
                                <Text style={styles.statLabel}>Pages This Week</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>18</Text>
                                <Text style={styles.statLabel}>Min/Day Avg</Text>
                            </View>
                        </View>
                        
                        <View style={styles.subsection}>
                            <Text style={styles.subsectionTitle}>Reading Goals</Text>
                            <View style={styles.goalItem}>
                                <Text style={styles.goalText}>📚 Read 25 books this year</Text>
                                <Text style={styles.goalProgress}>12/25 (48%)</Text>
                            </View>
                            <View style={styles.goalItem}>
                                <Text style={styles.goalText}>⏰ Read 30 minutes daily</Text>
                                <Text style={styles.goalProgress}>18/30 min avg</Text>
                            </View>
                        </View>
                        
                        <View style={styles.subsection}>
                            <Text style={styles.subsectionTitle}>Favorite Genres</Text>
                            <View style={styles.genreItem}>
                                <Text style={styles.genreText}>Fiction</Text>
                                <Text style={styles.genreCount}>5 books</Text>
                            </View>
                            <View style={styles.genreItem}>
                                <Text style={styles.genreText}>Science Fiction</Text>
                                <Text style={styles.genreCount}>3 books</Text>
                            </View>
                            <View style={styles.genreItem}>
                                <Text style={styles.genreText}>Biography</Text>
                                <Text style={styles.genreCount}>2 books</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Reading Achievements</Text>
                        <View style={styles.achievement}>
                            <Text style={styles.achievementIcon}>🏆</Text>
                            <View style={styles.achievementInfo}>
                                <Text style={styles.achievementTitle}>Bookworm</Text>
                                <Text style={styles.achievementDesc}>Read 10 books this year</Text>
                            </View>
                        </View>
                        <View style={styles.achievement}>
                            <Text style={styles.achievementIcon}>⭐</Text>
                            <View style={styles.achievementInfo}>
                                <Text style={styles.achievementTitle}>Reviewer</Text>
                                <Text style={styles.achievementDesc}>Rated 5 books</Text>
                            </View>
                        </View>
                        <View style={styles.achievement}>
                            <Text style={styles.achievementIcon}>🎯</Text>
                            <View style={styles.achievementInfo}>
                                <Text style={styles.achievementTitle}>Goal Setter</Text>
                                <Text style={styles.achievementDesc}>Set your first reading goal</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.logoutSection}>
                        <CustomButton 
                            text="Log Out" 
                            onPress={onLogOut}
                            bgColor="#FFE5E5"
                            fgColor="#D32F2F"
                            style={styles.logoutButton}
                        />
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
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#7FABC7',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatarText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1D1D1D',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 8,
    },
    memberSince: {
        fontSize: 14,
        color: '#000000',
    },
    content: {
        paddingHorizontal: 20,
    },
    quickStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    quickStatItem: {
        alignItems: 'center',
    },
    quickStatNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#7F9BEB',
        marginBottom: 4,
    },
    quickStatLabel: {
        fontSize: 12,
        color: '#000000',
        textAlign: 'center',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 20,
    },
    menuButton: {
        marginBottom: 8,
    },
    achievement: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    achievementIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    achievementInfo: {
        flex: 1,
    },
    achievementTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1D1D1D',
        marginBottom: 4,
    },
    achievementDesc: {
        fontSize: 14,
        color: '#000000',
    },
    logoutSection: {
        marginTop: 32,
    },
    logoutButton: {
        marginBottom: 0,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        flex: 1,
        marginHorizontal: 4,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#7FABC7',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 11,
        color: '#000000',
        textAlign: 'center',
    },
    subsection: {
        marginBottom: 20,
    },
    subsectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 12,
    },
    goalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    goalText: {
        fontSize: 14,
        color: '#000000',
        flex: 1,
    },
    goalProgress: {
        fontSize: 12,
        color: '#7FABC7',
        fontWeight: '600',
    },
    genreItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    genreText: {
        fontSize: 14,
        color: '#000000',
    },
    genreCount: {
        fontSize: 12,
        color: '#7FABC7',
        fontWeight: '600',
    },
    bottomSpacer: {
        height: 108, // Navigation height (70) + bottom margin (30) + extra padding (8)
    },
});

export default AccountScreen;