import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = () => {
    return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#D4D6DD',
        margin: 8,
    },
});

export default Divider;
