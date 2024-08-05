import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator, Alert, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapScreen from '../../components/mapComponent/MapScreen';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker component
import axios from 'axios'; // Import Axios
import API_BASE_URL from '../../config';
import SideMenu from '../../components/SideMenuComponent/SideMenu'; 

const Trips = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [dropoffCoordinates, setDropoffCoordinates] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null); // Renamed to selectedRide
  const [isLoading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [suggestedRides, setSuggestedRides] = useState([]); // State for vehicle data
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // useEffect(() => {
  //   const fetchSuggestedRides = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/api/vehicles`); // Fetch vehicle data from API
  //       console.log('Fetched Rides:', response.data);
  //       setSuggestedRides(response.data); // Set the fetched data
  //     } catch (error) {
  //       Alert.alert('Error', 'Unable to fetch vehicle data. Please try again later.');
  //     }
  //   };

  //   fetchSuggestedRides(); // Call the function to fetch data
  // }, []);

  useEffect(() => {
    const fetchSuggestedRides = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/vehicles`);

        // Extract the base URL from API_BASE_URL
        const baseUrl = new URL(API_BASE_URL);
        const baseHost = baseUrl.host;

        const updatedRides = response.data.map(ride => {
          // Reconstruct the image URL using the base host from API_BASE_URL
          const updatedImage = ride.image.replace(/http:\/\/\d+\.\d+\.\d+\.\d+:\d+/, `http://${baseHost}`);
          return {
            ...ride,
            image: updatedImage
          };
        });

        setSuggestedRides(updatedRides);
        console.log(updatedRides);
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch vehicle data. Please try again later.');
      }
    };

    fetchSuggestedRides();
  }, []);

  const handleBooking = async (ride) => {
    if (pickupLocation && dropoffLocation && pickupCoordinates && dropoffCoordinates) {
      setSelectedRide(ride);
      setModalVisible(true);
      setLoading(true);

      try {
        const response = await axios.post(`${API_BASE_URL}/api/trip`, {
          user: 'user-id', // Replace with actual user ID
          pickupLocation,
          dropoffLocation,
          pickupCoordinates,
          dropoffCoordinates,
          pickupDateTime: {
            date,
            time: date.toTimeString().split(' ')[0], // Extract time as HH:MM:SS
          },
          vehicle: ride._id, // Send the vehicle ID
          amount: parseFloat(ride.amount.replace('$', '')),
          driver: null, // Optional: add driver ID if available
        });
        setLoading(false);
        Alert.alert('Booking Confirmed', 'Your ride has been booked successfully!');
      } catch (error) {
        setLoading(false);
        Alert.alert('Error', 'Unable to book the ride. Please try again later.');
      }
    } else {
      Alert.alert('Error', 'Please fill in all details before booking.');
    }
  };

  const handleLocationSearch = async (locationType, locationName) => {
    const coordinates = await fetchPlaceCoordinates(locationName);
    if (coordinates) {
      if (locationType === 'pickup') {
        setPickupCoordinates(coordinates);
      } else if (locationType === 'dropoff') {
        setDropoffCoordinates(coordinates);
      }
    } else {
      Alert.alert('Error', 'Unable to fetch location coordinates.');
    }
  };

  const handleCancelRide = () => {
    setModalVisible(false);
    setLoading(false);
    Alert.alert('Ride Cancelled', 'Your ride has been cancelled.');
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentDate = selectedTime || date;
    setShowTimePicker(false);
    setDate(currentDate);
  };

  const renderSuggestedRide = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.rideContainer,
        selectedRide === item ? styles.selectedRide : null // Apply selectedRide style if the item is selected
      ]}
      onPress={() => {
        setSelectedRide(item); // Set the selected ride
      }}
    >
      <Image source={{ uri: item.image }} style={styles.rideImage} />
      <Text style={styles.rideName}>{item.name}</Text>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapScreen
          pickupCoordinates={pickupCoordinates}
          dropoffCoordinates={dropoffCoordinates}
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
          <Text style={styles.headerText}>Trips</Text>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter pickup location"
            value={pickupLocation}
            onChangeText={(text) => {
              setPickupLocation(text);
              handleLocationSearch('pickup', text); // Fetch coordinates when text changes
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={20} color="gray" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Enter dropoff location"
            value={dropoffLocation}
            onChangeText={(text) => {
              setDropoffLocation(text);
              handleLocationSearch('dropoff', text); // Fetch coordinates when text changes
            }}
          />
        </View>
        <View style={styles.dateTimeContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.dateButton} // Custom style for the date button
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.buttonText}>Select Date</Text>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={date}
          onChange={handleDateChange}
        />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.timeButton} // Custom style for the time button
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.buttonText}>Select Time</Text>
        </TouchableOpacity>
      </View>
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={date}
          onChange={handleTimeChange}
        />
      )}
    </View>
        <FlatList
          data={suggestedRides}
          renderItem={renderSuggestedRide}
          keyExtractor={(item) => item._id} // Use _id as the key
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.suggestedRidesList}
        />
        <TouchableOpacity style={styles.bookButton} onPress={() => handleBooking(selectedRide)}>
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
                    <Image source={require('../../assets/images/driver.jpg')} style={styles.modalImage} />
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={20} color="gold" />
                    </View>
                    <Text style={styles.modalText}>John Doe</Text>
                    <Text style={styles.modalText}>
                      OTP: <Text style={styles.otpNumber}>273937</Text>
                    </Text>
                    <Text style={styles.modalText}>
                      <Text style={styles.otpNumber}>Swift Desire:</Text> SH 09 GH 3245
                    </Text>
                  </View>


                  <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="close" size={24} color="red" />
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dateButton: {
    backgroundColor: '#3498db', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  timeButton: {
    backgroundColor: '#e74c3c', 
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  suggestedRidesList: {
    marginVertical: 10,
  },
  rideContainer: {
    alignItems: 'center',
    marginRight: 10,
    padding: 10, // Add padding for better touch area
    borderRadius: 8, // Add border radius
    borderWidth: 1, // Border for visibility
    borderColor: '#ddd', // Default border color
  },
  selectedRide: {
    backgroundColor: '#b99470', // Brown color for selected ride
    borderColor: '#b99470', // Same color for 
  },
  rideImage: {
    width: 100,
    height: 60,
    borderRadius: 8,
  },
  rideDetails: {
    marginTop: 5,
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
  bookButton: {
    backgroundColor: '#6B7769',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  loaderContainer: {
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 16,
    color: '#000',
  },
  modalText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginVertical: 10,
  },
  horizontalLine: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  actionButton: {
    marginHorizontal: 10,
  },
  driverInfoContainer: {
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  otpNumber: {
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f00',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

export default Trips;



