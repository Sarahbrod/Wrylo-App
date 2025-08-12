import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import Divider from '../components/Divider/Divider';
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';
import { useAuth } from '../context/AuthContext';

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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
                firstName,
                lastName,
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

    const onGoogleSignUp = () => {
        if (__DEV__) {
            console.warn('Google sign up not implemented yet');
        }
    };

    const onAppleSignUp = () => {
        if (__DEV__) {
            console.warn('Apple sign up not implemented yet');
        }
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView style={styles.safeArea} contentContainerStyle={styles.scrollContainer}>
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

                <View style={styles.nameContainer}>
                    <View style={styles.nameInputHalf}>
                        <Text style={styles.inputLabel}>First Name (Optional)</Text>
                        <CustomInput
                            placeholder="First name"
                            value={firstName}
                            setValue={setFirstName}
                        />
                    </View>
                    <View style={styles.nameInputHalf}>
                        <Text style={styles.inputLabel}>Last Name (Optional)</Text>
                        <CustomInput
                            placeholder="Last name"
                            value={lastName}
                            setValue={setLastName}
                        />
                    </View>
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
                    <Text style={styles.inputLabel}>Confirm Password</Text>
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
                    <CustomButton text="Create Account" onPress={onSignUpPressed} />
                )}

                <View style={styles.dividerSpacing}>
                    <Divider text="Or continue with" />
                </View>

                <View style={styles.alt}>
                    <CustomButton 
                        onPress={onGoogleSignUp} 
                        bgColor='#212121' 
                        fgColor="#FCF7F7" 
                        type="ICON" 
                        iconName="google" 
                        iconLibrary="AntDesign" 
                    />
                    <CustomButton 
                        onPress={onAppleSignUp} 
                        bgColor='#212121' 
                        fgColor="#FCF7F7" 
                        type="ICON" 
                        iconName="apple1" 
                        iconLibrary="AntDesign" 
                    />
                </View>

                <View style={styles.bottomSignin}>
                    <Text style={styles.bottomSigninText}>Already have an account? </Text>
                    <TouchableOpacity onPress={onSignInPressed}>
                        <Text style={styles.signinLinkText}>Sign in</Text>
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
    },
    container: {
        alignItems: 'stretch',
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 40,
        minHeight: '100%',
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
        marginBottom: 30,
        paddingBottom: 24,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    nameInputHalf: {
        width: '48%',
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginLeft: 4,
    },
    dividerSpacing: {
        paddingTop: 24,
        paddingBottom: 16,
    },
    alt: {
        paddingTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '50%',
        alignSelf: 'center',
    },
    bottomSignin: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 20,
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