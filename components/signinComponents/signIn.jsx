import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, Modal } from 'react-native';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { Link } from 'expo-router';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../config'; 

const CustomTextInput = ({ label, value, onChangeText, placeholder, keyboardType, secureTextEntry, autoCapitalize }) => (
  <View style={styles.fieldset}>
    <Text style={styles.legend}>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
    />
  </View>
);

const SignIn = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [request, response, promptAsync] = useIdTokenAuthRequest({
    clientId: Platform.select({
      ios: 'YOUR_IOS_CLIENT_ID',  // Replace with your iOS client ID
      android: 'YOUR_ANDROID_CLIENT_ID',  // Replace with your Android client ID
      // web: 'YOUR_WEB_CLIENT_ID',  // Uncomment and replace if using web
    }),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      // Handle successful authentication here
      console.log('Google Authentication Successful', id_token);
      setShowSuccessModal(true);
    }
  }, [response]);

  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        username: username,
        password: password,
      });

      if (response.status === 200 && response.data.success) {
        // Store the JWT token in AsyncStorage
        await AsyncStorage.setItem('jwtToken', response.data.token);

        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Sign In Successful',
          text2: 'Welcome back!',
        });
        setShowSuccessModal(true);
      } else if (response.status === 404) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Sign In Failed',
          text2: 'Invalid username or password.',
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Sign In Failed',
          text2: 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Sign In Failed',
          text2: 'Invalid username or password.',
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'An Error Occurred',
          text2: 'Please try again later.',
        });
      }
      console.error(error);
    }
  };


  const handleForgotPassword = () => {
    navigation.navigate('/(auth)/forgotPassword');
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    // navigation.navigate('/home');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.topContainer}>
        <Image source={require('../../assets/images/taxi.jpg')} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign In</Text>
        <CustomTextInput
          label="Username"
          placeholder="Enter Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <CustomTextInput
          label="Password"
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {/* {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null} */}
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Link href="/(auth)/forgotPassword">
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Link>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.googleButton]}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <Image source={require('../../assets/images/google.png')} style={styles.googleLogo} />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <Link href="/privacy">
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
            Privacy Policy
          </Text>
        </Link>
      </View>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('../../assets/images/congrat.jpg')} style={styles.successImage} />
            <Text style={styles.successTextTitle}>Congratulations!</Text>
            <Text style={styles.successText}>Your account is ready to use.</Text>
            <Text style={styles.successText}>Click the button below to go to the home page</Text>
            <Link href="/(tabs)" asChild>
              <TouchableOpacity style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Go to Home</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </Modal>
      <Toast  />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  logo: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fieldset: {
    width: '100%',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#b99470',
    borderRadius: 8,
    position: 'relative',
  },
  legend: {
    position: 'absolute',
    top: -12,
    left: 10,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 5,
    fontSize: 14,
    color: '#b99470',
  },
  input: {
    borderWidth: 0,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 10,
    width: '100%',
    fontSize: 18,
    backgroundColor: 'white',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#B99470',
    width: '100%',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 10,
  },
  forgotPasswordText: {
    color: '#b99470',
    fontSize: 16,
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: '#4285F4',  // Google blue color
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 40,
  },
  googleButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  successImage: {
    width: 400,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  successTextTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 0,
  },
  successText: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 0,
  },
  modalButton: {
    backgroundColor: '#B99470',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 20,
    width: 300,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
});

export default SignIn;
