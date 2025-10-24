import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native'
import CustomInput from '../components/CustomInput/CustomInput';
import CustomButton from '../components/CustomButton/CustomButton';
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';
import authService from '../services/authService';


const LogInScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [fontsLoaded] = useFonts({
        LibreBaskerville_400Regular,
        LibreBaskerville_700Bold,
    });

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Please enter your email address';
        } else if (!authService.validateEmail(email)) {
            newErrors.email = 'Please check your email format';
        }

        if (!password) {
            newErrors.password = 'Please enter your password';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const onLogInPressed = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            const result = await authService.login({ email, password });

            if (result.success) {
                // Navigate to main app
                navigation.navigate('Main');
            } else {
                Alert.alert('Unable to Sign In', result.message || 'Please check your email and password, then try again.');
            }
        } catch (error) {
            if (__DEV__) {
                console.error('Login error:', error);
            }

            // Provide more specific error messages
            let errorMessage = 'We\'re having trouble connecting right now. Please check your internet connection and try again.';

            if (error.code === 'ECONNABORTED') {
                errorMessage = 'Request timed out. Please check your internet connection and try again.';
            } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
                errorMessage = 'Cannot connect to server. Please ensure your internet connection is working and try again.';
            } else if (error.response?.status === 0) {
                errorMessage = 'Cannot reach the server. Please check if the backend server is running and try again.';
            }

            Alert.alert('Connection Issue', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    };

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    }



    if (!fontsLoaded) {
        return null;
    }

    return (
        <KeyboardAvoidingView
            style={styles.safeArea}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Welcome back</Text>
                <Text style={styles.loginSubtext}>Continue your reading journey</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <CustomInput
                        placeholder="Enter your email"
                        value={email}
                        setValue={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none" />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <CustomInput
                        placeholder="Enter your password"
                        value={password}
                        setValue={setPassword}
                        secureTextEntry={true} />
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                    <View style={styles.forgotPasswordContainer}>
                        <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="LINK" />
                    </View>
                </View>

                {loading ? (
                    <ActivityIndicator size="large" color="#2E0A09" style={styles.loadingIndicator} />
                ) : (
                    <CustomButton text="Log In" onPress={onLogInPressed} type="PRIMARY" />
                )}

                <View style={styles.bottomSignup}>
                    <Text style={styles.bottomSignupText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={onSignUpPressed}>
                        <Text style={styles.signupLinkText}>Create account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
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
        paddingBottom: 40,
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
    loginSubtext: {
        fontSize: 14,
        fontFamily: 'LibreBaskerville_400Regular',
        color: '#71727A',
        textAlign: 'left',
        marginBottom: 30,
        paddingBottom: 24,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginLeft: 4,
    },

    forgotPasswordContainer: {
        alignItems: 'flex-start',
        width: '100%',
    },


    bottomSignup: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 32,
        paddingBottom: 20,
        justifyContent: 'center',
    },

    bottomSignupText: {
        color: '#71727A',
        fontSize: 14,
        fontFamily: 'System',
    },

    signupLinkText: {
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
})

export default LogInScreen