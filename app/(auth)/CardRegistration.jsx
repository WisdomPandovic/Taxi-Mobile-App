import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
// import { CardField, useStripe } from '@stripe/stripe-react-native';
import API_BASE_URL from '../../config'; // Adjust the import path as needed

const CardRegistration = () => {
  // const { createPaymentMethod } = useStripe();

  // State for payment details
  const [last4, setLast4] = useState('');
  const [brand, setBrand] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');

  // const handleRegisterCard = async () => {
  //   try {
  //     // Create a new payment method using Stripe's API
  //     const { paymentMethod, error } = await createPaymentMethod({
  //       type: 'Card',
  //     });

  //     if (error) {
  //       console.log('Error creating payment method:', error);
  //       return;
  //     }

  //     // Update state with payment method details
  //     const { last4: cardLast4, brand: cardBrand, exp_month, exp_year } = paymentMethod.card || {};

  //     setLast4(cardLast4 || '');
  //     setBrand(cardBrand || '');
  //     setExpMonth(exp_month || '');
  //     setExpYear(exp_year || '');

  //     // Send payment method ID and details to your backend
  //     const response = await fetch(`${API_BASE_URL}/api/add-payment-method`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         userId: 'your-user-id', // Replace with actual user ID
  //         paymentMethodId: paymentMethod.id,
  //         last4: cardLast4 || '',
  //         brand: cardBrand || '',
  //         expMonth: exp_month || '',
  //         expYear: exp_year || '',
  //       }),
  //     });

  //     if (!response.ok) {
  //       console.log('Error adding payment method:', response.statusText);
  //       return;
  //     }

  //     console.log('Payment method added successfully');
  //   } catch (error) {
  //     console.log('Error handling payment:', error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register a New Card</Text>
      {/* <CardField */}
        postalCodeEnabled={false}
        placeholders={{ number: '4242 4242 4242 4242' }}
        cardStyle={{ backgroundColor: '#FFFFFF', textColor: '#000000' }}
        style={styles.cardField}
        onCardChange={(cardDetails) => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      {/* /> */}
      <TouchableOpacity style={styles.button} onPress={handleRegisterCard}>
        <Text style={styles.buttonText}>Register Card</Text>
      </TouchableOpacity>
      {/* Display captured card details */}
      <View style={styles.detailsContainer}>
        <Text>Last 4 Digits: {last4}</Text>
        <Text>Brand: {brand}</Text>
        <Text>Expiration Month: {expMonth}</Text>
        <Text>Expiration Year: {expYear}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  detailsContainer: {
    marginTop: 20,
  },
});

export default CardRegistration;
