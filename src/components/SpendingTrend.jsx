import { useState } from "react";
import { formatMoney, toDateKey } from "../utils/format";

function toDate(raw) {
  if (!raw) return null;
  const text = String(raw);
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(text) ? `${text}T00:00:00` : text);
  return Number.isNaN(date.getTime()) ? null : date;
}

function readDate(row) {
  return row.date ?? row.day ?? row.label ?? row.createdAt ?? "";
}

function startOfWeek(date) {
  const d = new Date(date);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); // weeks start on Monday
  return d;
}

function shortDate(date) {
  return date.toLocaleDateString("en", { month: "short", day: "numeric" });
}

// Turns the backend rows into bars. If the dates can't be read, it still draws
// the bars in the order given and hides the Weekly option.
function buildPoints(daily, mode) {
  const rows = daily.map((row, index) => ({
    raw: readDate(row),
    date: toDate(readDate(row)),
    amount: Number(row.amount ?? row.total ?? 0) || 0,
    index,
  }));
  const canUseDates = rows.length > 0 && rows.every((r) => r.date);
  if (canUseDates) rows.sort((a, b) => a.date - b.date);

  if (!canUseDates || mode === "daily") {
    const points = rows.map((r) => ({
      key: `${r.index}`,
      label: canUseDates ? String(r.date.getDate()) : String(r.raw || r.index + 1),
      title: canUseDates ? shortDate(r.date) : String(r.raw || `#${r.index + 1}`),
      amount: r.amount,
    }));
    return { points, canUseDates };
  }

  const weeks = new Map();
  for (const r of rows) {
    const monday = startOfWeek(r.date);
    const key = toDateKey(monday);
    const week = weeks.get(key) || { key, monday, amount: 0 };
    week.amount += r.amount;
    weeks.set(key, week);
  }
  const points = [...weeks.values()].map((w) => ({
    key: w.key,
    label: shortDate(w.monday),
    title: `Week of ${shortDate(w.monday)}`,
    amount: w.amount,
  }));
  return { points, canUseDates };
}

/**
 * daily:  the backend's dailyChart, e.g. [{ date: "2026-11-04", amount: 3500 }, ...]
 * format: optional function to turn a number into money text (e.g. formatCurrency)
 */
export default function SpendingTrend({ daily = [], currency, format }) {
  const [mode, setMode] = useState("daily");
  const fmt = format || ((value) => formatMoney(value, currency));
  const { points, canUseDates } = buildPoints(daily, mode);
  const unit = mode === "weekly" && canUseDates ? "week" : "day";

  const values = points.map((p) => p.amount);
  const sum = (arr) => arr.reduce((s, v) => s + v, 0);
  const average = values.length ? sum(values) / values.length : 0;
  const max = Math.max(...values, 1);

  const last = values[values.length - 1] ?? 0;
  const earlier = values.slice(0, -1);
  const earlierAverage = earlier.length ? sum(earlier) / earlier.length : 0;
  const change =
    earlierAverage > 0 ? Math.round(((last - earlierAverage) / earlierAverage) * 100) : null;

  let summary = null;
  if (change !== null) {
    if (Math.abs(change) < 5) summary = `Your latest ${unit} is about the same as usual.`;
    else if (change > 0) summary = `Your latest ${unit} is ${change}% higher than your usual.`;
    else summary = `Your latest ${unit} is ${Math.abs(change)}% lower than your usual.`;
  }

  const labelEvery = points.length > 16 ? 3 : 1;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-semibold text-gray-900">Spending trend</h3>
        {canUseDates && (
          <div className="inline-flex rounded-lg border border-gray-200 p-0.5 text-sm">
            {["daily", "weekly"].map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={`rounded-md px-3 py-1 capitalize ${
                  mode === m ? "bg-green-600 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>

      {points.length === 0 ? (
        <p className="mt-3 text-sm text-gray-600">
          Your trend will appear here once you have a few days of receipts.
        </p>
      ) : (
        <>
          {summary && <p className="mt-3 text-sm text-gray-700">{summary}</p>}

          <div className="relative mt-6 h-40">
            <div
              className="pointer-events-none absolute inset-x-0 border-t border-dashed border-gray-400"
              style={{ bottom: `${(average / max) * 100}%` }}
            >
              <span className="absolute right-0 -top-5 rounded bg-white px-1 text-xs text-gray-500">
                average {fmt(average)}
              </span>
            </div>

            <div className="flex h-full items-end gap-1">
              {points.map((p) => (
                <div
                  key={p.key}
                  className="flex h-full flex-1 items-end"
                  title={`${p.title}: ${fmt(p.amount)}`}
                >
                  <div
                    className={`w-full rounded-t ${p.amount > average ? "bg-amber-400" : "bg-green-500"}`}
                    style={{ height: p.amount > 0 ? `max(${(p.amount / max) * 100}%, 2px)` : "0" }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-1 flex gap-1">
            {points.map((p, i) => (
              <span key={p.key} className="flex-1 text-center text-[10px] text-gray-500">
                {i % labelEvery === 0 ? p.label : ""}
              </span>
            ))}
          </div>

          <p className="mt-3 text-xs text-gray-500">
            Amber bars are above your average. Green bars are at or below it.
          </p>
        </>
      )}
    </section>
  );
}
