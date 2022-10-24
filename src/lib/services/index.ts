import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BankAccount } from "@/lib/types";
import { setBankAccounts } from "@/lib/features/bankSlice";
// Define a service using a base URL and expected endpoints
export const bankApi = createApi({
  reducerPath: "bankApi",
  tagTypes: ["Account"],
  baseQuery: fetchBaseQuery({
    baseUrl: `/`,
  }),
  endpoints: (builder) => ({
    getBankAccounts: builder.query<BankAccount[], void>({
      query: () => `/bank.json`,
      providesTags: (result) =>
        result
          ? [
              { type: "Account", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Account" as const, id })),
            ]
          : [{ type: "Account", id: "LIST" }],
      transformResponse: (result: { accounts: BankAccount[] }) =>
        result.accounts,
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {
        // `onStart` side-effect
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          dispatch(setBankAccounts(data));
        } catch (err) {
          // `onError` side-effect
        }
      },
    }),
  }),
});
