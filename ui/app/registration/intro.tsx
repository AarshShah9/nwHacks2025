import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
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
        Welcome to [App]🌱
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

      {/* Custom Styled Button */}
      <MotiView
        style={styles.buttonContainer}
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 800 }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/registration/registration")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
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
    alignSelf: "flex-end",
  },
  button: {
    backgroundColor: "#D2B48C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#4B2E2A",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IntroPage;
