import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import API_BASE_URL from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

const SecuritySettingsPage = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const getEmailFromToken = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        return decodedToken.email; // Ensure this is a string
      }
      return null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const handleChangePassword = async () => {
    if (oldPassword === '' || newPassword === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please fill out all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirmation do not match');
      return;
    }
    
    const emailFromToken = await getEmailFromToken();
    if (!emailFromToken) {
      Alert.alert('Error', 'Email is missing');
      return;
    }
  
    const requestPayload = {
      email: emailFromToken,
      oldPassword,
      newPassword,
      confirmPassword
    };
  
    console.log('Request Payload:', requestPayload); // Log the request payload
  
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/set-new-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload),
      });
  
      const result = await response.json();
      console.log('Response Result:', result); // Log the response result
      setLoading(false);
  
      if (response.ok) {
        Alert.alert('Success', 'Password updated successfully');
        navigation.navigate('(auth)/signin');
      } else {
        Alert.alert('Error', result.error || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error:', error); // Log any errors
      setLoading(false);
      Alert.alert('Error', 'Failed to update password');
    }
  };
  

  const handleToggleTwoFactor = async () => {
    try {
      const newTwoFactorStatus = !twoFactorEnabled;
      const token = await AsyncStorage.getItem('jwtToken'); // Get the token from storage
  
      const response = await fetch(`${API_BASE_URL}/api/2fa-settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include Authorization header
        },
        body: JSON.stringify({ enable2FA: newTwoFactorStatus }),
      });
  
      const responseText = await response.text(); // Get raw response text for debugging
  
      console.log('Response Status:', response.status); // Log response status
      console.log('Response Text:', responseText); // Log response text
  
      // Check if response is JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error('Failed to parse response JSON:', e);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: '2FA Update Failed',
          text2: 'The server response was not in valid JSON format.',
        });
        return;
      }
  
      if (response.ok) {
        setTwoFactorEnabled(newTwoFactorStatus);
        Toast.show({
          type: 'info',
          position: 'top',
          text1: 'Two-Factor Authentication',
          text2: `Two-Factor Authentication is now ${newTwoFactorStatus ? 'enabled' : 'disabled'}.`,
        });
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: '2FA Update Failed',
          text2: result.msg || 'An error occurred while updating your 2FA settings.',
        });
      }
    } catch (error) {
      console.error('Error toggling 2FA:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: '2FA Update Failed',
        text2: 'An error occurred while updating your 2FA settings.',
      });
    }
  };
  
  
  

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Icon name="arrow-left" size={24} color="black" onPress={() => navigation.goBack()} />
      </View> */}
      <View style={{ marginTop: 9, marginBottom: 20 }}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.goBack()} />
      </View>
      <Text style={styles.title}>Security Settings</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Change Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        
        <TouchableOpacity
        style={styles.button}
        onPress={handleChangePassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Two-Factor Authentication</Text>
        <View style={styles.switchContainer}>
          <Text>Enable Two-Factor Authentication</Text>
          <Switch
            onValueChange={handleToggleTwoFactor}
            value={twoFactorEnabled}
          />
        </View>
      </View>
      <Toast  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6B7769',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#B99470', // Set your desired background color here
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff', // Text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SecuritySettingsPage;
