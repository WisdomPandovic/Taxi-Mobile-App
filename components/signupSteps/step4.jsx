import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';

const StepFour = ({
  profileImage,
  onChangeProfileImage,
  gender,
  onChangeGender,
  city,
  onChangeCity,
  street,
  onChangeStreet,
  email,
  onChangeEmail,
  onPrevious,
  onRegister,
  isStepComplete, 
  navigation,// Navigation prop
}) => {
  const [localProfileImage, setLocalProfileImage] = useState(profileImage || null);
  const [localGender, setLocalGender] = useState(gender || '');
  const [localCity, setLocalCity] = useState(city || '');
  const [localStreet, setLocalStreet] = useState(street || '');
  const [localEmail, setLocalEmail] = useState(email || '');

  // const navigation = useNavigation()

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

  const handleEmailChange = (text) => {
    setLocalEmail(text);
    if (onChangeEmail) {
      onChangeEmail(text);
    }
  };

  const handleContinue = () => {
    if (isStepComplete) {
      if (onRegister) {
        onRegister(); // Perform any additional actions if needed
      }
      // Navigate to SignInScreen
      // navigation.navigate("signin");
        // navigation.navigate('(auth)/signin');
    } else {
      // Handle incomplete form scenario (optional)
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
              placeholder="Enter Email"
              onChangeText={handleEmailChange}
              value={localEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.formGroup}>
            {/* <Text style={styles.label}>Gender:</Text> */}
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
            disabled={!isStepComplete}
            onPress={handleContinue}
           
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          {isStepComplete && <Text style={styles.successText}>Profile Setup Complete!</Text>}
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
    borderRadius: 8,
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
