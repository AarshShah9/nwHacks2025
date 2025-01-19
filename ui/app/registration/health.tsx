import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";

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
      {/* Animated Title */}
      <MotiText
        style={styles.title}
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800 }}
      >
        Do You Have Any Health Considerations?
      </MotiText>

      {/* Animated Subtitle */}
      <MotiText
        style={styles.subtitle}
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 400 }}
      >
        List any allergies you have below:
      </MotiText>

      {/* Input Field */}
      <MotiView
        style={styles.inputContainer}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 800, delay: 800 }}
      >
        <TextInput
          style={styles.input}
          placeholder="Enter allergies (e.g., dairy, nuts)"
          value={allergies}
          onChangeText={setAllergies}
        />
      </MotiView>

      {/* Animated Button */}
      <MotiView
        style={styles.buttonContainer}
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 1200 }}
      >
        <Button title="Next: Dietary Preferences" onPress={handleNext} />
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#c8e6c9", // Same background as registration.tsx
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "right", // Align to the right
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "right", // Align to the right
    color: "#555",
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  buttonContainer: {
    alignSelf: "flex-end", // Align button container to the right
  },
});

export default HealthInfoPage;
