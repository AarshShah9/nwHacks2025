import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MotiText, MotiView } from "moti";

const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const { name, email, allergies, diseases, preference } =
    useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = () => {
    setLoading(true); // Start the loading animation

    // Simulate async operation (e.g., API call)
    setTimeout(() => {
      console.log("User data submitted:", {
        name,
        email,
        allergies,
        preference,
        diseases,
      });

      // Navigate to onboarding after loading
      router.push({
        pathname: "/(tabs)",
        params: {
          name,
          email,
          allergies,
          preference,
          diseases,
        },
      });

      setLoading(false); // Stop the loading animation (optional, as navigation occurs)
    }, 2000); // 2-second delay
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
    backgroundColor: "#F5F5DC", // Soft beige background for the card
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
    color: "#4B2E2A", // Earthy brown for the icons
  },
  stepText: {
    fontSize: 16,
    color: "#4B2E2A",
    lineHeight: 22,
    flexShrink: 1, // Prevent text from overflowing
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
