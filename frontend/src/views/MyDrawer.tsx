import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyDrawer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Benvenuto nella mia pagina</Text>
      <View style={styles.content}>
        <Text>Questo è il contenuto della pagina</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
});

export default MyDrawer;
