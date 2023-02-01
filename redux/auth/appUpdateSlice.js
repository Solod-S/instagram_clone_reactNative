import { createSlice } from "@reduxjs/toolkit";

export const appUpdateSlice = createSlice({
  name: "appUpdate",
  initialState: { status: false },
  reducers: {
    startUpdatingApp(state, _) {
      state.status = true;
    },
    stopUpdatingApp(state, _) {
      state.status = false;
    },
  },
});

export const { startUpdatingApp, stopUpdatingApp } = appUpdateSlice.actions;
