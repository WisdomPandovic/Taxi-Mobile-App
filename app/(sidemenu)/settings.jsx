import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Use your preferred icon library
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios
import API_BASE_URL from '../../config';
import Toast from 'react-native-toast-message';
import { AntDesign } from '@expo/vector-icons';

const settingsOptions = [
  { id: '1', name: 'Notifications', icon: 'bell', action: 'notifications' },
  { id: '2', name: 'Safety', icon: 'shield', action: 'safety' },
  { id: '3', name: 'Security', icon: 'lock', action: 'security' },
  { id: '4', name: 'Privacy Policy', icon: 'file-text', action: 'privacyPolicy' },
];

const specialOptions = [
  { id: '5', name: 'Delete Account', icon: 'trash', action: 'deleteAccount' },
  { id: '6', name: 'Sign Out', icon: 'sign-out', action: 'signOut' },
];

const SettingsPage = () => {
  const navigation = useNavigation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false); // State for notifications modal

  const handleOptionPress = (action) => {
    switch (action) {
      case 'notifications':
        handleNotifications();
        break;
      case 'safety':
        handleSafety();
        break;
      case 'security':
        handleSecurity();
        break;
      case 'privacyPolicy':
        handlePrivacyPolicy();
        break;
      case 'deleteAccount':
        handleDelete();
        break;
      case 'signOut':
        handleSignOut();
        break;
      default:
        console.log('Unknown action');
    }
  };

  const handleNotifications = () => {
    console.log('Opening Notifications modal');
    setShowNotificationsModal(true);
    Toast.show({
      type: 'info',
      position: 'top',
      text1: 'Notification Settings',
      text2: 'You can manage your notification preferences here.',
    });
  };

  const handleSafety = () => {
    console.log('Safety settings');
    navigation.navigate('(sidemenu)/safety');
  };

  const handleSecurity = () => {
    console.log('Security settings');
    navigation.navigate('(sidemenu)/SecuritySettingsPage');
  };

  const handlePrivacyPolicy = () => {
    console.log('Privacy Policy');
    navigation.navigate('privacy');
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      const userId = await AsyncStorage.getItem('userId'); // Ensure you have userId stored in AsyncStorage

      if (!token || !userId) {
        console.error('User not authenticated or ID not found');
        return;
      }

      const response = await axios.delete(`${API_BASE_URL}/api/delete-account/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Account deleted successfully!',
        });
        console.log('Account deleted successfully');
        // Optionally, clear AsyncStorage and navigate to login or welcome screen
        await AsyncStorage.clear();
        navigation.navigate('(auth)/signin');
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: `Failed to delete account: ${response.data.msg}`,
        });
        console.error('Failed to delete account:', response.data.msg);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Error occurred while deleting account.',
      });
      console.error('Error occurred while deleting account:', error);
    }

    setShowDeleteModal(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleSignOut = async () => {
    try {
      // Clear user session data (e.g., tokens, user info)
      await AsyncStorage.removeItem('jwtToken');

      // Navigate to the login screen
      navigation.navigate('(auth)/signin');
    } catch (error) {
      console.error('Logout error:', error);
      // Optionally, display an error message
    }
  };

  const handleCloseNotificationsModal = () => {
    setShowNotificationsModal(false);
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity
      style={styles.option}
      onPress={() => handleOptionPress(item.action)}
    >
      <Icon name={item.icon} size={24} color="#000" style={styles.icon} />
      <Text style={styles.optionText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.goBack()} />
      </View>
      <Text style={styles.title}>Settings</Text>
      <FlatList
        data={settingsOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderOption}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.specialOptionsContainer}>
        <FlatList
          data={specialOptions}
          keyExtractor={(item) => item.id}
          renderItem={renderOption}
          contentContainerStyle={styles.specialListContainer}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={handleCancelDelete}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require('../../assets/images/yes&no.jpg')} // Replace with custom image URI
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
            <View style={styles.modalButtonContainer}>
              <View style={styles.modalButton}>
                <Button title="Cancel" onPress={handleCancelDelete} color="#b99470" />
              </View>
              <View style={styles.modalButton}>
                <Button title="Delete" onPress={handleConfirmDelete} color="red" />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showNotificationsModal}
        onRequestClose={handleCloseNotificationsModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notification Settings</Text>
            <Text style={styles.modalText}>Here you can adjust your notification preferences.</Text>
            {/* Add any specific options or controls for notifications here */}
            <View style={styles.modalButtonContainer}>
              <View style={styles.modalButton}>
                <Button title="Close" onPress={handleCloseNotificationsModal} color="#b99470" />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    // Remove border-bottom to eliminate horizontal line
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 18,
  },
  listContainer: {
    flexGrow: 1,
  },
  specialOptionsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 10,
  },
  specialListContainer: {
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  modalButtonContainer: {
    width: '100%',
  },
  modalButton: {
    marginBottom: 10,
  },
});

export default SettingsPage;
