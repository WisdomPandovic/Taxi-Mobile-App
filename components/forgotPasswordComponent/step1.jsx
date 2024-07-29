// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
// import IntlPhoneInput from 'react-native-intl-phone-input'; // Import IntlPhoneInput for international phone input

// const StepOne = ({ email, onChangeEmail, isStepComplete, onNext }) => {
//     const [localEmail, setLocalEmail] = useState(email || '');

//     const handleEmailChange = (email) => {
//       setLocalEmail(email);
//       if (onChangeEmail) {
//         onChangeEmail(email);
//       }
//     };
  
//     const handleNext = () => {
//       if (onNext) {
//         onNext();
//       }
//     };  

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//         <View style={styles.topContainer}>
//         <Image source={require('../../assets/images/taxi.jpg')} style={styles.logo} />
//       </View>
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 10 }}>
//         <View style={{ alignItems: 'center', marginTop: 20 }}>
//           <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 60, textTransform: 'uppercase' }}>Enter your email Address</Text>
//           <Text style={{ color: '#6B7769', fontSize: 16, textAlign: 'center', marginTop: 10 }}>We will send verification code to your email</Text>
//         </View>

//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your email"
//             value={localEmail}
//             onChangeText={handleEmailChange}
//             autoCapitalize="none"
//             keyboardType="email-address"
//           />
//           {isStepComplete && <Text style={styles.successText}>Email Entered!</Text>}
//         </View>

//         <TouchableOpacity style={styles.button} onPress={handleNext}>
//           <Text style={styles.buttonText}>Next</Text>
//         </TouchableOpacity>
//        <View>
        
//        </View>
//         {isStepComplete && <Text style={styles.successText}>Email Entered!</Text>}
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },  topContainer: {
//     // flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     // backgroundColor: 'white',
//     // paddingVertical: 20,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//     resizeMode: 'contain',
//   },
//   inputContainer: {
//     width: '100%',
//     marginBottom: 20,
//     marginTop: 40,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#b99470',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginVertical: 10,
//     marginBottom: 10,
//     width: 300,
//     backgroundColor: 'white',
//     flexDirection: 'row', 
//     alignItems: 'center', 
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     backgroundColor: '#B99470',
//     width: 300,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   successText: {
//     color: 'green',
//     marginTop: 10,
//   },
// });

// export default StepOne;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import API_BASE_URL from '../../config'; 

const StepOne = ({ email, onChangeEmail, isStepComplete, onNext }) => {
  const [localEmail, setLocalEmail] = useState(email || '');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (email) => {
    setLocalEmail(email);
    if (onChangeEmail) {
      onChangeEmail(email);
    }
  };

  const handleNext = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/send-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: localEmail }),
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        Alert.alert('Success', 'OTP sent successfully');
        if (onNext) {
          onNext();
        }
      } else {
        Alert.alert('Error', result.error || 'Failed to send OTP');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Failed to send OTP');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.topContainer}>
        <Image source={require('../../assets/images/taxi.jpg')} style={styles.logo} />
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 10 }}>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginTop: 60, textTransform: 'uppercase' }}>Enter your email Address</Text>
          <Text style={{ color: '#6B7769', fontSize: 16, textAlign: 'center', marginTop: 10 }}>We will send verification code to your email</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={localEmail}
            onChangeText={handleEmailChange}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {isStepComplete && <Text style={styles.successText}>Email Entered!</Text>}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Sending...' : 'Next'}</Text>
        </TouchableOpacity>
        <View>
        
        </View>
        {isStepComplete && <Text style={styles.successText}>Email Entered!</Text>}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  topContainer: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'white',
    // paddingVertical: 20,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    marginTop: 40,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#b99470',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginBottom: 10,
    width: 300,
    backgroundColor: 'white',
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#B99470',
    width: 300,
    marginBottom: 20,
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

export default StepOne;

