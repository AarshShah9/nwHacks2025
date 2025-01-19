import React, { useState } from "react";
import { View, Button, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MotiText, MotiView } from "moti";

const ConfirmationPage: React.FC = () => {
  const router = useRouter();
  const { name, email, allergies, preference } = useLocalSearchParams(); // Retrieve parameters passed via navigation
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true); // Start the loading animation

    // Simulate async operation (e.g., API call)
    setTimeout(() => {
      console.log("User data submitted:", {
        name,
        email,
        allergies,
        preference,
      });

      // Navigate to tabs after loading
      router.push("../(tabs)");

      setLoading(false); // Stop the loading animation (optional, as navigation occurs)
    }, 2000); // 2-second delay
  };

  return (
    <View style={styles.container}>
      {/* Animated Title */}
      <MotiText
        style={[styles.title, styles.textAlign]} // Align title
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800 }}
      >
        Confirmation
      </MotiText>

      {/* Animated Subtitle */}
      <MotiText
        style={[styles.subtitle, styles.textAlign]} // Align subtitle
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 400 }}
      >
        Review your details:
      </MotiText>

      {/* Animated Card */}
      <MotiView
        style={styles.card}
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 800 }}
      >
        <View style={[styles.detailRow, styles.textAlign]}>
          <MotiText style={styles.label}>Name:</MotiText>
          <MotiText style={styles.value}>{name || "Not provided"}</MotiText>
        </View>

        <View style={[styles.detailRow, styles.textAlign]}>
          <MotiText style={styles.label}>Email:</MotiText>
          <MotiText style={styles.value}>{email || "Not provided"}</MotiText>
        </View>

        <View style={[styles.detailRow, styles.textAlign]}>
          <MotiText style={styles.label}>Allergies:</MotiText>
          <MotiText style={styles.value}>
            {allergies || "Not provided"}
          </MotiText>
        </View>

        <View style={[styles.detailRow, styles.textAlign]}>
          <MotiText style={styles.label}>Preferences:</MotiText>
          <MotiText style={styles.value}>
            {preference || "Not provided"}
          </MotiText>
        </View>
      </MotiView>

      {/* Submit Button with Loader */}
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : (
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 800, delay: 1200 }}
        >
          <Button title="Submit" onPress={handleSubmit} />
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
  textAlign: {
    alignItems: "flex-end", // Align all content to the right (use "flex-start" for left alignment)
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "right", // Align text to the right
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "right", // Align text to the right
    color: "#555",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4, // Adds shadow on Android
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#007BFF", // Highlight values with a subtle blue
  },
  loader: {
    marginTop: 20,
  },
});

export default ConfirmationPage;
