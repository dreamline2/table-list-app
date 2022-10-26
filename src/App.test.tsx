import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "@/lib/store";

test("renders App", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const header = screen.getByTestId("App");
  expect(header).toBeInTheDocument();
});
