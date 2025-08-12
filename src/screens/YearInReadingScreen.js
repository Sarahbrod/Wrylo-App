import { View, Text, StyleSheet } from 'react-native';

const YearInReadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Year in Reading</Text>
      <Text style={styles.subtitle}>Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default YearInReadingScreen;