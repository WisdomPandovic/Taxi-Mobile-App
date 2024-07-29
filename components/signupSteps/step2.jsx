// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
// import axios from 'axios';

// const StepTwo = ({ verificationCode, onChangeVerificationCode, onNext, onPrevious, isStepComplete }) => {
//   const [localVerificationCode, setLocalVerificationCode] = useState(verificationCode || '');
//   const [loading, setLoading] = useState(false);

//   // Handle change in verification code input
//   const handleVerificationCodeChange = (text, index) => {
//     const newCode = localVerificationCode.split('');
//     newCode[index] = text;
//     setLocalVerificationCode(newCode.join(''));

//     if (onChangeVerificationCode) {
//       onChangeVerificationCode(newCode.join(''));
//     }
//   };

//   // Handle resend code functionality
//   const handleResendCode = () => {
//     // Implement resend code logic here
//   };

//   // Handle verification process
//   const handleVerify = async () => {
//     if (!isStepComplete) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post('http:/192.168.110.69:3007/api/verify-otp', {
//         phoneNumber: '08164827520', // Replace with actual phone number
//         otp: localVerificationCode,
//       });

//       Alert.alert('Success', response.data.message);
//       if (onNext) {
//         onNext();
//       }
//     } catch (error) {
//       Alert.alert('Error', error.response?.data?.error || 'Failed to verify OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handlePrevious = () => {
//     if (onPrevious) {
//       onPrevious();
//     }
//   };

//   return (
//     <View>
//       <View style={{ marginTop: 9, marginBottom: 3 }}>
//         <AntDesign name="arrowleft" size={24} color="black" onPress={handlePrevious} />
//       </View>
//       <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
//         <Image source={require('@/assets/images/taxi.jpg')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
//       </View>

//       <View style={styles.container}>
//         <Text style={styles.title}>Enter Verification Code</Text>
//         <Text style={{ color: '#6B7769', fontSize: 16, textAlign: 'center', marginTop: 3 }}>
//           A 4-digit code was sent to your phone number
//         </Text>

//         <View style={styles.codeContainer}>
//           {[0, 1, 2, 3].map((index) => (
//             <TextInput
//               key={index}
//               style={styles.codeInput}
//               maxLength={1}
//               keyboardType="numeric"
//               onChangeText={(text) => handleVerificationCodeChange(text, index)}
//               value={localVerificationCode[index]}
//             />
//           ))}
//         </View>

//         <TouchableOpacity onPress={handleResendCode}>
//           <View style={{ flexDirection: 'row' }}>
//             <Text>Didn't receive a code? </Text>
//             <Text style={{ fontWeight: 'bold' }}>Resend Code</Text>
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={{ backgroundColor: '#B99470', marginVertical: 10, padding: 12, width: 300 }}
//           disabled={!isStepComplete || loading}
//           onPress={handleVerify}
//         >
//           <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
//             {loading ? 'Verifying...' : 'Verify'}
//           </Text>
//         </TouchableOpacity>

//         {isStepComplete && <Text style={styles.successText}>Verification Code Entered!</Text>}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 0,
//     marginTop: 0,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 1,
//     textTransform: 'uppercase',
//   },
//   codeContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     marginTop: 90,
//   },
//   codeInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 10,
//     marginHorizontal: 5,
//     textAlign: 'center',
//     width: 50,
//     fontSize: 20,
//   },
//   successText: {
//     color: 'green',
//     marginTop: 10,
//   },
// });

// export default StepTwo;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import API_BASE_URL from '../../config'; 

const StepTwo = ({ email, verificationCode, onChangeVerificationCode, onNext, onPrevious, isStepComplete }) => {
  const [localVerificationCode, setLocalVerificationCode] = useState(verificationCode || '');
  const [loading, setLoading] = useState(false);

  // Handle change in verification code input
  const handleVerificationCodeChange = (text, index) => {
    const newCode = localVerificationCode.split('');
    newCode[index] = text;
    setLocalVerificationCode(newCode.join(''));

    if (onChangeVerificationCode) {
      onChangeVerificationCode(newCode.join(''));
    }
  };

  // Handle resend code functionality
  const handleResendCode = async () => {
    setLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/api/resend-otp`, {
        email: email, // Send the email address
      });

      Alert.alert('Success', 'Verification code has been resent.');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to resend code');
    } finally {
      setLoading(false);
    }
  };

  // Handle verification process
  const handleVerify = async () => {
    if (!isStepComplete) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/verify-otp`, {
        email: email, // Send the email address
        otp: localVerificationCode,
      });

      Alert.alert('Success', response.data.message);
      if (onNext) {
        onNext();
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  return (
    <View>
      <View style={{ marginTop: 9, marginBottom: 3 }}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={handlePrevious} />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <Image source={require('@/assets/images/taxi.jpg')} style={{ width: 50, height: 50, resizeMode: 'contain' }} />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={{ color: '#6B7769', fontSize: 16, textAlign: 'center', marginTop: 3 }}>
          A 4-digit code was sent to your email address
        </Text>

        <View style={styles.codeContainer}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              style={styles.codeInput}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={(text) => handleVerificationCodeChange(text, index)}
              value={localVerificationCode[index]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleResendCode} disabled={loading}>
          <View style={{ flexDirection: 'row' }}>
            <Text>Didn't receive a code? </Text>
            <Text style={{ fontWeight: 'bold' }}>Resend Code</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: '#B99470', marginVertical: 10, padding: 12, width: 300 }}
          disabled={!isStepComplete || loading}
          onPress={handleVerify}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
            {loading ? 'Verifying...' : 'Verify'}
          </Text>
        </TouchableOpacity>

        {isStepComplete && <Text style={styles.successText}>Verification Code Entered!</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    marginTop: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 1,
    textTransform: 'uppercase',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 90,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 5,
    textAlign: 'center',
    width: 50,
    fontSize: 20,
  },
  successText: {
    color: 'green',
    marginTop: 10,
  },
});

export default StepTwo;
