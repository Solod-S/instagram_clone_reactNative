import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./auth/rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});
