
// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';

// const MapScreen = ({ pickupCoordinates, dropoffCoordinates, }) => {
//     const [location, setLocation] = useState(null);
//     const [errorMsg, setErrorMsg] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [taxis, setTaxis] = useState([]);

//     useEffect(() => {
//         getLocationAsync();
//     }, []);

//     const getLocationAsync = async () => {
//         let { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== 'granted') {
//             setErrorMsg('Permission to access location was denied');
//             setLoading(false);
//             return;
//         }

//         let location = await Location.getCurrentPositionAsync({});
//         setLocation(location.coords);
//         setLoading(false);
//         fetchNearbyTaxis(location.coords);
//     };

//     const fetchNearbyTaxis = (coords) => {
//         const mockTaxis = [
//             { id: 1, coordinate: { latitude: coords.latitude + 0.001, longitude: coords.longitude + 0.001 } },
//             { id: 2, coordinate: { latitude: coords.latitude - 0.002, longitude: coords.longitude + 0.002 } },
//             { id: 3, coordinate: { latitude: coords.latitude + 0.003, longitude: coords.longitude - 0.003 } },
//         ];
//         setTaxis(mockTaxis);
//     };

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//             </View>
//         );
//     }

//     if (errorMsg) {
//         return (
//             <View style={styles.errorContainer}>
//                 <Text>{errorMsg}</Text>
//             </View>
//         );
//     }

//     return (
//         <MapView
//             style={styles.map}
//             region={{
//                 latitude: location.latitude,
//                 longitude: location.longitude,
//                 latitudeDelta: 0.0922,
//                 longitudeDelta: 0.0421,
//             }}
//         >
//             {pickupCoordinates && (
//                 <Marker coordinate={pickupCoordinates} title="Pickup Location" />
//             )}
//             {dropoffCoordinates && (
//                 <Marker coordinate={dropoffCoordinates} title="Dropoff Location" />
//             )}
//             {taxis.map(taxi => (
//                 <Marker
//                     key={taxi.id}
//                     coordinate={taxi.coordinate}
//                     title={`Taxi ${taxi.id}`}
//                 />
//             ))}
//         </MapView>
//     );
// };

// const styles = StyleSheet.create({
//     map: {
//         ...StyleSheet.absoluteFillObject,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     errorContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// export default MapScreen;

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = ({ pickupCoordinates, dropoffCoordinates, markers }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLocationAsync();
    }, []);

    const getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            setLoading(false);
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
        setLoading(false);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (errorMsg) {
        return (
            <View style={styles.errorContainer}>
                <Text>{errorMsg}</Text>
            </View>
        );
    }

    // Determine the initial region based on the provided coordinates or current location
    const initialRegion = pickupCoordinates || dropoffCoordinates
        ? {
            latitude: pickupCoordinates ? pickupCoordinates.latitude : dropoffCoordinates.latitude,
            longitude: pickupCoordinates ? pickupCoordinates.longitude : dropoffCoordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        : {
            latitude: location?.latitude || 37.78825, // Default location
            longitude: location?.longitude || -122.4324, // Default location
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };

    return (
        <MapView
            style={styles.map}
            region={initialRegion}
        >
            {pickupCoordinates && (
                <Marker
                    coordinate={pickupCoordinates}
                    title="Pickup Location"
                    pinColor="green"
                />
            )}
            {dropoffCoordinates && (
                <Marker
                    coordinate={dropoffCoordinates}
                    title="Dropoff Location"
                    pinColor="red"
                />
            )}
            {markers && markers.map((marker, index) => (
                <Marker
                    key={index}
                    coordinate={marker.coordinate}
                    title={marker.title}
                />
            ))}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MapScreen;



