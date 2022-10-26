import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DateRangePicker from "@/components/DateRangePicker";
import { Provider } from "react-redux";
import { createStore } from "@/lib/store";
import { bankSlice } from "@/lib/features/bankSlice";

describe("DateRangePicker components test", () => {
  test("change from date and to date is it called", () => {
    // step1: setup store
    const store = createStore({
      [bankSlice.name]: bankSlice.reducer,
    });

    const mockFn = jest.fn();
    // step2: render RTK component
    render(
      <Provider store={store}>
        <DateRangePicker value={[null, null]} onChange={mockFn} />
      </Provider>
    );

    // step3: change date-from-input, date-to-input to check onchange is it called.
    const fromInput = screen.getByTestId("date-from-input");
    const toInput = screen.getByTestId("date-to-input");

    fireEvent.change(fromInput, { target: { value: "01/09/2016" } });
    fireEvent.change(toInput, { target: { value: "01/14/2016" } });

    expect(mockFn).toHaveBeenCalled();
  });
});
