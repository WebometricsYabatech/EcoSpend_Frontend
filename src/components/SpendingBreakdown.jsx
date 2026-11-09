import { formatMoney } from "../utils/format";

const COLORS = ["#16a34a", "#0d9488", "#f59e0b", "#0ea5e9", "#e11d48", "#8b5cf6", "#78716c"];

const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * data: [{ category: "Groceries", amount: 42500 }, ...]
 */
export default function SpendingBreakdown({ data = [], currency }) {
  const items = data.filter((d) => Number(d.amount) > 0);
  const total = items.reduce((sum, d) => sum + Number(d.amount), 0);

  if (total === 0) {
    return (
      <section className="rounded-2xl border border-gray-200 bg-white p-5">
        <h3 className="font-semibold text-gray-900">Where your money went</h3>
        <p className="mt-3 text-sm text-gray-600">
          Scan a receipt and your spending by category will show up here.
        </p>
      </section>
    );
  }

  // How far around the circle each slice starts.
  const starts = items.map((_, i) =>
    items.slice(0, i).reduce((sum, d) => sum + Number(d.amount), 0)
  );

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="font-semibold text-gray-900">Where your money went</h3>

      <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row">
        <svg
          viewBox="0 0 120 120"
          className="h-40 w-40 shrink-0"
          role="img"
          aria-label={`Spending by category. Total ${formatMoney(total, currency)}`}
        >
          <g transform="rotate(-90 60 60)">
            {items.map((d, i) => {
              const length = (Number(d.amount) / total) * CIRCUMFERENCE;
              return (
                <circle
                  key={d.category}
                  cx="60"
                  cy="60"
                  r={RADIUS}
                  fill="none"
                  stroke={COLORS[i % COLORS.length]}
                  strokeWidth="16"
                  strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
                  strokeDashoffset={-(starts[i] / total) * CIRCUMFERENCE}
                />
              );
            })}
          </g>
          <text x="60" y="56" textAnchor="middle" fontSize="7" fill="#6b7280">
            Total spent
          </text>
          <text x="60" y="68" textAnchor="middle" fontSize="10" fontWeight="600" fill="#111827">
            {formatMoney(total, currency)}
          </text>
        </svg>

        <ul className="w-full space-y-2 text-sm">
          {items.map((d, i) => (
            <li key={d.category} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-gray-700">
                <span
                  className="inline-block h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                {d.category}
              </span>
              <span className="text-gray-900">
                {formatMoney(d.amount, currency)}{" "}
                <span className="text-gray-500">
                  ({Math.round((Number(d.amount) / total) * 100)}%)
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
