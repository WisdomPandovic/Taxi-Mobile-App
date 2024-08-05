// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
// // import { CardField, useStripe } from '@stripe/stripe-react-native';
// import API_BASE_URL from '../../config'; // Adjust the import path as needed

// const CardRegistration = () => {
//   // const { createPaymentMethod } = useStripe();

//   // State for payment details
//   const [last4, setLast4] = useState('');
//   const [brand, setBrand] = useState('');
//   const [expMonth, setExpMonth] = useState('');
//   const [expYear, setExpYear] = useState('');

//   // const handleRegisterCard = async () => {
//   //   try {
//   //     // Create a new payment method using Stripe's API
//   //     const { paymentMethod, error } = await createPaymentMethod({
//   //       type: 'Card',
//   //     });

//   //     if (error) {
//   //       console.log('Error creating payment method:', error);
//   //       return;
//   //     }

//   //     // Update state with payment method details
//   //     const { last4: cardLast4, brand: cardBrand, exp_month, exp_year } = paymentMethod.card || {};

//   //     setLast4(cardLast4 || '');
//   //     setBrand(cardBrand || '');
//   //     setExpMonth(exp_month || '');
//   //     setExpYear(exp_year || '');

//   //     // Send payment method ID and details to your backend
//   //     const response = await fetch(`${API_BASE_URL}/api/add-payment-method`, {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //       },
//   //       body: JSON.stringify({
//   //         userId: 'your-user-id', // Replace with actual user ID
//   //         paymentMethodId: paymentMethod.id,
//   //         last4: cardLast4 || '',
//   //         brand: cardBrand || '',
//   //         expMonth: exp_month || '',
//   //         expYear: exp_year || '',
//   //       }),
//   //     });

//   //     if (!response.ok) {
//   //       console.log('Error adding payment method:', response.statusText);
//   //       return;
//   //     }

//   //     console.log('Payment method added successfully');
//   //   } catch (error) {
//   //     console.log('Error handling payment:', error);
//   //   }
//   // };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Register a New Card</Text>
//       {/* <CardField */}
//         postalCodeEnabled={false}
//         placeholders={{ number: '4242 4242 4242 4242' }}
//         cardStyle={{ backgroundColor: '#FFFFFF', textColor: '#000000' }}
//         style={styles.cardField}
//         onCardChange={(cardDetails) => {
//           console.log('cardDetails', cardDetails);
//         }}
//         onFocus={(focusedField) => {
//           console.log('focusField', focusedField);
//         }}
//       {/* /> */}
//       <TouchableOpacity style={styles.button} >
//         <Text style={styles.buttonText}>Register Card</Text>
//       </TouchableOpacity>
//       {/* Display captured card details */}
//       <View style={styles.detailsContainer}>
//         <Text>Last 4 Digits: {last4}</Text>
//         <Text>Brand: {brand}</Text>
//         <Text>Expiration Month: {expMonth}</Text>
//         <Text>Expiration Year: {expYear}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   cardField: {
//     width: '100%',
//     height: 50,
//     marginVertical: 30,
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     borderRadius: 5,
//     padding: 15,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//   },
//   detailsContainer: {
//     marginTop: 20,
//   },
// });

// export default CardRegistration;

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import API_BASE_URL from '../../config'; // Assuming this is your API base URL
import { STRIPE_PUBLISHABLE_KEY } from '@env';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const CardRegistration = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [validThrough, setValidThrough] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [securelySave, setSecurelySave] = useState(false);
  const [userId, setUserId] = useState(null);
  const { createPaymentMethod } = useStripe();

  const handleChange = (text) => {
    // Remove non-numeric characters
    let cleanText = text.replace(/\D/g, '');

    // Format text as MM/YY
    if (cleanText.length > 2) {
      cleanText = `${cleanText.slice(0, 2)}/${cleanText.slice(2, 4)}`;
    }

    setValidThrough(cleanText);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem('jwtToken');
        if (token) {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.userId); // Adjust based on your token's payload
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleSaveChanges = async () => {
    if (!userId) {
      // alert('User ID not found');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'User ID not found',
      });
      return;
    }

    if (!cardNumber || !validThrough || !cvv || !nameOnCard) {
      // alert('Please fill all fields');
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Please fill all fields',
      });
      return;
    }

    try {
      const [expMonth, expYear] = validThrough.split('/').map(num => parseInt(num, 10));

      const paymentMethodParams = {
        paymentMethodType: 'Card', // Ensure 'type' is set to 'card'
        card: {
          number: cardNumber,
          exp_month: expMonth,
          exp_year: expYear,
          cvc: cvv,
        },
        billing_details: {
          name: nameOnCard,
        },
      };

      console.log('Creating payment method with:', paymentMethodParams);

      const { paymentMethod, error } = await createPaymentMethod(paymentMethodParams);

      if (error) {
        console.error('Stripe Error:', error);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: `Failed to create payment method: ${error.message}`,
        });
        return;
      }

      console.log('Payment Method Created:', paymentMethod);

      const response = await axios.post(`${API_BASE_URL}/api/add-payment-method`, {
        userId: userId, // Replace with actual user ID
        stripePaymentMethodId: paymentMethod.id,
        last4: paymentMethod.card.last4,
        brand: paymentMethod.card.brand,
        expMonth: paymentMethod.card.exp_month,
        expYear: paymentMethod.card.exp_year,
      });

      console.log('API Response:', response.data);

      if (response.data.success) {
        // alert('Payment method added successfully');
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Success',
          text2: 'Payment method added successfully',
        });
      } else {
        // alert('Failed to add payment method');
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Failed to add payment method',
        });
      }
    } catch (err) {
      console.error('Error during payment method registration:', err);
      // alert('An error occurred');
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'An error occurred',
      });
    }

  };

  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Add Credit/Debit Card</Text>
          <View style={styles.horizontalLine} />
          <View style={styles.cardInfo}>
            <Text style={styles.boldText}>Add new Card</Text>
            <Text>WE ACCEPT <Text style={styles.boldText}>(Master Card / Visa Card)</Text></Text>
          </View>
          <TextInput
            placeholder="Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Valid Through (MM/YY)"
            value={validThrough}
            onChangeText={handleChange}
            keyboardType="numeric"
            maxLength={5} // MM/YY
            style={styles.input}
          />
          <TextInput
            placeholder="CVV"
            value={cvv}
            onChangeText={setCvv}
            keyboardType="numeric"
            style={styles.input}
            secureTextEntry
          />
          <TextInput
            placeholder="Name on Card"
            value={nameOnCard}
            onChangeText={setNameOnCard}
            style={styles.input}
          />
          <TouchableOpacity style={styles.checkboxContainer} onPress={() => setSecurelySave(!securelySave)}>
            <View style={styles.checkbox}>
              {securelySave && <View style={styles.checked} />}
            </View>
            <Text style={styles.checkboxLabel}>Securely save this card for faster checkout</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.buttonText}>SAVE CHANGES</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={() => { }}>
            <Text style={styles.buttonText}>CLOSE</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80, // Add padding to ensure the content is not hidden behind buttons
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  cardInfo: {
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold', // Make the text bold
    fontSize: 16,      // Optional: Adjust font size to match the style of other text
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    width: 10,
    height: 10,
    backgroundColor: '#007bff',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    paddingHorizontal: 20,
  },
  saveButton: {
    backgroundColor: '#B99470', // Green background for Save Changes button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  closeButton: {
    backgroundColor: '#dc3545', // Red background for Close button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CardRegistration;
