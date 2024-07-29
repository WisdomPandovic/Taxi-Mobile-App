import { Tabs } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabBarIconContainer, focused && styles.tabBarActiveIconContainer]}>
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={focused ? '#fff' : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: 'Trips',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabBarIconContainer, focused && styles.tabBarActiveIconContainer]}>
              <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={focused ? '#fff' : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabBarIconContainer, focused && styles.tabBarActiveIconContainer]}>
              <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={focused ? '#fff' : color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20, 
    marginTop: 10,
  },
  tabBarActiveIconContainer: {
    backgroundColor: '#b99470', // Background color for the active state
  },
});
