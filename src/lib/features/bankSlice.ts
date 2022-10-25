import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { BankAccount, BankState } from "@/lib/types";
import type { DateRange } from "@mui/x-date-pickers-pro/DateRangePicker";
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
  dateRange: [null, null],
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
    setDateRange(state, action: PayloadAction<DateRange<number | undefined>>) {
      const [start, end] = action.payload;
      // Get previous results, even no text search.
      let preResults = state[state.searched ? "searchedResults" : "accounts"];
      if (!start && !end) {
        // If no start and end, it means the display needs to be restored to initialization.
        state.results = state[state.searched ? "searchedResults" : "accounts"];
      } else {
        if (start) {
          preResults = preResults.filter(
            (acc) => moment(acc.transactionDate).valueOf() > start
          );
        }
        if (end) {
          preResults = preResults.filter(
            (acc) => moment(acc.transactionDate).valueOf() < end
          );
        }
        state.results = preResults;
      }
      state.dateRange = action.payload;
    },
    sortDateTime(state) {
      const isAsc = state.order === "asc";
      const sorted = state.results.sort((a, b) => {
        return (
          moment(b.transactionDate).valueOf() -
          moment(a.transactionDate).valueOf()
        );
      });
      state.accounts = isAsc ? sorted : sorted.reverse();
      state.results = isAsc ? sorted : sorted.reverse();
      state.order = isAsc ? "desc" : "asc";
    },
    clearDateRange(state) {
      state.dateRange = [null, null];
      state.results = state.accounts;
    },
  },
});

export const {
  setBankAccounts,
  setSearched,
  setPage,
  setRowsPerPage,
  setOrder,
  setDateRange,
  sortDateTime,
  clearDateRange,
} = bankSlice.actions;
export const selectBank = (state: RootState) => state.bank;
export default bankSlice.reducer;
