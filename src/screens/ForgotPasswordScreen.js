import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';
import { useAuth } from '../context/AuthContext';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const { resetPassword } = useAuth();

    const [fontsLoaded] = useFonts({
        LibreBaskerville_400Regular,
        LibreBaskerville_700Bold,
    });

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Please enter your email address';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onResetPressed = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const result = await resetPassword(email);

            if (result.success) {
                Alert.alert(
                    'Password Reset Sent',
                    'Check your email for password reset instructions.',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('LogIn'),
                        },
                    ]
                );
            } else {
                Alert.alert('Error', result.message || 'Failed to send reset email. Please try again.');
            }
        } catch (error) {
            if (__DEV__) {
                console.error('Password reset error:', error);
            }
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const onBackToLoginPressed = () => {
        navigation.navigate('LogIn');
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView style={styles.safeArea} contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Reset Password</Text>
                <Text style={styles.subtext}>
                    Enter your email address and we'll send you instructions to reset your password.
                </Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <CustomInput
                        placeholder="Enter your email"
                        value={email}
                        setValue={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#2E0A09" style={styles.loadingIndicator} />
                ) : (
                    <CustomButton text="Send Reset Instructions" onPress={onResetPressed} />
                )}

                <View style={styles.backToLogin}>
                    <TouchableOpacity onPress={onBackToLoginPressed}>
                        <Text style={styles.backToLoginText}>Back to Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F6F4F1',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 110,
    },
    container: {
        alignItems: 'stretch',
        paddingHorizontal: 24,
        paddingTop: 120,
        paddingBottom: 40,
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: '700',
        fontFamily: 'LibreBaskerville_700Bold',
        color: '#333',
        textAlign: 'left',
        marginBottom: 8,
    },
    subtext: {
        fontSize: 16,
        fontFamily: 'LibreBaskerville_400Regular',
        color: '#71727A',
        textAlign: 'left',
        marginBottom: 40,
        lineHeight: 24,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 30,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginLeft: 4,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
        fontFamily: 'System',
        fontWeight: '400',
    },
    loadingIndicator: {
        marginVertical: 20,
    },
    backToLogin: {
        paddingTop: 30,
        alignItems: 'center',
    },
    backToLoginText: {
        color: '#2E0A09',
        fontSize: 16,
        fontFamily: 'System',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
});

export default ForgotPasswordScreen;