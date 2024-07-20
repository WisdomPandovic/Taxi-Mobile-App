import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from '../../components/mapComponent/MapScreen';
import Modal from 'react-native-modal';

const suggestedRides = [
  { id: '1', image: require('../../assets/images/onboarding-img (3).jpg'), class: 'Economy', amount: '$10' },
  { id: '2', image: require('../../assets/images/onboarding-img (3).jpg'), class: 'Standard', amount: '$15' },
  { id: '3', image: require('../../assets/images/onboarding-img (3).jpg'), class: 'Premium', amount: '$20' },
  { id: '4', image: require('../../assets/images/onboarding-img (3).jpg'), class: 'Luxury', amount: '$30' },
  { id: '5', image: require('../../assets/images/onboarding-img (3).jpg'), class: 'SUV', amount: '$25' },
  { id: '6', image: require('../../assets/images/onboarding-img (3).jpg'), class: 'Minivan', amount: '$35' },
  { id: '7', image: require('../../assets/images/onboarding-img (3).jpg'), class: 'Electric', amount: '$40' },
  { id: '8', image: require('../../assets/images/onboarding-img (3).jpg'), class: 'Motorbike', amount: '$5' },
];

const Trips = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleBooking = (driver) => {
    if (pickupLocation && dropoffLocation) {
      setSelectedDriver(driver);
      setModalVisible(true);
      setLoading(true);

      // Simulate searching for a driver
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Driver Found', `Your driver for the ride from ${pickupLocation} to ${dropoffLocation} is on the way!`);
      }, 3000); // Adjust this timeout as needed
    } else {
      Alert.alert('Error', 'Please enter both pickup and dropoff locations.');
    }
  };

  const handleCancelRide = () => {
    setModalVisible(false);
    setLoading(false);
    Alert.alert('Ride Cancelled', 'Your ride has been cancelled.');
  };

  const renderSuggestedRide = ({ item }) => (
    <TouchableOpacity style={styles.rideContainer} onPress={() => handleBooking(item)}>
      <Image source={item.image} style={styles.rideImage} />
      <View style={styles.rideDetails}>
        <Text style={styles.rideClass}>{item.class}</Text>
        <Text style={styles.rideAmount}>{item.amount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapScreen />
      </View>
      <View style={styles.containerFluid}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Trips</Text>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter pickup location"
            value={pickupLocation}
            onChangeText={setPickupLocation}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter dropoff location"
            value={dropoffLocation}
            onChangeText={setDropoffLocation}
          />
        </View>
        <FlatList
          data={suggestedRides}
          renderItem={renderSuggestedRide}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestedRidesList}
        />
        <TouchableOpacity style={styles.bookButton} onPress={() => handleBooking(selectedDriver)}>
          <Text style={styles.bookButtonText}>Book a Ride</Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContent}>
            {isLoading ? (
              <View style={styles.loaderContainer}>
                <Image source={require('../../assets/images/onboarding-img (3).jpg')} style={styles.modalImage} />
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Hold on, we are searching for a nearby driver...</Text>
              </View>
            ) : (
              <>
                <Text style={styles.modalText}>Your Ride is arriving in 3 mins</Text>
                <View style={styles.horizontalLine}></View>
                <View style={styles.modalActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="call" size={24} color="#b99470" />
                  </TouchableOpacity>
                  <View style={styles.driverInfoContainer}>
                    <Image source={require('../../assets/images/onboarding-img (3).jpg')} style={styles.modalImage} />
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={20} color="gold" />
                    </View>
                    <Text style={styles.modalText}>John Doe</Text>
                    <Text style={styles.modalText}>
                      OTP: <Text style={styles.otpNumber}>273937</Text>
                    </Text>

                    <Text style={styles.modalText}><Text style={styles.otpNumber}>Swift Desire:</Text> SH 09 GH 3245</Text>
                  </View>
                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="chatbubbles" size={24} color="#b99470" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelRide}>
                  <Text style={styles.cancelButtonText}>Cancel Ride</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Modal>
      </View>
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
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  rideContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  rideImage: {
    width: 100,
    height: 60,
    borderRadius: 10,
    marginBottom: 10,
  },
  rideDetails: {
    alignItems: 'center',
  },
  rideClass: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rideAmount: {
    fontSize: 14,
    color: 'gray',
  },
  suggestedRidesList: {
    marginTop: 20,
  },
  bookButton: {
    backgroundColor: '#ff7f00',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  otpNumber: {
    color: '#b99470', 
    fontWeight: 'normal', 
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    padding: 10,
    borderRadius: 20,
  },
  cancelButton: {
    backgroundColor: '#ff0000',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loaderContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  driverInfoContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  ratingContainer: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
  },
  horizontalLine: {
    borderBottomColor: '#ccc', // Adjust color as needed
    borderBottomWidth: 1, // Adjust thickness as needed
    width: '100%',
    marginBottom: 10, // Adjust spacing as needed
  },
  
});

export default Trips;
