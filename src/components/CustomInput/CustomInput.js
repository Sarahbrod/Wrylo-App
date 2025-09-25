
import React, { useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, numeric, keyboardType, autoCapitalize }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    return (
        <View style={[styles.container, isFocused && styles.focusedContainer]}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry && !isPasswordVisible}
                keyboardType={keyboardType || (numeric ? 'numeric' : 'default')}
                autoCapitalize={autoCapitalize}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholderTextColor="#8F9098"
                accessible={true}
                accessibilityLabel={placeholder}
                accessibilityHint={secureTextEntry ? 'Password input field' : 'Text input field'}
                textContentType={secureTextEntry ? 'password' : undefined}
                autoComplete={secureTextEntry ? 'password' : undefined}
            />
            {secureTextEntry && (
                <TouchableOpacity 
                    style={styles.eyeIcon}
                    onPress={togglePasswordVisibility}
                    accessible={true}
                    accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
                    accessibilityRole="button"
                >
                    <Ionicons 
                        name={isPasswordVisible ? 'eye-off' : 'eye'} 
                        size={22} 
                        color="#666666" 
                    />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderColor: '#C5C6CC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        minHeight: 64,
    },
    focusedContainer: {
        borderColor: '#2E0A09',
        borderWidth: 1.5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000000',
        fontFamily: 'System',
        lineHeight: 22,
        paddingVertical: 14,
        textAlignVertical: 'center',
        includeFontPadding: false,
    },
    eyeIcon: {
        padding: 10,
        marginLeft: 8,
        minWidth: 40,
        minHeight: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
})
export default CustomInput;