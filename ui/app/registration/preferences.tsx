import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const PreferencesPage: React.FC = () => {
  const router = useRouter();
  const { name, email, allergies } = useLocalSearchParams();
  const [preference, setPreference] = useState("");

  const handleNext = () => {
    console.log(preference);
    router.push({
      pathname: "/registration/confirmation",
      params: {
        name: name, // Forward the name
        email: email, // Forward the email
        allergies: allergies, // Add the new data (allergies)
        preference: preference, // Add the selected preference
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What Are Your Dietary Preferences?</Text>
      <Text style={styles.subtitle}>
        We’ll help you avoid foods that don’t work for you.
      </Text>

      {/* Buttons with dynamic styles */}
      <TouchableOpacity
        style={[
          styles.preferenceButton,
          preference === "Vegan" && styles.selectedButton,
        ]}
        onPress={() => setPreference("Vegan")}
      >
        <Text style={styles.buttonText}>Vegan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.preferenceButton,
          preference === "Vegetarian" && styles.selectedButton,
        ]}
        onPress={() => setPreference("Vegetarian")}
      >
        <Text style={styles.buttonText}>Vegetarian</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.preferenceButton,
          preference === "Halal" && styles.selectedButton,
        ]}
        onPress={() => setPreference("Halal")}
      >
        <Text style={styles.buttonText}>Halal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.preferenceButton,
          preference === "Kosher" && styles.selectedButton,
        ]}
        onPress={() => setPreference("Kosher")}
      >
        <Text style={styles.buttonText}>Kosher</Text>
      </TouchableOpacity>

      {/* Default button for "Next: Confirmation" */}
      <Button title="Next: Confirmation" onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#D8F8C6",
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
  preferenceButton: {
    backgroundColor: "#ADD8E6", // Light blue for unchosen
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#007BFF", // Darker blue for chosen button
  },
  buttonText: {
    color: "#fff", // White text for buttons
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PreferencesPage;
