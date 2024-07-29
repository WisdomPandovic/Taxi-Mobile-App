// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, TextInput, FlatList, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import MapScreen from '../../components/mapComponent/MapScreen';
// import { fetchPlaceCoordinates } from '../../utils/locationUtils'; // Make sure this function is defined correctly

// const Home = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchHistory, setSearchHistory] = useState([]); // Start with an empty history
//     const [filteredHistory, setFilteredHistory] = useState([]);
//     const [searchResults, setSearchResults] = useState([]);
//     const [pickupCoordinates, setPickupCoordinates] = useState(null);

//     useEffect(() => {
//         if (searchQuery) {
//             const results = searchHistory.filter(item =>
//                 item.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setFilteredHistory(results);
//             fetchCoordinatesForQuery(searchQuery);
//         } else {
//             setFilteredHistory([]);
//             setSearchResults([]);
//             setPickupCoordinates(null);
//         }
//     }, [searchQuery]);

//     const fetchCoordinatesForQuery = async (query) => {
//         // Only try to fetch coordinates if the query is not empty
//         if (query.trim() === '') {
//             setSearchResults([]);
//             setPickupCoordinates(null);
//             return;
//         }

//         try {
//             const coords = await fetchPlaceCoordinates(query);
//             if (coords) {
//                 // Add new search to history if it's not already present
//                 setPickupCoordinates({
//                     latitude: coords.latitude,
//                     longitude: coords.longitude,
//                 });

//                 // Add to history only if successful
//                 if (!searchHistory.includes(query)) {
//                     setSearchHistory(prevHistory => [...prevHistory, query]);
//                 }

//                 setSearchResults([{
//                     title: query,
//                     coordinate: {
//                         latitude: coords.latitude,
//                         longitude: coords.longitude,
//                     },
//                 }]);
//             } else {
//                 Alert.alert('Location not found', 'Please select a location from the history or enter a new place.');
//                 setSearchResults([]);
//                 setPickupCoordinates(null);
//             }
//         } catch (error) {
//             Alert.alert('Error', 'Unable to fetch coordinates.');
//             console.error(error);
//             setSearchResults([]);
//             setPickupCoordinates(null);
//         }
//     };

//     const handleSearch = (query) => {
//         setSearchQuery(query);
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.mapContainer}>
//                 <MapScreen
//                     pickupCoordinates={pickupCoordinates}
//                     markers={searchResults}
//                 />
//             </View>
//             <View style={styles.containerFluid}>
//                 <View style={styles.header}>
//                     <Text style={styles.headerText}>Find Your Ride</Text>
//                 </View>
//                 <View style={styles.searchContainer}>
//                     <Ionicons name="search" size={20} color="#b99470" style={styles.searchIcon} />
//                     <TextInput
//                         style={styles.searchInput}
//                         placeholder="Search Location"
//                         placeholderTextColor="#ccc"
//                         value={searchQuery}
//                         onChangeText={handleSearch}
//                     />
//                 </View>
//                 <View style={styles.historyContainer}>
//                     {searchQuery ? (
//                         <FlatList
//                             data={filteredHistory}
//                             renderItem={({ item }) => <Text style={styles.historyItem}>{item}</Text>}
//                             keyExtractor={(item, index) => index.toString()}
//                         />
//                     ) : (
//                         <Text style={styles.historyTitle}>Search for a location</Text>
//                     )}
//                 </View>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     mapContainer: {
//         flex: 1,
//         width: '100%',
//     },
//     containerFluid: {
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 40,
//         borderTopRightRadius: 40,
//         marginTop: -20,
//         padding: 20,
//         zIndex: 1,
//     },
//     header: {
//         marginBottom: 20,
//         alignItems: 'end',
//     },
//     headerText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     searchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#f2f2f2',
//         borderRadius: 20,
//         paddingHorizontal: 10,
//         marginBottom: 20,
//     },
//     searchIcon: {
//         marginRight: 10,
//     },
//     searchInput: {
//         flex: 1,
//         height: 40,
//         color: '#000',
//     },
//     historyContainer: {
//         marginBottom: 20,
//     },
//     historyTitle: {
//         fontSize: 18,
//         marginBottom: 10,
//     },
//     historyItem: {
//         paddingVertical: 5,
//         borderBottomWidth: 1,
//         borderBottomColor: '#eee',
//     },
// });

// export default Home;

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from '../../components/mapComponent/MapScreen';
import { fetchPlaceCoordinates } from '../../utils/locationUtils';
import SideMenu from '../../components/SideMenuComponent/SideMenu'; // Import the SideMenu component

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [pickupCoordinates, setPickupCoordinates] = useState(null);
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    useEffect(() => {
        if (searchQuery) {
            const results = searchHistory.filter(item =>
                item.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredHistory(results);
            fetchCoordinatesForQuery(searchQuery);
        } else {
            setFilteredHistory([]);
            setSearchResults([]);
            setPickupCoordinates(null);
        }
    }, [searchQuery]);

    const fetchCoordinatesForQuery = async (query) => {
        if (query.trim() === '') {
            setSearchResults([]);
            setPickupCoordinates(null);
            return;
        }

        try {
            const coords = await fetchPlaceCoordinates(query);
            if (coords) {
                setPickupCoordinates({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                });

                if (!searchHistory.includes(query)) {
                    setSearchHistory(prevHistory => [...prevHistory, query]);
                }

                setSearchResults([{
                    title: query,
                    coordinate: {
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                    },
                }]);
            } else {
                Alert.alert('Location not found', 'Please select a location from the history or enter a new place.');
                setSearchResults([]);
                setPickupCoordinates(null);
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to fetch coordinates.');
            console.error(error);
            setSearchResults([]);
            setPickupCoordinates(null);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                <MapScreen
                    pickupCoordinates={pickupCoordinates}
                    markers={searchResults}
                />
                <TouchableOpacity
                    style={styles.hamburgerButton}
                    onPress={() => setIsMenuVisible(true)}
                >
                    <Ionicons name="menu" size={30} color="black" />
                </TouchableOpacity>
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
                    {searchQuery ? (
                        <FlatList
                            data={filteredHistory}
                            renderItem={({ item }) => <Text style={styles.historyItem}>{item}</Text>}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    ) : (
                        <Text style={styles.historyTitle}>Search for a location</Text>
                    )}
                </View>
            </View>
            <SideMenu isVisible={isMenuVisible} onClose={() => setIsMenuVisible(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapContainer: {
        flex: 1,
        width: '100%',
        position: 'relative', // Ensure the mapContainer is the reference point for absolute positioning
    },
    containerFluid: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: -20,
        padding: 20,
        zIndex: 1,
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
        borderRadius: 20,
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

export default Home;
