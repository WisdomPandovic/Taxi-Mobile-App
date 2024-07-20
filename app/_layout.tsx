
// In _layout.jsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Slot } from 'expo-router';

const AppContainer = () => {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
});

export default AppContainer;

