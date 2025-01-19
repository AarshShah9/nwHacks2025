import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const IntroPage: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to [App]</Text>
      <Text style={styles.subtitle}>
        Discover how to make sustainable choices effortlessly.
      </Text>
      <Button
        title="Get Started"
        onPress={() => router.push("/registration/registration")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D8F8C6",
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 30 },
});

export default IntroPage;
