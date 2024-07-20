// Home.js
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from '../../components/mapComponent/MapScreen';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([
        'Location 1',
        'Location 2',
        'Location 3',
        // Add more mock search history items
    ]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        // Add search logic here
    };

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapScreen />
            </View>
            <View style={styles.containerFluid}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Find Your Ride</Text>
                </View>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#b99470" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search Location"
                        placeholderTextColor="#ccc"
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>
                <View style={styles.historyContainer}>
                    <FlatList
                        data={searchHistory}
                        renderItem={({ item }) => <Text style={styles.historyItem}>{item}</Text>}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
    },
    mapContainer: {
        flex: 1,
        width: '100%',
    },
    containerFluid: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 40, // Rounded top left corner
        borderTopRightRadius: 40, // Rounded top right corner
        marginTop: -20, // Adjust as needed to overlap the map
        padding: 20,
        zIndex: 1, // Ensure it stays above the map
    },
    header: {
        marginBottom: 20,
        alignItems: 'end',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 20, // Rounded corners
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        color: '#000',
    },
    historyContainer: {
        marginBottom: 20,
    },
    historyTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
    historyItem: {
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});

export default Home;
