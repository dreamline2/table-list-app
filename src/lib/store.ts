import { configureStore } from "@reduxjs/toolkit";
import { bankSlice } from "./features/bankSlice";
import { bankApi } from "./services";

export const createStore = (reducer = {}) => {
  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(bankApi.middleware),
    devTools: process.env.NODE_ENV === "development",
  });
};

export const store = createStore({
  [bankSlice.name]: bankSlice.reducer,
  [bankApi.reducerPath]: bankApi.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
