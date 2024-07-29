import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import CardRegistration from '././app/(auth)/CardRegistration.jsx'; // Adjust the import path as needed

const App = () => {
  return (
    <StripeProvider
      publishableKey="your-publishable-key"  // Replace with your actual Stripe publishable key
    >
      <View style={styles.container}>
        <CardRegistration />
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
