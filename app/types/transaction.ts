type paymentMethod = "Credit Card" | "Debit Card" | "FPX";

type transactionStatus = "Successful" | "Pending" | "Failed";

type category =
  | "Beverage"
  | "Meal"
  | "Rental"
  | "Sport"
  | "Gift"
  | "Maintenance"
  | "Book"
  | "Medical"
  | "Transport"
  | "Leisure";

export type transaction = {
  id: string;
  amount: number;
  date: string;
  description: string;
  type: paymentMethod;
  status?: transactionStatus;
  category?: category;
};
