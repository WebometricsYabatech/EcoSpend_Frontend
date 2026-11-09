import { formatMoney } from "../utils/format";
import { BudgetInfo } from "./InfoTip";

// Green under 70%, yellow 70-89%, red 90% and above.
// If you change these numbers, update the text in BudgetInfo (InfoTip.jsx) too.
function getBand(pct) {
  if (pct > 100) return { bar: "bg-red-500", text: "text-red-600", label: "Over budget" };
  if (pct >= 90) return { bar: "bg-red-500", text: "text-red-600", label: "Close to your limit" };
  if (pct >= 70) return { bar: "bg-yellow-400", text: "text-yellow-600", label: "Slow down" };
  return { bar: "bg-green-500", text: "text-green-600", label: "On track" };
}

/**
 * budget:      the monthly limit (number)
 * spent:       how much has been spent this month (number)
 * percentUsed: optional. If the backend already gives a percentage, pass it.
 * format:      optional function to turn a number into money text
 *              (e.g. your existing formatCurrency). Otherwise use `currency`.
 * compact:     true = no card around it (for placing inside another card)
 */
export default function BudgetProgress({
  budget,
  spent,
  percentUsed,
  currency,
  format,
  compact = false,
}) {
  const fmt = format || ((value) => formatMoney(value, currency));
  const wrapper = compact ? "mt-5" : "rounded-2xl border border-gray-200 bg-white p-5";
  const titleClass = compact
    ? "flex items-center text-xs font-medium text-gray-600"
    : "flex items-center font-semibold text-gray-900";

  if (!budget || budget <= 0) {
    return (
      <section className={wrapper}>
        <h3 className={titleClass}>
          Monthly budget <BudgetInfo />
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          You haven't set a budget yet. Set one to see your progress here.
        </p>
      </section>
    );
  }

  const pct = Math.round(percentUsed ?? (spent / budget) * 100);
  const band = getBand(pct);
  const remaining = budget - spent;

  return (
    <section className={wrapper}>
      <div className="flex items-start justify-between gap-3">
        <h3 className={titleClass}>
          Monthly budget <BudgetInfo />
        </h3>
        <span className={`text-xs font-semibold ${band.text}`}>{band.label}</span>
      </div>

      <div
        className="mt-3 h-3 w-full overflow-hidden rounded-full bg-gray-100"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.min(pct, 100)}
        aria-label="Budget used"
      >
        <div
          className={`h-full rounded-full transition-all duration-500 motion-reduce:transition-none ${band.bar}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-gray-700">
        You've used <span className="font-semibold">{pct}%</span> of your {fmt(budget)} budget
        {remaining >= 0
          ? `, ${fmt(remaining)} left.`
          : `. You're ${fmt(Math.abs(remaining))} over.`}
      </p>
    </section>
  );
}
