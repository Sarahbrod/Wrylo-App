import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HomeOnboarding = ({ onGetStarted }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image 
                    source={require('../../../assets/images/logo.png')} 
                    style={styles.bookImage}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Welcome to FinanceEd!</Text>
                <Text style={styles.subtitle}>Your reading journey starts here</Text>
                
                <View style={styles.features}>
                    <View style={styles.feature}>
                        <Text style={styles.featureIcon}>🏠</Text>
                        <Text style={styles.featureText}>Track your reading progress</Text>
                    </View>
                    <View style={styles.feature}>
                        <Text style={styles.featureIcon}>🎯</Text>
                        <Text style={styles.featureText}>Set and achieve reading goals</Text>
                    </View>
                    <View style={styles.feature}>
                        <Text style={styles.featureIcon}>📖</Text>
                        <Text style={styles.featureText}>Discover personalized recommendations</Text>
                    </View>
                </View>
                
                <TouchableOpacity style={styles.getStartedButton} onPress={onGetStarted}>
                    <Text style={styles.getStartedButtonText}>Get Started</Text>
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
    bookImage: {
        width: 80,
        height: 80,
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
    getStartedButton: {
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
    getStartedButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default HomeOnboarding;