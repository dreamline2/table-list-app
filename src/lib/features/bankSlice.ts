import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { BankAccount, BankState } from "@/lib/types";
import moment from "moment";

// Initial state
export const initialState: BankState = {
  // Sorted original data.
  accounts: [],
  // The UI display result.
  results: [],
  // Text Search results.
  searchedResults: [],
  // Pick Date results.
  searched: "",
  rowsPerPage: 10,
  currentPage: 0,
  order: "asc",
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
    setSearched(state, action: PayloadAction<string>) {
      state.searched = action.payload;
      state.results = state.accounts.filter((row) => {
        return row.description
          .toLowerCase()
          .includes(action.payload.toLowerCase());
      });
      state.searchedResults = state.results;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setOrder(state, action: PayloadAction<string>) {
      state.order = action.payload;
    },
  },
});

export const {
  setBankAccounts,
  setSearched,
  setPage,
  setRowsPerPage,
  setOrder,
} = bankSlice.actions;
export const selectBank = (state: RootState) => state.bank;
export default bankSlice.reducer;
