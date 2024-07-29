import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import API_BASE_URL from '../../config'; 

const StepFour = ({
  profileImage,
  onChangeProfileImage,
  gender,
  onChangeGender,
  city,
  onChangeCity,
  street,
  onChangeStreet,
  PhoneNumber,
  onChangePhoneNumber,
  username,
  onChangeUsername,
  onPrevious,
  onRegister,
  isStepComplete,
  navigation, // Navigation prop
  email,          // Received email prop
  password
}) => {
  const [localProfileImage, setLocalProfileImage] = useState(profileImage || null);
  const [localGender, setLocalGender] = useState(gender || '');
  const [localCity, setLocalCity] = useState(city || '');
  const [localStreet, setLocalStreet] = useState(street || '');
  const [localPhoneNumber, setLocalPhoneNumber] = useState(PhoneNumber || '');
  const [localUsername, setLocalUsername] = useState(username || '');
  const [stepComplete, setStepComplete] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const handleProfileImageChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log('Picked Image URI:', result.assets[0].uri);
      setLocalProfileImage(result.assets[0].uri);
      if (onChangeProfileImage) {
        onChangeProfileImage(result.assets[0].uri);
      }
    }
  };

  useEffect(() => {
    console.log('Profile image URI:', localProfileImage);
  }, [localProfileImage]);

  const handleGenderChange = (value) => {
    setLocalGender(value);
    if (onChangeGender) {
      onChangeGender(value);
    }
  };

  const handleCityChange = (value) => {
    setLocalCity(value);
    if (onChangeCity) {
      onChangeCity(value);
    }
  };

  const handleStreetChange = (text) => {
    setLocalStreet(text);
    if (onChangeStreet) {
      onChangeStreet(text);
    }
  };

  const handlePhoneNumberChange = (text) => {
    setLocalPhoneNumber(text);
    if (onChangePhoneNumber) {
      onChangePhoneNumber(text);
    }
  };

  const handleUsernameChange = (text) => {
    setLocalUsername(text);
    if (onChangeUsername) {
      onChangeUsername(text);
    }
  };

  useEffect(() => {
    const validateForm = () => {
      if (localPhoneNumber && localGender && localCity && localStreet && localUsername) {
        setStepComplete(true);
      } else {
        setStepComplete(false);
      }
    };
    validateForm();
  }, [localPhoneNumber, localGender, localCity, localStreet, localUsername]);

  const handleContinue = async () => {
    console.log('handleContinue called');
    console.log('Profile Image:', localProfileImage);
    console.log('Gender:', localGender);
    console.log('City:', localCity);
    console.log('Street:', localStreet);
    console.log('Phone Number:', localPhoneNumber);
    console.log('Username:', localUsername);
    console.log('Email:', email); // Log the email for verification
    console.log('Password:', password); // Log the password for verification
    console.log('Is Step Complete:', stepComplete);

    if (stepComplete) {
      console.log('Step is complete, proceeding with profile creation');
      try {
        const endpoint = `${API_BASE_URL}/api/complete-profile`;

        const formData = new FormData();
        formData.append('phoneNumber', localPhoneNumber);
        formData.append('gender', localGender);
        formData.append('city', localCity);
        formData.append('street', localStreet);
        formData.append('username', localUsername);
        formData.append('email', email); // Add email to formData
        formData.append('password', password); // Add password to formData

        if (localProfileImage) {
          const uriParts = localProfileImage.split('.');
          const fileType = uriParts[uriParts.length - 1];
          const uniqueName = `${new Date().getTime()}_${Math.random().toString(36).substring(7)}.${fileType}`;
          
          formData.append('profileImage', {
              uri: localProfileImage,
              type: `image/${fileType}`,
              name: uniqueName,
          });
      }      

        console.log('Form Data:', formData);

        const response = await axios.post(endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {
          console.log('Profile created successfully:', response.data);
          if (onRegister) {
            onRegister();
          }
          navigation.navigate('signin');
        } else {
          console.log('Profile creation failed:', response.data);
        }
      } catch (error) {
        console.error('Error during profile creation:', error);
      }
    } else {
      console.log('Form is incomplete');
    }
  };



  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginTop: 9, marginBottom: 3 }}>
          <AntDesign name="arrowleft" size={24} color="black" onPress={handlePrevious} />
        </View>
        <Text style={styles.title}>Profile</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <TouchableOpacity onPress={handleProfileImageChange} style={styles.profileImageContainer}>
            {localProfileImage ? (
              <Image source={{ uri: localProfileImage }} style={styles.profileImage} />
            ) : (
              <AntDesign name="camera" size={50} color="black" />
            )}
            {localProfileImage && (
              <View style={styles.cameraIconOverlay}>
                <AntDesign name="camera" size={30} color="black" />
              </View>
            )}
          </TouchableOpacity>
        </View>



        <View style={styles.container}>
          <View style={styles.formGroup}>
            <TextInput
              style={[styles.input, { borderColor: '#b99470' }]}
              placeholder="Enter Username"
              onChangeText={handleUsernameChange}
              value={localUsername}
            />
          </View>

          <View style={styles.formGroup}>
            <TextInput
              style={[styles.input, { borderColor: '#b99470' }]}
              placeholder="Enter Phone Number"
              onChangeText={handlePhoneNumberChange}
              value={localPhoneNumber}
            />
          </View>

          <View style={styles.formGroup}>
            <View style={[styles.pickerContainer, { borderColor: '#b99470' }]}>
              <Picker
                selectedValue={localGender}
                onValueChange={(itemValue) => handleGenderChange(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <TextInput
              style={[styles.input, { borderColor: '#b99470' }]}
              placeholder="Enter City"
              onChangeText={handleCityChange}
              value={localCity}
            />
          </View>

          <View style={styles.formGroup}>
            <TextInput
              style={[styles.input, { borderColor: '#b99470' }]}
              placeholder="Enter Street"
              onChangeText={handleStreetChange}
              value={localStreet}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#B99470' }]}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          {stepComplete && <Text style={styles.successText}>Profile Setup Complete!</Text>}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textTransform: 'uppercase'
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  cameraIconOverlay: {
    position: 'absolute',
    top: 40,
    left: 50,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  formGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: '100%',
    fontSize: 18,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 40,
    width: 300,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  successText: {
    color: 'green',
    marginTop: 10,
  },
});

export default StepFour;
