import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const StepThree = ({ password, onChangePassword, confirmPassword, onChangeConfirmPassword, onRegister, onSave, onPrevious, isStepComplete }) => {
  const [localPassword, setLocalPassword] = useState(password || '');
  const [localConfirmPassword, setLocalConfirmPassword] = useState(confirmPassword || '');

  const handlePasswordChange = (text) => {
    setLocalPassword(text);
    if (onChangePassword) {
      onChangePassword(text);
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setLocalConfirmPassword(text);
    if (onChangeConfirmPassword) {
      onChangeConfirmPassword(text);
    }
  };

  const handleRegister = () => {
    if (isStepComplete) {
      // Proceed to the next step
      if (onSave) {
        onSave();
      }
    } else {
      // Handle incomplete verification code scenario (optional)
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  return (
    <View>
      <View style={{ marginTop: 9, marginBottom: 3 }}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={handlePrevious}/>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Image source={require('@/assets/images/taxi.jpg')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>New Password</Text>
        <Text style={{ color: '#6B7769', fontSize: 16, textAlign: 'center', marginTop: 3 }}>Set your new password</Text>

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={handlePasswordChange}
          value={localPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={handleConfirmPasswordChange}
          value={localConfirmPassword}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#B99470' }]}
          disabled={!isStepComplete}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        {isStepComplete && <Text style={styles.successText}>Registration Complete!</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 1,
    textTransform: 'uppercase',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 10,
    width: '100%',
    fontSize: 12,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 40,
    width: 300,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successText: {
    color: 'green',
    marginTop: 10,
  },
});

export default StepThree;
