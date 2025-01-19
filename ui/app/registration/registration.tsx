import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";

const RegistrationPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleNext = () => {
    router.push({
      pathname: "/registration/health",
      params: {
        name: name, // Pass the entered name
        email: email, // Pass the entered email
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
        Let’s Get to Know You🌳
      </MotiText>

      {/* Animated Subtitle */}
      <MotiText
        style={styles.subtitle}
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 400 }}
      >
        Tell us a bit about yourself to personalize your experience.
      </MotiText>

      {/* Input Fields */}
      <MotiView
        style={styles.inputContainer}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "timing", duration: 800, delay: 800 }}
      >
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#8B4513"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#8B4513"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#8B4513"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#8B4513"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          placeholderTextColor="#8B4513"
          value={gender}
          onChangeText={setGender}
        />
      </MotiView>

      {/* Styled Button */}
      <MotiView
        style={styles.buttonContainer}
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 800, delay: 1200 }}
      >
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next: Health Info</Text>
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
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#A0522D", // Muted earthy brown underline
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 16,
    color: "#4B2E2A", // Rich brown text color
  },
  buttonContainer: {
    alignSelf: "flex-end", // Align button to the right
  },
  button: {
    backgroundColor: "#D2B48C", // Earthy brown button color
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#4B2E2A", // White text for contrast
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RegistrationPage;
