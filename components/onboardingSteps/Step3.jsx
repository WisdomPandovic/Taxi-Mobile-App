import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const Step3 = () => {
  return (
    <ImageBackground
      source={require('@/assets/images/onboarding-img (3).jpg')}
      style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
      resizeMode="cover"
    >
      <View style={{ padding: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <Text style={{ color: '#d7d7d7', fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 }}>
          Expert drivers at work
        </Text>
        <Text style={{ color: '#d7d7d7', fontSize: 16, textAlign: 'center', marginBottom: 16 }}>
          Be relaxed as our drivers are highly  {"\n"}trained and drive safely
        </Text>
        <Link href="/(auth)" asChild>
          <TouchableOpacity style={{ backgroundColor: '#ff7f00', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8, width: 300, marginBottom: 40 }}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center', }}>Get Started</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ImageBackground>
  );
};

export default Step3;
