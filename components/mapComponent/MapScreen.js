// MapScreen.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [taxis, setTaxis] = useState([]);

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
        fetchNearbyTaxis(location.coords);
    };

    const fetchNearbyTaxis = (coords) => {
        const mockTaxis = [
            { id: 1, coordinate: { latitude: coords.latitude + 0.001, longitude: coords.longitude + 0.001 } },
            { id: 2, coordinate: { latitude: coords.latitude - 0.002, longitude: coords.longitude + 0.002 } },
            { id: 3, coordinate: { latitude: coords.latitude + 0.003, longitude: coords.longitude - 0.003 } },
        ];
        setTaxis(mockTaxis);
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
                <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {taxis.map((taxi) => (
                    <Marker
                        key={taxi.id}
                        coordinate={taxi.coordinate}
                        title="Taxi"
                        description="Available Taxi"
                        pinColor="blue"
                    />
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default MapScreen;
