import {
  fetchBaseQuery,
  createApi,
  BaseQueryFn,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setCredentials, logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const refreshTokenResult = await baseQuery(
      "/auth/refresh-token",
      api,
      extraOptions
    );

    if (refreshTokenResult?.data) {
      api.dispatch(setCredentials({ ...refreshTokenResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Books"],
  endpoints: () => ({}),
});
