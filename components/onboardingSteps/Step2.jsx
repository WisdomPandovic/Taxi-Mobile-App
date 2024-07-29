import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const Step2 = () => {
  return (
    <ImageBackground
      source={require('@/assets/images/onboarding-img (4).jpg')}
      style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
      resizeMode="cover"
    >
      <View style={{ padding: 16,  borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <Text style={{ color: '#d7d7d7', fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
          Pickup at your door step
        </Text>
        <Text style={{ color: '#d7d7d7', fontSize: 16, textAlign: 'center', marginBottom: 16 }}>
          We will pick you up in less time from your {"\n"} exact location
        </Text>
        <Link href="/onboarding/step3" asChild>
          <TouchableOpacity style={{ backgroundColor: '#ff7f00', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8, width: 300 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>Next</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/(auth)/signin" asChild>
          <TouchableOpacity style={{ marginTop: 16 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>Skip</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ImageBackground>
  );
};

export default Step2;
