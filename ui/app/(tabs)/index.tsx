import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FridgeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fridge</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e4eaeb',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
}); 