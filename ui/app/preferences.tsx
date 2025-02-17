import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";

const PreferencesPage: React.FC = () => {
  const router = useRouter();
  const { name, allergies, diseases } = useLocalSearchParams();
  const [preference, setPreference] = useState("");

  const handleNext = () => {
    console.log(preference);
    router.push({
      pathname: "/confirmation",
      params: {
        name: name, // Forward the name
        allergies: allergies, // Keep allergies as a parameter
        restrictions: preference, // Set dietary preference as 'restrictions'
        diseases: diseases, // Keep diseases as a parameter
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
        What Are Your Dietary Preferences? 🥕
      </MotiText>

      {/* Animated Subtitle */}
      <MotiText
        style={styles.subtitle}
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 400 }}
      >
        We’ll help you avoid foods that don’t work for you.
      </MotiText>

      {/* Animated Buttons */}
      <MotiView
        style={styles.buttonContainer}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 800, delay: 800 }}
      >
        {["Vegan", "Vegetarian", "Halal", "Kosher"].map((diet) => (
          <TouchableOpacity
            key={diet}
            style={[
              styles.preferenceButton,
              preference === diet && styles.selectedButton,
            ]}
            onPress={
              () => setPreference(preference === diet ? "" : diet) // Toggle selection
            }
          >
            <MotiText
              style={styles.buttonText}
              from={{ scale: 1 }}
              animate={{ scale: preference === diet ? 1.1 : 1 }}
              transition={{ type: "spring", damping: 10 }}
            >
              {diet}
            </MotiText>
          </TouchableOpacity>
        ))}
      </MotiView>

      {/* Animated Next Button */}
      <MotiView
        style={styles.nextButtonContainer}
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 1200 }}
      >
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <MotiText style={styles.nextButtonText}>Next: Confirmation</MotiText>
        </TouchableOpacity>
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#c8e6c9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "right",
    color: "#5C4033",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "right",
    color: "#5C4033",
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  preferenceButton: {
    backgroundColor: "#9FE2BF", // Light green for unselected
    padding: 12,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#228B22", // Forest green for selected
  },
  buttonText: {
    color: "#fff", // White text for buttons
    fontWeight: "bold",
    fontSize: 16,
  },
  nextButtonContainer: {
    alignSelf: "flex-end",
  },
  nextButton: {
    backgroundColor: "#D2B48C", // Earthy brown
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#4B2E2A", // Rich brown text
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PreferencesPage;
