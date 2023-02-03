import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./authReducer";
import { appUpdateSlice } from "./appUpdateSlice";
import { appLoadingStatusSlice } from "./appLoadingStatusSlice.";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [appUpdateSlice.name]: appUpdateSlice.reducer,
  [appLoadingStatusSlice.name]: appLoadingStatusSlice.reducer,
});

export default rootReducer;
