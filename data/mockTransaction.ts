// data/mockData.ts
export const mockTransactions = [
  {
    id: "1",
    amount: 1500,
    date: "2024-11-01",
    description: "Salary",
    type: "credit",
  },
  {
    id: "2",
    amount: 50,
    date: "2024-11-02",
    description: "Groceries",
    type: "debit",
  },
  {
    id: "3",
    amount: 200,
    date: "2024-11-03",
    description: "Rent",
    type: "debit",
  },
  {
    id: "4",
    amount: 200,
    date: "2024-11-03",
    description: "Rent",
    type: "debit",
  },
];

// Extend the mock transactions
export const mockTransactionsDetail = mockTransactions.map((transaction) => ({
  ...transaction,
  status: "Completed", // Default for all
  paymentMethod: transaction.type === "credit" ? "Bank Transfer" : "Debit Card",
  category:
    transaction.description.toLowerCase() === "salary"
      ? "Income"
      : transaction.description.toLowerCase() === "groceries"
      ? "Food & Drink"
      : transaction.description.toLowerCase() === "rent"
      ? "Housing"
      : "Miscellaneous",
}));
