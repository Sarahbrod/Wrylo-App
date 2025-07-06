import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const StatsScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Reading Stats</Text>
                    <Text style={styles.subtitle}>Track your reading progress</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Books Read This Year</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>3</Text>
                        <Text style={styles.statLabel}>Books Currently Reading</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>245</Text>
                        <Text style={styles.statLabel}>Pages Read This Week</Text>
                    </View>

                    <View style={styles.statCard}>
                        <Text style={styles.statNumber}>18</Text>
                        <Text style={styles.statLabel}>Average Reading Time (mins/day)</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Reading Goals</Text>
                        <View style={styles.goalItem}>
                            <Text style={styles.goalText}>📚 Read 25 books this year</Text>
                            <Text style={styles.goalProgress}>12/25 (48%)</Text>
                        </View>
                        <View style={styles.goalItem}>
                            <Text style={styles.goalText}>⏰ Read 30 minutes daily</Text>
                            <Text style={styles.goalProgress}>18/30 min avg</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Favorite Genres</Text>
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
                        <View style={styles.genreItem}>
                            <Text style={styles.genreText}>Self-Help</Text>
                            <Text style={styles.genreCount}>2 books</Text>
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
        backgroundColor: '#F9F8F3',
    },
    container: {
        flex: 1,
        paddingBottom: 100,
    },
    header: {
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#71727A',
        textAlign: 'center',
    },
    content: {
        paddingHorizontal: 20,
    },
    statCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    statNumber: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#7F9BEB',
        marginBottom: 8,
    },
    statLabel: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
    section: {
        marginTop: 24,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
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
    },
    goalText: {
        fontSize: 16,
        color: '#555',
        flex: 1,
    },
    goalProgress: {
        fontSize: 14,
        color: '#7F9BEB',
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
    },
    genreText: {
        fontSize: 16,
        color: '#555',
    },
    genreCount: {
        fontSize: 14,
        color: '#7F9BEB',
        fontWeight: '600',
    },
});

export default StatsScreen;