import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const HealthInfoPage: React.FC = () => {
  const router = useRouter();
  const { name, email } = useLocalSearchParams(); // Retrieve name and email from params
  const [allergies, setAllergies] = useState("");

  const handleNext = () => {
    router.push({
      pathname: "/registration/preferences",
      params: {
        name: name, // Forward the name
        email: email, // Forward the email
        allergies: allergies, // Add the new data (allergies)
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Do You Have Any Health Considerations?</Text>
      <Text style={styles.subtitle}>List any allergies you have below:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter allergies (e.g., dairy, nuts)"
        value={allergies}
        onChangeText={setAllergies}
      />
      <Button title="Next: Dietary Preferences" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#D8F8C6", // Same background as registration.tsx
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff", // Consistent input background
  },
});

export default HealthInfoPage;
