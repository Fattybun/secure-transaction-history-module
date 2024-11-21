import React, { useState } from "react";
import {
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { MOCK_TRANSACTION } from "@/configs/transaction";

export default function TransactionHistoryScreen() {
  const [transactions] = useState(MOCK_TRANSACTION);
  const [refreshing, setRefreshing] = useState(false);
  const [showAmounts, setShowAmounts] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false); // Reset refreshing state
    }, 2000); // Simulate a network request delay
  };

  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to view amounts",
    });

    if (result.success) {
      setShowAmounts(!showAmounts);
    } else {
      Alert.alert("Authentication Failed", "Unable to validate biometrics.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <TouchableOpacity style={styles.button} onPress={handleBiometricAuth}>
          <ThemedText style={styles.buttonText}>
            {showAmounts ? "Hide Amounts" : "View Amounts"}
          </ThemedText>
        </TouchableOpacity>

        {transactions.map((transaction) => (
          <TouchableOpacity
            key={transaction.id}
            style={styles.transactionItem}
            onPress={() =>
              router.push(`/transaction/details/${transaction.id}`)
            }
          >
            <ThemedView style={styles.transactionRow}>
              <ThemedText style={styles.label}>Amount:</ThemedText>
              <ThemedText style={styles.value}>
                {showAmounts ? `RM ${transaction.amount.toFixed(2)}` : "••••"}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.transactionRow}>
              <ThemedText style={styles.label}>Date:</ThemedText>
              <ThemedText style={styles.value}>{transaction.date}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.transactionRow}>
              <ThemedText style={styles.label}>Description:</ThemedText>
              <ThemedText style={styles.value}>
                {transaction.description}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.transactionRow}>
              <ThemedText style={styles.label}>Type:</ThemedText>
              <ThemedText style={styles.value}>{transaction.type}</ThemedText>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
  },
  button: {
    backgroundColor: "#4B5563",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: { color: "#fff", textAlign: "center" },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  value: {},
  transactionItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
  },
});
