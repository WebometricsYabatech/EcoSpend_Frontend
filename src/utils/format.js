// Formats a number as money. Works whether the backend gives a currency
// code ("NGN", "USD") or a symbol ("₦", "$").
// decimals: 0 for dashboard totals, 2 for receipts (e.g. 1092.36).
export function formatMoney(amount, currency = "NGN", decimals = 0) {
  const value = Number(amount) || 0;

  if (/^[A-Za-z]{3}$/.test(currency)) {
    try {
      return new Intl.NumberFormat("en", {
        style: "currency",
        currency: currency.toUpperCase(),
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value);
    } catch {
      // Unknown code: fall through to the plain version below.
    }
  }
  return `${currency}${value.toLocaleString("en", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}

// Builds "2026-11-04" from a Date using the local timezone
// (toISOString would shift the day for users ahead of UTC, like Lagos).
export function toDateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}