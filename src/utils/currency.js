export const CURRENCIES = {
    NGN: {
      code: "NGN",
      symbol: "₦",
      locale: "en-NG",
    },
    USD: {
      code: "USD",
      symbol: "$",
      locale: "en-US",
    },
  };
  
  export const getCurrency = () => {
    return localStorage.getItem("currency") || "NGN";
  };
  
  export const setCurrency = (currency) => {
    localStorage.setItem("currency", currency);
  
    // Tell the rest of the app immediately
    window.dispatchEvent(new Event("currencyUpdated"));
  };
  
  export const formatCurrency = (amount) => {
    const currency = getCurrency();
    const config = CURRENCIES[currency] || CURRENCIES.NGN;
  
    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: config.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  };