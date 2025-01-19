import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const ConfirmationPage: React.FC = () => {
  const router = useRouter();
  const { name, email, allergies, preference } = useLocalSearchParams(); // Retrieve parameters passed via navigation

  const handleSubmit = () => {
    console.log("User data submitted:", { name, email, allergies });
    // Navigate to the dashboard or another page
    router.push("../(tabs)");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmation</Text>
      <Text style={styles.subtitle}>Review your details:</Text>

      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{name || "Not provided"}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{email || "Not provided"}</Text>

      <Text style={styles.label}>Allergies:</Text>
      <Text style={styles.value}>{allergies || "Not provided"}</Text>

      <Text style={styles.label}>Preferences:</Text>
      <Text style={styles.value}>{preference || "Not provided"}</Text>

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#D8F8C6", // Consistent background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ConfirmationPage;
