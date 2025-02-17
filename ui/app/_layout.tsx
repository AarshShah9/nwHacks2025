import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { UserProvider } from '../context/UserContext';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerTintColor: '#8B4513' }}>
          {/* Registration Flow */}
          <Stack.Screen 
            name="intro" 
            options={{ 
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="userbasic" 
            options={{ 
              headerBackTitle: 'Back',
              headerShown: true,
              title: 'Basic Information',
            }}
          />
          <Stack.Screen 
            name="health" 
            options={{ 
              headerBackTitle: 'Back',
              headerShown: true,
              title: 'Health Information',
            }}
          />
          <Stack.Screen 
            name="preferences" 
            options={{ 
              headerBackTitle: 'Back',
              headerShown: true,
              title: 'Preferences',
            }}
          />
          <Stack.Screen 
            name="confirmation" 
            options={{ 
              headerBackTitle: 'Back',
              headerShown: true,
              title: 'Confirm Details',
            }}
          />
          <Stack.Screen 
            name="onboarding" 
            options={{ 
              headerBackTitle: 'Back',
              headerShown: true,
              title: 'Welcome',
            }}
          />

          {/* Main App Screens */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen 
            name="leaderboard" 
            options={{ 
              headerBackTitle: 'Back',
              headerShown: true,
              title: 'Top Chefs',
            }} 
          />
          <Stack.Screen 
            name="progress" 
            options={{ 
              headerBackTitle: 'Back',
              headerShown: true,
              title: 'Cooking Progress',
            }} 
          />
          <Stack.Screen
            name="fridge" 
            options={{ 
              headerBackTitle: 'Back',
              headerShown: true,
              title: 'My Fridge',
            }} 
          />
          <Stack.Screen 
            name="track" 
            options={{
              headerBackTitle: 'Back',
              headerShown: true,
              title: 'Track',

            }} 
          />
          <Stack.Screen 
            name="profile-settings" 
            options={{ 
              headerBackTitle: 'Back',
              headerShown: true,
              title: 'Profile Settings',
            }} 
          />
          <Stack.Screen 
            name="recipe/[id]"
            options={{ 
              headerBackTitle: 'Back',
              headerShown: true,
              title: 'Recipe Details',
            }} 
          />
          <Stack.Screen 
            name="subscription" 
            options={{
              headerBackTitle: 'Back',
              headerShown: true,
              title: 'Subscription',
            }} 
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </UserProvider>
  );
}
