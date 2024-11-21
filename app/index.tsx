import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

export default function LoginScreen() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);

  const { checkNetworkConnection } = useNetworkStatus();

  // Mock credentials
  const MOCK_EMAIL = "test@example.com";
  const MOCK_PASSWORD = "password123";

  // Handle login
  const handleLogin = async () => {
    try {
      // First, check network connection
      await checkNetworkConnection();

      // Then proceed with login validation
      if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
        Alert.alert("Login Successful", "Redirecting to the transaction page.");
        router.replace("/transaction");
      } else {
        Alert.alert(
          "Login Failed",
          "Invalid email or password. Please try again."
        );
      }
    } catch (error) {
      Alert.alert(
        "Network Error",
        "No internet connection. Please check your network."
      );
    }
  };

  // Biometric Authentication
  const handleBiometricAuth = async () => {
    try {
      // Network check
      await checkNetworkConnection();

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      // Check for Face ID first
      const hasFaceID = supportedTypes.includes(
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
      );

      // Determine authentication method
      const authType = hasFaceID ? "Face ID" : "Fingerprint";

      if (!hasHardware) {
        return Alert.alert(
          `${authType} not supported`,
          `Your device does not support ${authType}.`
        );
      }

      if (!isEnrolled) {
        return Alert.alert(
          `No ${authType} enrolled`,
          `Please enroll your ${authType} in settings.`
        );
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: `Authenticate with ${authType}`,
        fallbackLabel: "Use Passcode",
      });

      if (result.success) {
        Alert.alert("Success", `${authType} authentication successful!`);
        router.replace("/transaction");
      } else {
        Alert.alert(
          "Failed",
          `${authType} authentication failed. Please try again.`
        );
      }
    } catch (error) {
      Alert.alert(
        "Network Error",
        "No internet connection. Please check your network."
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Welcome Section */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Sign In</ThemedText>
      </ThemedView>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color="#888" />
          <TextInput
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" />
          <TextInput
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIconWrapper}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleBiometricAuth}>
        <ThemedText style={styles.buttonText}>Login</ThemedText>
      </TouchableOpacity>

      {/* Divider */}
      <ThemedView style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.divider} />
      </ThemedView>

      {/* Authentication Methods */}
      <ThemedView style={styles.authenticateContainer}>
        {/* Biometric Authentication */}
        <TouchableOpacity
          style={styles.authenticateItem}
          onPress={handleBiometricAuth}
        >
          <ThemedView style={styles.authenticatIconWrapper}>
            <Ionicons
              name="scan"
              size={32}
              color="#4B5563"
              style={styles.authenticateFaceId}
            />
            <Ionicons
              name="finger-print"
              size={32}
              color="#4B5563"
              style={styles.authenticateFingerprint}
            />
          </ThemedView>
          <Text style={styles.authMethodText}>Touch ID / Face ID</Text>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: 20,
  },
  label: {
    color: "#4B5563",
    marginBottom: 8,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 16,
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingLeft: 8,
    fontSize: 16,
    color: "#4B5563",
  },
  eyeIconWrapper: {
    padding: 8,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#4B5563",
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#D1D5DB",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#6B7280",
    fontSize: 14,
  },
  authenticateContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  authenticateItem: {
    display: "flex",
    alignItems: "center",
  },
  authenticatIconWrapper: {
    display: "flex",
    alignItems: "center",
  },
  authenticateFaceId: {
    position: "absolute",
    bottom: -4,
    fontSize: 36,
  },
  authenticateFingerprint: {
    // position: "absolute",
    bottom: 4,
    fontSize: 20,
  },
  authMethodText: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 4,
  },
});
