import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import CustomInput from '../../src/components/CustomInput';
import CustomButton from '../components/CustomButton';
import Divider from '../components/Divider';
import { useFonts, LibreBaskerville_400Regular, LibreBaskerville_700Bold } from '@expo-google-fonts/libre-baskerville';


const LogInScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [fontsLoaded] = useFonts({
        LibreBaskerville_400Regular,
        LibreBaskerville_700Bold,
    });



    const onLogInPressed = () => {
        navigation.navigate('Main');
    }
    const onForgotPasswordPressed = () => {
        console.warn('onForgotPasswordPressed');
    }

    const onLogInGoogle = () => {
        console.warn('google')
    }
    const onLogInFacebook = () => {
        console.warn('facebook')
    }
    const onLogInApple = () => {
        console.warn('apple')
    }
    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
    }



    if (!fontsLoaded) {
        return null;
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Welcome back</Text>
                <Text style={styles.loginSubtext}>Sign in to continue your reading journey</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <CustomInput
                        placeholder="Enter your username"
                        value={username}
                        setValue={setUsername} />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <CustomInput
                        placeholder="Enter your password"
                        value={password}
                        setValue={setPassword}
                        secureTextEntry={true} />
                    <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="LINK" />
                </View>
                <CustomButton text="Log In" onPress={onLogInPressed} />
                <View style={styles.dividerSpacing}>
                    <Divider />
                </View>
                <Text style={styles.orContinueText}>Or continue with</Text>
                <View style={styles.alt}>
                    <CustomButton onPress={onLogInGoogle} bgColor='#212121' fgColor="#FCF7F7" type="ICON" iconName="google" iconLibrary="AntDesign" />
                    <CustomButton onPress={onLogInFacebook} bgColor='#212121' fgColor="#FCF7F7" type="ICON" iconName="facebook-square" iconLibrary="FontAwesome" />
                    <CustomButton onPress={onLogInApple} bgColor='#212121' fgColor="#FCF7F7" type="ICON" iconName="apple1" iconLibrary="AntDesign" />

                </View>
                
                <View style={styles.bottomSignup}>
                    <Text style={styles.bottomSignupText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={onSignUpPressed}>
                        <Text style={styles.signupLinkText}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView >
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        paddingHorizontal: 24,
        paddingTop: 120,
        paddingBottom: 120,
        //minHeight: Dimensions.get('window').height,
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 700,
        fontFamily: 'LibreBaskerville_700Bold',
        color: '#333',
        textAlign: 'left',
        marginBottom: 8,
    },
    loginSubtext: {
        fontSize: 16,
        fontFamily: 'LibreBaskerville_400Regular',
        color: '#71727A',
        textAlign: 'left',
        marginBottom: 16,
        paddingBottom: 8,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 18,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        marginLeft: 4,
    },

    dividerSpacing: {
        paddingTop: 20,
        paddingBottom: 8,
    },

    orContinueText: {
        paddingTop: 8,
        color: '#4A4A4A',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'LibreBaskerville_400Regular',
    },

    alt: {
        paddingTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '80%',
        alignSelf: 'center',
    },

    bottomSignup: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 20,
        justifyContent: 'center',
    },

    bottomSignupText: {
        color: '#71727A',
        fontSize: 16,
        fontFamily: 'LibreBaskerville_400Regular',
    },

    signupLinkText: {
        color: '#2E0A09',
        fontSize: 16,
        fontFamily: 'LibreBaskerville_700Bold',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
})

export default LogInScreen