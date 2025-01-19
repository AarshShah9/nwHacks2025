import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const OnboardingPage: React.FC = () => {
  const router = useRouter();

  const handleFinishOnboarding = () => {
    // Replace the current stack with the main tabs
    router.replace("../(tabs)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You’re All Set!</Text>
      <Text style={styles.subtitle}>Here’s how to get started:</Text>
      <Text>1. Scan your fridge items and let us do the rest.</Text>
      <Text>2. Track your food inventory and get recipe suggestions.</Text>
      <Text>3. Earn points for reducing waste and eating sustainably!</Text>
      <Button title="Go to Dashboard" onPress={handleFinishOnboarding} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 10 },
});

export default OnboardingPage;
