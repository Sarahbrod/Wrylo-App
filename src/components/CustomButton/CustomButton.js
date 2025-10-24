import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const CustomButton = ({ onPress, text, type, bgColor, fgColor, iconName, iconLibrary }) => {
    return (
        <Pressable 
            onPress={onPress} 
            style={[
                styles.container, 
                styles[`container_${type}`],
                bgColor ? {backgroundColor: bgColor} : {}
            ]}
        >
            {iconName && (
                <AntDesign 
                    name={iconName} 
                    size={24} 
                    color={fgColor || '#FCF7F7'} 
                    style={styles.icon}
                />
            )}
            {text && (
                <Text 
                    style={[
                        styles.text, 
                        styles[`text_${type}`],
                        fgColor ? {color: fgColor} : {}
                    ]}
                >
                    {text}
                </Text>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    container_PRIMARY: {
        backgroundColor: '#2E0A09',
    },

    container_SECONDARY: {
        borderColor: '#2E0A09',
        borderWidth: 2,
    },

    container_TERTIARY: {
        backgroundColor: 'transparent',
    },

    container_LINK: {
        backgroundColor: 'transparent',
        padding: 5,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },

    container_ICON: {
        width: 60,
        height: 60,
        borderRadius: 30,
        padding: 0,
    },

    text: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    text_PRIMARY: {
        color: 'white',
    },

    text_SECONDARY: {
        color: '#2E0A09',
    },

    text_TERTIARY: {
        color: '#2E0A09',
    },

    text_LINK: {
        color: '#2E0A09',
        fontSize: 14,
        textDecorationLine: 'underline',
    },

    icon: {
        marginRight: 8,
    },
});

export default CustomButton;