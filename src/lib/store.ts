import { configureStore } from "@reduxjs/toolkit";
import { bankSlice } from "./features/bankSlice";
import { bankApi } from "./services";

export const store = configureStore({
  reducer: {
    [bankSlice.name]: bankSlice.reducer,
    [bankApi.reducerPath]: bankApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([bankApi.middleware]),
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
