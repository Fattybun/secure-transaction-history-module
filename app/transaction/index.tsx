// app/transactions/index.tsx
import React, { useState } from "react";
import {
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  View,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import { mockTransactions } from "@/data/mockTransaction";

export default function TransactionHistoryScreen() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [refreshing, setRefreshing] = useState(false);
  const [showAmounts, setShowAmounts] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000); // Simulate API call
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
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <TouchableOpacity style={styles.button} onPress={handleBiometricAuth}>
        <Text style={styles.buttonText}>
          {showAmounts ? "Hide Amounts" : "View Amounts"}
        </Text>
      </TouchableOpacity>

      {transactions.map((transaction, index) => (
        <TouchableOpacity
          key={index}
          style={styles.transactionItem}
          // onPress={() => router.push(`/transaction/details/${index + 1}`)}
        >
          <View style={styles.transactionRow}>
            <Text style={styles.label}>Amount:</Text>
            <Text style={styles.value}>
              {showAmounts ? `$${transaction.amount.toFixed(2)}` : "••••"}
            </Text>
          </View>
          <View style={styles.transactionRow}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{transaction.date}</Text>
          </View>
          <View style={styles.transactionRow}>
            <Text style={styles.label}>Description:</Text>
            <Text style={styles.value}>{transaction.description}</Text>
          </View>
          <View style={styles.transactionRow}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>{transaction.type}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  transaction: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    color: "#555",
  },
  transactionItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
