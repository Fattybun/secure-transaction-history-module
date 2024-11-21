import { category } from "@/configs/category";
import { paymentMethod } from "@/configs/payment";
import { transactionStatus } from "@/configs/status";
import { transaction } from "@/interface/transaction";
import { generateUniqueId } from "./generateUniqueId";

// Helper function to get a random value from an array
const getRandomValue = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// Function to generate 50 mock transactions
export const generateMockTransactions = (): transaction[] => {
  // Use Object.values to get only the values from each configuration
  const paymentMethods = Object.values(paymentMethod); // This will give the values directly
  const transactionStatuses = Object.values(transactionStatus); // This will give the values directly
  const categories = Object.values(category); // This will give the values directly

  const mockTransactions: transaction[] = [];

  for (let i = 0; i < 50; i++) {
    const id = generateUniqueId();
    const amount = parseFloat((Math.random() * 1000).toFixed(2)); // Random amount between 0 and 1000
    const date = new Date(
      Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000) // Random date within the past year
    );

    // Format the date as DD MMM YYYY
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const description = `Transaction #${i + 1}`;
    const type = getRandomValue(paymentMethods); // Random payment method
    const status = getRandomValue(transactionStatuses); // Random transaction status
    const category = getRandomValue(categories); // Random category

    mockTransactions.push({
      id,
      amount,
      date: formattedDate,
      description,
      type,
      status,
      category,
    });
  }

  return mockTransactions;
};
