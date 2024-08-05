import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from '../../config'; 
import SideMenu from '../../components/SideMenuComponent/SideMenu'; 
import Toast from 'react-native-toast-message';

const Account = () => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    // Fetch user data when the component mounts
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('jwtToken');
                if (token) {
                    const response = await axios.get(`${API_BASE_URL}/api/profile`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log(response.data)
                    const userData = response.data;

                    // Store userId
                    await AsyncStorage.setItem('userId', userData._id);

                    setProfileImage(userData.profileImage || '');
                    setUsername(userData.username || '');
                    setEmail(userData.email || '');
                    setPhoneNumber(userData.phoneNumber || '');
                    setGender(userData.gender || '');
                    setAddress(userData.city || '');
                }
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem('jwtToken');
            const userId = await AsyncStorage.getItem('userId'); // Retrieve user ID from storage

            console.log('Retrieved User ID:', userId);

            if (!userId) {
                console.error('User ID not found');
                return;
            }

            const formData = new FormData();

            formData.append('username', username);
            formData.append('email', email);
            formData.append('phoneNumber', phoneNumber);
            formData.append('gender', gender);
            formData.append('address', address);

            // if (selectedImage) {
            //     formData.append('profileImage', {
            //         uri: selectedImage.uri,
            //         type: selectedImage.type,
            //         name: selectedImage.uri.split('/').pop(),
            //     });
            // }

            const response = await axios.put(`${API_BASE_URL}/api/edit-account/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Success',
                    text2: 'Account updated successfully!',
                });
                console.log('Account updated successfully:', response.data.user);
                // Optionally update the UI or show a success message
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Error',
                    text2: `Failed to update account: ${response.data.msg}`,
                });
                console.error('Failed to update account:', response.data.msg);
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: 'Error while updating account.',
            });
            console.error('Error while updating account:', error);
        }
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
          
            const response = await axios.delete(`  ${API_BASE_URL}/api/delete-account/${userId}`, {
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

    const handleLogout = () => {
        // Add logout logic here
        console.log('Logged out');
    };

    // const handleImageEdit = async () => {
    //     // Request permissions and pick an image
    //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (status === 'granted') {
    //         const result = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //             allowsEditing: true,
    //             aspect: [4, 3],
    //             quality: 1,
    //         });

    //         if (!result.canceled) {
    //             setSelectedImage(result.assets[0]);
    //             setProfileImage(result.assets[0].uri);
    //         }
    //     } else {
    //         console.error('Permission to access media library was denied');
    //     }
    // };

    return (
        <View style={styles.container}>
             <TouchableOpacity
                    style={styles.hamburgerButton}
                    onPress={() => setIsMenuVisible(true)}
                >
                    <Ionicons name="menu" size={30} color="black" />
                </TouchableOpacity>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: profileImage || '@/assets/images/onboarding-img (2).jpg' }}
                    style={styles.image}
                />
                <TouchableOpacity style={styles.cameraIcon} >
                    <Ionicons name="camera" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <TextInput
                style={[styles.input, { borderColor: '#b99470' }]}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={[styles.input, { borderColor: '#b99470' }]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                editable={false}
            />
            <TextInput
                style={[styles.input, { borderColor: '#b99470' }]}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <TextInput
                style={[styles.input, { borderColor: '#b99470' }]}
                placeholder="Gender"
                value={gender}
                onChangeText={setGender}
            />
            <TextInput
                style={[styles.input, { borderColor: '#b99470' }]}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
            />

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title="Save" onPress={handleSave} color="#b99470" />
                </View>
                <View style={styles.button}>
                    <Button title="Delete Account" onPress={handleDelete} color="red" />
                </View>
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
                            <View style={{ width: 300, marginBottom: 10, }}>
                                <Button title="Cancel" onPress={handleCancelDelete} color="#b99470" />
                            </View>
                            <View style={{ width: 300, marginBottom: 10, }}>
                                <Button title="Delete" onPress={handleConfirmDelete} color="red" />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <SideMenu isVisible={isMenuVisible} onClose={() => setIsMenuVisible(false)} />
            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#b99470',
        borderRadius: 20,
        padding: 5,
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        width: '48%', // Adjust as needed
        height: 40, // Adjust as needed
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        minWidth: 300,
    },
    modalImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    modalText: {
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    hamburgerButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 30,
        elevation: 5, // Adds shadow to the button
    },
});

export default Account;

