import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <ImageBackground
      source={require('@/assets/images/taxi-2.jpg')}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      resizeMode="cover"
    >
      <View style={{ padding: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
          Welcome to Our Airport Ride Service
        </Text>
        <Link href="/onboarding/step1" asChild>
          <TouchableOpacity style={{ backgroundColor: '#ff7f00', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>Get Started</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ImageBackground>
  );
}
