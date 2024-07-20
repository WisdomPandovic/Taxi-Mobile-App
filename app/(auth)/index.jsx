import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const AuthIndex = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 20 }}>
      <Image source={require('@/assets/images/taxi.jpg')} style={{ width: 50, height: 50 }} />
      <Image source={require('@/assets/images/taxi-1.jpg')} style={{ width: 400, height: 200, marginTop: 90 }} />
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ color: '#B99470', fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>Welcome to The Riders</Text>
        <Text style={{ color: '#6B7769', fontSize: 16, textAlign: 'center', marginTop: 10 }}>Perfect taxi booking app for your safety and comfortable trips</Text>
      </View>
      <View style={{ marginTop: 70 }}>
        <Link href="/signup" asChild>
          <TouchableOpacity style={{ backgroundColor: '#B99470', marginVertical: 10, padding: 12, borderRadius: 8, width: 300 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Create an Account</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/signin" asChild>
          <TouchableOpacity style={{ backgroundColor: '#6B7769', marginVertical: 10, padding: 12, borderRadius: 8, width: 300 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Log In</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default AuthIndex;
