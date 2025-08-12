import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Divider = ({ text }) => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            {text && <Text style={styles.text}>{text}</Text>}
            <View style={styles.line} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#C5C6CC',
    },
    text: {
        marginHorizontal: 16,
        fontSize: 14,
        color: '#71727A',
        fontFamily: 'System',
    },
});

export default Divider;