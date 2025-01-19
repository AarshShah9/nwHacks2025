import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";

const HealthInfoPage: React.FC = () => {
  const router = useRouter();
  const { name, email } = useLocalSearchParams(); // Retrieve name and email from params
  const [allergies, setAllergies] = useState("");
  const [diseases, setDiseases] = useState<string[]>([]);

  const toggleDisease = (disease: string) => {
    if (diseases.includes(disease)) {
      setDiseases(diseases.filter((d) => d !== disease)); // Remove if already selected
    } else {
      setDiseases([...diseases, disease]); // Add if not selected
    }
  };

  const handleNext = () => {
    router.push({
      pathname: "/registration/preferences",
      params: {
        name: name, // Forward the name
        email: email, // Forward the email
        allergies: allergies, // Add the new data (allergies)
        diseases: diseases, // Add selected diseases
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
        Do You Have Any Health Considerations?🌿
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

      {/* Input Field for Allergies */}
      <MotiView
        style={styles.inputContainer}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 800, delay: 800 }}
      >
        <TextInput
          style={styles.input}
          placeholder="Enter allergies (e.g., dairy, nuts)"
          placeholderTextColor="#8B4513"
          value={allergies}
          onChangeText={setAllergies}
        />
      </MotiView>

      {/* Disease Selection Section */}
      <MotiText
        style={styles.subtitle}
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 1000 }}
      >
        Select any applicable conditions:
      </MotiText>
      <MotiView
        style={styles.buttonContainer}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 800, delay: 1200 }}
      >
        {["Diabetes", "Celiac Disease", "High Cholesterol", "Hypertension"].map(
          (disease) => (
            <TouchableOpacity
              key={disease}
              style={[
                styles.diseaseButton,
                diseases.includes(disease) && styles.selectedDiseaseButton,
              ]}
              onPress={() => toggleDisease(disease)}
            >
              <Text
                style={[
                  styles.diseaseButtonText,
                  diseases.includes(disease) &&
                    styles.selectedDiseaseButtonText,
                ]}
              >
                {disease}
              </Text>
            </TouchableOpacity>
          )
        )}
      </MotiView>

      {/* Styled Next Button */}
      <MotiView
        style={styles.buttonContainer}
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 1400 }}
      >
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next: Dietary Preferences</Text>
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
    marginBottom: 20,
    textAlign: "right",
    color: "#5C4033",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#A0522D",
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 16,
    color: "#4B2E2A",
  },
  buttonContainer: {
    marginBottom: 20,
  },
  diseaseButton: {
    backgroundColor: "#9FE2BF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  selectedDiseaseButton: {
    backgroundColor: "#228B22",
  },
  diseaseButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedDiseaseButtonText: {
    color: "#F5F5DC",
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

export default HealthInfoPage;
