import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';

const MoodFlowScreen = ({ navigation, route }) => {
    const { sourceTab } = route.params || {};
    const [currentStep, setCurrentStep] = useState(1);
    const [moodData, setMoodData] = useState({
        energy: null,
        genre: null,
        depth: null
    });

    const [fontsLoaded] = useFonts({
        LibreBaskerville_400Regular,
        LibreBaskerville_700Bold,
    });

    // Step 1: Energy Level
    const energyOptions = [
        { id: 'high', title: 'High Energy', subtitle: 'Ready for adventure', emoji: '⚡', color: '#FF6B6B' },
        { id: 'medium', title: 'Balanced', subtitle: 'Steady and focused', emoji: '🌟', color: '#4ECDC4' },
        { id: 'low', title: 'Calm & Relaxed', subtitle: 'Seeking comfort', emoji: '🌙', color: '#45B7D1' },
    ];

    // Step 2: Genre Preference
    const genreOptions = [
        { id: 'fiction', title: 'Fiction', subtitle: 'Stories & imagination', emoji: '📚', color: '#9B59B6' },
        { id: 'mystery', title: 'Mystery', subtitle: 'Puzzles & suspense', emoji: '🔍', color: '#2C3E50' },
        { id: 'romance', title: 'Romance', subtitle: 'Love & connection', emoji: '💕', color: '#E91E63' },
        { id: 'scifi', title: 'Sci-Fi', subtitle: 'Future & technology', emoji: '🚀', color: '#3F51B5' },
        { id: 'nonfiction', title: 'Non-Fiction', subtitle: 'Facts & learning', emoji: '🧠', color: '#FF9800' },
        { id: 'fantasy', title: 'Fantasy', subtitle: 'Magic & wonder', emoji: '🧙‍♂️', color: '#8BC34A' },
    ];

    // Step 3: Reading Depth
    const depthOptions = [
        { id: 'light', title: 'Light Read', subtitle: 'Easy & entertaining', emoji: '🍃', color: '#FDD835' },
        { id: 'medium', title: 'Moderate', subtitle: 'Engaging but not heavy', emoji: '📖', color: '#26A69A' },
        { id: 'deep', title: 'Deep Dive', subtitle: 'Complex & thought-provoking', emoji: '🏔️', color: '#5E35B1' },
    ];

    const handleSelection = (step, value) => {
        const newMoodData = { ...moodData };

        if (step === 1) {
            newMoodData.energy = value;
        } else if (step === 2) {
            newMoodData.genre = value;
        } else if (step === 3) {
            newMoodData.depth = value;
        }

        setMoodData(newMoodData);

        if (step < 3) {
            setTimeout(() => {
                setCurrentStep(step + 1);
            }, 300);
        } else {
            // Complete the flow
            setTimeout(() => {
                navigation.navigate('MoodResults', { moodData: newMoodData, sourceTab });
            }, 500);
        }
    };

    const goBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            navigation.goBack();
        }
    };

    const renderProgressBar = () => (
        <View style={styles.progressContainer}>
            {[1, 2, 3].map((step) => (
                <View key={step} style={styles.progressBarContainer}>
                    <View style={[
                        styles.progressStep,
                        currentStep >= step && styles.progressStepActive
                    ]}>
                        {currentStep > step ? (
                            <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                        ) : (
                            <Text style={[
                                styles.progressStepText,
                                currentStep >= step && styles.progressStepTextActive
                            ]}>
                                {step}
                            </Text>
                        )}
                    </View>
                    {step < 3 && (
                        <View style={[
                            styles.progressLine,
                            currentStep > step && styles.progressLineActive
                        ]} />
                    )}
                </View>
            ))}
        </View>
    );

    const renderStep1 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>How are you feeling?</Text>
            <Text style={styles.stepSubtitle}>Let's start with your energy level</Text>

            <View style={styles.optionsContainer}>
                {energyOptions.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[styles.optionCard, moodData.energy?.id === option.id && styles.selectedCard]}
                        onPress={() => handleSelection(1, option)}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.optionIconContainer, { backgroundColor: option.color + '20' }]}>
                            <Text style={styles.optionEmoji}>{option.emoji}</Text>
                        </View>
                        <Text style={styles.optionTitle}>{option.title}</Text>
                        <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderStep2 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What genre calls to you?</Text>
            <Text style={styles.stepSubtitle}>Choose what matches your current mood</Text>

            <View style={styles.genreGrid}>
                {genreOptions.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[styles.genreCard, moodData.genre?.id === option.id && styles.selectedGenreCard]}
                        onPress={() => handleSelection(2, option)}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.genreIconContainer, { backgroundColor: option.color + '20' }]}>
                            <Text style={styles.genreEmoji}>{option.emoji}</Text>
                        </View>
                        <Text style={styles.genreTitle}>{option.title}</Text>
                        <Text style={styles.genreSubtitle}>{option.subtitle}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderStep3 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>How deep do you want to go?</Text>
            <Text style={styles.stepSubtitle}>Choose your reading intensity</Text>

            <View style={styles.optionsContainer}>
                {depthOptions.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[styles.depthCard, moodData.depth?.id === option.id && styles.selectedCard]}
                        onPress={() => handleSelection(3, option)}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.depthIconContainer, { backgroundColor: option.color + '20' }]}>
                            <Text style={styles.depthEmoji}>{option.emoji}</Text>
                        </View>
                        <View style={styles.depthTextContainer}>
                            <Text style={styles.depthTitle}>{option.title}</Text>
                            <Text style={styles.depthSubtitle}>{option.subtitle}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <Ionicons name="arrow-back" size={24} color="#2E0A09" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mood Curator</Text>
                <View style={styles.placeholder} />
            </View>

            {renderProgressBar()}

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F4F1',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2E0A09',
        fontFamily: 'LibreBaskerville_700Bold',
    },
    placeholder: {
        width: 40,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
        marginBottom: 30,
    },
    progressBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    progressStep: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressStepActive: {
        backgroundColor: '#89A8E2',
    },
    progressStepText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#9CA3AF',
    },
    progressStepTextActive: {
        color: '#FFFFFF',
    },
    progressLine: {
        width: 40,
        height: 2,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 8,
    },
    progressLineActive: {
        backgroundColor: '#89A8E2',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    stepContainer: {
        paddingBottom: 20,
    },
    stepTitle: {
        fontSize: 22,
        fontWeight: '700',
        fontFamily: 'LibreBaskerville_700Bold',
        color: '#2E0A09',
        textAlign: 'center',
        marginBottom: 6,
    },
    stepSubtitle: {
        fontSize: 14,
        fontFamily: 'LibreBaskerville_400Regular',
        color: '#71727A',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    optionsContainer: {
        gap: 12,
    },
    optionCard: {
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'transparent',
        backgroundColor: '#FFFFFF',
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    selectedCard: {
        borderColor: '#89A8E2',
        borderWidth: 3,
        shadowColor: '#89A8E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    optionIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    optionEmoji: {
        fontSize: 28,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2E0A09',
        marginBottom: 4,
        textAlign: 'center',
    },
    optionSubtitle: {
        fontSize: 12,
        color: '#71727A',
        textAlign: 'center',
    },
    genreGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    genreCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        marginBottom: 6,
    },
    selectedGenreCard: {
        borderColor: '#89A8E2',
        borderWidth: 3,
        shadowColor: '#89A8E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    genreIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    genreEmoji: {
        fontSize: 20,
    },
    genreTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2E0A09',
        marginBottom: 3,
        textAlign: 'center',
    },
    genreSubtitle: {
        fontSize: 11,
        color: '#71727A',
        textAlign: 'center',
    },
    depthCard: {
        borderRadius: 16,
        borderWidth: 2,
        borderColor: 'transparent',
        backgroundColor: '#FFFFFF',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        gap: 14,
    },
    depthIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    depthEmoji: {
        fontSize: 28,
    },
    depthTextContainer: {
        flex: 1,
    },
    depthTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2E0A09',
        marginBottom: 4,
    },
    depthSubtitle: {
        fontSize: 13,
        color: '#71727A',
    },
});

export default MoodFlowScreen;