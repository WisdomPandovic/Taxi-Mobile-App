import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from 'react-native-vector-icons';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SideMenu = ({ isVisible, onClose }) => {

    const navigation = useNavigation();

    const handleLogout = async () => {
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

    if (!isVisible) return null;

    return (
        <View style={styles.overlay}>
            <View style={styles.menu}>
                <View style={styles.closeButton}>
                    <Text onPress={onClose} style={styles.closeText}>X</Text>
                </View>
                <Link href="/home" asChild>
                    <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                        <Ionicons name="home" size={24} color="black" style={styles.icon} />
                        <Text style={styles.menuText}>Home</Text>
                    </TouchableOpacity>
                </Link>
                <Link href="/trips" asChild>
                    <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                        <MaterialIcons name="trip-origin" size={24} color="black" style={styles.icon} />
                        <Text style={styles.menuText}>My Trips</Text>
                    </TouchableOpacity>
                </Link>
                <Link href="/profile" asChild>
                    <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                        <FontAwesome name="user" size={24} color="black" style={styles.icon} />
                        <Text style={styles.menuText}>Profile</Text>
                    </TouchableOpacity>
                </Link>
                <Link href="/CardRegistration" asChild>
                    <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                        <Ionicons name="card" size={24} color="black" style={styles.icon} />
                        <Text style={styles.menuText}>Payment Card</Text>
                    </TouchableOpacity>
                </Link>
                <Link href="/settings" asChild>
                    <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                        <Ionicons name="settings" size={24} color="black" style={styles.icon} />
                        <Text style={styles.menuText}>Settings</Text>
                    </TouchableOpacity>
                </Link>
                <Link href="/help" asChild>
                    <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                        <Ionicons name="help-circle" size={24} color="black" style={styles.icon} />
                        <Text style={styles.menuText}>Help</Text>
                    </TouchableOpacity>
                </Link>
                    <TouchableOpacity style={styles.menuItem} onPress={() => { handleLogout(); onClose(); }}>
                        <FontAwesome name="sign-out" size={24} color="black" style={styles.icon} />
                        <Text style={styles.menuText}>Logout</Text>
                    </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    menu: {
        backgroundColor: 'whitesmoke',
        width: 250,
        height: '100%',
        padding: 20,
    },
    closeButton: {
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    closeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
    },
    menuText: {
        fontSize: 18,
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
});

export default SideMenu;
