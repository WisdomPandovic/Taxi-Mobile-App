import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import IntlPhoneInput from 'react-native-intl-phone-input'; // Import IntlPhoneInput for international phone input

const StepOne = ({ phoneNumber, onChangePhoneNumber, isStepComplete, onNext }) => {
  const [localPhoneNumber, setLocalPhoneNumber] = useState(phoneNumber || '');

  const handlePhoneNumberChange = (phoneNumber) => {
    setLocalPhoneNumber(phoneNumber);
    if (onChangePhoneNumber) {
      onChangePhoneNumber(phoneNumber);
    }
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 10 }}>
        <Image source={require('@/assets/images/img-1.jpg')} style={{ width: 400, height: 300, marginTop: 20 }} />
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: '#B99470', fontWeight: 'bold', fontSize: 24, textAlign: 'center', marginTop: 60 }}>Enter your phone Number</Text>
          <Text style={{ color: '#6B7769', fontSize: 16, textAlign: 'center', marginTop: 10 }}>We will send verification code to your phone</Text>
        </View>
        <View style={styles.inputContainer}>
          <IntlPhoneInput
            containerStyle={styles.input}
            flagStyle={{ marginRight: 10 }} // Adjust margin or size here if needed
            onChangeText={handlePhoneNumberChange}
            defaultCountry="NG" // Default country code
            placeholder="0000 0000"
            value={localPhoneNumber}
            flagSize={24} // Adjust flag size here
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#B99470', marginVertical: 10, padding: 12, width: 300 }]} // Apply background color here
            disabled={!localPhoneNumber}
            onPress={handleNext}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Send OTP</Text>
          </TouchableOpacity>
        </View>
        {isStepComplete && <Text style={styles.successText}>Phone Number Entered!</Text>}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    marginTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#b99470',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginBottom: 10,
    width: 300,
    backgroundColor: 'white',
    flexDirection: 'row', // To align flag and input horizontally
    alignItems: 'center', // Center vertically
  },
  button: {
    marginBottom: 10,
    backgroundColor: '#B99470',
    borderRadius: 8,
  },
  successText: {
    color: 'green',
    marginTop: 10,
  },
});

export default StepOne;
