import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MotiText, MotiView } from "moti";
import { API_URL } from "@/constants/api";

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const { name, allergies, diseases, restrictions } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = async () => {
    setLoading(true); // Start the loading animation

    try {
      // Prepare user data for the API call
      const userData = {
        name,
        allergies,
        diseases,
        restrictions,
        exp: 0,
      };

      // Make the POST request to the backend
      const response = await fetch(`${API_URL}/profile/modify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to save user data.");
      }

      console.log("User data successfully sent:", userData);

      // Navigate to the main application
      router.push({
        pathname: "/(tabs)",
        params: {
          name,
          allergies,
          restrictions,
          diseases,
        },
      });
    } catch (error) {
      console.error("Error saving user data:", error);
      alert("Failed to save user data. Please try again.");
    } finally {
      setLoading(false); // Stop the loading animation
    }
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
        Welcome, {name || "User"}! 🌿
      </MotiText>

      {/* Animated Subtitle */}
      <MotiText
        style={styles.subtitle}
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 400 }}
      >
        Here’s how to get started:
      </MotiText>

      {/* Animated Steps */}
      <MotiView
        style={styles.stepsContainer}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 800, delay: 800 }}
      >
        {[
          {
            icon: "🥦",
            text: "Scan your fridge items and let us do the rest.",
          },
          {
            icon: "🍴",
            text: "Track your food inventory and get recipe suggestions.",
          },
          {
            icon: "🌍",
            text: "Earn points for reducing waste and eating sustainably!",
          },
        ].map((step, index) => (
          <MotiView
            key={index}
            style={styles.stepCard}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: "timing",
              duration: 800,
              delay: 800 + index * 400,
            }}
          >
            <MotiText style={styles.stepIcon}>{step.icon}</MotiText>
            <MotiText style={styles.stepText}>{step.text}</MotiText>
          </MotiView>
        ))}
      </MotiView>

      {/* Get Started Button */}
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : (
        <MotiView
          style={styles.buttonContainer}
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 800, delay: 2000 }}
        >
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <MotiText style={styles.buttonText}>Get Started</MotiText>
          </TouchableOpacity>
        </MotiView>
      )}
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
    textAlign: "center",
    color: "#5C4033",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
    color: "#6B4226",
    lineHeight: 24,
  },
  stepsContainer: {
    marginBottom: 30,
  },
  stepCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5DC",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  stepIcon: {
    fontSize: 24,
    marginRight: 10,
    color: "#4B2E2A",
  },
  stepText: {
    fontSize: 16,
    color: "#4B2E2A",
    lineHeight: 22,
    flexShrink: 1,
  },
  loader: {
    marginTop: 20,
  },
  buttonContainer: {
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#228B22",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default OnboardingPage;
