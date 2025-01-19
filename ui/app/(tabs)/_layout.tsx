import { Tabs } from 'expo-router';
import { Platform, StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#f6f9fa',
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name="restaurant-outline" 
              size={24} 
              color={focused ? '#8b4614' : '#000000'} 
              />
          ),
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name="book-outline" 
              size={24} 
              color={focused ? '#8b4614' : '#000000'} 
              />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name="add-circle-outline" 
              size={24} 
            color={focused ? '#8b4614' : '#000000'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name="person-outline" 
              size={24} 
              color={focused ? '#8b4614' : '#000000'} 
              />
          ),
        }}
      />
    </Tabs>
  );
}
