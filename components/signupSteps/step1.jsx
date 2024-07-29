import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import API_BASE_URL from '../../config'; 
import Toast from 'react-native-toast-message';

const StepOne = ({ email, onChangeEmail, isStepComplete, onNext }) => {
  const [localEmail, setLocalEmail] = useState(email || '');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [request, response, promptAsync] = useIdTokenAuthRequest({
    clientId: Platform.select({
      ios: 'YOUR_IOS_CLIENT_ID',
      android: 'YOUR_ANDROID_CLIENT_ID',
    }),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('Google Authentication Successful', id_token);
    }
  }, [response]);

  const handleEmailChange = (text) => {
    setLocalEmail(text);
    onChangeEmail(text);
  };

  const handleNext = async () => {
    setLoading(true);
    setErrorMessage('');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(localEmail)) {
      setErrorMessage('Email is invalid.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localEmail,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('OTP sent successfully');
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'OTP sent successfully',
        });
        onNext();
      } else {
        setErrorMessage(result.error || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrorMessage('An error occurred while sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.imageContainer}>
          <Image source={require('@/assets/images/img-1.jpg')} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>ENTER YOUR EMAIL</Text>
          <Text style={styles.subtitle}>We will send a verification code to your email</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="example@example.com"
            keyboardType="email-address"
            value={localEmail}
            onChangeText={handleEmailChange}
          />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#B99470', marginVertical: 10, padding: 12, width: 300 }]}
            disabled={!localEmail || loading}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>{loading ? 'Sending OTP...' : 'Send OTP'}</Text>
          </TouchableOpacity>
          {isStepComplete && <Text style={styles.successText}>Email Entered!</Text>}
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </View>
        <Text style={styles.continueText}>Or Continue with</Text>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <Image source={require('../../assets/images/google.png')} style={styles.googleLogo} />
          <Text style={styles.googleButtonText}>Google</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 400,
    height: 300,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 60,
    textTransform: 'uppercase',
  },
  subtitle: {
    color: '#6B7769',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    marginTop: 40,
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    fontSize: 16,
    padding: 10,
  },
  button: {
    backgroundColor: '#6B7769',
    padding: 15,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueText: {
    color: '#6B7769',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  successText: {
    color: 'green',
    marginTop: 10,
  },
});

export default StepOne;
