import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { MotiText, MotiView } from "moti";

const ConfirmationPage: React.FC = () => {
  const router = useRouter();
  const { name, email, allergies, preference } = useLocalSearchParams(); // Retrieve parameters passed via navigation

  const handleSubmit = () => {
    // Navigate to onboarding
    router.push({
      pathname: "/registration/onboarding",
      params: {
        name,
        email,
        allergies,
        preference,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Animated Title */}
      <MotiText
        style={[styles.title, styles.textAlign]}
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800 }}
      >
        Confirmation
      </MotiText>

      {/* Animated Subtitle */}
      <MotiText
        style={[styles.subtitle, styles.textAlign]}
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

      {/* Submit Button */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 1200 }}
      >
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <MotiText style={styles.submitButtonText}>Submit</MotiText>
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
    backgroundColor: "#c8e6c9", // Light green background for sustainability
  },
  textAlign: {
    alignItems: "flex-end", // Align all content to the right
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "right",
    color: "#5C4033",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "right",
    color: "#6B4226",
  },
  card: {
    backgroundColor: "#F5F5DC", // Beige card background for a soft, natural feel
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
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
    color: "#4B2E2A",
  },
  value: {
    fontSize: 16,
    color: "#228B22",
  },
  submitButton: {
    backgroundColor: "#D2B48C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#4B2E2A",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ConfirmationPage;
