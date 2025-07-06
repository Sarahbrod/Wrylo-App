import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Animated, ScrollView } from 'react-native';

const MoodFlowScreen = ({ navigation }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [fadeAnim] = useState(new Animated.Value(1));

    const questions = [
        {
            id: 'mood',
            title: "How are you feeling today?",
            subtitle: "Pick the emoji that matches your vibe ✨",
            options: [
                { value: 'happy', emoji: '😊', label: 'Happy & Upbeat', color: '#FFE066' },
                { value: 'contemplative', emoji: '🤔', label: 'Deep & Thoughtful', color: '#A78BFA' },
                { value: 'adventurous', emoji: '🚀', label: 'Ready for Adventure', color: '#FF6B6B' },
                { value: 'cozy', emoji: '☕', label: 'Cozy & Relaxed', color: '#8B5A3C' },
                { value: 'romantic', emoji: '💕', label: 'In Love', color: '#FFB3BA' },
                { value: 'mysterious', emoji: '🔮', label: 'Mysterious & Dark', color: '#4A5568' }
            ]
        },
        {
            id: 'experience',
            title: "What kind of journey do you want?",
            subtitle: "Choose your reading adventure 📚",
            options: [
                { value: 'escape', emoji: '🌸', label: 'Sweet Escape', color: '#FFB3E6' },
                { value: 'learn', emoji: '🧠', label: 'Learn Something New', color: '#98FB98' },
                { value: 'laugh', emoji: '😂', label: 'Laugh Out Loud', color: '#FFE135' },
                { value: 'cry', emoji: '😭', label: 'Feel All the Feels', color: '#87CEEB' },
                { value: 'thrill', emoji: '⚡', label: 'Heart-Racing Thrills', color: '#FF4500' },
                { value: 'inspire', emoji: '⭐', label: 'Get Inspired', color: '#FFD700' }
            ]
        },
        {
            id: 'commitment',
            title: "How much time do you have?",
            subtitle: "Let's find the perfect length for you ⏰",
            options: [
                { value: 'quick', emoji: '⚡', label: 'Quick Read', subtitle: '< 200 pages', color: '#FF6B35' },
                { value: 'medium', emoji: '📖', label: 'Perfect Balance', subtitle: '200-400 pages', color: '#7B68EE' },
                { value: 'epic', emoji: '📚', label: 'Epic Journey', subtitle: '400+ pages', color: '#228B22' },
                { value: 'series', emoji: '🌟', label: 'Series to Binge', subtitle: 'Multiple books', color: '#FF1493' }
            ]
        }
    ];

    const handleAnswer = (value) => {
        const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            // Animate to next question
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
            
            setTimeout(() => {
                setCurrentQuestion(currentQuestion + 1);
            }, 200);
        } else {
            // Navigate to results
            navigation.navigate('MoodResults', { answers: newAnswers });
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
            
            setTimeout(() => {
                setCurrentQuestion(currentQuestion - 1);
            }, 200);
        } else {
            navigation.goBack();
        }
    };

    const question = questions[currentQuestion];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
                <View style={styles.progressContainer}>
                    {questions.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.progressDot,
                                index <= currentQuestion && styles.progressDotActive
                            ]}
                        />
                    ))}
                </View>
                <View style={styles.placeholder} />
            </View>

            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                <Text style={styles.questionTitle}>{question.title}</Text>
                <Text style={styles.questionSubtitle}>{question.subtitle}</Text>

                <ScrollView 
                    style={styles.optionsContainer}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.optionsContent}
                >
                    {question.options.map((option, index) => (
                        <TouchableOpacity
                            key={option.value}
                            style={[
                                styles.optionCard,
                                { backgroundColor: option.color + '20', borderColor: option.color }
                            ]}
                            onPress={() => handleAnswer(option.value)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.optionEmoji}>{option.emoji}</Text>
                            <View style={styles.optionTextContainer}>
                                <Text style={styles.optionLabel}>{option.label}</Text>
                                {option.subtitle && (
                                    <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                                )}
                            </View>
                            <View style={[styles.optionAccent, { backgroundColor: option.color }]} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Animated.View>
        </SafeAreaView>
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
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F6F4F1',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    backText: {
        fontSize: 20,
        color: '#7FABC7',
        fontWeight: 'bold',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    progressDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#E5E7EB',
    },
    progressDotActive: {
        backgroundColor: '#7FABC7',
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    questionTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1D1D1D',
        textAlign: 'center',
        marginBottom: 8,
    },
    questionSubtitle: {
        fontSize: 16,
        color: '#1D1D1D',
        textAlign: 'center',
        marginBottom: 40,
    },
    optionsContainer: {
        flex: 1,
    },
    optionsContent: {
        paddingBottom: 100,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        position: 'relative',
        overflow: 'hidden',
    },
    optionEmoji: {
        fontSize: 32,
        marginRight: 16,
    },
    optionTextContainer: {
        flex: 1,
    },
    optionLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1D1D1D',
        marginBottom: 2,
    },
    optionSubtitle: {
        fontSize: 14,
        color: '#1D1D1D',
    },
    optionAccent: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 4,
    },
});

export default MoodFlowScreen;