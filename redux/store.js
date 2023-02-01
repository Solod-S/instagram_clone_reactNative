import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authReducer";
import { appUpdateSlice } from "./auth/appUpdateSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [appUpdateSlice.name]: appUpdateSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
