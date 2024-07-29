import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import API_BASE_URL from '../../config'; 

const StepThree = ({ email, password, onChangePassword, confirmPassword, onChangeConfirmPassword, onSave, onPrevious, isStepComplete, navigation }) => {
  const [localPassword, setLocalPassword] = useState(password || '');
  const [localConfirmPassword, setLocalConfirmPassword] = useState(confirmPassword || '');
  const [loading, setLoading] = useState(false);

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

  const handleRegister = async () => {
    if (localPassword !== localConfirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/set-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, 
          newPassword: localPassword,
          confirmPassword: localConfirmPassword }),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        Alert.alert('Success', 'Password saved successfully');
        if (onSave) {
          onSave();
        }
        navigation.navigate('signin');
      } else {
        Alert.alert('Error', result.error || 'Failed to save password');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to save password');
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
          // disabled={loading || !isStepComplete}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>{loading ? 'Saving...' : 'Save'}</Text>
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
