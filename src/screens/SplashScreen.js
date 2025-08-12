import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';
import { useAuth } from '../context/AuthContext';

const SplashScreen = ({ navigation }) => {
    const { isAuthenticated, loading } = useAuth();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.3)).current;
    const logoFadeAnim = useRef(new Animated.Value(1)).current;
    const backgroundFadeAnim = useRef(new Animated.Value(0)).current;
    const pulseAnim = useRef(new Animated.Value(1)).current;
    
    const [fontsLoaded] = useFonts({
        LibreBaskerville_400Regular,
        LibreBaskerville_700Bold,
    });

    useEffect(() => {
        if (!fontsLoaded || loading) {
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
            // Initial logo appearance
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
            Animated.delay(400),
            // Elegant fade to background transition
            Animated.parallel([
                Animated.timing(logoFadeAnim, {
                    toValue: 0.1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(backgroundFadeAnim, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 0.8,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ]),
            Animated.delay(200),
        ]);

        animationSequence.start(() => {
            // Navigate based on authentication status
            if (isAuthenticated) {
                navigation.replace('Main');
            } else {
                navigation.replace('Auth');
            }
        });

    }, [navigation, fontsLoaded, loading, isAuthenticated]);

    if (!fontsLoaded) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Background overlay that fades in */}
            <Animated.View style={[
                styles.backgroundOverlay,
                {
                    opacity: backgroundFadeAnim,
                }
            ]} />
            
            <Animated.View style={[
                styles.logoContainer,
                {
                    opacity: fadeAnim,
                    transform: [
                        { scale: scaleAnim }
                    ]
                }
            ]}>
                <Animated.Text style={[
                    styles.logoText,
                    {
                        opacity: logoFadeAnim,
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
    backgroundOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#F6F4F1',
        zIndex: 1,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
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