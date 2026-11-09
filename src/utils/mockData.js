import { toDateKey } from "./format";

// Fake data for previewing the dashboard widgets without the backend.
// Delete this file once the real API data is connected.

export const mockCurrency = "NGN";

export const mockCategories = [
  { category: "Groceries", amount: 42500 },
  { category: "Transport", amount: 18000 },
  { category: "Food & Dining", amount: 15500 },
  { category: "Data & Airtime", amount: 12000 },
  { category: "Utilities", amount: 9000 },
  { category: "Other", amount: 4000 },
];

// 28 days ending 4 Nov 2026
const pattern = [3500, 1200, 0, 5400, 2300, 8900, 4100];
export const mockDaily = Array.from({ length: 28 }, (_, i) => {
  const date = new Date(2026, 9, 8 + i);
  return { date: toDateKey(date), amount: pattern[i % 7] + ((i * 173) % 1500) };
});

export const mockBudget = { budget: 50000, spent: 35000 };

export const mockEcoScore = 7;