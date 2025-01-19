import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";

const IntroPage: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Animated Title */}
      <MotiText
        style={styles.title}
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800 }}
      >
        Welcome to [App]
      </MotiText>

      {/* Animated Subtitle */}
      <MotiText
        style={styles.subtitle}
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 400 }}
      >
        Discover how to make sustainable choices effortlessly.
      </MotiText>

      {/* Animated Button */}
      <MotiView
        style={styles.buttonContainer}
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 400 }}
      >
        <Button
          title="Get Started"
          onPress={() => router.push("/registration/registration")}
        />
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20, // Add padding for consistent spacing
    backgroundColor: "#c8e6c9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "right", // Align title to the right
    color: "#333", // Darker color for better readability
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "right", // Align subtitle to the right
    color: "#555", // Subtle gray for softer emphasis
    lineHeight: 24, // Improved readability for multi-line text
  },
  buttonContainer: {
    alignSelf: "flex-end", // Align button container to the right
  },
});

export default IntroPage;
