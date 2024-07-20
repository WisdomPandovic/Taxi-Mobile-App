import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Account = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleSave = () => {
        // Add save logic here
        console.log('Saved:', { username, email, phoneNumber, gender, address });
    };

    const handleDelete = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        // Add delete logic here
        console.log('Account deleted');
        setShowDeleteModal(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    const handleLogout = () => {
        // Add logout logic here
        console.log('Logged out');
    };

    const handleImageEdit = () => {
        // Add image edit logic here
        console.log('Edit image');
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }} // Replace with user's image URI
                    style={styles.image}
                />
                <TouchableOpacity style={styles.cameraIcon} onPress={handleImageEdit}>
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
                           source={require('../../assets/images/yes&no.jpg' )} // Replace with custom image URI
                            style={styles.modalImage}
                        />
                        <Text style={styles.modalText}>Are you sure you want to delete your account?</Text>
                        <View style={styles.modalButtonContainer}>
                            <View style={{ width: 300, marginBottom: 10, }}>
                                <Button title="Cancel" onPress={handleCancelDelete} color="#b99470" />
                            </View>
                            <View  style={{ width: 300, marginBottom: 10, }}>
                                <Button title="Delete" onPress={handleConfirmDelete} color="red" style={{ width: 300 }}/>
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
        marginBottom:10,
        // width: '100%',
    },
    modalButton: {
        width: '400', // Adjust as needed
        marginVertical: 5,
        
    },
});

export default Account;
