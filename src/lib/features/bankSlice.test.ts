import { store } from "@/lib/store";
import type { DateRange } from "@mui/x-date-pickers-pro/DateRangePicker";

import reducer, {
  initialState,
  setBankAccounts,
  setSearched,
  setPage,
  setRowsPerPage,
  setOrder,
  setDateRange,
  sortDateTime,
  clearDateRange,
} from "@/lib/features/bankSlice";

const accounts = [
  {
    transactionDate: "2015-12-31",
    description: "All Purpose Spray",
    category: "Other Services",
    debit: 100.84,
    credit: null,
    id: 1,
  },
  {
    transactionDate: "2016-01-02",
    description: "Dr. FlimFlam's miracle cream",
    category: "Health Care",
    debit: 59.99,
    credit: null,
    id: 2,
  },
  {
    transactionDate: "2016-01-10",
    description: "Human Broth",
    category: "Merchandise",
    debit: 68.85,
    credit: null,
    id: 6,
  },
];

const accountsSortByDesc = [...accounts].reverse();

describe("redux slice state tests", () => {
  const setupAccountsState = { ...initialState, accounts: accounts };
  const setupResultsState = { ...initialState, results: accounts };

  it("Should initially set bank to an initial state object", () => {
    const state = store.getState();
    expect(state.bank).toEqual(initialState);
  });

  it("test setBankAccounts reducer", () => {
    expect(reducer(initialState, setBankAccounts(accounts))).toEqual({
      ...initialState,
      accounts: accounts,
      results: accounts,
    });
  });

  it("test setSearched reducer", () => {
    const searched = "All";

    expect(reducer(setupAccountsState, setSearched(searched))).toEqual({
      ...setupAccountsState,
      searched: searched,
      searchedResults: [accounts[0]],
      results: [accounts[0]],
    });
  });

  it("test setPage reducer", () => {
    expect(reducer(initialState, setPage(0))).toEqual({
      ...initialState,
      currentPage: 0,
    });
  });

  it("test setRowsPerPage reducer", () => {
    expect(reducer(initialState, setRowsPerPage(10))).toEqual({
      ...initialState,
      rowsPerPage: 10,
    });
  });

  it("test setOrder reducer", () => {
    expect(reducer(initialState, setOrder("desc"))).toEqual({
      ...initialState,
      order: "desc",
    });
  });

  it("test setDateRange reducer", () => {
    const startAndEndDate = [1452268800000, 1452700800000] as DateRange<
      number | undefined
    >;
    const endDateOnly = [null, 1452700800000] as DateRange<number | undefined>;
    expect(reducer(setupAccountsState, setDateRange(startAndEndDate))).toEqual({
      ...setupAccountsState,
      results: [accounts[2]],
      dateRange: startAndEndDate,
    });

    expect(reducer(setupAccountsState, setDateRange(endDateOnly))).toEqual({
      ...setupAccountsState,
      results: accounts,
      dateRange: endDateOnly,
    });
  });

  it("test sortDateTime reducer", () => {
    expect(reducer(setupResultsState, sortDateTime())).toEqual({
      ...setupResultsState,
      accounts: accountsSortByDesc,
      results: accountsSortByDesc,
      order: "desc",
    });
  });

  it("test clearDateRange reducer", () => {
    expect(reducer(setupAccountsState, clearDateRange())).toEqual({
      ...setupAccountsState,
      results: accounts,
      dateRange: [null, null],
    });
  });
});
