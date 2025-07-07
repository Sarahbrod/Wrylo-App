
import React, { useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const CustomInput = ({ value, setValue, placeholder, secureTextEntry, numeric, keyboardType }) => {
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
                keyboardType={keyboardType || numeric}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholderTextColor="#8F9098"
            />
            {secureTextEntry && (
                <TouchableOpacity 
                    style={styles.eyeIcon}
                    onPress={togglePasswordVisibility}
                >
                    <Ionicons 
                        name={isPasswordVisible ? 'eye-off' : 'eye'} 
                        size={20} 
                        color="#8F9098" 
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
        marginVertical: 5,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    focusedContainer: {
        borderColor: '#2E0A09',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    eyeIcon: {
        padding: 4,
    },
})
export default CustomInput;