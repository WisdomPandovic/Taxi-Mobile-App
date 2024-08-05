import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import API_BASE_URL from '../../config';
import Toast from 'react-native-toast-message';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [type, setType] = useState('Home');
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentAddressId, setCurrentAddressId] = useState(null);
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState(''); // State to store the user-friendly message

  useEffect(() => {
    const getTokenAndFetchAddresses = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (token) {
          const decodedToken = jwtDecode(token);
          const userIdFromToken = decodedToken.userId; // Adjust based on your token's structure
          setUserId(userIdFromToken);
          fetchAddresses(userIdFromToken);
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    getTokenAndFetchAddresses();
  }, []);

  const fetchAddresses = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/address/user/${userId}`);
      console.log('Fetched addresses:', response.data);

      if (response.data.length > 0) {
        const firstAddress = response.data[0];
        setUsername(firstAddress.user.username);
      }

      setAddresses(response.data);
      setMessage(''); // Clear any previous messages
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage('You have not created any addresses yet.');
      } else {
        console.error('Error fetching addresses:', error);
        setMessage('Something went wrong. Please try again later.');
      }
    }
  };

  const handleSubmit = async () => {
    try {
      if (!userId) {
        console.error('User ID is required.');
        return;
      }

      if (isUpdating) {
        await axios.put(`${API_BASE_URL}/api/address/${currentAddressId}`, { user: userId, address, type });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Address Updated',
          text2: 'The address has been updated successfully.',
        });
      } else {
        await axios.post(`${API_BASE_URL}/api/address`, { user: userId, address, type });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Address Created',
          text2: 'The address has been added successfully.',
        });
      }

      setAddress('');
      setType('Home');
      setIsUpdating(false);
      setCurrentAddressId(null);

      fetchAddresses(userId);
    } catch (error) {
      console.error('Error submitting address:', error);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Something went wrong. Please try again later.',
      });
    }
  };

  const handleEdit = (addressItem) => {
    setAddress(addressItem.address);
    setType(addressItem.type);
    setIsUpdating(true);
    setCurrentAddressId(addressItem._id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Addresses</Text>
      {userId ? ( // Conditional rendering
        <View style={[styles.inputWrapper, { display: 'none' }]}>
          <Icon name="user" size={20} color="#888" style={styles.icon} />
          <TextInput
            style={[styles.input, styles.userIdInput]}
            value={userId}
            editable={false}
          />
        </View>
      ) : null}
      <View style={styles.inputWrapper}>
        <Icon name="home" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={[styles.input, styles.addressInput]}
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Icon name="tag" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={[styles.input, styles.typeInput]}
          value={type}
          onChangeText={setType}
          placeholder="Type (Home, Work, Other)"
        />
      </View>
      <TouchableOpacity
        style={isUpdating ? styles.updateButton : styles.createButton}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>{isUpdating ? 'Update Address' : 'Create Address'}</Text>
      </TouchableOpacity>
      {message ? (
        <Text style={styles.message}>{message}</Text>
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.addressItem}>
              <Text style={styles.addressText}>{item.address}</Text>
              <Text style={styles.addressType}>{item.type}</Text>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  userIdInput: {
    flex: 2,
  },
  addressInput: {
    flex: 3,
  },
  typeInput: {
    flex: 1,
  },
  createButton: {
    backgroundColor: '#B99470',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addressItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addressText: {
    fontSize: 16,
  },
  addressType: {
    fontSize: 14,
    color: '#888',
  },
  editButton: {
    color: '#007bff',
    marginTop: 5,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginTop: 20,
  },
});

export default AddressPage;
