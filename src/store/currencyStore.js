import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCurrencyStore = create(
  persist(
    (set) => ({
      currency: "NGN",

      setCurrency: (currency) => {
        set({ currency });
      },
    }),
    {
      name: "ecosend-currency",
    }
  )
);

export default useCurrencyStore;