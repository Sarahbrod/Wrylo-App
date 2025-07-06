import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { AntDesign, FontAwesome } from '@expo/vector-icons'

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor, iconName, iconLibrary }) => {
    const renderIcon = () => {
        if (iconName && iconLibrary) {
            const IconComponent = iconLibrary === 'AntDesign' ? AntDesign : FontAwesome
            return <IconComponent name={iconName} size={24} color={fgColor || 'white'} />
        }
        return null
    }

    return (
        <Pressable onPress={onPress}
            style={[
                styles.container,
                styles[`container_${type}`],
                bgColor ? { backgroundColor: bgColor } : {}
            ]}>
            {type === 'ICON' ? (
                renderIcon()
            ) : (
                <Text style={[
                    styles.text,
                    styles[`text_${type}`],
                    fgColor ? { color: fgColor } : {},
                ]}>{text}</Text>
            )}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 8,
    },

    container_PRIMARY: {
        backgroundColor: '#2E0A09',


    },

    container_TERTIARY: {
    },


    container_ICON: {
        width: 56,
        height: 56,
        padding: 16,
        marginRight: 10,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },

    container_LINK: {
        alignItems: 'left',
        padding: 0,
        fontSize: 14,

    },



    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_TERTIARY: {
        color: '#212121',

    },

    text_LINK: {

        color: '#212121',

    },

})

export default CustomButton