import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomButton from '../components/CustomButton/CustomButton';
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';

const BookForumScreen = ({ navigation }) => {
    const [fontsLoaded] = useFonts({
        LibreBaskerville_400Regular,
        LibreBaskerville_700Bold,
    });

    const forumTopics = [
        {
            id: 1,
            title: 'Current Reading',
            description: 'Share what you\'re reading now',
            posts: 24,
            lastActivity: '2 hours ago'
        },
        {
            id: 2,
            title: 'Book Recommendations',
            description: 'Get and give book suggestions',
            posts: 156,
            lastActivity: '30 minutes ago'
        },
        {
            id: 3,
            title: 'Author Discussions',
            description: 'Talk about your favorite authors',
            posts: 89,
            lastActivity: '1 hour ago'
        },
        {
            id: 4,
            title: 'Reading Challenges',
            description: 'Join reading challenges and goals',
            posts: 67,
            lastActivity: '3 hours ago'
        },
    ];

    const onTopicPressed = (topic) => {
        // Navigate to specific forum topic
        if (__DEV__) {
            console.log('Navigate to topic:', topic.title);
        }
    };

    const onBackPressed = () => {
        navigation.goBack();
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.headerSection}>
                <Text style={styles.headerTitle}>Community</Text>
            </View>

            <ScrollView style={styles.topicsContainer} showsVerticalScrollIndicator={false}>
                {forumTopics.map((topic) => (
                    <View key={topic.id} style={styles.topicCard}>
                        <View style={styles.topicHeader}>
                            <Text style={styles.topicTitle}>{topic.title}</Text>
                            <Text style={styles.topicDescription}>{topic.description}</Text>
                        </View>
                        <View style={styles.topicStats}>
                            <Text style={styles.topicStat}>{topic.posts} posts</Text>
                            <Text style={styles.topicStat}>Last: {topic.lastActivity}</Text>
                        </View>
                        <CustomButton
                            text="View Discussion"
                            onPress={() => onTopicPressed(topic)}
                            type="TERTIARY"
                        />
                    </View>
                ))}
            </ScrollView>

            <View style={styles.buttonContainer}>
                <CustomButton
                    text="Back to Community"
                    onPress={onBackPressed}
                    type="PRIMARY"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F4F1',
    },
    contentContainer: {
        paddingBottom: 110,
    },
    headerSection: {
        paddingHorizontal: 20,
        paddingTop: 80,
        paddingBottom: 16,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2E0A09',
        fontFamily: 'Playfair Display',
        letterSpacing: 0.3,
    },
    topicsContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    topicCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    topicHeader: {
        marginBottom: 12,
    },
    topicTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    topicDescription: {
        fontSize: 14,
        color: '#71727A',
        lineHeight: 20,
    },
    topicStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    topicStat: {
        fontSize: 12,
        color: '#999',
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default BookForumScreen;