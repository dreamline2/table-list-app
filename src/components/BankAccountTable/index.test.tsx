import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BankAccountTable from "@/components/BankAccountTable";
import { Provider } from "react-redux";
import { createStore } from "@/lib/store";
import { bankSlice } from "@/lib/features/bankSlice";

describe("BankAccountTable components test", () => {
  test("text search", () => {
    // step1: setup store
    const store = createStore({
      [bankSlice.name]: bankSlice.reducer,
    });

    const mockFn = jest.fn();
    // step2: render RTK component
    render(
      <Provider store={store}>
        <BankAccountTable />
      </Provider>
    );

    // step3: change date-from-input, date-to-input to check onchange is it called.
    // const fromInput = screen.getByTestId("date-from-input");
    // const toInput = screen.getByTestId("date-to-input");

    // fireEvent.change(fromInput, { target: { value: "01/09/2016" } });
    // fireEvent.change(toInput, { target: { value: "01/14/2016" } });

    // expect(mockFn).toHaveBeenCalled();
  });
  test("click 10/01/2022 - null button", () => {});

  test("click 01/09/2016 - null button", () => {});

  test("click null - 01/14/2016 button", () => {});

  test("click 01/09/2016 - 01/14/2016 button", () => {});

  test("click Clear Range button", () => {});
});
