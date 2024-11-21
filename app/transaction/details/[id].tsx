import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { MOCK_TRANSACTION } from "@/configs/transaction";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams();

  const transaction = MOCK_TRANSACTION.find((t) => t.id === id);

  if (!transaction) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>Transaction not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView style={styles.card}>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>Amount:</ThemedText>
          <ThemedText style={styles.value}>RM {transaction.amount}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>Date:</ThemedText>
          <ThemedText style={styles.value}>{transaction.date}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>Payment Method:</ThemedText>
          <ThemedText style={styles.value}>{transaction.type}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>Status:</ThemedText>
          <ThemedText style={styles.value}>
            {transaction.status || "N/A"}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Description</ThemedText>
        <ThemedText style={styles.sectionText}>
          {transaction.description}
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          Additional Information
        </ThemedText>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>Transaction ID:</ThemedText>
          <ThemedText style={styles.value}>{transaction.id}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.row}>
          <ThemedText style={styles.label}>Category:</ThemedText>
          <ThemedText style={styles.value}>
            {transaction.category || "N/A"}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 22,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 20,
  },
});
