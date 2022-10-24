import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { BankAccount, BankState } from "@/lib/types";

// Initial state
export const initialState: BankState = {
  // Sorted original data.
  accounts: [],
  // The UI display result.
  results: [],
};

// Actual Slice
export const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    setBankAccounts(state, action: PayloadAction<BankAccount[]>) {
      state.accounts = action.payload;
      state.results = action.payload;
    },
  },
});

export const { setBankAccounts } = bankSlice.actions;
export const selectBank = (state: RootState) => state.bank;
export default bankSlice.reducer;
