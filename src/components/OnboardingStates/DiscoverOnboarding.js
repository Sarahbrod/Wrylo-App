import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DiscoverOnboarding = ({ onExplore, navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.icon}>💬</Text>
                <Text style={styles.title}>Join the Community</Text>
                <Text style={styles.subtitle}>Connect with fellow readers and share your book journey</Text>
                
                <View style={styles.features}>
                    <View style={styles.feature}>
                        <Text style={styles.featureIcon}>👥</Text>
                        <Text style={styles.featureText}>Connect with fellow readers</Text>
                    </View>
                    <View style={styles.feature}>
                        <Text style={styles.featureIcon}>💭</Text>
                        <Text style={styles.featureText}>Share thoughts and reviews</Text>
                    </View>
                    <View style={styles.feature}>
                        <Text style={styles.featureIcon}>📖</Text>
                        <Text style={styles.featureText}>Discover book discussions</Text>
                    </View>
                </View>
                
                <TouchableOpacity style={styles.exploreButton} onPress={() => {
                    if (navigation) {
                        navigation.navigate('Community');
                    } else if (onExplore) {
                        onExplore();
                    }
                }}>
                    <Text style={styles.exploreButtonText}>Join Community</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F4F1',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    content: {
        alignItems: 'center',
        maxWidth: 320,
    },
    icon: {
        fontSize: 64,
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1D1D1D',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#71727A',
        marginBottom: 40,
        textAlign: 'center',
    },
    features: {
        alignSelf: 'stretch',
        marginBottom: 40,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    featureIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    featureText: {
        fontSize: 16,
        color: '#1D1D1D',
        flex: 1,
    },
    exploreButton: {
        backgroundColor: '#7FABC7',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    exploreButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default DiscoverOnboarding;