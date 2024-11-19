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
import { Link, router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import * as LocalAuthentication from "expo-local-authentication";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Face ID Authentication
  const handleFaceID = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware) {
        Alert.alert(
          "Face ID not supported",
          "Your device does not support Face ID."
        );
        return;
      }

      if (!isEnrolled) {
        Alert.alert(
          "No Face ID enrolled",
          "Please enroll your Face ID in settings."
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with Face ID",
        fallbackLabel: "Use Passcode",
      });

      if (result.success) {
        Alert.alert("Success", "Authentication successful!");
        router.push("/(tabs)");
      } else {
        Alert.alert("Failed", "Authentication failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "There was an error with Face ID authentication.");
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

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <Link href="/(tabs)" style={styles.button}>
        Login
      </Link>

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
          onPress={handleFaceID}
        >
          <Ionicons name="finger-print" size={32} color="#4B5563" />
          <Text style={styles.authMethodText}>Touch ID</Text>
        </TouchableOpacity>

        {/* Face ID */}
        <TouchableOpacity
          style={styles.authenticateItem}
          onPress={handleFaceID}
        >
          <Ionicons name="scan" size={32} color="#4B5563" />
          <Text style={styles.authMethodText}>Face ID</Text>
        </TouchableOpacity>

        {/* Social Logins */}
        <TouchableOpacity style={styles.authenticateItem}>
          <Ionicons name="logo-google" size={32} color="#DB4437" />
          <Text style={styles.authMethodText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.authenticateItem}>
          <Ionicons name="logo-facebook" size={32} color="#3B5998" />
          <Text style={styles.authMethodText}>Facebook</Text>
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  forgotPasswordText: {
    color: "#3B82F6",
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    textAlign: "center",
    borderRadius: 8,
    backgroundColor: "#6C56F2",
    color: "white",
    marginVertical: 20,
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
  authMethodText: {
    fontSize: 12,
    color: "#4B5563",
    marginTop: 4,
  },
});
