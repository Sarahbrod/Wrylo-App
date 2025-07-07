import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, LibreBaskerville_400Regular } from '@expo-google-fonts/libre-baskerville';

const Divider = ({ text }) => {
    const [fontsLoaded] = useFonts({
        LibreBaskerville_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    if (text) {
        return (
            <View style={styles.dividerWithText}>
                <View style={styles.line} />
                <Text style={styles.text}>{text}</Text>
                <View style={styles.line} />
            </View>
        );
    }

    return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#D4D6DD',
        margin: 8,
    },
    dividerWithText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#D4D6DD',
    },
    text: {
        marginHorizontal: 16,
        fontSize: 14,
        color: '#4A4A4A',
        fontFamily: 'LibreBaskerville_400Regular',
    },
});

export default Divider;
