import { Tabs } from 'expo-router';
import { Platform, StyleSheet, Dimensions, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#f6f9fa',
          borderRadius: 25,
          height: 60,
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarButton: (props) => {
          const { accessibilityState, onPress, children } = props;
          const focused = accessibilityState?.selected;

          return (
            <TouchableOpacity
              onPress={onPress}
              activeOpacity={1}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={[
                  {
                    padding: 10,
                    borderRadius: 20,
                  },
                  focused && {
                    backgroundColor: '#8B4513',
                  },
                ]}>
                {children}
              </View>
            </TouchableOpacity>
          );
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name="restaurant-outline" 
              size={24} 
              color={focused ? '#FFFFFF' : '#808080'} 
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
              color={focused ? '#FFFFFF' : '#808080'} 
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
              color={focused ? '#FFFFFF' : '#808080'} 
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
              color={focused ? '#FFFFFF' : '#808080'} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
