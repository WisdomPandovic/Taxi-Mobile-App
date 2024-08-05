import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from 'react-native-vector-icons';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

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
                    <AntDesign name="arrowleft" size={24} color="black" onPress={onClose} />
                </View>
                <View style={styles.menuItemsContainer}>
                    <Link href="/(tabs)" asChild>
                        <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                            <Ionicons name="home" size={24} color="#8b8b90" style={styles.icon} />
                            <Text style={styles.menuText}>Home</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href="/trips" asChild>
                        <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                            <Ionicons name="car" size={24} color="#8b8b90" style={styles.icon} />
                            <Text style={styles.menuText}>Trips</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href="/account" asChild>
                        <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                            <Ionicons name="person" size={24} color="#8b8b90" style={styles.icon} />
                            <Text style={styles.menuText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href="/(sidemenu)/address" asChild>
                        <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                            <Ionicons name="location" size={24} color="#8b8b90" style={styles.icon} />
                            <Text style={styles.menuText}>Address</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href="/CardRegistration" asChild>
                        <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                            <Ionicons name="card" size={24} color="#8b8b90" style={styles.icon} />
                            <Text style={styles.menuText}>Payment Card</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href="/(sidemenu)/settings" asChild>
                        <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                            <Ionicons name="settings" size={24} color="#8b8b90" style={styles.icon} />
                            <Text style={styles.menuText}>Settings</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href="/(sidemenu)/help" asChild>
                        <TouchableOpacity style={styles.menuItem} onPress={onClose}>
                            <Ionicons name="help-circle" size={24} color="#8b8b90" style={styles.icon} />
                            <Text style={styles.menuText}>Help</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
                <TouchableOpacity style={styles.menuItem} onPress={() => { handleLogout(); onClose(); }}>
                    <Ionicons name="log-out" size={24} color="#8b8b90" style={styles.icon} />
                    <Text style={styles.menuText}>Sign Out</Text>
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
        alignItems: 'flex-start',
        zIndex: 1000,
    },
    menu: {
        backgroundColor: 'whitesmoke',
        width: 250,
        height: '100%',
        padding: 20,
    },
    closeButton: {
        alignItems: 'flex-start',
        marginTop: 20,
        marginBottom: 20,
    },
    closeText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    menuItemsContainer: {
        flex: 1, // Takes up the remaining space
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20, // Optional: horizontal padding for better spacing
    },
    icon: {
        marginRight: 15, // Consistent space between icon and text
    },
    menuText: {
        fontSize: 18,
        flex: 1, // Ensures the text takes available space, if needed
    },
});

export default SideMenu;
