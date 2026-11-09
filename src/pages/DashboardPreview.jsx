import { useState } from "react";
import BudgetProgress from "../components/BudgetProgress";
import SpendingBreakdown from "../components/SpendingBreakdown";
import SpendingTrend from "../components/SpendingTrend";
import { EcoScoreInfo } from "../components/InfoTip";
import {
  mockBudget,
  mockCategories,
  mockCurrency,
  mockDaily,
  mockEcoScore,
} from "../utils/mockData";

// Temporary page for testing the new widgets without the backend.
// Visit /preview in the browser. Remove the route when the real dashboard is wired up.
export default function DashboardPreview() {
  const [spent, setSpent] = useState(mockBudget.spent);

  return (
    <div className="mx-auto max-w-3xl space-y-5 p-6">
      <h1 className="text-xl font-semibold text-gray-900">Dashboard preview (fake data)</h1>

      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="flex items-center font-semibold text-gray-900">
          Average eco score <EcoScoreInfo />
        </h3>
        <p className="mt-2 text-2xl font-semibold text-green-600">
          {mockEcoScore}/10 <span className="text-base text-gray-500">({mockEcoScore * 10}%)</span>
        </p>
      </section>

      <div>
        <label htmlFor="spent" className="mb-2 block text-sm text-gray-600">
          Test the budget colours: drag to change the amount spent
        </label>
        <input
          id="spent"
          type="range"
          min="0"
          max="70000"
          step="1000"
          value={spent}
          onChange={(e) => setSpent(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <BudgetProgress budget={mockBudget.budget} spent={spent} currency={mockCurrency} />
      <SpendingBreakdown data={mockCategories} currency={mockCurrency} />
      <SpendingTrend daily={mockDaily} currency={mockCurrency} />
    </div>
  );
}
