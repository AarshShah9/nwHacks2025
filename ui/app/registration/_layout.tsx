import React from "react";
import { Stack } from "expo-router";

const RegistrationLayout: React.FC = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Disable headers for all screens under "registration"
      }}
    >
      <Stack.Screen name="intro" />
      <Stack.Screen name="registration" />
      <Stack.Screen name="health" />
      <Stack.Screen name="preferences" />
      <Stack.Screen name="confirmation" />
    </Stack>
  );
};

export default RegistrationLayout;
