import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TablePaginationActions from "@/components/TablePaginationActions";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { createStore } from "@/lib/store";
import { bankSlice } from "@/lib/features/bankSlice";

import {
  setPage,
  setBankAccounts,
  setRowsPerPage,
} from "@/lib/features/bankSlice";

const rawAccounts = [
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
  {
    transactionDate: "2016-01-10",
    description: "Human Broth",
    category: "Merchandise",
    debit: 68.85,
    credit: null,
    id: 6,
  },
];

describe("TablePaginationActions components test", () => {
  test("click first-page button", () => {
    // step1: setup store
    const store = createStore({
      [bankSlice.name]: bankSlice.reducer,
    });

    // step2: render RTK component
    render(
      <Provider store={store}>
        <TablePaginationActions />
      </Provider>
    );

    // step3: click first-page button to check currentPages is equal to 0
    const button = screen.getByRole("first-page");
    fireEvent.click(button);

    expect(store.getState().bank.currentPage).toEqual(0);
  });

  test("click previous-page button", () => {
    // step1: setup store
    const store = createStore({
      [bankSlice.name]: bankSlice.reducer,
    });

    // step2: render RTK component
    render(
      <Provider store={store}>
        <TablePaginationActions />
      </Provider>
    );

    // step3: set store bank.currentPage to 2
    act(() => {
      store.dispatch(setPage(2));
    });

    // step4: click previous-page button to check currentPages is equal to 1
    const button = screen.getByRole("previous-page");
    fireEvent.click(button);

    expect(store.getState().bank.currentPage).toEqual(1);
  });

  test("click next-page button", () => {
    // step1: setup store
    const store = createStore({
      [bankSlice.name]: bankSlice.reducer,
    });

    // step2: render RTK component
    render(
      <Provider store={store}>
        <TablePaginationActions />
      </Provider>
    );

    // step3: set store bank.currentPage to 1, and setup not button disable condition.
    act(() => {
      store.dispatch(setBankAccounts(rawAccounts));
      store.dispatch(setRowsPerPage(1));
      store.dispatch(setPage(1));
    });

    // step4: click previous-page button to check currentPages is equal to 2
    const button = screen.getByRole("next-page");
    fireEvent.click(button);

    expect(store.getState().bank.currentPage).toEqual(2);
  });

  test("click last-page button", () => {
    // step1: setup store
    const store = createStore({
      [bankSlice.name]: bankSlice.reducer,
    });

    // step2: render RTK component
    render(
      <Provider store={store}>
        <TablePaginationActions />
      </Provider>
    );

    // step3: set 4 pages
    act(() => {
      store.dispatch(setBankAccounts(rawAccounts));
      store.dispatch(setRowsPerPage(1));
    });

    // step4: click previous-page button to check currentPages is equal to 3
    const button = screen.getByRole("last-page");
    fireEvent.click(button);

    const {
      accounts,
      currentPage: currentPageIdx,
      rowsPerPage,
    } = store.getState().bank;
    const pages = accounts.length / rowsPerPage;

    expect(currentPageIdx).toEqual(pages - 1);
  });
});
