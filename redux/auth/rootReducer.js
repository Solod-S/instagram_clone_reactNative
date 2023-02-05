import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./authReducer";
import { appUpdateSlice } from "./appUpdateSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [appUpdateSlice.name]: appUpdateSlice.reducer,
});

export default rootReducer;
