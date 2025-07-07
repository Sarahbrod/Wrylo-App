import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';

const SplashScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.3)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    
    const [fontsLoaded] = useFonts({
        LibreBaskerville_400Regular,
        LibreBaskerville_700Bold,
    });

    useEffect(() => {
        if (!fontsLoaded) {
            return;
        }

        const pulseAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]),
            { iterations: 1 }
        );

        const animationSequence = Animated.sequence([
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 15,
                    friction: 4,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(100),
            pulseAnimation,
            Animated.delay(200),
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(slideAnim, {
                    toValue: -100,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ]);

        animationSequence.start(() => {
            navigation.replace('Auth');
        });

    }, [navigation, fontsLoaded]);

    if (!fontsLoaded) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Animated.View style={[
                styles.logoContainer,
                {
                    opacity: fadeAnim,
                    transform: [
                        { scale: scaleAnim },
                        { translateY: slideAnim }
                    ]
                }
            ]}>
                <Animated.Text style={[
                    styles.logoText,
                    {
                        transform: [{ scale: pulseAnim }]
                    }
                ]}>wrylo</Animated.Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F4F1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 48,
        fontFamily: 'LibreBaskerville_700Bold',
        color: '#2E0A09',
        textAlign: 'center',
        marginBottom: 16,
        letterSpacing: 2,
    },
    taglineText: {
        fontSize: 16,
        fontFamily: 'LibreBaskerville_400Regular',
        color: '#71727A',
        textAlign: 'center',
        fontStyle: 'italic',
        letterSpacing: 1,
    },
    loadingText: {
        fontSize: 18,
        color: '#71727A',
        fontFamily: 'LibreBaskerville_400Regular',
    },
});

export default SplashScreen;