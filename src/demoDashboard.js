import { toDateKey } from "./format";

// DEMO DATA for viewing the dashboard without the backend.
// Only used when VITE_DEMO_MODE=true in .env AND the app runs with `npm run dev`.
// Delete this file (and its import in DashboardMain.jsx) once login/backend works.

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

export function getDemoDashboard() {
  const pattern = [3500, 1200, 0, 5400, 2300, 8900, 4100];
  const dailyChart = Array.from({ length: 28 }, (_, i) => ({
    date: toDateKey(daysAgo(27 - i)),
    amount: pattern[i % 7] + ((i * 173) % 1500),
  }));

  const receipt = (id, storeName, offset, totalAmount, category, items) => ({
    receiptId: id,
    storeName,
    date: toDateKey(daysAgo(offset)),
    totalAmount,
    category,
    sustainabilityScore: 7,
    sustainabilityTip: "Choosing local produce and bringing your own bag raises your score.",
    items,
  });

  return {
    overview: {
      totalThisMonth: 39000,
      totalLastMonth: 34821,
      monthChange: 12,
      budget: 50000,
      percentageUsed: 78,
      isOverBudget: false,
      receiptScans: 14,
    },
    categoryBreakdown: [
      { category: "Groceries", total: 15600, percentage: 40 },
      { category: "Transport", total: 7800, percentage: 20 },
      { category: "Food & Dining", total: 6240, percentage: 16 },
      { category: "Utilities", total: 4680, percentage: 12 },
      { category: "Pet supplies", total: 2340, percentage: 6 },
      { category: "Other", total: 2340, percentage: 6 },
    ],
    dailyChart,
    avgSustainabilityScore: 7.2,
    recentReceipts: [
      receipt("demo-1", "Shoprite", 1, 8450, "Groceries", [
        { name: "Local tomatoes", price: 1800, category: "Groceries", grade: "A" },
        { name: "Bottled water (6 pack)", price: 2100, category: "Groceries", grade: "D" },
        { name: "Bread", price: 1250, category: "Groceries", grade: "B" },
        { name: "Imported cheese", price: 3300, category: "Groceries", grade: "C" },
      ]),
      receipt("demo-2", "Total Energies", 3, 12000, "Transport", [
        { name: "Fuel", price: 12000, category: "Transport", grade: "D" },
      ]),
      receipt("demo-3", "Chicken Republic", 5, 6240, "Food & Dining", [
        { name: "Rice and chicken", price: 4200, category: "Food & Dining", grade: "C" },
        { name: "Drink", price: 2040, category: "Food & Dining", grade: "C" },
      ]),
      receipt("demo-4", "PetMart", 8, 2340, "Pet supplies", [
        { name: "Dog food", price: 2340, category: "Pet supplies", grade: "B" },
      ]),
      receipt("demo-5", "Ikeja Market", 10, 4970, "Groceries", [
        { name: "Yams", price: 2400, category: "Groceries", grade: "A" },
        { name: "Plantain", price: 1570, category: "Groceries", grade: "A" },
        { name: "Reusable bag", price: 1000, category: "Other", grade: "A" },
      ]),
    ],
  };
}
