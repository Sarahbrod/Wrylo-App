import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';
import { useAuth } from '../context/AuthContext';

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const { register } = useAuth();

    const [fontsLoaded] = useFonts({
        LibreBaskerville_400Regular,
        LibreBaskerville_700Bold,
    });

    const validateForm = () => {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = 'Please enter a username';
        }

        if (!email.trim()) {
            newErrors.email = 'Please enter your email address';
        }

        if (!password) {
            newErrors.password = 'Please enter a password';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords don\'t match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSignUpPressed = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const result = await register({
                username,
                email,
                password,
                confirmPassword,
            });

            if (result.success) {
                if (result.autoAuthenticated) {
                    navigation.navigate('Main');
                } else {
                    Alert.alert('Success', result.message || 'Account created successfully!');
                    navigation.navigate('LogIn');
                }
            } else {
                Alert.alert('Sign Up Failed', result.message || 'Please try again.');
            }
        } catch (error) {
            if (__DEV__) {
                console.error('Sign up error:', error);
            }
            Alert.alert('Sign Up Failed', 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const onSignInPressed = () => {
        navigation.navigate('LogIn');
    };


    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Create Account</Text>
                <Text style={styles.subtext}>Join Wrylo to start your reading journey</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <CustomInput
                        placeholder="Enter your username"
                        value={username}
                        setValue={setUsername}
                        autoCapitalize="none"
                    />
                    {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                </View>

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


                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <CustomInput
                        placeholder="Create a password"
                        value={password}
                        setValue={setPassword}
                        secureTextEntry={true}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <CustomInput
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        secureTextEntry={true}
                    />
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#2E0A09" style={styles.loadingIndicator} />
                ) : (
                    <CustomButton text="Create Account" onPress={onSignUpPressed} type="PRIMARY" />
                )}


                <View style={styles.bottomSignin}>
                    <Text style={styles.bottomSigninText}>Already have an account? </Text>
                    <TouchableOpacity onPress={onSignInPressed}>
                        <Text style={styles.signinLinkText}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F6F4F1',
    },
    container: {
        flex: 1,
        alignItems: 'stretch',
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 20,
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: '700',
        fontFamily: 'LibreBaskerville_700Bold',
        color: '#2E0A09',
        textAlign: 'left',
        marginBottom: 8,
    },
    subtext: {
        fontSize: 14,
        fontFamily: 'LibreBaskerville_400Regular',
        color: '#71727A',
        textAlign: 'left',
        marginBottom: 20,
        paddingBottom: 12,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 12,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginLeft: 4,
    },
    bottomSignin: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
        justifyContent: 'center',
    },
    bottomSigninText: {
        color: '#71727A',
        fontSize: 14,
        fontFamily: 'System',
    },
    signinLinkText: {
        color: '#2E0A09',
        fontSize: 14,
        fontFamily: 'System',
        fontWeight: '600',
        textDecorationLine: 'underline',
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
});

export default SignUpScreen;