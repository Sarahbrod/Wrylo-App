
import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const CustomerInput = ({ value, setValue, placeholder, secureTextEntry, numeric }) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                keyboardType={numeric}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderColor: '#C5C6CC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 5,
        padding: 16,
        color: '#8F9098'
    },
    input: {

    },
})
export default CustomerInput;