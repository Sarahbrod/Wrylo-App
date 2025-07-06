import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Divider from '../components/Divider';
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [fontsLoaded] = useFonts({
        LibreBaskerville_400Regular,
        LibreBaskerville_700Bold,
    });

    const onSignUpPressed = () => {
        if (password !== confirmPassword) {
            console.warn('Passwords do not match');
            return;
        }
        navigation.navigate('Main');
    };

    const onLogInPressed = () => {
        navigation.navigate('LogIn');
    };

    const onSignUpGoogle = () => {
        console.warn('Google signup');
    };

    const onSignUpFacebook = () => {
        console.warn('Facebook signup');
    };

    const onSignUpApple = () => {
        console.warn('Apple signup');
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Start your reading journey with Wrylo</Text>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <CustomInput
                        placeholder="Enter your username"
                        value={username}
                        setValue={setUsername}
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <CustomInput
                        placeholder="Enter your email"
                        value={email}
                        setValue={setEmail}
                        keyboardType="email-address"
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <CustomInput
                        placeholder="Enter your password"
                        value={password}
                        setValue={setPassword}
                        secureTextEntry={true}
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Confirm Password</Text>
                    <CustomInput
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        secureTextEntry={true}
                    />
                </View>

                <CustomButton text="Sign Up" onPress={onSignUpPressed} />
                
                <View style={styles.dividerSpacing}>
                    <Divider />
                </View>
                <Text style={styles.orContinueText}>Or continue with</Text>
                
                <View style={styles.alt}>
                    <CustomButton onPress={onSignUpGoogle} bgColor='#212121' fgColor="#FCF7F7" type="ICON" iconName="google" iconLibrary="AntDesign" />
                    <CustomButton onPress={onSignUpFacebook} bgColor='#212121' fgColor="#FCF7F7" type="ICON" iconName="facebook-square" iconLibrary="FontAwesome" />
                    <CustomButton onPress={onSignUpApple} bgColor='#212121' fgColor="#FCF7F7" type="ICON" iconName="apple1" iconLibrary="AntDesign" />
                </View>
                
                <View style={styles.bottomLogin}>
                    <Text style={styles.bottomLoginText}>Already have an account? </Text>
                    <TouchableOpacity onPress={onLogInPressed}>
                        <Text style={styles.loginLinkText}>Log in here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        paddingHorizontal: 24,
        paddingTop: 80,
        paddingBottom: 40,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontFamily: 'LibreBaskerville_700Bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'LibreBaskerville_400Regular',
        color: '#71727A',
        marginBottom: 16,
        paddingBottom: 8,
        textAlign: 'left',
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
    dividerSpacing: {
        paddingTop: 16,
        paddingBottom: 6,
    },

    orContinueText: {
        paddingTop: 6,
        color: '#4A4A4A',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'LibreBaskerville_400Regular',
    },
    
    alt: {
        paddingTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '80%',
        alignSelf: 'center',
    },

    bottomLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 16,
        justifyContent: 'center',
    },

    bottomLoginText: {
        color: '#71727A',
        fontSize: 16,
        fontFamily: 'LibreBaskerville_400Regular',
    },

    loginLinkText: {
        color: '#2E0A09',
        fontSize: 16,
        fontFamily: 'LibreBaskerville_700Bold',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export default SignUpScreen;